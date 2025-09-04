import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-super-secret-key-for-development';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'メールアドレスとパスワードは必須です。' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return res.status(401).json({ message: 'メールアドレスまたはパスワードが正しくありません。' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'メールアドレスまたはパスワードが正しくありません。' });
    }

    const claims = {
      sub: user.id,
      email: user.email,
    };

    const token = jwt.sign(claims, JWT_SECRET, { expiresIn: '7d' });

    const cookie = serialize('sessionToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    res.setHeader('Set-Cookie', cookie);

    // ★★★ ここからが修正箇所 ★★★
    // 1. userオブジェクトのコピーを作成
    const userWithoutPassword = { ...user };
    // 2. コピーからpasswordプロパティを削除
    delete userWithoutPassword.password;
    // ★★★ 修正ここまで ★★★

    res.status(200).json({ message: 'ログインに成功しました。', user: userWithoutPassword });

  } catch (err) {
    console.error('[/api/auth/signin] - エラー発生:', err);
    res.status(500).json({ message: 'サーバーエラーが発生しました。' });
  } finally {
    await prisma.$disconnect();
  }
}
