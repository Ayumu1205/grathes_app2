import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// 右矢印アイコンのコンポーネント
const ArrowRightIcon = () => (
  <svg className="inline-block w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
);

const AcademicWritingBasicsPage = () => {
  return (
    <>
      {/* ページメタデータの設定 */}
      <div className="mt-12">
        <title>理系・文系別「伝わる」論文の文章術｜アカデミックライティング入門 | 論文執筆支援アプリ</title>
        <meta name="description" content="良い研究も、伝わらなければ意味がない。客観性、論理性、明瞭性を担保する学術的文章の基本から、理系・文系それぞれの分野で評価される文章スタイルまでを徹底解説。" />
      </div>

      <main className="bg-white">
        {/* 記事ヘッダー */}
        <header className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">writing</p>
              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                理系・文系別「伝わる」論文の文章術｜アカデミックライティング入門
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500">
                あなたの研究成果を、正確かつ説得力をもって読者に届けるための文章技術。分野ごとの「作法」を理解し、評価される論文を書き上げましょう。
              </p>
            </div>
          </div>
        </header>

        {/* カバー画像 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/articles/writing/paper.png" // 画像パスは適宜調整してください
              alt="万年筆で論文を執筆している様子"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* 記事本文 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div className="p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-md">
            <p className="text-lg leading-relaxed text-gray-800">「素晴らしい研究なのに、文章が分かりにくくて損をしている」。そんな評価を避けるために不可欠なのが、アカデミックライティングの技術です。この記事では、全ての学術分野に共通する**3つの大原則**と、意外と知られていない**理系と文系の文章スタイルの違い**を解説します。</p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">全分野共通の3大原則</h2>
          <p className="text-lg mb-8 text-gray-700 leading-relaxed">どのような分野であれ、学術的文章には守るべき普遍的なルールが存在します。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">1. 客観性 (Objectivity)</h3>
          <p className="text-lg text-gray-700 leading-relaxed">「私は〜と思う」「〜だと感じた」といった主観的な表現は避け、事実とデータを淡々と記述します。主張には必ず根拠（引用や実験結果など）を示し、断定的な表現よりも「〜と考えられる」「〜と示唆される」といった客観的な表現を用います。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">2. 論理性 (Logic)</h3>
          <p className="text-lg text-gray-700 leading-relaxed">文章全体が明確な論理構造を持っている必要があります。序論で問いを立て、本論で根拠を示し、結論で問いに答える、という一貫した流れが不可欠です。「しかし」「したがって」といった接続詞を正しく使い、文と文の論理的な繋がりを明確にしましょう。</p>

          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4">3. 明瞭性 (Clarity)</h3>
          <p className="text-lg text-gray-700 leading-relaxed">一文は短く（一文一義）、専門用語は定義してから使い、曖昧な表現を避けることが求められます。読者が一度読んだだけで、誤解なく内容を理解できる文章を目指しましょう。</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200">分野別：文章スタイルの違い</h2>
          <p className="text-lg mb-8 text-gray-700 leading-relaxed">共通の原則を押さえた上で、分野ごとに好まれる文章スタイルを理解することが「伝わる」文章への近道です。</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 理系の文章術 */}
            <div className="p-6 bg-gray-50 rounded-lg border">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🔬 理系の文章術：正確性と再現性</h3>
              <p className="text-lg text-gray-700 mb-4">理系論文の目的は、実験や観察の結果を**正確に報告**し、第三者がそれを**再現できる**ようにすることです。</p>
              <ul className="list-disc pl-5 space-y-2 text-lg text-gray-700">
                <li><strong className="font-semibold">受動態が好まれる:</strong> 「筆者らは実験を行った」よりも「実験が行われた」のように、行為者よりも行為そのものを主語に置くことで客観性を強調します。</li>
                <li><strong className="font-semibold">図・表が主役:</strong> 文章は、図や表が示すデータを補足・解説する役割を担います。</li>
                <li><strong className="font-semibold">簡潔で直接的:</strong> 修飾的な表現を排し、事実を直接的に記述します。</li>
              </ul>
            </div>

            {/* 文系の文章術 */}
            <div className="p-6 bg-gray-50 rounded-lg border">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🏛️ 文系の文章術：説得力のある論証</h3>
              <p className="text-lg text-gray-700 mb-4">文系論文の目的は、問いに対して明確な主張（テーゼ）を立て、**論理的な議論**で読者を**説得する**ことです。</p>
              <ul className="list-disc pl-5 space-y-2 text-lg text-gray-700">
                <li><strong className="font-semibold">能動態が好まれる:</strong> 「本稿は〜と主張する」のように、筆者の分析や主張を明確にするために能動態がよく使われます。</li>
                <li><strong className="font-semibold">言葉の定義が重要:</strong> 議論の核となるキーワードの定義を厳密に行います。</li>
                <li><strong className="font-semibold">議論の展開:</strong> 序論で問題提起し、本論の各段落で一つの論点を展開し、それらを積み重ねて結論へと導きます。</li>
              </ul>
            </div>
          </div>

          {/* 関連リンク */}
          <div className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-800">次のステップ：論文の構成を学ぼう</h2>
            <p className="mt-4 text-center text-gray-600">良い文章は、良い構成（骨格）の上に成り立ちます。</p>
            <div className="mt-8 grid md:grid-cols-2 gap-6">

    

              <Link href="/articles/research/how-to-read-papers" legacyBehavior>
                <a className="group block p-6 bg-gray-50 rounded-lg border transition-colors hover:bg-white hover:border-gray-300 hover:shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">大量の論文を効率的に読む！文献レビューの進め方とノート術</h3>
                  <p className="mt-2 text-gray-600">優れた論文を書くには、まず優れた論文を読むことから。戦略的な論文の読み方を解説します。</p>
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

export default AcademicWritingBasicsPage;