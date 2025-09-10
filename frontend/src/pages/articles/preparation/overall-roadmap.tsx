import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const ArrowRightIcon = () => (
  <svg className="inline-block w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
);

const OverallRoadmapPage = () => {
  return (
    <>
      <div className="mt-12">
        <title>これさえ読めばOK！卒業論文の全体像と完成までのロードマップ | 〇〇（あなたのサイト名）</title>
        <meta name="description" content="卒業論文という壮大なプロジェクトを分解し、スタートからゴールまでの全工程を一枚の地図のように分かりやすく解説します。" />
      </div>

      <main className="bg-white">
        {/* Article Header */}
        <div className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">準備・計画編</p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                これさえ読めばOK！卒業論文の全体像と完成までのロードマップ
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500">
                ゴールが見えないマラソンは走りきれない。卒論という長い旅の地図を手に入れて、安心して第一歩を踏み出しましょう。
              </p>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/articles/preparation/roadmap.png" // 画像パスはご自身の環境に合わせてください
              alt="ロードマップとコンパス"
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
            <p className="text-lg leading-relaxed text-gray-800">「卒論って、結局何をすればゴールなの？」「全体像が見えなくて、今やっていることが正しいのか不安…」と感じていませんか？この記事では、卒業論文という壮大なプロジェクトを分解し、スタートからゴールまでの全工程を一枚の地図のように分かりやすく解説します。結論として、卒論は<strong className="font-semibold text-gray-900">「①構想 → ②調査 → ③執筆 → ④完成」</strong>という4つの大きなフェーズで構成されており、それぞれのフェーズでやるべきことを理解すれば、迷うことはありません。</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">卒業論文とは、そもそも何か？</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">卒業論文は、単に長いレポートではありません。それは大学4年間の学びの集大成であり、あなたが学問の世界に新たな貢献をする第一歩です。本質は、<strong>「自分で新たな問いを立て、客観的な根拠をもってその答えを論理的に示す」</strong>ことにあります。先行研究という「巨人たちの肩の上」に立ち、自分だけの新しい視点を付け加えるプロセスなのです。</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">フェーズ1：構想（全体の設計図を作る）</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">家を建てる前に設計図が必要なように、論文もまずは全体の設計図を描く「構想」フェーズから始まります。</p>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 leading-relaxed">
            <li><strong>テーマ決め:</strong> あなたの興味関心と、学問的な新規性を両立させる、最も重要なステップです。</li>
            <li><strong>研究計画書の作成:</strong> なぜ、何を、どのように研究するのかを明記した計画書。これが今後の道標になります。</li>
            <li><strong>指導教員との合意形成:</strong> 計画書をもとに指導教員と相談し、研究の方向性について合意を得ます。</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">フェーズ2：調査（根拠となるデータを集める）</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">設計図が固まったら、次はその主張を裏付けるための証拠（データ）を集める「調査」フェーズです。</p>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 leading-relaxed">
            <li><strong>先行研究レビュー:</strong> 関連する学術論文や書籍を読み込み、自分の研究の位置づけを明確にします。</li>
            <li><strong>本調査・実験:</strong> 文系ならアンケートやインタビュー、理系なら実験など、計画書に沿ってデータを収集します。</li>
            <li><strong>データ整理・分析:</strong> 集めた生データを、論文で使える形に整理し、統計的な分析などを行います。</li>
          </ul>

          <div className="my-8 p-5 bg-yellow-50 border border-yellow-300 rounded-lg flex items-start">
            <span className="text-xl mr-4">💡</span>
            <div>
              <h4 className="font-bold text-yellow-800">便利なツール紹介</h4>
              <p className="text-yellow-700 mt-1">
                この複雑なプロジェクト全体の管理には、「<a href="https://www.notion.so/ja-jp" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-yellow-800">Notion</a>」が非常に役立ちます。各フェーズのタスクリスト、集めた文献データベース、執筆の進捗などを一つの場所で一元管理し、ロードマップを可視化できます。
              </p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">フェーズ3：執筆（思考を文章にする）</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">データが集まったら、いよいよあなたの思考を文章として形にする「執筆」フェーズです。</p>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 leading-relaxed">
            <li><strong>構成案（目次）の作成:</strong> 章・節・項のレベルまで詳細な目次を作成し、話の流れを確定させます。</li>
            <li><strong>初稿執筆:</strong> 完璧を目指さず、まずは最後まで一気に書き上げます。「書けない」章は飛ばしてもOKです。</li>
            <li><strong>推敲・修正:</strong> 指導教員や友人からフィードバックをもらい、何度も書き直して文章の精度を高めていきます。</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">フェーズ4：完成（論文を提出する）</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">論文の内容が固まったら、最後は体裁を整えて提出する「完成」フェーズです。</p>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 leading-relaxed">
            <li><strong>フォーマット調整:</strong> 注、参考文献リスト、図表番号などを大学の規定に沿って正確に整えます。</li>
            <li><strong>最終チェック:</strong> 誤字脱字や文法のミスがないか、印刷して最初から最後まで読み返します。</li>
            <li><strong>提出と発表:</strong> 締め切りを守って提出し、最後は卒業論文発表会で研究の成果を堂々と発表しましょう。</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">まとめ</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">卒業論文は、一見すると巨大で複雑なプロジェクトに見えますが、このように4つのフェーズに分解することで、今自分がどこにいて、次に何をすべきかが明確になります。</p>
          <ol className="list-decimal pl-6 space-y-3 text-lg text-gray-700 leading-relaxed">
            <li><strong>構想フェーズ</strong>で、しっかりとした設計図を描く。</li>
            <li><strong>調査フェーズ</strong>で、主張の根拠となるデータを集める。</li>
            <li><strong>執筆フェーズ</strong>で、論理的な文章として思考を形にする。</li>
            <li><strong>完成フェーズ</strong>で、細部までこだわり抜いて提出する。</li>
          </ol>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">このロードマップを片手に、焦らず一歩ずつ、あなただけの卒業論文を完成させてください。</p>

          <div className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-800">次のステップ：具体的な計画を立てよう</h2>
            <p className="mt-4 text-center text-gray-600">全体像が分かったら、次は1年間の具体的なスケジュールを立ててみましょう。</p>
            <div className="mt-8 grid md:grid-cols-2 gap-6">

              <Link href="/articles/preparation/schedule-and-task-management" legacyBehavior>
                <a className="group block p-6 bg-gray-50 rounded-lg border transition-colors hover:bg-white hover:border-gray-300 hover:shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">挫折しない！卒業論文の年間スケジュールとタスク管理術</h3>
                  <p className="mt-2 text-gray-600">テーマ決定から提出までのマイルストーンと、月ごとのタスク例を紹介します。</p>
                  <p className="mt-4 text-sm font-semibold text-blue-600 flex items-center">
                    続きを読む <ArrowRightIcon />
                  </p>
                </a>
              </Link>

              <Link href="/articles/preparation/communication-with-supervisor" legacyBehavior>
                <a className="group block p-6 bg-gray-50 rounded-lg border transition-colors hover:bg-white hover:border-gray-300 hover:shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">指導教員との賢い付き合い方</h3>
                  <p className="mt-2 text-gray-600">質問の仕方、報告の頻度、フィードバックのもらい方など、円滑な関係を築くコツを解説します。</p>
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

export default OverallRoadmapPage;