import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

// アイコンをインポートしていると仮定
// import { ArrowRightIcon } from '@heroicons/react/outline'; // 例

const ArrowRightIcon = () => (
  <svg className="inline-block w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
);


const articleCategories = [
  {
    category: '準備・計画編 🗓️',
    description: '多くの学生が最初に知りたい、スタートダッシュを決めるためのテーマです。',
    articles: [
      {
        category_url: "preparation",
        slug: 'how-to-decide-theme',
        title: '「面白い」が見つかる！卒業論文のテーマを決める3つのステップ',
      },
      {
        category_url: "preparation",
        slug: 'schedule-and-task-management',
        title: '挫折しない！卒業論文の年間スケジュールとタスク管理術',
      },
      {
        category_url: "preparation",
        slug: 'overall-roadmap',
        title: 'これさえ読めばOK！卒業論文の全体像と完成までのロードマップ',
      },
      {
        category_url: "preparation",
        slug: 'communication-with-supervisor',
        title: '指導教員との賢い付き合い方｜テーマ相談から進捗報告まで',
      },
    ],
  },
  {
    category: '調査・情報収集編 📚',
    description: '本格的な研究活動で役立つ、効率化と品質向上に関するテーマです。',
    articles: [
      {
        category_url: "research",
        slug: 'how-to-search-papers',
        title: '先行研究はどこで探す？おすすめ論文検索サイトと効率的な探し方',
      },
      {
        category_url: "research",
        slug: 'how-to-read-papers',
        title: '大量の論文を効率的に読む！文献レビューの進め方とノート術',
      },
      {
        category_url: "research",
        slug: 'reference-management-with-excel',
        title: '集めた資料が迷子にならない！参考文献の神Excel管理術',
      },
    ],
  },
  {
    category: '執筆編 ✍️',
    description: '具体的な書き方のテクニックや、執筆中の悩みを解決するテーマです。',
    articles: [
      {
        category_url: "writing",
        slug: 'where-to-start-writing',
        title: '「何から書く？」を解決。論文執筆で最初に着手すべき章とは',
      },
      {
        category_url: "writing",
        slug: 'academic-writing-basics',
        title: '理系・文系別「伝わる」論文の文章術｜アカデミックライティング入門',
      },
      {
        category_url: "writing",
        slug: 'citation-rules-and-copyrights',
        title: 'これだけは押さえたい！引用の基本ルールと著作権の注意点',
      },
    ],
  },
  {
    category: '仕上げ・提出編 ✅',
    description: '論文の完成度を高め、最後の発表までをサポートするテーマです。',
    articles: [
      {
        category_url: "complete",
        slug: 'final-checklist',
        title: '提出前に必ず確認！卒業論文の最終チェックリスト10項目',
      },
      {
        category_url: "complete",
        slug: 'presentation-tips',
        title: '卒論発表会を乗り切る！分かりやすいスライド作成と質疑応答のコツ',
      },
    ],
  },
];


// ★ [新デザイン] ポップなカードコンポーネント
const ArticleCard = ({ category_url, slug, title, category }) => (
  <Link href={`/articles/${category_url}/${slug}`} legacyBehavior>
    <a className="group block bg-white rounded-2xl border border-gray-200 transition-all duration-300 ease-in-out hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="p-6">
        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-1 rounded-full">{category}</span>
        <h3 className="mt-4 text-xl font-bold text-gray-800">{title}</h3>
        <p className="mt-4 text-sm font-semibold text-blue-600 flex items-center">
          記事を読む
          <ArrowRightIcon />
        </p>
      </div>
    </a>
  </Link>
);

const ThesisTipsIndexPage = () => {
  return (
    <>
      <div className="mt-16 ">
        <title>卒業論文TIPS 記事一覧 | 〇〇（アプリ名）</title>
        <meta name="description" content="卒業論文のテーマ決めからスケジュール管理、執筆、提出まで、論文作成の全工程をサポートする記事一覧です。" />
      </div>

      <div className="bg-slate-50 min-h-screen">

        {/* ★ [新デザイン] 明るいヒーローセクション */}
        <div className="bg-white">
          <div className="max-w-6xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 lg:gap-16 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                  卒論、<span className="text-blue-600">何から始める？</span>
                </h1>
                <p className="mt-6 max-w-2xl mx-auto lg:mx-0 text-lg text-gray-600">
                  テーマ決めから提出まで、もう迷わない。あなたの卒業論文を、計画的に、そして圧倒的に効率よく進めるための知識がここにあります。
                </p>
                <div className="mt-8">
                  <a href="#article-list" className="inline-block bg-blue-600 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg transition-transform duration-200 hover:scale-105">
                    記事一覧へ
                  </a>
                </div>
              </div>

              {/* ▼ ここにイラストを配置するスペース ▼ */}
              <div className="hidden lg:block mt-10 lg:mt-0">
                
                <div className="bg-gray-100 w-full h-80 rounded-2xl overflow-hidden flex items-center justify-center">
                  <img src="/articles/main.png" className="h-full object-cover  " alt="論文執筆のイラスト" />
                </div>
              </div>
              {/* ▲ ここにイラストを配置するスペース ▲ */}

            </div>
          </div>
        </div>

        <main id="article-list" className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {articleCategories.map((category) => (
              <section key={category.category}>

                {/* ★ [新デザイン] アイコン付きのカテゴリ見出し */}
                <div className="flex items-center gap-x-4 mb-8">
                  <div className="flex-shrink-0 w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                    
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">{category.category}</h2>
                    <p className="mt-1 text-slate-500">{category.description}</p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.articles.map((article) => (
                    <ArticleCard key={article.slug} {...article} category={category.category} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default ThesisTipsIndexPage;