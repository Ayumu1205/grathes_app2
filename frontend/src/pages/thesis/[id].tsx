import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import {Loading, ChecklistIcon,ArrowLeftIcon,PencilIcon ,ImageIcon } from "../../components/UiParts"
import { fetcher } from '@/utils';

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// --- 型定義 (変更なし) ---
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
// ★ [変更] Sidebar用のpropsを拡張 (モバイル対応)
interface SidebarViewerProps {
  isOpen: boolean;
  onClose: () => void;
  thesisId: number | string;
  chapters: Chapter[];
  references: Reference[];
  onNavigate: (chapterIndex: number | null, sectionIndex?: number | null, specialSection?: string | null) => void;
  selected: SelectedState | null;
  onOpenTodo: () => void;
  onOpenImagePlan: () => void;
}
interface EditorPanelViewerProps { title: string; chapters: Chapter[]; references: Reference[]; }

// --- 表示用コンポーネント ---

const TodoModalViewer = ({ isOpen, onClose, text }: TodoModalViewerProps) => {
  if (!isOpen) return null;
  return (
    // ★ [変更] モーダルにpaddingを追加
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">画像・データ挿入計画リスト</h2>
        <div className="overflow-y-auto max-h-[60vh]">
          <table className="w-full table-auto border-collapse">
            {/* ★ [修正] theadを追加 */}
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th className="px-2 py-2 w-12 text-center">完了</th>
                <th className="px-4 py-2 text-left">挿入箇所</th>
                <th className="px-4 py-2 text-left">内容</th>
              </tr>
            </thead>
            {/* ★ [修正] tbodyとデータマッピング処理を追加 */}
            <tbody>
              {list && list.length > 0 ? list.map(item => (
                <tr key={item.id} className="border-b">
                  <td className="px-2 py-2 text-center">
                    <input type="checkbox" checked={item.done} disabled />
                  </td>
                  <td className="px-4 py-2">{getLocationText(item.location)}</td>
                  <td className="px-4 py-2">{item.description}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    計画はありません。
                  </td>
                </tr>
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

// ★ [変更] Sidebarをコンポーネントとして分離し、レスポンシブ対応
const SidebarViewer = ({ isOpen, onClose, thesisId, chapters, references, onNavigate, selected, onOpenTodo, onOpenImagePlan }: SidebarViewerProps) => {
  // モバイルで項目をクリックしたらサイドバーを閉じる処理を追加
  const handleNavigationClick = (chapterIndex: number | null, sectionIndex: number | null = null, specialSection: string | null = null) => {
    onNavigate(chapterIndex, sectionIndex, specialSection);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* aside本体のz-indexを z-50 から z-30 に変更 */}
      <aside className={`
      fixed lg:static inset-y-0 left-0 z-30
      w-full max-w-xs h-screen flex flex-col
      bg-gray-100 border-r p-4 pt-16 lg:pt-24
      transform transition-transform duration-300 ease-in-out
      lg:w-1/4 lg:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
        <button onClick={onClose} aria-label="メニューを閉じる" className="lg:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800">
          <CloseIcon />
        </button>

        <h2 className="font-bold mb-4 flex-shrink-0">論文構成</h2>
        <div className="flex-grow overflow-y-auto pr-2">
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapter.id || chapterIndex} className="mb-4">
              <button
                className={`w-full text-left px-2 py-1 rounded h-[25px] overflow-hidden ${selected?.type === 'chapter' && selected.chapterIndex === chapterIndex ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
                onClick={() => handleNavigationClick(chapterIndex)}
              >
                第{chapterIndex + 1}章 {chapter.title}
              </button>
              <div className="ml-4">
                {chapter.sections.map((section, sectionIndex) => (
                  <button
                    key={section.id || sectionIndex}
                    className={`w-full text-left px-2 py-1 rounded text-sm h-[25px] overflow-hidden ${selected?.type === 'section' && selected.chapterIndex === chapterIndex && selected.sectionIndex === sectionIndex ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                    onClick={() => handleNavigationClick(chapterIndex, sectionIndex)}
                  >
                    {chapterIndex + 1}.{sectionIndex + 1} {section.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {references && references.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-300">
              <button
                className={`w-full text-left px-2 py-1 rounded font-semibold ${selected?.type === 'references' ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
                onClick={() => handleNavigationClick(null, null, 'references')}
              >
                参考文献
              </button>
            </div>
          )}
        </div>
        <div className="flex-shrink-0 pt-4 border-t border-gray-200 space-y-2">
          <button onClick={onOpenTodo} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 border transition-colors"><ChecklistIcon /> Todoリスト</button>
          <button onClick={onOpenImagePlan} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 border transition-colors"><ImageIcon /> 挿入計画リスト</button>
          <Link href={`/thesis/edit/${thesisId}`} legacyBehavior>
            <a className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-400 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-500 transition-colors"><PencilIcon /> 論文を編集する</a>
          </Link>
          <Link href="/thesis/dashboard" legacyBehavior>
            <a className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gray-600 text-white font-semibold rounded-lg shadow-sm hover:bg-gray-700 transition-colors"><ArrowLeftIcon /> 一覧に戻る</a>
          </Link>
        </div>
      </aside>
    </>
  );
};

// ★ [変更] EditorPanelをコンポーネントとして分離
const EditorPanelViewer = ({ title, chapters, references }: EditorPanelViewerProps) => (
  <div className="mt-24 flex-1 p-4 sm:p-8 overflow-y-auto pt-24 bg-white">
    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 md:mb-16 text-center">{title}</h1>
    {chapters.map((chapter, chapterIndex) => (
      <section key={chapter.id || chapterIndex} id={`chapter-${chapterIndex}`} className="mb-12 scroll-mt-24">
        <div className="flex items-baseline mb-4 pb-2 border-b">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800"><span className="text-gray-500 mr-2">第{chapterIndex + 1}章</span>{chapter.title}</h2>
        </div>
        <div className="prose max-w-none whitespace-pre-wrap mb-8">{chapter.description}</div>
        {chapter.sections.map((section, sectionIndex) => (
          <section key={section.id || sectionIndex} id={`section-${chapterIndex}-${sectionIndex}`} className="mb-8 scroll-mt-24">
            <div className="flex items-baseline mb-2">
              <h3 className="text-lg md:text-xl font-semibold text-gray-700"><span className="text-gray-500 mr-2">{chapterIndex + 1}.{sectionIndex + 1}</span>{section.title}</h3>
            </div>
            <div className="prose max-w-none whitespace-pre-wrap">{section.description}</div>
          </section>
        ))}
      </section>
    ))}
    {references && references.length > 0 && (
      <section id="references" className="mt-16 pt-8 border-t-2 border-gray-400 scroll-mt-24">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">参考文献</h2>
        <div className="prose max-w-none whitespace-pre-wrap">
          {references.map((ref, index) => (<p key={ref.id || index}>{ref.title}</p>))}
        </div>
      </section>
    )}
  </div>
);

// --- メインコンポーネント ---
export default function ThesisViewer() {
  const router = useRouter();
  const { id } = router.query;
  const [selected, setSelected] = useState<SelectedState | null>(null);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [isImagePlanModalOpen, setIsImagePlanModalOpen] = useState(false);
  // ★ [変更] サイドバーの開閉状態を管理するstate
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data, error, isLoading } = useSWR<ThesisData>(id ? `/api/thesis/${id}` : null, fetcher);

  const handleNavigation = (chapterIndex: number | null, sectionIndex: number | null = null, specialSection: string | null = null) => {
    // ... 実装は変更なし ...
  };

  if (isLoading || !id) return <Loading />;
  if (error) return <p className="text-center mt-10">エラーが発生しました。</p>;
  if (!data) return <p className="text-center mt-10">論文が見つかりません。</p>;

  return (
    // ★ [変更] レスポンシブレイアウトのコンテナ
    <div className="relative flex flex-col lg:flex-row w-full h-screen bg-gray-50">
      {/* ★ [変更] モバイル用のハンバーガーメニューボタン */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        aria-label="メニューを開く"
        className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-white rounded-full shadow-md text-gray-700"
      >
        <MenuIcon />
      </button>

      {/* ★ [変更] 分離したSidebarViewerコンポーネントを呼び出す */}
      <SidebarViewer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        thesisId={id as string}
        chapters={data.chapters}
        references={data.references}
        onNavigate={handleNavigation}
        selected={selected}
        onOpenTodo={() => setIsTodoModalOpen(true)}
        onOpenImagePlan={() => setIsImagePlanModalOpen(true)}
      />

      {/* ★ [変更] 分離したEditorPanelViewerコンポーネントを呼び出す */}
      <main className="w-full flex-1 h-screen overflow-y-auto">
        <EditorPanelViewer
          title={data.title}
          chapters={data.chapters}
          references={data.references}
        />
      </main>

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