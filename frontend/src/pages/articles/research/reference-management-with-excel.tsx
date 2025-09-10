import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// 右矢印アイコンのコンポーネント
const ArrowRightIcon = () => (
  <svg className="inline-block w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
);

const ReferenceManagementWithExcelPage = () => {
  return (
    <>
      {/* ページメタデータの設定 */}
      <div className="mt-12">
        <title>集めた資料が迷子にならない！参考文献の神Excel管理術 | 論文執筆支援アプリ</title>
        <meta name="description" content="専用の文献管理ソフトは高機能だけど複雑…。この記事では、ExcelやGoogleスプレッドシートを使った、シンプルで強力な自分だけの文献データベースの作り方を解説します。" />
      </div>

      <main className="bg-white">
        {/* 記事ヘッダー */}
        <header className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">research</p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                集めた資料が迷子にならない！参考文献の神Excel管理術
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500">
                専用ソフトは不要。フィルタとソートを駆使して、あなただけの最強の文献データベースを構築する方法を学びましょう。
              </p>
            </div>
          </div>
        </header>

        {/* カバー画像 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/articles/research/excel.png" // 画像パスは適宜調整してください
              alt="整理された参考文献管理のExcelシート"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* 記事本文 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
            <p className="text-lg leading-relaxed text-gray-800">「あの論文、どこに保存したっけ？」「前に読んだはずなのに見つからない…」そんな経験はありませんか？高機能な文献管理ソフトも良いですが、実は**Excel（またはGoogleスプレッドシート）**こそが、最も手軽でカスタマイズ性の高い最強の管理ツールになり得ます。この記事では、その具体的な方法を解説します。</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">なぜExcelなのか？</h2>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 leading-relaxed">
            <li><strong className="font-semibold text-gray-900">手軽さ:</strong> 追加のソフトは不要。誰でもすぐに始められます。</li>
            <li><strong className="font-semibold text-gray-900">カスタマイズ性:</strong> 自分の研究に必要な項目を自由に追加・削除できます。</li>
            <li><strong className="font-semibold text-gray-900">一覧性:</strong> 集めた論文の全体像を俯瞰しやすく、思考の整理に繋がります。</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">最強の管理テンプレート</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">まずは基本となるシートを作成しましょう。以下の項目を1行目のヘッダーとして入力するのがおすすめです。</p>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">No.</th>
                  <th className="p-3 border">著者</th>
                  <th className="p-3 border">年</th>
                  <th className="p-3 border">タイトル</th>
                  <th className="p-3 border">掲載誌/会議名</th>
                  <th className="p-3 border">キーワード</th>
                  <th className="p-3 border">読了状況</th>
                  <th className="p-3 border">メモ/要約</th>
                  <th className="p-3 border">ファイルLink</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border align-top">1</td>
                  <td className="p-3 border align-top">Yamada, T. et al.</td>
                  <td className="p-3 border align-top">2023</td>
                  <td className="p-3 border align-top">A novel approach...</td>
                  <td className="p-3 border align-top">Journal of Science</td>
                  <td className="p-3 border align-top">AI, 医療, 効率化</td>
                  <td className="p-3 border align-top">精読済</td>
                  <td className="p-3 border align-top">自身の研究との関連性を2-3行で要約...</td>
                  <td className="p-3 border align-top text-blue-600 underline">
                    <a href="#">PDF</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">各項目のポイント</h3>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 leading-relaxed">
            <li><strong className="font-semibold text-gray-900">キーワード:</strong> 論文の内容を的確に表す単語を3つほど付けます。これが後で検索する際の「最強のタグ」になります。</li>
            <li><strong className="font-semibold text-gray-900">読了状況:</strong> 「未読」「サーベイ済」「精読済」など、自分でルールを決めます。Excelの「データの入力規則」でプルダウンリストにすると便利です。</li>
            <li><strong className="font-semibold text-gray-900">ファイルLink:</strong> PC内のPDFファイルや、ダウンロードしたウェブページのURLへのハイパーリンクを貼ります。ワンクリックで原典に飛べるようにすることが重要です。</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">Excelをデータベースとして使うコツ</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">このリストをただの表で終わらせないための、2つの重要な機能を紹介します。</p>

          <div className="my-8 p-5 bg-yellow-50 border border-yellow-300 rounded-lg flex items-start">
            <span className="text-xl mr-4">💡</span>
            <div>
              <h4 className="font-bold text-yellow-800">フィルタとソートを使いこなそう</h4>
              <p className="text-yellow-700 mt-1">
                ヘッダー行を選択した状態で、`データ`タブから**`フィルタ`**をONにします。すると各列のヘッダーに▼マークが表示され、特定のキーワード（例: `AI`）を含む論文だけを絞り込んだり、特定の著者や発行年で並べ替え（**ソート**）たりすることが瞬時にできるようになります。
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed">
            論文が増えてきても、このフィルタとソート機能があれば、必要な情報にすぐにアクセスできます。「AIに関する論文で、2020年以降のもの」といった複雑な検索も簡単です。このシンプルなExcelシートが、あなたの研究を支える強力な頭脳になってくれるでしょう。
          </p>

          {/* 関連リンク */}
          <div className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-800">次のステップ：論文を読もう</h2>
            <p className="mt-4 text-center text-gray-600">データベースを構築しながら、論文を効率的に読み進めていきましょう。</p>
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

export default ReferenceManagementWithExcelPage;