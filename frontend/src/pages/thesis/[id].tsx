import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import {Loading, ChecklistIcon,ArrowLeftIcon,PencilIcon ,ImageIcon } from "../../components/UiParts"
import { fetcher } from '@/pages/utils'; // パスは実際の環境に合わせてください



interface Section { id: number; title: string; description: string; }
interface Chapter { id: number; title: string; description: string; sections: Section[]; }
interface Reference { id: number; title: string; url: string | null; }
interface ImagePlanItem { id: number; done: boolean; location: string; description: string; }
interface ThesisData {
  id: number;
  title: string;
  chapters: Chapter[];
  references: Reference[];
  todoText: string | null;
  imagePlanList: ImagePlanItem[];
}
interface SelectedState { type: 'chapter' | 'section' | 'references'; chapterIndex?: number; sectionIndex?: number; }

// --- コンポーネントのPropsの型定義 ---
interface TodoModalViewerProps { isOpen: boolean; onClose: () => void; text: string | null; }
interface ImagePlanModalViewerProps { isOpen: boolean; onClose: () => void; list: ImagePlanItem[]; chapters: Chapter[]; }
interface SidebarViewerProps { chapters: Chapter[]; references: Reference[]; onNavigate: (chapterIndex: number | null, sectionIndex?: number | null, specialSection?: string | null) => void; selected: SelectedState | null; onOpenTodo: () => void; onOpenImagePlan: () => void; }
interface EditorPanelViewerProps { title: string; chapters: Chapter[]; references: Reference[]; }

const TodoModalViewer = ({ isOpen, onClose, text }: TodoModalViewerProps) => {
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
const ImagePlanModalViewer = ({ isOpen, onClose, list, chapters }: ImagePlanModalViewerProps) => {
  if (!isOpen) return null;
  const getLocationText = (location: string) => {
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
                <tr><td colSpan={3} className="text-center py-4 text-gray-500">計画はありません。</td></tr>
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


/**
 * メインコンポーネント: データを表示
 */
export default function ThesisViewer() {
  const router = useRouter();
  const { id } = router.query;
  const [selected, setSelected] = useState<SelectedState | null>(null);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [isImagePlanModalOpen, setIsImagePlanModalOpen] = useState(false);

  const { data, error, isLoading } = useSWR<ThesisData>(id ? `/api/thesis/${id}` : null, fetcher);

  const handleNavigation = (chapterIndex: number | null, sectionIndex: number | null = null, specialSection: string | null = null) => {
    let elementId;
    if (specialSection) {
      setSelected({ type: 'references' });
      elementId = specialSection;
    } else if (chapterIndex !== null && sectionIndex === null) {
      setSelected({ type: 'chapter', chapterIndex });
      elementId = `chapter-${chapterIndex}`;
    } else if (chapterIndex !== null && sectionIndex !== null) {
      setSelected({ type: 'section', chapterIndex, sectionIndex });
      elementId = `section-${chapterIndex}-${sectionIndex}`;
    }
    const element = document.getElementById(elementId as string);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isLoading || !id) return <Loading />;
  if (error) return <p className="text-center mt-10">エラーが発生しました。</p>;
  if (!data) return <p className="text-center mt-10">論文が見つかりません。</p>;

  const { title, chapters, references, todoText, imagePlanList } = data;

  return (
    <div className="relative flex w-full h-screen">
      {/* --- Sidebar --- */}
      <div className="w-1/4 bg-gray-100 border-r p-4 pt-24 flex flex-col">
        <h2 className="font-bold mb-4 flex-shrink-0">論文構成</h2>
        <div className="flex-grow overflow-y-auto pr-2">
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapter.id || chapterIndex} className="mb-4">
              <div className="flex items-center justify-between">
                <button
                  className={`flex-grow text-left px-2 py-1 rounded h-[25px] overflow-hidden ${selected?.type === 'chapter' && selected.chapterIndex === chapterIndex ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
                  onClick={() => handleNavigation(chapterIndex)}
                >
                  第{chapterIndex + 1}章 {chapter.title}
                </button>
              </div>
              <div className="ml-4">
                {chapter.sections.map((section, sectionIndex) => (
                  <div key={section.id || sectionIndex} className="flex items-center justify-between">
                    <button
                      className={`flex-grow text-left px-2 py-1 rounded text-sm h-[25px] overflow-hidden ${selected?.type === 'section' && selected.chapterIndex === chapterIndex && selected.sectionIndex === sectionIndex ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                      onClick={() => handleNavigation(chapterIndex, sectionIndex)}
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
                onClick={() => handleNavigation(null, null, 'references')}
              >
                参考文献
              </button>
            </div>
          )}
        </div>
        <div className="flex-shrink-0 pt-4 border-t border-gray-200 space-y-2">
          <button onClick={() => setIsTodoModalOpen(true)} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 border transition-colors"><ChecklistIcon /> Todoリスト</button>
          <button onClick={() => setIsImagePlanModalOpen(true)} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 border transition-colors"><ImageIcon /> 挿入計画リスト</button>
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

      {/* --- Editor Panel --- */}
      <div className="flex-1 p-8 overflow-y-auto pt-24">
        <h1 className="text-4xl font-bold text-gray-900 mb-16 text-center">{title}</h1>
        {chapters.map((chapter, chapterIndex) => (
          <section key={chapter.id || chapterIndex} id={`chapter-${chapterIndex}`} className="mb-12 scroll-mt-24">
            <div className="flex items-baseline mb-4 pb-2 border-b">
              <h2 className="text-2xl font-bold text-gray-800"><span className="text-gray-500 mr-2">第{chapterIndex + 1}章</span>{chapter.title}</h2>
            </div>
            <div className="prose max-w-none whitespace-pre-wrap mb-8">{chapter.description}</div>
            {chapter.sections.map((section, sectionIndex) => (
              <section key={section.id || sectionIndex} id={`section-${chapterIndex}-${sectionIndex}`} className="ml-8 mb-8 scroll-mt-24">
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

      {/* --- Modals --- */}
      <TodoModalViewer
        isOpen={isTodoModalOpen}
        onClose={() => setIsTodoModalOpen(false)}
        text={todoText}
      />
      <ImagePlanModalViewer
        isOpen={isImagePlanModalOpen}
        onClose={() => setIsImagePlanModalOpen(false)}
        list={imagePlanList}
        chapters={chapters}
      />
    </div>
  );
}
