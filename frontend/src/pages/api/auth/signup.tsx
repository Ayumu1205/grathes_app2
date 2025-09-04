import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  console.log('[/api/auth/signup] - 処理開始');

  try {
    const { email, password } = req.body;

    // --- 1. 入力値のバリデーション ---
    if (!email || !password) {
      return res.status(400).json({ message: 'メールアドレスとパスワードは必須です。' });
    }
    console.log('[1/5] - 入力値のバリデーション成功');


    // --- 2. ユーザーが既に存在するか確認 ---
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'このメールアドレスは既に使用されています。' });
    }
    console.log('[2/5] - ユーザーの重複チェック成功');


    // --- 3. パスワードをハッシュ化 ---
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('[3/5] - パスワードのハッシュ化成功');


    // --- 4. 有効化トークンの生成と保存 ---
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24時間有効

    await prisma.verificationToken.deleteMany({ where: { email } });
    await prisma.verificationToken.create({
      data: {
        email,
        token,
        expires,
        password: hashedPassword,
      },
    });
    console.log('[4/5] - 有効化トークンの生成とDB保存成功');


    // --- 5. メール送信処理 ---
    const transporter = nodemailer.createTransport({
      // SMTPサーバーの設定（例: Gmail）
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER, // .env に設定
        pass: process.env.EMAIL_SERVER_PASSWORD, // .env に設定
      },
    });
   

    const verificationUrl = `${process.env.NEXT_PUBLIC_FRONT}/api/auth/verify?token=${token}`;

    await transporter.sendMail({
      from: "GraNote noreply@example.com",
      to: email,
      subject: 'アカウントを有効化してください',
      html: `
        <h1>アカウントの有効化</h1>
        <p>GraNoteへのご登録ありがとうございます。</p>
        <p>このリンクをクリックして、アカウントの有効化を完了してください。このリンクの有効期限は24時間です。</p>
        <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">アカウントを有効化する</a>
        <p>もしこのメールに心当たりがない場合は、お手数ですがこのメールを破棄してください。</p>
      `,
    });
    console.log(`[5/5] - 確認メールの送信成功 (宛先: ${email})`);


    res.status(200).json({ message: '確認メールを送信しました。メールボックスをご確認ください。' });

  } catch (err) {
    // catchブロックでエラー全体をログに出力
    console.error('[/api/auth/signup] - エラー発生:', err);
    res.status(500).json({ message: 'サーバーエラーが発生しました。' });
  } finally {
    await prisma.$disconnect();
    console.log('[/api/auth/signup] - 処理終了');
  }
}