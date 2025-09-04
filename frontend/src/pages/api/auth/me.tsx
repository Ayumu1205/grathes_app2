import { PrismaClient } from '@prisma/client';
import { jwtVerify } from 'jose';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();
// 秘密鍵は必ず.envファイルで管理してください
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-default-super-secret-key-for-development'
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // リクエストからセッションクッキーを取得
    const token = req.cookies.sessionToken;

    if (!token) {
      // トークンがなければ未認証
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // トークンを検証
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // トークン内のユーザーIDを使って、DBからユーザー情報を取得
    const user = await prisma.user.findUnique({
      where: { id: Number(payload.sub) },
    });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // パスワードは返却しない
    const { password, ...userWithoutPassword } = user;

    res.status(200).json(userWithoutPassword);

  } catch (err) {
    console.error('Authentication error:', err);
    res.status(401).json({ message: 'Authentication failed' });
  } finally {
    await prisma.$disconnect();
  }
}