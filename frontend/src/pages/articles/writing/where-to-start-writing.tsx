import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// 右矢印アイコンのコンポーネント
const ArrowRightIcon = () => (
  <svg className="inline-block w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
);

const WhereToStartWritingPage = () => {
  return (
    <>
      {/* ページメタデータの設定 */}
      <div className="mt-12">
        <title>「何から書く？」を解決。論文執筆で最初に着手すべき章とは | 論文執筆支援アプリ</title>
        <meta name="description" content="真っ白なページを前に固まっていませんか？論文執筆は「緒言」から書く必要はありません。筆が乗りやすく、手戻りの少ない、最も効率的な執筆順序を解説します。" />
      </div>

      <main className="bg-white">
        {/* 記事ヘッダー */}
        <header className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">writing</p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                「何から書く？」を解決。論文執筆で最初に着手すべき章とは
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500">
                論文は本のようには書かない。多くの熟練研究者が実践する、挫折しないための戦略的な執筆順序を学び、最初の一歩を軽やかに踏み出しましょう。
              </p>
            </div>
          </div>
        </header>

        {/* カバー画像 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/articles/research/search.jpg" // 画像パスは適宜調整してください
              alt="付箋を整理しながら論文の構成を考えている様子"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* 記事本文 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
            <p className="text-lg leading-relaxed text-gray-800">卒業論文の執筆を前にして、多くの学生が「緒言（はじめに）」から書き始めようとします。しかし、これは多くの場合、挫折への近道です。結論から言うと、論文執筆で**最初に着手すべきなのは、最も事実に基づいていて書きやすい「方法」と「結果」の章**です。</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">なぜ「緒言」から書いてはいけないのか？</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">緒言の役割は、研究の背景を述べ、問いを提示し、論文全体のロードマップを読者に示すことです。しかし、まだ論文全体が完成していない段階で、完璧なロードマップを描くことは不可能です。最初に書いた緒言は、執筆を進めるうちに何度も大幅な手直しが必要になり、結果的に非効率となります。</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">推奨する執筆順序</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">思考の整理がしやすく、手戻りが少ない効率的な執筆順序は以下の通りです。</p>

          <div className="space-y-8 mt-8">
            <div className="p-6 bg-gray-50 rounded-lg border">
              <h3 className="text-xl font-bold text-gray-800 mb-2">ステップ1：図・表を作成する</h3>
              <p className="text-lg text-gray-700">文章を書く前に、まず研究の核となるデータや結果をまとめた図や表を全て作成します。これらが論文の「骨格」となり、後の執筆の道しるべになります。</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg border">
              <h3 className="text-xl font-bold text-gray-800 mb-2">ステップ2：「方法」と「結果」を書く</h3>
              <p className="text-lg text-gray-700">作成した図・表を説明する形で、**「方法（何をやったか）」**と**「結果（何が分かったか）」**の章を執筆します。これらは「自分が行ったこと」と「得られた事実」を記述する部分なので、解釈や議論を必要とせず、比較的客観的に書き進めることができます。</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg border">
              <h3 className="text-xl font-bold text-gray-800 mb-2">ステップ3：「考察」を書く</h3>
              <p className="text-lg text-gray-700">書き上げた「結果」が何を意味するのか、先行研究とどう関係するのか、研究の限界は何か、といった**解釈や議論**を「考察」の章で展開します。論文のオリジナリティが最も表れる部分です。</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg border">
              <h3 className="text-xl font-bold text-gray-800 mb-2">ステップ4：「緒言」と「結論」を書く</h3>
              <p className="text-lg text-gray-700">論文の本体が完成した今、ようやく全体の導入である「緒言」と、締めくくりの「結論」を書く準備が整いました。完成した内容に基づいて、読者をスムーズに導く序論と、研究の要点をまとめた力強い結論を書き上げます。</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg border">
              <h3 className="text-xl font-bold text-gray-800 mb-2">ステップ5：「要旨」と「タイトル」を仕上げる</h3>
              <p className="text-lg text-gray-700">論文の全ての内容を凝縮した「要旨（アブストラクト）」と、最も読者の興味を引く「タイトル」を最後に推敲して完成です。</p>
            </div>
          </div>

          <div className="my-8 p-5 bg-yellow-50 border border-yellow-300 rounded-lg flex items-start">
            <span className="text-xl mr-4">💡</span>
            <div>
              <h4 className="font-bold text-yellow-800">まずは「書けるところから書く」</h4>
              <p className="text-yellow-700 mt-1">
                この順序はあくまで理想です。最も重要なのは、真っ白なページの前で悩み続けないこと。「方法」の章の中でも、一番書きやすい実験手順から手をつけるなど、とにかく**自分が最も具体的に書ける部分から**筆を進めるのが、執筆を軌道に乗せるコツです。
              </p>
            </div>
          </div>

          {/* 関連リンク */}
          <div className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-800">次のステップ：伝わる文章を書こう</h2>
            <p className="mt-4 text-center text-gray-600">執筆の順番が決まったら、次はいよいよ文章そのものを磨き上げていきます。</p>
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

              <Link href="/articles/writing/citation-rules-and-copyrights" legacyBehavior>
                <a className="group block p-6 bg-gray-50 rounded-lg border transition-colors hover:bg-white hover:border-gray-300 hover:shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">これだけは押さえたい！引用の基本ルールと著作権の注意点</h3>
                  <p className="mt-2 text-gray-600">あなたの研究成果を、正確かつ説得力をもって読者に届けるための文章技術。</p>
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

export default WhereToStartWritingPage;