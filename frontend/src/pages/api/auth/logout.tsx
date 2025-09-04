import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // POSTメソッドのリクエストのみを受け付けます
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // 'sessionToken'という名前のクッキーを無効化（削除）するための設定を作成します。
  // 有効期限(maxAge)を過去の日時にすることで、ブラウザにクッキーを削除させます。
  const cookie = serialize('sessionToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // 本番環境ではHTTPSのみ
    sameSite: 'strict',
    maxAge: -1, // 有効期限を-1秒に設定
    path: '/',  // アプリケーション全体で有効
  });

  // レスポンスヘッダーに、クッキーを削除するよう指示します
  res.setHeader('Set-Cookie', cookie);

  // 成功したことを示すステータスコード200とメッセージを返します
  res.status(200).json({ message: 'ログアウトしました。' });
}

