import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const ArrowRightIcon = () => (
  <svg className="inline-block w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
);

const CommunicationWithSupervisorPage = () => {
  return (
    <>
      <div className="mt-12">
        <title>指導教員との賢い付き合い方｜テーマ相談から進捗報告まで | 〇〇（あなたのサイト名）</title>
        <meta name="description" content="指導教員は卒論プロジェクトの最強の味方です。テーマ相談から進捗報告、フィードバックのもらい方まで、円滑な関係を築くためのコミュニケーション術を解説します。" />
      </div>

      <main className="bg-white">
        {/* Article Header */}
        <div className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">準備・計画編</p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                指導教員との賢い付き合い方｜テーマ相談から進捗報告まで
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500">
                「先生が忙しそうで話しかけづらい…」その悩み、少しの工夫で解決できます。指導教員をあなたの卒論プロジェクトの最強の味方に変える方法を学びましょう。
              </p>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/articles/preparation/meeting.png" // 画像パスはご自身の環境に合わせてください
              alt="指導教員と面談している様子"
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
            <p className="text-lg leading-relaxed text-gray-800">「指導教員との面談が緊張する」「何を報告すればいいか分からない」と感じていませんか？指導教員はあなたの論文を評価するだけでなく、完成まで伴走してくれる最も重要なパートナーです。この記事では、指導教員とのコミュニケーションを円滑にし、卒論をスムーズに進めるための具体的な方法を解説します。結論は、<strong className="font-semibold text-gray-900">①目的を明確にし、②十分な準備をして臨み、③受けたアドバイスを次に繋げる</strong>というサイクルを回すことです。</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">なぜ指導教員との関係が重要なのか？</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">指導教員は、あなたの研究テーマに関する専門知識を持つだけでなく、多くの学生を指導してきた経験を持っています。良い関係を築くことで、質の高い学術的なアドバイスを得られるのはもちろん、研究に行き詰まった時の解決策や、精神的なサポートも期待できます。指導教員とのコミュニケーションは、卒論の質とあなたの大学生活の満足度を大きく左右するのです。</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">【フェーズ別】賢い相談・報告のコツ</h2>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">① テーマ相談の時期：「壁打ち相手」になってもらう</h3>
          <p className="text-lg text-gray-700 leading-relaxed">最も初期の段階では、教員をアイデアの「壁打ち相手」として頼るのが効果的です。ポイントは、丸投げしないこと。「テーマが決まりません」ではなく、「AとBというテーマに興味があり、それぞれ先行研究を調べたところ…」と、自分なりの考えと下調べの結果を持っていきましょう。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">② 研究・調査の時期：「進捗報告」で軌道修正する</h3>
          <p className="text-lg text-gray-700 leading-relaxed">定期的な進捗報告は、研究が間違った方向に進んでしまうのを防ぐために不可欠です。報告の際は、以下の3点をまとめた簡単なレジュメを用意すると、話がスムーズに進みます。</p>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 leading-relaxed">
            <li><strong>前回からの進捗：</strong> 実際にやったこと（論文を〇本読んだ、アンケート項目を作成した等）</li>
            <li><strong>現状の課題・問題点：</strong> 行き詰まっていること、悩んでいること</li>
            <li><strong>今後の計画と相談事項：</strong> 次に何をしようと思っているか、教員にアドバイスが欲しいこと</li>
          </ul>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">③ 執筆の時期：「フィードバック」を最大限に活かす</h3>
          <p className="text-lg text-gray-700 leading-relaxed">下書きを提出する際は、ただ「お願いします」と渡すのではなく、「第3章の論理展開に自信がないので、特にその点を見ていただきたいです」のように、具体的に見てほしいポイントを伝えましょう。教員も的確なフィードバックをしやすくなります。</p>

          <div className="my-8 p-5 bg-yellow-50 border border-yellow-300 rounded-lg flex items-start">
            <span className="text-xl mr-4">💡</span>
            <div>
              <h4 className="font-bold text-yellow-800">便利なツール紹介</h4>
              <p className="text-yellow-700 mt-1">
                多忙な指導教員との面談日程の調整には、「<a href="https://calendly.com/ja" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-yellow-800">Calendly</a>」のような日程調整ツールが役立ちます。自分の空き時間を提示し、教員に都合の良い時間を選んでもらうことで、メールの往復を減らし、スマートにアポイントを取ることができます。
              </p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">覚えておきたい！基本のコミュニケーションマナー</h2>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">メールの書き方</h3>
          <p className="text-lg text-gray-700 leading-relaxed">件名だけで内容が分かるようにしましょう（例：【卒論進捗報告】〇〇大学 経済学部 〇〇太郎）。本文では、まず自分の名前と所属を名乗り、要件を簡潔に伝えます。質問がある場合は、自分で調べた上で、どこが分からないのかを明確にしましょう。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">面談時の心構え</h3>
          <p className="text-lg text-gray-700 leading-relaxed">アドバイスされた内容は、必ずメモを取りましょう。分からないことはその場で質問し、認識のズレを防ぎます。面談の最後には、「次回の面談までに〇〇を進めておきます」と、次のアクションプランを自分の口から伝えることで、主体性を示すことができます。</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">まとめ</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">指導教員との良好な関係は、受け身の姿勢では築けません。主体的に計画を立て、準備をし、積極的にコミュニケーションを取ることが、結果的にあなたの卒論の質を高め、あなた自身の成長に繋がります。</p>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 leading-relaxed">
            <li><strong>準備がすべて：</strong> 面談やメールの前には、必ず目的と議題を整理する。</li>
            <li><strong>問題を早期に共有：</strong> 行き詰まってからではなく、行き詰まりそうだと感じた時点で相談する。</li>
            <li><strong>主体性を示す：</strong> 指示を待つのではなく、自分から次のアクションを提案する。</li>
          </ul>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">指導教員を信頼し、積極的に頼ることで、卒業論文という長い道のりを乗り越えましょう。</p>

          <div className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-800">次のステップ：研究と執筆を進めよう</h2>
            <p className="mt-4 text-center text-gray-600">教員と良い関係が築けたら、いよいよ研究と執筆を本格化させるフェーズです。</p>
            <div className="mt-8 grid md:grid-cols-2 gap-6">

              <Link href="/articles/research/how-to-search-papers" legacyBehavior>
                <a className="group block p-6 bg-gray-50 rounded-lg border transition-colors hover:bg-white hover:border-gray-300 hover:shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">先行研究はどこで探す？おすすめ論文検索サイトと効率的な探し方</h3>
                  <p className="mt-2 text-gray-600">CiNii, Google Scholarなどの特徴と、キーワード選定のコツを解説します。</p>
                  <p className="mt-4 text-sm font-semibold text-blue-600 flex items-center">
                    続きを読む <ArrowRightIcon />
                  </p>
                </a>
              </Link>

              <Link href="/articles/writing/where-to-start-writing" legacyBehavior>
                <a className="group block p-6 bg-gray-50 rounded-lg border transition-colors hover:bg-white hover:border-gray-300 hover:shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">「何から書く？」を解決。論文執筆で最初に着手すべき章とは</h3>
                  <p className="mt-2 text-gray-600">一般的に書きやすいとされる「方法」や「結果」から手をつけるメリットを解説します。</p>
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

export default CommunicationWithSupervisorPage;