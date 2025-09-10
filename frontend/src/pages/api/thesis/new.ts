import { PrismaClient } from '@prisma/client';
import { jwtVerify } from 'jose';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// // 秘密鍵は必ず.envファイルで管理してください
// const JWT_SECRET = new TextEncoder().encode(
//   process.env.JWT_SECRET || 'your-default-super-secret-key-for-development'
// );

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // ★ 1. リクエストのクッキーからセッショントークンを取得
    // const token = req.cookies.sessionToken;

    // if (!token) {
    //   return res.status(401).json({ message: 'Not authenticated' });
    // }

    // // ★ 2. トークンを検証し、ユーザーIDを取得
    // const { payload } = await jwtVerify(token, JWT_SECRET);
    // const userId = Number(payload.sub);
    const userId = 1;

    // if (!userId) {
    //   return res.status(401).json({ message: 'Invalid token' });
    // }

    const { title, chapters, references, todoText, imagePlanList } = req.body;

    const thesis = await prisma.thesis.create({
      data: {
        title: title || '',
        todoText: todoText || '',
        // ★ 3. 取得したユーザーIDをauthorIdとして保存
        authorId: userId,
        chapters: {
          create: chapters.map((ch: any) => ({
            title: ch.title || '',
            description: ch.description || '',
            sections: {
              create: ch.sections.map((s: any) => ({
                title: s.title || '',
                description: s.description || '',
              })),
            },
          })),
        },
        references: {
          create: references.map((ref: any) => ({
            url: ref.url || '',
            title: ref.title || '',
          })),
        },
        imagePlanList: {
          create: imagePlanList.map((plan: any) => ({
            done: plan.done,
            location: plan.location,
            description: plan.description,
          })),
        },
      },
      include: {
        chapters: { include: { sections: true } },
        references: true,
        imagePlanList: true,
      },
    });

    res.status(200).json({ message: 'Success', thesis });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving thesis' });
  } finally {
    await prisma.$disconnect();
  }
}