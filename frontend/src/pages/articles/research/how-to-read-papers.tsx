import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// 右矢印アイコンのコンポーネント
const ArrowRightIcon = () => (
  <svg className="inline-block w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
);

const HowToReadPapersPage = () => {
  return (
    <>
      {/* ページメタデータの設定 */}
      <div className="mt-12">
        <title>大量の論文を効率的に読む！文献レビューの進め方とノート術 | 論文執筆支援アプリ</title>
        <meta name="description" content="集めた論文の山を前に圧倒されていませんか？全ての論文を精読するのは非効率。研究の質とスピードを劇的に向上させる、戦略的な論文の読み方と記録術を解説します。" />
      </div>

      <main className="bg-white">
        {/* 記事ヘッダー */}
        <header className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">research</p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                大量の論文を効率的に読む！文献レビューの進め方とノート術
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500">
                研究の質は、どれだけ深く先行研究を理解しているかで決まる。論文の山を知識の体系に変える、実践的なテクニックを学びましょう。
              </p>
            </div>
          </div>
        </header>

        {/* カバー画像 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/articles/research/coffee.png" // 画像パスは適宜調整してください
              alt="コーヒーを飲みながら論文を読んでいる様子"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* 記事本文 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
            <p className="text-lg leading-relaxed text-gray-800">何十本、何百本と集めた先行研究。これを全て最初から最後まで読むのは不可能です。重要なのは、読むべき論文を素早く見極め、読んだ内容を「使える知識」として記録すること。この記事では、**「①論文をふるいにかける3段階リーディング法」**と**「②知識を構造化するノート術」**を紹介します。</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">① 読むべき論文を見極める「3段階リーディング法」</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">全ての論文を平等に扱うのはやめましょう。重要度に応じて読み方を変えるのが、効率化の第一歩です。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">ステップ1：サーベイ読み（5分）- 読む価値があるか判断する</h3>
          <p className="text-lg text-gray-700 leading-relaxed">まずは論文の**アブストラクト（要旨）と結論**だけを読みます。ここで以下の点を確認し、自分の研究テーマと本当に関連があるか、読む価値があるかを判断します。</p>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 leading-relaxed mt-4">
            <li>この論文は、自分の研究分野と直接関係があるか？</li>
            <li>結論は、自分の研究の問いにとって重要か？</li>
            <li>もし関係ないと感じたら、迷わずリストから外すか、優先度を下げましょう。</li>
          </ul>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">ステップ2：概要読み（15分）- 全体像を掴む</h3>
          <p className="text-lg text-gray-700 leading-relaxed">ステップ1を通過した論文は、次に**緒言（Introduction）**を読み、**図・グラフ・表（Figures, Tables）**にざっと目を通します。</p>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 leading-relaxed mt-4">
            <li><strong className="font-semibold text-gray-900">緒言:</strong> 研究の背景、問題意識、目的を理解します。</li>
            <li><strong className="font-semibold text-gray-900">図・グラフ・表:</strong> 論文の「おいしいところ」、つまり最も重要な結果が視覚的にまとめられています。ここを見るだけで、論文の主張の核心が掴めます。</li>
          </ul>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">ステップ3：精読（1〜2時間）- 深く理解し、批判的に検討する</h3>
          <p className="text-lg text-gray-700 leading-relaxed">ステップ2でも「これは重要だ」と感じた、ごく一握りの論文だけを精読します。手法の詳細、結果の解釈、考察（Discussion）などをじっくりと読み込み、著者の主張を完全に理解し、同時に「この分析は本当に正しいか？」「別の解釈はできないか？」と批判的な視点で検討します。</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">② 知識を構造化するノート術</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">「読んだけど忘れた」では意味がありません。読んだ内容を後から使える「知識」として整理・保存するためのノートの取り方を紹介します。</p>

          <blockquote className="my-6 p-4 bg-gray-100 rounded-lg border-l-4 border-gray-300">
            <p className="text-lg font-semibold text-gray-800">論文1本につき、1つのノートを作成し、以下の項目を埋めていきます。</p>
            <div className="mt-2 text-lg text-gray-700 space-y-1">
              <p><strong className="font-semibold text-gray-900">1. 書誌情報:</strong> 著者, 年, タイトル, 掲載誌</p>
              <p><strong className="font-semibold text-gray-900">2. 研究の問い/目的:</strong> この論文は何を解決しようとしているのか？</p>
              <p><strong className="font-semibold text-gray-900">3. アプローチ/手法:</strong> どのようにしてその問いに答えたのか？</p>
              <p><strong className="font-semibold text-gray-900">4. 主要な結果/結論:</strong> 何が明らかになったのか？</p>
              <p><strong className="font-semibold text-gray-900">5. 貢献/限界:</strong> この研究の新規性は？限界点は？</p>
              <p><strong className="font-semibold text-gray-900">6. 自分の研究との関連:</strong> 自分の研究にどう活かせるか？引用すべきポイントは？</p>
            </div>
          </blockquote>
          <p className="text-lg text-gray-700 leading-relaxed">このテンプレートを使うことで、ただの「読書メモ」が、論文執筆時に絶大な力を発揮する「引用データベース」に変わります。</p>


          {/* 関連リンク */}
          <div className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-800">次のステップ：集めた論文を整理しよう</h2>
            <p className="mt-4 text-center text-gray-600">読んだ論文が増えてきたら、それらを効率的に管理する仕組みが必要です。</p>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <Link href="/articles/research/reference-management-with-excel" legacyBehavior>
                <a className="group block p-6 bg-gray-50 rounded-lg border transition-colors hover:bg-white hover:border-gray-300 hover:shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">集めた資料が迷子にならない！参考文献の神Excel管理術</h3>
                  <p className="mt-2 text-gray-600">専用ソフトは不要。Excelを使ったシンプルで強力な文献管理データベースの作り方を解説します。</p>
                  <p className="mt-4 text-sm font-semibold text-blue-600 flex items-center">
                    続きを読む <ArrowRightIcon />
                  </p>
                </a>
              </Link>

              <Link href="/articles/research/how-to-search-papers" legacyBehavior>
                <a className="group block p-6 bg-gray-50 rounded-lg border transition-colors hover:bg-white hover:border-gray-300 hover:shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">先行研究はどこで探す？おすすめ論文検索サイトと効率的な探し方</h3>
                  <p className="mt-2 text-gray-600">研究の質を左右する文献検索。定番の検索サイトと、プロが使う検索テクニックを紹介します。</p>
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

export default HowToReadPapersPage;