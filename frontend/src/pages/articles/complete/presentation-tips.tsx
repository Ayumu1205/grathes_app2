import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// 右矢印アイコンのコンポーネント
const ArrowRightIcon = () => (
  <svg className="inline-block w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
);

const PresentationTipsPage = () => {
  return (
    <>
      {/* ページメタデータの設定 */}
      <div className="mt-12">
        <title>卒論発表会を乗り切る！分かりやすいスライド作成と質疑応答のコツ | 論文執筆支援アプリ</title>
        <meta name="description" content="研究生活の集大成である卒業論文発表会。聞き手を引き込むスライドデザインの原則から、鋭い質問にも冷静に対応する質疑応答のテクニックまで、成功への道を徹底ガイドします。" />
      </div>

      <main className="bg-white">
        {/* 記事ヘッダー */}
        <header className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">complete</p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                卒論発表会を乗り切る！分かりやすいスライド作成と質疑応答のコツ
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500">
                あなたの研究の価値を最大限に伝えるための最終関門。準備を万全に整え、自信を持って発表に臨みましょう。
              </p>
            </div>
          </div>
        </header>

        {/* カバー画像 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/articles/complete/presentation.jpg" // 画像パスは適宜調整してください
              alt="プレゼンテーションを行っている様子"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* 記事本文 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
            <p className="text-lg leading-relaxed text-gray-800">卒業論文発表会は、研究成果を公に発表する晴れの舞台であると同時に、多くの学生にとって緊張の瞬間です。しかし、適切な準備をすれば何も恐れることはありません。この記事では、聞き手の理解を助ける**「分かりやすいスライドの原則」**と、どんな質問にも対応できる**「質疑応答の心構えとテクニック」**を解説します。</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">分かりやすいスライド作成の4大原則</h2>
          <p className="text-lg mb-8 text-gray-700 leading-relaxed">優れたスライドは、あなたが話す内容の「補助」に徹します。スライドに情報を詰め込みすぎるのは最もよくある失敗です。</p>

          <ol className="list-decimal pl-6 space-y-6 text-lg text-gray-700">
            <li>
              <strong className="font-semibold text-gray-900">1スライド＝1メッセージ</strong><br />
              1枚のスライドで伝えたいことは、最も重要な1つだけに絞ります。複数のトピックを詰め込むと、聞き手の集中力が散漫になります。各スライドには、そのメッセージを体現する簡潔なタイトルをつけましょう。
            </li>
            <li>
              <strong className="font-semibold text-gray-900">文字は少なく、図を多く</strong><br />
              スライドに長い文章を書くのはやめましょう。文章はあなたが口頭で話すためのものです。スライドには、キーワードとなる単語や短いフレーズ、そして研究結果を示すグラフや図、表を主役に配置します。視覚情報の方が、文字情報よりも遥かに速く、そして深く理解されます。
            </li>
            <li>
              <strong className="font-semibold text-gray-900">デザインはシンプルに</strong><br />
              背景は白、文字は黒や濃い紺など、コントラストの高い配色を選びます。フォントはゴシック体などの視認性が高いものを使い、サイズは会場の後ろの席からでも読める大きさを意識しましょう（最低でも24pt以上が目安）。
            </li>
            <li>
              <strong className="font-semibold text-gray-900">一貫したストーリー</strong><br />
              スライド全体の流れは、論文の構成（背景→問題提起→方法→結果→考察→結論）に沿った、一貫したストーリーになるように構成します。聞き手が話の現在地を見失わないよう、各セクションの冒頭で「本日の発表の構成」スライドを再掲示するなどの工夫も有効です。
            </li>
          </ol>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">質疑応答を乗り切る3つのコツ</h2>
          <p className="text-lg mb-8 text-gray-700 leading-relaxed">質疑応答は、あなたの研究への理解度と対応力を示す絶好の機会です。準備と心構えが成功の鍵です。</p>

          <div className="my-8 p-5 bg-yellow-50 border border-yellow-300 rounded-lg flex items-start">
            <span className="text-xl mr-4">💡</span>
            <div>
              <h4 className="font-bold text-yellow-800">最強の準備：「想定問答集」の作成</h4>
              <p className="text-yellow-700 mt-1">
                発表練習を友人や先輩に聞いてもらい、出た質問とそれに対する回答をまとめた「想定問答集」を作成しましょう。特に、自分の研究の**弱点や限界点**に関する質問は必ず出ると考え、説得力のある回答を事前に準備しておくことが、自信を持って質疑応答に臨むための最大の秘訣です。
              </p>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">1. まずは「結論」から話す</h3>
          <p className="text-lg text-gray-700 leading-relaxed">質問を受けたら、まず「はい、その点については〇〇だと考えます」のように、**一言で結論（答え）**を述べます。その後に、「なぜなら〜」と理由や詳細な説明を続けることで、非常に論理的で分かりやすい回答になります。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">2. 焦らず、聞き返す勇気を持つ</h3>
          <p className="text-lg text-gray-700 leading-relaxed">質問の意図がよく分からなかった場合に、焦って見当違いの回答をするのが最悪のパターンです。「〇〇というご質問は、△△という理解でよろしいでしょうか？」のように、**丁寧に聞き返す**ことは全く失礼にあたりません。むしろ、真摯な態度として好意的に受け取られます。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">3. 分からないことは正直に認める</h3>
          <p className="text-lg text-gray-700 leading-relaxed">全ての質問に完璧に答えることは不可能です。答えられない質問をされた場合は、知ったかぶりをせず、「申し訳ありません、その点については現在勉強中です」「ご指摘ありがとうございます。今後の課題として検討させていただきます」のように、**正直に認め、今後の展望に繋げる**のが最も誠実な対応です。</p>

          {/* 関連リンク */}
          <div className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-800">お疲れ様でした！</h2>
            <p className="mt-4 text-center text-gray-600">長い論文執筆の旅も、これで一区切りです。あなたの努力が実を結ぶことを心から願っています。</p>
            <div className="mt-8 grid md:grid-cols-2 gap-6">

              <Link href="/articles/complete/final-checklist" legacyBehavior>
                <a className="group block p-6 bg-gray-50 rounded-lg border transition-colors hover:bg-white hover:border-gray-300 hover:shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">提出前に必ず確認！卒業論文の最終チェックリスト10項目</h3>
                  <p className="mt-2 text-gray-600">発表会が終わっても、最後の提出が残っています。うっかりミスを防ぐ最終確認を行いましょう。</p>
                  <p className="mt-4 text-sm font-semibold text-blue-600 flex items-center">
                    続きを読む <ArrowRightIcon />
                  </p>
                </a>
              </Link>

              <Link href="/articles/preparation/how-to-decide-theme" legacyBehavior>
                <a className="group block p-6 bg-gray-50 rounded-lg border transition-colors hover:bg-white hover:border-gray-300 hover:shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">「面白い」が見つかる！卒業論文のテーマを決める3つのステップ</h3>
                  <p className="mt-2 text-gray-600">これから論文を書き始める後輩のために、あなたの経験を伝えてあげましょう。</p>
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

export default PresentationTipsPage;