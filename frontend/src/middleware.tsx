import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ★ JWTの秘密鍵。必ず.envファイルで管理してください。
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-default-super-secret-key-for-development'
);

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // 1. リクエストからセッションクッキーを取得
  const token = request.cookies.get('sessionToken')?.value;

  // 2. トークンが存在しない場合はログインページにリダイレクト
  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // 3. トークンを検証
  try {
    await jwtVerify(token, JWT_SECRET);
    // トークンが有効な場合は、そのまま目的のページへ進ませる
    return NextResponse.next();
  } catch (error) {
    // トークンが無効（改ざんされている、有効期限切れなど）な場合
    console.error('JWT verification failed:', error);
    // 既存の無効なクッキーを削除してからリダイレクト
    const response = NextResponse.redirect(new URL('/signin', request.url));
    response.cookies.delete('sessionToken');
    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  // ★★★ このミドルウェアを適用したいページ（保護したいページ）を指定 ★★★
  matcher: [
    '/thesis/:path*', // ダッシュボード関連ページ
    // '/mypage/:path*',  // 将来的にマイページなどを作る場合
  ],
};
