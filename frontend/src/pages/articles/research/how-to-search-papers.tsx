import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// 右矢印アイコンのコンポーネント
const ArrowRightIcon = () => (
  <svg className="inline-block w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
);

const HowToSearchPapersPage = () => {
  return (
    <>
      {/* ページメタデータの設定 */}
      <div className="mt-12">
        <title>先行研究はどこで探す？おすすめ論文検索サイトと効率的な探し方 | 論文執筆支援アプリ</title>
        <meta name="description" content="研究の第一歩は先行研究の調査から。この記事では、研究者や学生が必ず押さえておくべき主要な論文検索サイトと、効率的に論文を探すためのテクニックをご紹介します。" />
      </div>

      <main className="bg-white">
        {/* 記事ヘッダー */}
        <header className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">情報収集編</p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                先行研究はどこで探す？おすすめ論文検索サイトと効率的な探し方
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500">
                研究の成功は、質の高い先行研究をどれだけ見つけられるかにかかっています。情報の海から宝物を見つけ出す技術を学びましょう。
              </p>
            </div>
          </div>
        </header>

        {/* カバー画像 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/articles/research/search.jpg" // 画像パスは適宜調整してください
              alt="データベースで論文を検索している様子"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* 記事本文 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
            <p className="text-lg leading-relaxed text-gray-800">質の高い研究は、質の高い問いから生まれます。そして、その問いは先行研究という巨人の肩の上に立つことで初めて見えてきます。この記事では、研究の基盤となる論文を効率的に見つけ出すための**「①定番の検索サイト」**と**「②検索精度を上げるテクニック」**を分かりやすく解説します。</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">① まずはここから！定番の論文検索サイト</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">分野を問わず、全ての研究者がまず最初に訪れるべき、強力なデータベースを紹介します。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">Google Scholar (グーグル・スカラー)</h3>
          <p className="text-lg text-gray-700 leading-relaxed">あらゆる分野を網羅する、最も身近で強力なツールです。キーワード検索だけでなく、「被引用数」で論文の重要度を測ったり、「引用」リンクから関連研究を芋づる式に探せるのが最大の魅力です。研究の出発点として最適です。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">CiNii Articles (サイニィ)</h3>
          <p className="text-lg text-gray-700 leading-relaxed">日本の論文、特に人文・社会科学系の論文を探すなら必須のデータベースです。国立情報学研究所(NII)が運営しており、国内の学会誌や大学紀要が豊富に揃っています。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">PubMed (パブメド)</h3>
          <p className="text-lg text-gray-700 leading-relaxed">医学・薬学・看護学・生命科学分野の研究者であれば、知らない人はいない世界最大のデータベースです。専門用語での検索（MeSHターム）にも対応しており、非常に高精度な検索が可能です。</p>

          <div className="my-8 p-5 bg-yellow-50 border border-yellow-300 rounded-lg flex items-start">
            <span className="text-xl mr-4">💡</span>
            <div>
              <h4 className="font-bold text-yellow-800">大学の契約データベースも活用しよう</h4>
              <p className="text-yellow-700 mt-1">
                所属する大学の図書館は、多くの場合 Scopus や Web of Science といった、より高機能な有料データベースと契約しています。これらはGoogle Scholarよりも網羅性や分析機能に優れていることが多いので、ぜひ一度、大学図書館のウェブサイトを確認してみましょう。
              </p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">② 検索精度を上げるテクニック</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">ただ単語を打ち込むだけでは、ノイズに埋もれてしまいます。プロの研究者が使うテクニックを身につけましょう。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">論理演算子を使いこなす</h3>
          <p className="text-lg text-gray-700 leading-relaxed">キーワードを `AND`, `OR`, `NOT` で組み合わせることで、検索結果を劇的に絞り込むことができます。</p>

          <blockquote className="my-6 p-4 bg-gray-100 rounded-lg border-l-4 border-gray-300">
            <p className="text-lg font-semibold text-gray-800">検索例：</p>
            <p className="mt-2 text-lg font-mono text-gray-700">("machine learning" OR "AI") AND ("medical imaging" NOT MRI)</p>
            <p className="mt-2 text-gray-600">意味: 「機械学習」または「AI」を含み、かつ「医療画像」を含むが、「MRI」は含まない論文を検索。</p>
          </blockquote>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">引用を辿る「芋づる式検索」</h3>
          <p className="text-lg text-gray-700 leading-relaxed">自分のテーマにぴったりの重要論文（レビュー論文などが最適）を1本見つけたら、その論文を起点にネットワークを広げる、最も強力なテクニックです。</p>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 leading-relaxed mt-4">
            <li><strong className="font-semibold text-gray-900">参考文献リストを見る:</strong> その論文が引用している、過去の基礎的・重要な研究が見つかります。</li>
            <li><strong className="font-semibold text-gray-900">被引用情報を調べる:</strong> その論文を引用している、より新しい研究が見つかります。これにより、研究の最新動向や発展を追跡できます。</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">まとめ</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">効率的な論文検索は、①適切な検索サイトを選び、②検索テクニックを駆使することにかかっています。まずはGoogle Scholarで広く検索し、核となる論文を見つけたら引用を辿る「芋づる式検索」に移行するのが王道です。この手順で、あなたの研究に不可欠な宝物のような論文を見つけ出してください。</p>

          {/* 関連リンク */}
          <div className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-800">次のステップ：論文を読もう</h2>
            <p className="mt-4 text-center text-gray-600">必要な論文が集まってきたら、次はそれらを効率的に読み進める技術が必要です。</p>
            <div className="mt-8 grid md:grid-cols-2 gap-6">

              <Link href="/articles/research/how-to-read-papers" legacyBehavior>
                <a className="group block p-6 bg-gray-50 rounded-lg border transition-colors hover:bg-white hover:border-gray-300 hover:shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">大量の論文を効率的に読む！文献レビューの進め方とノート術</h3>
                  <p className="mt-2 text-gray-600">全ての論文を精読するのは非効率。読むべき論文を素早く見極める3段階リーディング法を紹介します。</p>
                  <p className="mt-4 text-sm font-semibold text-blue-600 flex items-center">
                    続きを読む <ArrowRightIcon />
                  </p>
                </a>
              </Link>

              <Link href="/articles/research/reference-management-with-excel" legacyBehavior>
                <a className="group block p-6 bg-gray-50 rounded-lg border transition-colors hover:bg-white hover:border-gray-300 hover:shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">集めた資料が迷子にならない！参考文献の神Excel管理術</h3>
                  <p className="mt-2 text-gray-600">専用ソフトは不要。Excelを使ったシンプルで強力な文献管理データベースの作り方を解説します。</p>
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

export default HowToSearchPapersPage;