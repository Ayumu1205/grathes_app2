import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiFilePlus } from 'react-icons/fi'
import useSWR from 'swr'
import { fetcher } from '../../utils'
import { Loading } from '@/components/UiParts'

type ThesisProps = {
  id: number;
  title: string;
  chapters:[]
}
type ChapterProps = {
  id: number;
  title: string;
  sections:[]
}
type SectionProps = {
  id: number;
  title: string;
  
}

export default function ThesisPage() {
  const router = useRouter()
  const url = process.env.NEXT_PUBLIC_FRONT + '/api/thesis'

  // SWRでデータ取得
  const { data, error, isLoading } = useSWR(url, fetcher)

  const handleDelete = async (id: number) => {
    if (!confirm('本当に削除しますか？')) return

    try {
      await fetch(`${process.env.NEXT_PUBLIC_FRONT}/api/thesis/${id}`, { method: 'DELETE' })
      // mutateでキャッシュを更新

      // indexページに遷移
      router.push('/thesis')
    } catch (err) {
      console.error(err)
    }
  }

  if (error) return <div>データ取得エラー</div>
  if (isLoading) return <Loading />

  const theses = data?.allThesis ?? []

  return (
    <main className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">あなたの論文ライブラリ</h1>
      <p className="text-gray-600 text-center mb-12 max-w-xl">
        作成した論文やドキュメントを一覧で確認したり、新しい論文を簡単に作成できます。
      </p>

      <div className="flex flex-wrap justify-center gap-8 w-full">
        {theses.map((thesis: ThesisProps) => (
          <div
            key={thesis.id}
            className="relative bg-white rounded-2xl shadow-md p-8 max-w-md w-full h-[600px] hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <button
              onClick={() => handleDelete(thesis.id)}
              className="absolute top-4 right-4 text-xs text-white bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center z-20"
            >
              ×
            </button>

            <div className="flex-1 overflow-hidden relative z-0">
              <h2 className="text-xl font-bold text-center mb-8">{thesis.title}</h2>
              {thesis.chapters.map((chapter: ChapterProps, idx) => (
                <div key={idx} className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    第{idx + 1}章 {chapter.title}
                  </h3>
                  {chapter.sections.length > 0 ? (
                    <ul className="space-y-1 pl-4">
                      {chapter.sections.map((section: SectionProps, sidx) => (
                        <li key={sidx} className="text-gray-600">
                          {idx + 1}.{sidx + 1} {section.title}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 pl-4">まだセクションがありません</p>
                  )}
                </div>
              ))}
            </div>

            <div className="absolute bottom-20 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-0" />
            <div className="relative z-10">
              <button
                onClick={() => router.push(`/thesis/${thesis.id}`)}
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors duration-200"
              >
                詳しく見る
              </button>
            </div>
          </div>
        ))}

        <Link href="/thesis/new">
          <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-8 max-w-md w-full h-[600px] cursor-pointer hover:shadow-xl transition-shadow duration-300">
            <FiFilePlus className="text-6xl text-gray-400 mb-4" />
            <span className="text-lg font-semibold text-gray-600">新規作成</span>
            <p className="text-gray-500 text-center mt-4">ここをクリックして新しい論文を作成できます。</p>
          </div>
        </Link>
      </div>
    </main>
  )
}
