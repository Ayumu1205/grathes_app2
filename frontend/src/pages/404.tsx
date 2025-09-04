import Link from 'next/link';
import React from 'react';

// --- アイコンコンポーネント ---
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

export default function Custom404Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-9xl font-black text-gray-200">404</h1>
        <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">ページが見つかりません</p>
        <p className="text-gray-500 mt-4 mb-8">
          お探しのページは移動または削除されたか、URLが間違っている可能性があります。
        </p>
        {/* ★ 修正点: Next.jsのLinkコンポーネントを標準のaタグに変更 */}
        <Link href="/" className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-colors">
          <HomeIcon />
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}
