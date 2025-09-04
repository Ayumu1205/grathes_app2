import { PrismaClient } from '@prisma/client'
import { jwtVerify } from 'jose';
import type { NextApiRequest, NextApiResponse } from 'next'


const prisma = new PrismaClient()

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-default-super-secret-key-for-development'
);
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //GETメソッド　論文データ全て取ってくる
  if (req.method === 'GET') {
    try {
      // 1. ブラウザから自動で送られてきたクッキーを取得
      const token = req.cookies.sessionToken;

      if (!token) {
        // ログインしていない場合はエラーを返す
        return res.status(401).json({ message: 'Not authenticated' });
      }

      // 2. クッキー内のトークンを検証し、ユーザーIDを取り出す
      const { payload } = await jwtVerify(token, JWT_SECRET);
      const userId = Number(payload.sub);

      if (!userId) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      const allThesis = await prisma.thesis.findMany({
        where: {
          authorId: userId, // ★★★ ここでユーザーを絞り込む ★★★
        },
        include: {
          imagePlanList: true, // 挿入計画リストを一緒に取得する
          chapters: {
            select: {
              id: true,
              title: true,
              description: true, // ←明示
              sections: {
                select: {
                  id: true,
                  title: true,
                  description: true, // ←明示
                },
              },
            },
          },
        },
      })

      return res.status(200).json({ message: 'Success', allThesis })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Error' })
    } finally {
      await prisma.$disconnect()
    }
  }
}
