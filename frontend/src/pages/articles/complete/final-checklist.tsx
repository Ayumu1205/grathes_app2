import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// 右矢印アイコンのコンポーネント
const ArrowRightIcon = () => (
  <svg className="inline-block w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
);

const FinalChecklistPage = () => {
  return (
    <>
      {/* ページメタデータの設定 */}
      <div className="mt-12">
        <title>提出前に必ず確認！卒業論文の最終チェックリスト10項目 | 論文執筆支援アプリ</title>
        <meta name="description" content="長かった論文執筆もいよいよ大詰め。最後にうっかりミスで評価を下げないために、提出ボタンを押す前に必ず確認すべき10個のチェック項目をリストアップしました。" />
      </div>

      <main className="bg-white">
        {/* 記事ヘッダー */}
        <header className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">complete</p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                提出前に必ず確認！卒業論文の最終チェックリスト10項目
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500">
                最後の見直しが、あなたの研究成果の評価を大きく左右します。このチェックリストを使って、完璧な状態で論文を提出しましょう。
              </p>
            </div>
          </div>
        </header>

        {/* カバー画像 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/articles/complete/checklist.jpg" // 画像パスは適宜調整してください
              alt="チェックリストにペンでチェックを入れている様子"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* 記事本文 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
            <p className="text-lg leading-relaxed text-gray-800">何ヶ月もかけて書き上げた卒業論文。完成した達成感で、すぐ提出したくなる気持ちは分かりますが、一呼吸おいてください。小さなミスが論文全体の信頼性を損なうこともあります。ここでは、提出ボタンを押す前に必ず確認すべき10の項目を「体裁」「内容」「引用」の3つのカテゴリーに分けて紹介します。</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">カテゴリー1：体裁と形式</h2>
          <p className="text-lg mb-8 text-gray-700 leading-relaxed">内容は完璧でも、見た目のミスは評価者の心証を大きく左右します。</p>

          <ol className="list-decimal pl-6 space-y-6 text-lg text-gray-700">
            <li>
              <strong className="font-semibold text-gray-900">誤字・脱字はないか？</strong><br />
              WordやGoogle Docsの校正ツールは必須です。加えて、一度印刷して紙で読む、時間を置いてから読み返す、声に出して音読するなど、方法を変えて複数回チェックしましょう。友人との相互チェックも非常に有効です。
            </li>
            <li>
              <strong className="font-semibold text-gray-900">表記は統一されているか？</strong><br />
              「コンピュータ」と「コンピューター」、「Figure」と「Fig.」など、同じ意味を持つ単語の表記が揺れていませんか？全角・半角の使い分け、括弧の種類なども含め、論文全体で一貫性を保ちましょう。
            </li>
            <li>
              <strong className="font-semibold text-gray-900">提出フォーマットを遵守しているか？</strong><br />
              大学や学部が指定する書式（余白、フォントサイズ、ページ番号の位置、表紙の書き方など）を完璧に満たしているか、募集要項と一字一句照らし合わせて確認してください。
            </li>
          </ol>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">カテゴリー2：内容と論理</h2>
          <p className="text-lg mb-8 text-gray-700 leading-relaxed">論文の心臓部である、主張の一貫性を確認します。</p>

          <ol className="list-decimal pl-6 space-y-6 text-lg text-gray-700" >
            <li>
              <strong className="font-semibold text-gray-900">タイトルと要旨は内容を反映しているか？</strong><br />
              執筆中に内容が変化することはよくあります。論文全体の要約である「要旨（アブストラクト）」と、論文の顔である「タイトル」が、完成した本文の内容と完全に一致しているか、最後に必ず見直しましょう。
            </li>
            <li>
              <strong className="font-semibold text-gray-900">「序論」の問いに「結論」が答えているか？</strong><br />
              序論で提示した研究目的やリサーチクエスチョンと、結論で述べていることが明確に対応しているか確認します。話が逸れたまま終わっていないか、一貫性をチェックしてください。
            </li>
            <li>
              <strong className="font-semibold text-gray-900">論理の飛躍や矛盾はないか？</strong><br />
              自分の主張（考察）と、それを裏付ける根拠（結果や引用）が正しく結びついていますか？初めてこの論文を読む他人の視点に立って、説明不足な点や、強引な結論付けがないかを客観的に読み返しましょう。
            </li>
          </ol>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">カテゴリー3：引用と参考文献</h2>
          <p className="text-lg mb-8 text-gray-700 leading-relaxed">学術的な信頼性の根幹をなす部分です。</p>

          <ol className="list-decimal pl-6 space-y-6 text-lg text-gray-700">
            <li>
              <strong className="font-semibold text-gray-900">本文中の引用表記は正しいか？</strong><br />
              分野指定の引用スタイル（APA, MLAなど）に従って、著者名や発行年が正しく記述されているか、句読点の位置まで含めて細かく確認します。
            </li>
            <li>
              <strong className="font-semibold text-gray-900">参考文献リストは完璧か？</strong><br />
              本文中で引用した文献が全てリストにあり、逆にリストにある文献が全て本文中で引用されているか、相互にチェックします。リストの順序（アルファベット順など）もルール通りか確認しましょう。
            </li>
            <li>
              <strong className="font-semibold text-gray-900">図・表の出典は明記されているか？</strong><br />
              他者の論文から借用・改変した図や表には、必ずキャプションに出典を明記します。著作権に関わる重要な項目です。
            </li>
          </ol>

          <div className="my-8 p-5 bg-green-50 border border-green-300 rounded-lg flex items-start">
            <span className="text-2xl mr-4">🎉</span>
            <div>
              <h4 className="font-bold text-green-800">最後の項目：PDF化後の最終確認</h4>
              <p className="text-green-700 mt-1">
                <strong className="font-semibold">10. WordやGoogle Docsのまま提出することは稀です。最終的にPDFに変換した後、もう一度だけ全体を見直してください。</strong> 変換時にレイアウトが崩れたり、図が消えたり、文字化けしたりすることが稀にあります。提出するファイルそのものを最後に見返すことが、完璧な提出への最後のステップです。
              </p>
            </div>
          </div>

        </div>
      </main>
    </>
  );
};

export default FinalChecklistPage;