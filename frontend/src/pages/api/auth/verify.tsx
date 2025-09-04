import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
      return res.status(400).send('無効なトークンです。');
    }

    // 1. トークンをデータベースで検索
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    // 2. トークンが存在しないか、有効期限が切れているか確認
    if (!verificationToken || verificationToken.expires < new Date()) {
      return res.status(400).send('トークンが無効か、有効期限が切れています。');
    }

    // 3. ユーザーが既に存在するか確認
    const existingUser = await prisma.user.findUnique({
      where: { email: verificationToken.email },
    });

    if (existingUser) {
      return res.status(409).send('このメールアドレスは既に使用されています。');
    }

    // 4. トランザクションでユーザー作成とトークン削除を同時に行う
    await prisma.$transaction(async (tx) => {
      await tx.user.create({
        data: {
          email: verificationToken.email,
          password: verificationToken.password,
          emailVerified: new Date(),
        },
      });

      await tx.verificationToken.delete({
        where: { id: verificationToken.id },
      });
    });

    // 5. 成功したらログインページにリダイレクト
    res.redirect('/auth/verify?verified=true');

  } catch (err) {
    console.error(err);
    res.status(500).send('アカウントの有効化中にエラーが発生しました。');
  } finally {
    await prisma.$disconnect();
  }
}