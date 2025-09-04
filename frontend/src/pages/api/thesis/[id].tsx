import { PrismaClient } from '@prisma/client'
import { jwtVerify } from 'jose';
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-default-super-secret-key-for-development'
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const thesisId = Number(id);

  if (isNaN(thesisId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  // --- GETメソッド: 特定の論文データを取得 ---
  if (req.method === 'GET') {
    try {
      const thesis = await prisma.thesis.findUnique({
        where: { id: thesisId },
        include: {
          chapters: {
            include: {
              sections: true,
            },
          },
          references: true,
          imagePlanList: true,
        },
      });

      if (!thesis) {
        return res.status(404).json({ error: 'Not found' });
      }
      return res.status(200).json(thesis);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching thesis' });
    }
  }

  // --- PUTメソッド: 論文データを更新 ---
  if (req.method === 'PUT') {
    try {
      // 1. ユーザー認証
      const token = req.cookies.sessionToken;
      if (!token) return res.status(401).json({ message: 'Not authenticated' });

      const { payload } = await jwtVerify(token, JWT_SECRET);
      const userId = Number(payload.sub);
      if (!userId) return res.status(401).json({ message: 'Invalid token' });

      // 2. リクエストボディから全てのデータを取得
      const {
        title, chapters, references, todoText, imagePlanList,
        wordCount, targetWordCount, deadline, wordCountWeight
      } = req.body;

      // 3. 既存の関連データを一旦すべて削除 (トランザクション内で実行)
      await prisma.$transaction([
        prisma.section.deleteMany({ where: { chapter: { thesisId: thesisId } } }),
        prisma.chapter.deleteMany({ where: { thesisId: thesisId } }),
        prisma.reference.deleteMany({ where: { thesisId: thesisId } }),
        prisma.imagePlan.deleteMany({ where: { thesisId: thesisId } }),
      ]);

      // 4. 新しいデータで論文を丸ごと更新
      const updatedThesis = await prisma.thesis.update({
        where: { id: thesisId },
        data: {
          title,
          todoText,
          wordCount,
          targetWordCount,
          deadline: deadline ? new Date(deadline) : null,
          wordCountWeight,
          chapters: {
            create: chapters.map((chapter: any) => ({
              title: chapter.title,
              description: chapter.description,
              sections: {
                create: chapter.sections.map((s: any) => ({
                  title: s.title,
                  description: s.description,
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
      });

      return res.status(200).json(updatedThesis);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Update failed' });
    }
  }

  // --- DELETEメソッド: 論文を削除 ---
  if (req.method === 'DELETE') {
    try {
      const deletedThesis = await prisma.thesis.delete({
        where: { id: thesisId },
      });
      return res.status(200).json({ message: '削除成功', deletedThesis });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: '削除失敗' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}