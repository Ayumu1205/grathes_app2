import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// 右矢印アイコンのコンポーネント
const ArrowRightIcon = () => (
  <svg className="inline-block w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
);

const CitationRulesAndCopyrightsPage = () => {
  return (
    <>
      {/* ページメタデータの設定 */}
      <div className="mt-12">
        <title>これだけは押さえたい！引用の基本ルールと著作権の注意点 | 論文執筆支援アプリ</title>
        <meta name="description" content="無断転載や盗用を避け、知の巨人の肩に正しく立つために。学術論文における引用の4つの必須条件と、見落としがちな著作権の注意点を分かりやすく解説します。" />
      </div>

      <main className="bg-white">
        {/* 記事ヘッダー */}
        <header className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">writing</p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                これだけは押さえたい！引用の基本ルールと著作権の注意点
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500">
                引用は、先人への敬意を示す行為であり、あなたの議論を強化する武器です。盗用（剽窃）を避け、正しく引用するための必須知識を学びましょう。
              </p>
            </div>
          </div>
        </header>

        {/* カバー画像 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/articles/writing/copyright.jpg" // 画像パスは適宜調整してください
              alt="法律の天秤と本"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* 記事本文 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
            <p className="text-lg leading-relaxed text-gray-800">論文執筆において、先行研究を参考にすることは不可欠です。しかし、その方法を間違えれば「盗用（剽窃）」という、研究者として最も重い不正行為と見なされかねません。この記事では、著作権法で認められた**公正な引用の4つの必須条件**と、意外と見落としがちな**図表の著作権**について解説します。</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">公正な「引用」と認められる4つの条件</h2>
          <p className="text-lg mb-8 text-gray-700 leading-relaxed">文化庁が示す、著作権法で認められる「引用」には、以下の4つの条件をすべて満たす必要があります。</p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">1. 公表された著作物であること</h3>
              <p className="text-lg text-gray-700 leading-relaxed">引用する対象は、すでに公表されている論文や書籍、ウェブサイトなどでなければなりません。未公表の原稿や、個人的なメールの内容などを無断で引用することはできません。</p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">2. 引用部分が明確であること（明瞭区別性）</h3>
              <p className="text-lg text-gray-700 leading-relaxed">どこからどこまでが自分の文章で、どこからが他人の文章（引用部分）なのかが、誰の目にも明確にわかるように区別する必要があります。一般的には、引用部分を「」（かぎ括弧）で囲んだり、長い引用の場合はブロッククオート（段落ごと字下げする）を使います。</p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">3. 主従関係が明確であること（従たる引用）</h3>
              <p className="text-lg text-gray-700 leading-relaxed">これが最も重要なルールです。あなたの論文の本文が「主」であり、引用部分はあくまであなたの主張を補強するための「従」でなければなりません。引用部分が文章の大半を占めるような場合は、引用とは認められません。</p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">4. 出典が明記されていること</h3>
              <p className="text-lg text-gray-700 leading-relaxed">引用した部分の末尾や、論文の最後に、著者名、タイトル、発行年、掲載誌、ページ番号など、読者が元の情報源をたどれるように、出典を正確に記載する必要があります。</p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">著作権に関する注意点：図・表の引用</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">文章の引用ルールは理解していても、図や表の扱いは見落としがちです。ここには大きな落とし穴があります。</p>

          <div className="my-8 p-5 bg-red-50 border border-red-300 rounded-lg flex items-start">
            <span className="text-xl mr-4">⚠️</span>
            <div>
              <h4 className="font-bold text-red-800">図・表の転載には原則として許諾が必要</h4>
              <p className="text-red-700 mt-1">
                他人の論文や書籍にある図、グラフ、表、写真などをそのままコピーして自分の論文に掲載する行為は、**「引用」ではなく「転載」**にあたります。転載を行うには、原則として、その著作物の権利を持つ人（多くの場合は著者ではなく出版社）から**許諾を得る必要があります。** 許諾なしに転載すると、著作権侵害になる可能性が非常に高いです。
              </p>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">どうすれば良いか？</h3>
          <p className="text-lg text-gray-700 leading-relaxed">最も安全で推奨される方法は、**他人の図表を参考に、自分で図表を描き直す**ことです。元にしたデータや論文の出典を明記すれば、オリジナルの図として掲載することができます。これにより、面倒な許諾プロセスを回避し、著作権侵害のリスクをなくすことができます。</p>

          {/* 関連リンク */}
          <div className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-800">次のステップ</h2>
            <p className="mt-4 text-center text-gray-600">引用のルールを理解したら、次は論文全体の骨格を組み立てていきましょう。</p>
            <div className="mt-8 grid md:grid-cols-2 gap-6">


              <Link href="/articles/writing/academic-writing-basics" legacyBehavior>
                <a className="group block p-6 bg-gray-50 rounded-lg border transition-colors hover:bg-white hover:border-gray-300 hover:shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">理系・文系別「伝わる」論文の文章術｜アカデミックライティング入門</h3>
                  <p className="mt-2 text-gray-600">客観性、論理性、明瞭性。全ての論文に共通する文章の基本原則を解説します。</p>
                  <p className="mt-4 text-sm font-semibold text-blue-600 flex items-center">
                    続きを読む <ArrowRightIcon />
                  </p>
                </a>
              </Link>
         
              <Link href="/articles/writing/where-to-start-writing" legacyBehavior>
                <a className="group block p-6 bg-gray-50 rounded-lg border transition-colors hover:bg-white hover:border-gray-300 hover:shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">「何から書く？」を解決。論文執筆で最初に着手すべき章とは </h3>
                  <p className="mt-2 text-gray-600">論文は本のようには書かない。多くの熟練研究者が実践する、挫折しないための戦略的な執筆順序を学び、最初の一歩を軽やかに踏み出しましょう。</p>
                  <p className="mt-4 text-sm font-semibold text-blue-600 flex items-center">
                    続きを読む <ArrowRightIcon />
                  </p>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CitationRulesAndCopyrightsPage;