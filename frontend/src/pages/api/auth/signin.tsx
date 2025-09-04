import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// ★ JWTの秘密鍵。必ず.envファイルで管理してください。
const JWT_SECRET = process.env.JWT_SECRET || 'your-default-super-secret-key-for-development';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  console.log('[/api/auth/signin] - 処理開始');

  try {
    console.log('受信したリクエストボディ:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'メールアドレスとパスワードは必須です。' });
    }
    console.log('[1/3] - 入力値のバリデーション成功');

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // ★ ユーザーが存在しない、またはパスワードが設定されていない場合
    if (!user || !user.password) {
      return res.status(401).json({ message: 'メールアドレスまたはパスワードが正しくありません。' });
    }
    console.log('[2/3] - ユーザーの検索成功');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'メールアドレスまたはパスワードが正しくありません。' });
    }
    console.log('[3/3] - パスワードの検証成功');

    // ★★★ ここからがHttpOnlyクッキーを設定するロジック ★★★

    // 1. JWTペイロード（トークンに含める情報）を作成
    const claims = {
      sub: user.id, // ユーザーIDをトークンの主題(subject)として設定
      email: user.email,
    };

    // 2. JWTを生成 (有効期限: 1週間)
    const token = jwt.sign(claims, JWT_SECRET, { expiresIn: '7d' });

    // 3. HttpOnlyクッキーをシリアライズ（文字列に変換）
    const cookie = serialize('sessionToken', token, {
      httpOnly: true,       // JavaScriptからのアクセスを禁止 (XSS対策)
      secure: process.env.NODE_ENV !== 'development', // 本番環境ではHTTPSのみに限定
      sameSite: 'strict',   // CSRF攻撃からの保護
      maxAge: 60 * 60 * 24 * 7, // 1週間の有効期限 (秒単位)
      path: '/',            // アプリケーション全体でクッキーを有効にする
    });

    // 4. レスポンスヘッダーにクッキーを設定
    res.setHeader('Set-Cookie', cookie);
    console.log('[4/4] - HttpOnlyクッキーの設定成功');
    // ★★★ ここまで ★★★


    // レスポンスからパスワードフィールドを除外
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ message: 'ログインに成功しました。', user: userWithoutPassword });

  } catch (err) {
    console.error('[/api/auth/signin] - エラー発生:', err);
    res.status(500).json({ message: 'サーバーエラーが発生しました。' });
  } finally {
    await prisma.$disconnect();
    console.log('[/api/auth/signin] - 処理終了');
  }
}

