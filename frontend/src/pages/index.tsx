import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      {/* Hero Section */}
      <div
        className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
      >
        {/* 背景：画像 + オーバーレイ + グラデーション */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/hero.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/50" />

        {/* 光の演出 */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[32rem] w-[42rem] rounded-full blur-3xl opacity-40 bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400" />

        {/* コンテンツ */}
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="mb-6 text-5xl md:text-6xl font-bold text-white tracking-tight">
            GraThes
          </h1>
          <p className="mb-6 text-lg text-gray-200">
            卒論や修士論文で「何から手をつければいいか分からない…」と悩んでいませんか？
            <br className="hidden md:block" />
            GraPlanなら、研究計画・進捗・構成をひとつの画面で管理でき、
            今日やるべきタスクがひと目で分かります。
          </p>
          <Link href="/thesis/dashboard">
          <button className="btn btn-primary btn-lg shadow-lg hover:scale-105 transition">
            今すぐ執筆をスタート
          </button>
          </Link>
        </div>
      </div>


      {/* Features Section */}
      <section className="relative py-24">
        {/* 背景：グリッド + グラデーション光 */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(90deg,rgba(0,0,0,.3)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,.3)_1px,transparent_1px)] bg-[size:22px_22px]"></div>
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-[42rem] rounded-full blur-3xl opacity-40 bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
              Features
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              GraPlanの <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">主要機能</span>
            </h2>
            <p className="mt-4 text-gray-600">
              計画・文献・学習支援まで、論文執筆をトータルでサポートします。
            </p>
          </div>

          {/* 3カラム */}
          <div className="grid md:grid-cols-3 gap-10">
            {/* 計画管理 */}
            <div className="rounded-2xl bg-white/80 backdrop-blur border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl grid place-items-center bg-blue-50 ring-1 ring-blue-100 overflow-hidden">
                  <Image src="/icon/schedule.png" alt="計画管理" width={50} height={50} className="h-14 w-14 pb-2" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">計画管理</h3>
              </div>
              <p className="mt-4 text-gray-600 leading-relaxed">
                論文の作業をタスクに分けてスケジュール化。進捗率や残り日数を自動集計し、研究を計画的に進められます。
              </p>
            </div>

            {/* 文献管理 */}
            <div className="rounded-2xl bg-white/80 backdrop-blur border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl grid place-items-center bg-indigo-50 ring-1 ring-indigo-100 overflow-hidden">
                  <Image src="/icon/book.png" alt="文献管理" width={50} height={50} className="h-20 w-20 pb-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">文献管理</h3>
              </div>
              <p className="mt-4 text-gray-600 leading-relaxed">
                文献リストの整理や引用チェックをサポート。参考文献の書式を自動生成し、正確で効率的な執筆を支援します。
              </p>
            </div>

            {/* 学習支援 */}
            <div className="rounded-2xl bg-white/80 backdrop-blur border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl grid place-items-center bg-pink-50 ring-1 ring-pink-100 overflow-hidden">
                  <Image src="/icon/study.png" alt="学習支援" width={50} height={50}  className="h-12 w-16" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">学習支援</h3>
              </div>
              <p className="mt-4 text-gray-600 leading-relaxed">
                執筆のコツや文章術、テンプレートなどを提供。研究初心者でもスムーズに論文執筆を進められます。
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* How It Works Section */}
      <section className="relative py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(90deg,rgba(0,0,0,.3)_1px,transparent_1px),linear-gradient(0deg,rgba(0,0,0,.3)_1px,transparent_1px)] bg-[size:22px_22px]"></div>
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-[42rem] rounded-full blur-3xl opacity-40 bg-gradient-to-r from-blue-300 via-indigo-300 to-cyan-300"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 ring-1 ring-blue-100">
              How it works
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              研究を進めながら <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">論文をスマート管理</span>
            </h2>
            <p className="mt-4 text-gray-600">
              進捗・ToDo・構成をひとつの画面で。研究の流れに合わせて情報を積み上げていけます。
            </p>
          </div>

          {/* タイムライン */}
          <ol className="relative md:grid md:grid-cols-3 md:gap-8">
            <span className="absolute left-6 top-10 bottom-10 w-[2px] bg-gradient-to-b from-blue-200 to-indigo-200 md:hidden" />

            {/* STEP 1 */}
            <li className="group relative md:static pl-16 md:pl-0 mb-10 md:mb-0">
              <div className="absolute md:static left-0 top-1">
                <span className="grid place-items-center h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/20 ring-4 ring-white">
                  1
                </span>
              </div>
              <div className="mt-3 md:mt-6 rounded-2xl bg-white/80 backdrop-blur border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl grid place-items-center bg-blue-50 ring-1 ring-blue-100 overflow-hidden">
                    <Image src="/icon/schedule.png" alt="計画管理" width={50} height={50} className="h-14 w-14 pb-2" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">研究計画と進捗を見える化</h3>
                </div>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  タスクを作成し、期限と目標文字数を設定。ダッシュボードで進捗率が自動集計され、
                  今日やるべきことに迷いません。
                </p>
              </div>
            </li>

            {/* STEP 2 */}
            <li className="group relative md:static pl-16 md:pl-0 mb-10 md:mb-0">
              <div className="absolute md:static left-0 top-1">
                <span className="grid place-items-center h-12 w-12 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-bold shadow-lg shadow-indigo-500/20 ring-4 ring-white">
                  2
                </span>
              </div>
              <div className="mt-3 md:mt-6 rounded-2xl bg-white/80 backdrop-blur border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl grid place-items-center bg-indigo-50 ring-1 ring-indigo-100 overflow-hidden">
                    <Image src="/icon/book.png" alt="文献管理" width={50} height={50} className="h-20 w-20 pb-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">ToDoで研究タスクを整理</h3>
                </div>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  文献調査・実験・図表作成などをToDo化。ドラフト中のメモもまとめて保存し、
                  終えたものはチェックで即反映。
                </p>
              </div>
            </li>

            {/* STEP 3 */}
            <li className="group relative md:static pl-16 md:pl-0">
              <div className="absolute md:static left-0 top-1">
                <span className="grid place-items-center h-12 w-12 rounded-full bg-gradient-to-br from-fuchsia-600 to-pink-600 text-white font-bold shadow-lg shadow-fuchsia-500/20 ring-4 ring-white">
                  3
                </span>
              </div>
              <div className="mt-3 md:mt-6 rounded-2xl bg-white/80 backdrop-blur border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl grid place-items-center bg-pink-50 ring-1 ring-pink-100 overflow-hidden">
                    <Image src="/icon/study.png" alt="学習支援" width={50} height={50} className="h-12 w-16" />                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">論文構成を記録・育てる</h3>
                </div>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  序論・方法・結果・考察を章節で管理し、各セクションに説明や素材の挿入予定をメモ。
                  章ごとの完成度を可視化できます。
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>


    </>
  )
}
