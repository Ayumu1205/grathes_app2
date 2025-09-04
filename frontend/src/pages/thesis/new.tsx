import { useRouter } from 'next/router'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css'

export default function WrittingCreate() {
  const router = useRouter()
  const [chapters, setChapters] = useState([
    {
      title: '',
      sections: ['', ''],
      description: '', // 章の説明文
      sectionDescriptions: ['', ''], // 節ごとの説明文
    },
  ])

  const [modal, setModal] = useState({ type: null, chapterIndex: null, sectionIndex: null })

  // モーダルを開く
  const openModal = (type: any, chapterIndex: any, sectionIndex = null) => {
    setModal({ type, chapterIndex, sectionIndex })
  }

  // モーダルを閉じる
  const closeModal = () => {
    setModal({ type: null, chapterIndex: null, sectionIndex: null })
  }

  // 入力を更新
  const handleInputChange = (chapterIndex: any, sectionIndex: any, value: any) => {
    const newChapters = [...chapters]
    if (sectionIndex === null) {
      newChapters[chapterIndex].title = value
    } else {
      newChapters[chapterIndex].sections[sectionIndex] = value
    }
    setChapters(newChapters)
  }

  // 説明文を更新
  const handleDescriptionChange = (value: any) => {
    const newChapters = [...chapters]
    if (modal.type === 'chapter') {
      newChapters[modal.chapterIndex].description = value
    } else if (modal.type === 'section') {
      newChapters[modal.chapterIndex].sectionDescriptions[modal.sectionIndex] = value
    }
    setChapters(newChapters)
  }

  // 章追加
  const addChapter = () => {
    setChapters([...chapters, { title: '', sections: [], description: '', sectionDescriptions: [] }])
  }

  // 節追加
  const addSection = (chapterIndex) => {
    const newChapters = [...chapters]
    newChapters[chapterIndex].sections.push('')
    newChapters[chapterIndex].sectionDescriptions.push('')
    setChapters(newChapters)
  }

  // 章削除
  const removeChapter = (chapterIndex) => {
    const newChapters = chapters.filter((_, i) => i !== chapterIndex)
    setChapters(newChapters)
  }

  // 節削除
  const removeSection = (chapterIndex, sectionIndex) => {
    const newChapters = [...chapters]
    newChapters[chapterIndex].sections.splice(sectionIndex, 1)
    newChapters[chapterIndex].sectionDescriptions.splice(sectionIndex, 1)
    setChapters(newChapters)
  }

  const saveThesis = async () => {
    const chaptersForApi = chapters.map((ch) => ({
      title: ch.title,
      description: ch.description,
      sections: ch.sections.map((s, i) => ({
        title: s,
        description: ch.sectionDescriptions[i] || '',
      })),
    }))

    const res = await fetch('/api/thesis/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: '腸内環境を測定するカプセルデバイス',
        chapters: chaptersForApi,
      }),
    })
    const data = await res.json()
    console.log('保存結果:', data)
    if (res.ok) {
      // 保存成功したらindexページに遷移
      router.push('/thesis')
    }
  }

  return (
    <>
      <div className="mt-12 flex justify-center">
        <fieldset className="flex flex-col justify-center fieldset bg-base-200 border-base-300 rounded-box shadow-md p-4">
          <legend className="fieldset-legend">論文構成</legend>

          {chapters.map((chapter, chapterIndex) => {
            const chapterNumber = chapterIndex + 1
            return (
              <div key={chapterIndex} className="mb-6 border-b pb-4">
                {/* 章 */}
                <div className="flex items-center gap-2">
                  <label className="label">第{chapterNumber}章</label>
                  <button type="button" onClick={() => removeChapter(chapterIndex)} className="btn btn-xs btn-error">
                    削除
                  </button>
                  <button
                    type="button"
                    onClick={() => openModal('chapter', chapterIndex)}
                    className="btn btn-xs btn-secondary"
                  >
                    詳細
                  </button>
                </div>
                <input
                  type="text"
                  placeholder={`章タイトルを入力`}
                  value={chapter.title}
                  onChange={(e) => handleInputChange(chapterIndex, null, e.target.value)}
                  className="h-[40px] input input-bordered input-info w-[1000px]"
                />

                {/* 節 */}
                {chapter.sections.map((section, sectionIndex) => {
                  const sectionNumber = `${chapterNumber}.${sectionIndex + 1}`
                  return (
                    <div key={sectionIndex} className="mt-2 flex items-center gap-2">
                      <label className="label">{sectionNumber}</label>
                      <input
                        type="text"
                        placeholder="節タイトルを入力"
                        value={section}
                        onChange={(e) => handleInputChange(chapterIndex, sectionIndex, e.target.value)}
                        className="h-[40px] input input-bordered input-info w-[900px]"
                      />
                      <button
                        type="button"
                        onClick={() => removeSection(chapterIndex, sectionIndex)}
                        className="btn btn-xs btn-error"
                      >
                        削除
                      </button>
                      <button
                        type="button"
                        onClick={() => openModal('section', chapterIndex, sectionIndex)}
                        className="btn btn-xs btn-secondary"
                      >
                        詳細
                      </button>
                    </div>
                  )
                })}
                <div className="w-full flex justify-end">
                  <button
                    type="button"
                    onClick={() => addSection(chapterIndex)}
                    className=" btn btn-sm btn-primary mt-2"
                  >
                    節を追加
                  </button>
                </div>
              </div>
            )
          })}

          <button type="button" onClick={addChapter} className="btn btn-primary mt-4">
            章を追加
          </button>
          <button onClick={saveThesis} className="mt-8 btn btn-primary">
            保存する
          </button>
        </fieldset>

        {/* モーダル */}
        {modal.type && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[600px] shadow-xl">
              {/* ここが構文集 */}
              <div className="mb-4 p-2 border rounded bg-gray-100 text-sm text-gray-700">
                <h3 className="font-bold mb-1">Markdown & 数式 構文集</h3>
                <ul className="list-disc list-inside">
                  <li><code># 見出し1</code></li>
                  <li><code>## 見出し2</code></li>
                  <li><code>- 箇条書き</code></li>
                  <li><code>**太字**</code></li>
                  <li>数式（インライン）：<code>$E=mc^2$</code></li>
                  <li>数式（ブロック）：<code>\[ \int_0^1 x^2 dx \]</code></li>
                  <li>中央揃え（HTML使用）：<code>&lt;p align="center"&gt;中央テキスト&lt;/p&gt;</code></li>
                </ul>
              </div>
              <h2 className="text-lg font-bold mb-4">
                {modal.type === 'chapter'
                  ? `第${modal.chapterIndex + 1}章 の詳細`
                  : `${modal.chapterIndex + 1}.${modal.sectionIndex + 1} の詳細`}
              </h2>
              <textarea
                className="textarea textarea-bordered w-full h-40"
                placeholder="Markdownで説明文を入力（数式もOK）"
                value={
                  modal.type === 'chapter'
                    ? chapters[modal.chapterIndex].description
                    : chapters[modal.chapterIndex].sectionDescriptions[modal.sectionIndex]
                }
                onChange={(e) => handleDescriptionChange(e.target.value)}
              />

              <div className="mt-4 p-2 border rounded bg-gray-50">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {modal.type === 'chapter'
                    ? chapters[modal.chapterIndex].description
                    : chapters[modal.chapterIndex].sectionDescriptions[modal.sectionIndex]}
                </ReactMarkdown>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={closeModal} className="btn btn-sm">
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
