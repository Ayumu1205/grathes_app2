import Link from 'next/link';
import { useRouter } from 'next/router';
import  { useState } from 'react';
import useSWR from 'swr';

// --- ダミーのコンポーネントと関数 (本来は外部ファイルから読み込みます) ---
const Loading = () => <div className="w-full h-screen flex items-center justify-center">データを読み込んでいます...</div>;
const fetcher = (url) => fetch(url).then((res) => res.json());


// --- Icon Components ---
const ChecklistIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);
const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
);
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);
const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
);


// --- Reusable Read-only Modal Components ---
const TodoModalViewer = ({ isOpen, onClose, text }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Todoリスト</h2>
        <div className="w-full p-3 border rounded-md bg-gray-50 h-64 overflow-y-auto whitespace-pre-wrap">
          {text || '記載がありません。'}
        </div>
        <div className="text-right mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">閉じる</button>
        </div>
      </div>
    </div>
  );
};
const ImagePlanModalViewer = ({ isOpen, onClose, list, chapters }) => {
  if (!isOpen) return null;
  const getLocationText = (location) => {
    if (location === 'references') return '参考文献';
    if (!chapters) return '読み込み中...';
    const parts = location.split('-');
    if (parts.length === 1) {
      const chapIndex = parseInt(parts[0]);
      return chapters[chapIndex] ? `第${chapIndex + 1}章 ${chapters[chapIndex].title}` : '不明な箇所';
    }
    const chapIndex = parseInt(parts[0]);
    const secIndex = parseInt(parts[1]);
    const chapter = chapters[chapIndex];
    if (chapter && chapter.sections[secIndex]) {
      return `${chapIndex + 1}.${secIndex + 1} ${chapter.sections[secIndex].title}`;
    }
    return '不明な箇所';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">画像・データ挿入計画リスト</h2>
        <div className="overflow-y-auto max-h-[60vh]">
          <table className="w-full table-auto border-collapse">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th className="px-2 py-2 w-12 text-center">完了</th>
                <th className="px-4 py-2 text-left">挿入箇所</th>
                <th className="px-4 py-2 text-left">内容</th>
              </tr>
            </thead>
            <tbody>
              {list && list.length > 0 ? list.map(item => (
                <tr key={item.id} className="border-b">
                  <td className="px-2 py-2 text-center"><input type="checkbox" checked={item.done} disabled /></td>
                  <td className="px-4 py-2">{getLocationText(item.location)}</td>
                  <td className="px-4 py-2">{item.description}</td>
                </tr>
              )) : (
                <tr><td colSpan="3" className="text-center py-4 text-gray-500">計画はありません。</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="text-right mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">閉じる</button>
        </div>
      </div>
    </div>
  );
};


// --- Main Feature Components (Read-only) ---
const SidebarViewer = ({ chapters, references, onNavigate, selected, onOpenTodo, onOpenImagePlan }) => {
  const router = useRouter();
  const { id } = router.query; 
  return (
  <div className="w-1/4 bg-gray-100 border-r p-4 pt-24 flex flex-col">
    <h2 className="font-bold mb-4 flex-shrink-0">論文構成</h2>
    <div className="flex-grow overflow-y-auto pr-2">
      {chapters.map((chapter, chapterIndex) => (
        <div key={chapter.id || chapterIndex} className="mb-4">
          <div className="flex items-center justify-between">
            <button
              className={`flex-grow text-left px-2 py-1 rounded h-[25px] overflow-hidden ${selected?.type === 'chapter' && selected.chapterIndex === chapterIndex ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
              onClick={() => onNavigate(chapterIndex)}
            >
              第{chapterIndex + 1}章 {chapter.title}
            </button>
          </div>
          <div className="ml-4">
            {chapter.sections.map((section, sectionIndex) => (
              <div key={section.id || sectionIndex} className="flex items-center justify-between">
                <button
                  className={`flex-grow text-left px-2 py-1 rounded text-sm h-[25px] overflow-hidden ${selected?.type === 'section' && selected.chapterIndex === chapterIndex && selected.sectionIndex === sectionIndex ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                  onClick={() => onNavigate(chapterIndex, sectionIndex)}
                >
                  {chapterIndex + 1}.{sectionIndex + 1} {section.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      {references && references.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-300">
          <button
            className={`w-full text-left px-2 py-1 rounded font-semibold ${selected?.type === 'references' ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
            onClick={() => onNavigate(null, null, 'references')}
          >
            参考文献
          </button>
        </div>
      )}
    </div>
    <div className="flex-shrink-0 pt-4 border-t border-gray-200 space-y-2">
      <button onClick={onOpenTodo} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 border transition-colors"><ChecklistIcon /> Todoリスト</button>
      <button onClick={onOpenImagePlan} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 border transition-colors"><ImageIcon /> 挿入計画リスト</button>
      {/* ★★★ 修正点: legacyBehaviorプロパティを追加し、<a>タグで囲む ★★★ */}
      {/* ★★★ 修正点: legacyBehaviorプロパティを追加 ★★★ */}
      <Link href={`/thesis/edit/${id}`} legacyBehavior>
        <a className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-400 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-700 transition-colors">
          <PencilIcon />
          論文を編集する
        </a>
      </Link>
      <Link href="/thesis/dashboard" legacyBehavior>
        <a className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gray-600 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-700 transition-colors">
          <ArrowLeftIcon />
          一覧に戻る
        </a>
      </Link>

    </div>
  </div>
  )
};
const EditorPanelViewer = ({ title, chapters, references }) => (
  <div className="flex-1 p-8 overflow-y-auto pt-24">
    <h1 className="text-4xl font-bold text-gray-900 mb-16 text-center">{title}</h1>
    {chapters.map((chapter, chapterIndex) => (
      <section key={chapter.id || chapterIndex} id={`chapter-${chapterIndex}`} className="mb-12 scroll-mt-24">
        <div className="flex items-baseline mb-4 pb-2 border-b">
          <h2 className="text-2xl font-bold text-gray-800"><span className="text-gray-500 mr-2">第{chapterIndex + 1}章</span>{chapter.title}</h2>
        </div>
        <div className="prose max-w-none whitespace-pre-wrap mb-8">{chapter.description}</div>
        {chapter.sections.map((section, sectionIndex) => (
          <section key={section.id || sectionIndex} id={`section-${chapterIndex}-${sectionIndex}`} className="mb-8 scroll-mt-24">
            <div className="flex items-baseline mb-2">
              <h3 className="text-lg font-semibold text-gray-700"><span className="text-gray-500 mr-2">{chapterIndex + 1}.{sectionIndex + 1}</span>{section.title}</h3>
            </div>
            <div className="prose max-w-none whitespace-pre-wrap">{section.description}</div>
          </section>
        ))}
      </section>
    ))}
    {references && references.length > 0 && (
      <section id="references" className="mt-16 pt-8 border-t-2 border-gray-400 scroll-mt-24">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">参考文献</h2>
        <div className="prose max-w-none whitespace-pre-wrap">
          {references.map((ref, index) => (<p key={ref.id || index}>{ref.title}</p>))}
        </div>
      </section>
    )}
  </div>
);


export default function ThesisViewer() {
  const router = useRouter();
  const { id } = router.query;
  const [selected, setSelected] = useState(null);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [isImagePlanModalOpen, setIsImagePlanModalOpen] = useState(false);

  // SWRでデータ取得。idが利用可能になってからフェッチを開始。
  const { data, error, isLoading } = useSWR(id ? `/api/thesis/${id}` : null, fetcher);

  const handleNavigation = (chapterIndex, sectionIndex = null, specialSection = null) => {
    let elementId;
    if (specialSection) {
      setSelected({ type: specialSection });
      elementId = specialSection;
    } else if (sectionIndex === null) {
      setSelected({ type: 'chapter', chapterIndex });
      elementId = `chapter-${chapterIndex}`;
    } else {
      setSelected({ type: 'section', chapterIndex, sectionIndex });
      elementId = `section-${chapterIndex}-${sectionIndex}`;
    }
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isLoading || !id) return <Loading />;
  if (error) return <p className="text-center mt-10">エラーが発生しました。</p>;
  if (!data) return <p className="text-center mt-10">論文が見つかりません。</p>;

  return (
    <div className="relative flex w-full h-screen">
      <SidebarViewer
        chapters={data.chapters}
        references={data.references}
        onNavigate={handleNavigation}
        selected={selected}
        onOpenTodo={() => setIsTodoModalOpen(true)}
        onOpenImagePlan={() => setIsImagePlanModalOpen(true)}
      />
      <EditorPanelViewer
        title={data.title}
        chapters={data.chapters}
        references={data.references}
      />
      <TodoModalViewer
        isOpen={isTodoModalOpen}
        onClose={() => setIsTodoModalOpen(false)}
        text={data.todoText}
      />
      <ImagePlanModalViewer
        isOpen={isImagePlanModalOpen}
        onClose={() => setIsImagePlanModalOpen(false)}
        list={data.imagePlanList}
        chapters={data.chapters}
      />


    </div>
  );
}