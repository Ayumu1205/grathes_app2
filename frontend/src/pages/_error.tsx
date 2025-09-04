import type { NextPage, NextPageContext } from 'next';
import Link from 'next/link';
import React from 'react';

// --- アイコンコンポーネント ---
const AlertTriangleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

// ★ ページが受け取るpropsの型を定義
interface ErrorPageProps {
  statusCode?: number;
}

// ★ コンポーネントの型をNextPageとし、propsの型を適用
const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center p-4">
      <div className="w-full max-w-md">
        <AlertTriangleIcon />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-6">
          {statusCode
            ? `エラーが発生しました (${statusCode})`
            : 'アプリケーションエラー'}
        </h1>
        <p className="text-gray-500 mt-4 mb-8">
          申し訳ございません。予期せぬエラーが発生しました。
          問題が解決しない場合は、管理者にお問い合わせください。
        </p>
        {/* ★ Next.js 13以降ではLinkにaタグは不要です */}
        <Link href="/" className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-colors">
          <HomeIcon />
          ホームに戻る
        </Link>
      </div>
    </div>
  );
};

// ★ getInitialPropsの引数にNextPageContextの型を適用
ErrorPage.getInitialProps = ({ res, err }: NextPageContext): ErrorPageProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;