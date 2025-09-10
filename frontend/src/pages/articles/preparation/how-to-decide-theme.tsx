import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const ArrowRightIcon = () => (
  <svg className="inline-block w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
);

const HowToDecideThemePage = () => {
  return (
    <>
      <div className="mt-12">
        <title>「面白い」が見つかる！卒業論文のテーマを決める3つのステップ | 〇〇（アプリ名）</title>
        <meta name="description" content="卒業論文の最初の関門、テーマ決め。この記事では、漠然とした興味を具体的な研究テーマに落とし込むための、体系的な3つのステップを分かりやすく解説します。" />
      </div>

      <main className="bg-white">
        {/* Article Header */}
        <div className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">準備・計画編</p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                「面白い」が見つかる！卒業論文のテーマを決める3つのステップ
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500">
                卒業論文の成功は、テーマ決めで8割決まる。漠然とした興味を、誰もが「面白い」と感じる研究テーマに変えるための具体的な方法を学びましょう。
              </p>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
            <Image
            src="/articles/preparation/mindmap.jpg"
              alt="アイデアを練る"
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>

        {/* ★ [変更] `prose`クラスを削除し、内部の各要素に直接classNameを指定 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
            <p className="text-lg leading-relaxed text-gray-800">卒業論文、最初の関門がテーマ決め。「何から手をつければいいか分からない」「面白いテーマなんて思いつかない…」と悩んでいませんか？この記事を読めば、漠然とした興味を具体的な研究テーマに落とし込むための、体系的な3つのステップが分かります。結論は、<strong className="font-semibold text-gray-900">「①興味の棚卸し → ②先行研究の調査 → ③テーマの具体化」</strong>というステップを順番に踏むことです。</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">ステップ1：興味の「棚卸し」で自分の「好き」を深掘りする</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">すべての始まりは、あなた自身の興味関心です。まずは難しく考えず、自分の「好き」や「気になる」をリストアップすることから始めましょう。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">普段の生活からヒントを探す</h3>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 leading-relaxed">
            <li><strong className="font-semibold text-gray-900">ニュースやSNS:</strong> 最近、気になったニュースや話題はありますか？なぜそれが気になったのでしょうか？</li>
            <li><strong className="font-semibold text-gray-900">本・映画・音楽:</strong> 夢中になった作品はありますか？その作品の何に心を動かされましたか？</li>
            <li><strong className="font-semibold text-gray-900">悩みや課題:</strong> あなた自身や周りの人が困っていることはありませんか？「もっとこうなればいいのに」と感じることは、研究の種になります。</li>
          </ul>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">マインドマップで発想を広げる</h3>
          <p className="text-lg text-gray-700 leading-relaxed">中心にメインの興味（例：「SNS」）を書き、そこから連想する言葉を放射状に繋げていくマインドマップは、思考を整理し、意外な組み合わせを発見するのに最適です。</p>

          <div className="my-8 p-5 bg-yellow-50 border border-yellow-300 rounded-lg flex items-start">
            <span className="text-xl mr-4">💡</span>
            <div>
              <h4 className="font-bold text-yellow-800">便利なツール紹介</h4>
              <p className="text-yellow-700 mt-1">
                このアイデア出しの作業には、オンラインホワイトボードツールの「<a href="https://miro.com/ja/" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-yellow-800">Miro</a>」などが便利です。無限に広がるキャンバスにアイデアを書き出したり、画像や付箋を貼り付けたりして、思考を視覚的に整理できます。無料プランでも十分に活用できます。
              </p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">ステップ2：先行研究の調査で「オリジナリティ」の種を見つける</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">自分の興味の方向性が見えてきたら、次はそれが「研究する価値のあるテーマ」なのかを確かめるステップに移ります。そのために不可欠なのが、先行研究の調査です。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">なぜ先行研究の調査が必要なのか？</h3>
          <p className="text-lg text-gray-700 leading-relaxed">先行研究を調べることで、「すでに何が分かっていて、何がまだ分かっていないのか」という学問の最前線を知ることができます。オリジナリティとは、この「まだ分かっていないこと（研究の隙間）」を見つけ出し、そこに光を当てることです。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">おすすめの論文検索サイト</h3>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 leading-relaxed">
            <li><strong className="font-semibold text-gray-900">CiNii Articles:</strong> 日本の学術論文を中心に探せます。</li>
            <li><strong className="font-semibold text-gray-900">Google Scholar:</strong> 分野を問わず、世界中の論文を幅広く検索できます。</li>
            <li><strong className="font-semibold text-gray-900">J-STAGE:</strong> 科学技術系の論文が豊富です。</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">ステップ3：テーマを「具体化」して指導教員に相談する</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">先行研究の調査で見つけた「研究の隙間」と自分の興味を掛け合わせ、具体的な研究テーマに絞り込んでいきます。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">5W1Hでテーマを絞り込む</h3>
          <p className="text-lg text-gray-700 leading-relaxed">「SNSと若者の心理」のような漠然としたテーマでは、どこから手をつけていいか分かりません。5W1Hを使って、テーマを具体的にしてみましょう。</p>

          <blockquote className="my-6 p-4 bg-gray-100 rounded-lg border-l-4 border-gray-300">
            <p className="text-lg font-semibold text-gray-800">例：</p>
            <div className="mt-2 text-lg text-gray-700 space-y-1">
              <p><strong className="font-semibold text-gray-900">Who（誰が）:</strong> 東京の女子大学生が</p>
              <p><strong className="font-semibold text-gray-900">When（いつ）:</strong> 過去5年間の</p>
              <p><strong className="font-semibold text-gray-900">Where（どこで）:</strong> 日本において</p>
              <p><strong className="font-semibold text-gray-900">What（何を）:</strong> Instagramの利用が</p>
              <p><strong className="font-semibold text-gray-900">Why（なぜ）:</strong> なぜ自己肯定感に影響を与えるのか</p>
              <p><strong className="font-semibold text-gray-900">How（どのように）:</strong> どのように影響を与えるのか</p>
            </div>
          </blockquote>

          <p className="text-lg text-gray-700 leading-relaxed">このように具体化することで、調査すべき範囲が明確になり、研究計画が立てやすくなります。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">指導教員への相談のコツ</h3>
          <p className="text-lg text-gray-700 leading-relaxed">具体化したテーマの候補を2〜3個用意し、「なぜそのテーマに興味を持ったのか」「先行研究を調べて何が分かったのか」を合わせて伝えることで、教員から的確なアドバイスをもらいやすくなります。</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">まとめ</h2>
          <p className="text-lg mb-6 text-gray-700 leading-relaxed">卒業論文のテーマ決めは、以下の3ステップで進めることで、漠然とした興味を具体的な形にすることができます。</p>
          <ol className="list-decimal pl-6 space-y-3 text-lg text-gray-700 leading-relaxed">
            <li><strong className="font-semibold text-gray-900">興味の棚卸し:</strong> 自分の「好き」や「気になる」を自由にリストアップする。</li>
            <li><strong className="font-semibold text-gray-900">先行研究の調査:</strong> 学問の最前線を知り、「まだ分かっていないこと」を見つける。</li>
            <li><strong className="font-semibold text-gray-900">テーマの具体化:</strong> 5W1Hでテーマを絞り込み、研究可能な形に整える。</li>
          </ol>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">テーマ決めは、あなた自身の好奇心と向き合う楽しいプロセスです。焦らず、じっくりと取り組んでいきましょう。</p>

          <div className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-800">次のステップ：計画を立てよう</h2>
            <p className="mt-4 text-center text-gray-600">テーマの方向性が見えてきたら、次は具体的なスケジュールを立てていきましょう。</p>
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

              <Link href="/articles/preparation/overall-roadmap" legacyBehavior>
                <a className="group block p-6 bg-gray-50 rounded-lg border transition-colors hover:bg-white hover:border-gray-300 hover:shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">これさえ読めばOK！卒業論文の全体像と完成までのロードマップ</h3>
                  <p className="mt-2 text-gray-600">卒論とは何か、どのような章立てで、どのくらいの期間で進めるのかを鳥瞰図的に解説します。</p>
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

export default HowToDecideThemePage