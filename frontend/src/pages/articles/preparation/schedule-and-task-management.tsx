import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const ArrowRightIcon = () => (
  <svg className="inline-block w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
);

const ScheduleAndTaskManagementPage = () => {
  return (
    <>
      <div className="mt-12">
        <title>挫折しない！卒業論文の年間スケジュールとタスク管理術 | 〇〇（あなたのサイト名）</title>
        <meta name="description" content="卒論は長期戦。この記事では、大学4年生の1年間をモデルケースに、具体的な月別スケジュールと、無理なくタスクをこなすための管理術を解説します。" />
      </div>

      <main className="bg-white">
        {/* Article Header */}
        <div className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">準備・計画編</p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                挫折しない！卒業論文の年間スケジュールとタスク管理術
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500">
                卒論は長期戦だからこそ、計画がすべて。ゴールから逆算した無理のないスケジュールを立てて、着実に論文を完成させましょう。
              </p>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/articles/preparation/schedule.png" // 画像パスはご自身の環境に合わせてください
              alt="カレンダーとタスクリスト"
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
            <p className="text-lg leading-relaxed text-gray-800">「卒論って、いつ、何をすればいいの…？」「気づいたら締め切り間近でパニック！」そんな経験は、多くの先輩が通ってきた道です。この記事では、大学4年生の1年間をモデルケースに、具体的な月別スケジュールと、無理なくタスクをこなすための管理術を解説します。結論は、<strong className="font-semibold text-gray-900">①全体像の把握 → ②月別タスクへの分解 → ③日々の進捗管理</strong>という3つのステップで計画を立て、柔軟に実行することです。</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">なぜスケジュール管理が重要なのか？</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">卒業論文は、授業のレポートとは異なり、最終提出日までの期間が非常に長いのが特徴です。中間締め切りがないため、自分で計画を立てて進めないと、最後の数ヶ月で膨大な作業に追われることになります。スケジュールを立てることで、精神的な余裕が生まれ、論文の質をじっくり高める時間を確保できるのです。</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">【モデルケース】卒業論文 年間スケジュール</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">一般的な文系学部を想定したスケジュール例です。理系の場合は、実験の期間などを考慮して調整してください。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">4月～7月（春学期）：テーマ決定と情報収集の時期</h3>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 leading-relaxed">
            <li><strong>4月～5月:</strong> 興味のある分野の洗い出し、関連書籍を読む、指導教員にテーマの相談。</li>
            <li><strong>6月～7月:</strong> テーマの絞り込み、先行研究の本格的な調査、研究計画書の作成。</li>
          </ul>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">8月～9月（夏休み）：調査・実験の集中期間</h3>
          <p className="text-lg text-gray-700 leading-relaxed">夏休みは、卒論に集中できる貴重な時間です。アンケート調査、インタビュー、実験など、研究の核となるデータ収集をこの期間に集中的に行いましょう。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">10月～12月（秋学期）：執筆の本格化</h3>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 leading-relaxed">
            <li><strong>10月:</strong> 収集したデータの分析、論文全体の構成（目次）の確定、書きやすい章（研究方法など）から執筆開始。</li>
            <li><strong>11月:</strong> 本論の執筆に集中。週に一度は指導教員に進捗を報告する。</li>
            <li><strong>12月:</strong> 序論・結論を含めた論文全体の初稿を完成させ、指導教員に提出。冬休み前に一度フィードバックをもらうのが目標。</li>
          </ul>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">1月～2月：最終調整と提出</h3>
          <p className="text-lg text-gray-700 leading-relaxed">指導教員からのフィードバックをもとに、論文全体の推敲を重ねます。誤字脱字のチェック、参考文献リストのフォーマット統一など、細部まで徹底的に見直しましょう。大学が定める締め切り日に余裕を持って提出します。</p>

          <div className="my-8 p-5 bg-yellow-50 border border-yellow-300 rounded-lg flex items-start">
            <span className="text-xl mr-4">💡</span>
            <div>
              <h4 className="font-bold text-yellow-800">便利なツール紹介</h4>
              <p className="text-yellow-700 mt-1">
                タスク管理には、「<a href="https://www.notion.so/ja-jp" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-yellow-800">Notion</a>」のような多機能ノートアプリがおすすめです。カレンダー機能でスケジュールを管理しつつ、各タスクの詳細なメモや関連資料へのリンクを一つのページにまとめることができます。
              </p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">挫折しないためのタスク管理術3選</h2>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">① タスクを極限まで細分化する</h3>
          <p className="text-lg text-gray-700 leading-relaxed">「論文を書く」という巨大なタスクに圧倒されないよう、「先行研究を3本読む」「第2章の図を作成する」など、1時間程度で完了するレベルまでタスクを分解しましょう。小さな達成感がモチベーションに繋がります。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">② 「ポモドーロ・テクニック」で集中力を維持する</h3>
          <p className="text-lg text-gray-700 leading-relaxed">「25分集中して5分休憩する」というサイクルを繰り返す時間管理術です。人間の集中力は長くは続きません。短い休憩を挟むことで、集中力の質を高め、長時間の作業でも疲れにくくなります。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">③ 週に一度、進捗報告の場を設ける</h3>
          <p className="text-lg text-gray-700 leading-relaxed">指導教員との定例ミーティングを設定したり、ゼミ仲間と進捗を報告し合う会を開くのがおすすめです。他人の目があることで、適度な強制力が生まれ、計画倒れを防ぐことができます。</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">まとめ</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">卒業論文を乗り切る鍵は、いかに計画的に、そして継続的に取り組めるかにかかっています。</p>
          <ol className="list-decimal pl-6 space-y-3 text-lg text-gray-700 leading-relaxed">
            <li><strong>年間スケジュールを把握し、</strong>長期的な見通しを持つ。</li>
            <li><strong>タスクを細分化し、</strong>日々の小さなゴールをクリアしていく。</li>
            <li><strong>便利なツールやテクニックを活用し、</strong>モチベーションを維持する。</li>
          </ol>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">完璧な計画よりも、柔軟に修正しながら着実に進めることが大切です。このスケジュールを参考に、あなた自身の計画を立ててみてください。</p>

          <div className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-800">次のステップ：情報収集を始めよう</h2>
            <p className="mt-4 text-center text-gray-600">計画が立てられたら、次は研究の質を左右する情報収集のフェーズです。</p>
            <div className="mt-8 grid md:grid-cols-2 gap-6">

              <Link href="/preparation/how-to-search-papers" legacyBehavior>
                <a className="group block p-6 bg-gray-50 rounded-lg border transition-colors hover:bg-white hover:border-gray-300 hover:shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">先行研究はどこで探す？おすすめ論文検索サイトと効率的な探し方</h3>
                  <p className="mt-2 text-gray-600">CiNii, Google Scholarなどの特徴と、キーワード選定のコツを解説します。</p>
                  <p className="mt-4 text-sm font-semibold text-blue-600 flex items-center">
                    続きを読む <ArrowRightIcon />
                  </p>
                </a>
              </Link>

              <Link href="/preparation/how-to-read-papers" legacyBehavior>
                <a className="group block p-6 bg-gray-50 rounded-lg border transition-colors hover:bg-white hover:border-gray-300 hover:shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">大量の論文を効率的に読む！文献レビューの進め方とノート術</h3>
                  <p className="mt-2 text-gray-600">アブストラクトの活用法、読むべき箇所の見極め方、情報を整理するノートの作り方を紹介します。</p>
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

export default ScheduleAndTaskManagementPage;