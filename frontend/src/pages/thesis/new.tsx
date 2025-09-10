import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from 'react';
import { TrashIcon,PlusIcon,SendIcon,ChecklistIcon,ImageIcon } from '@/components/UiParts';
import { ReactNode } from 'react';

const CloseIcon = ({ className = "h-6 w-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const MenuIcon = ({ className = "h-6 w-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);


interface ChapterState {
  title: string;
  description: string;
  sections: string[];
  sectionDescriptions: string[];
}

interface ImagePlanItem {
  id: number;
  done: boolean;
  location: string;
  description: string;
}

interface SelectedState {
  type: 'chapter' | 'section' | 'references';
  chapterIndex?: number;
  sectionIndex?: number;
}

// --- Reusable UI Components Props ---

interface ActionButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

interface IconButtonProps {
  onClick: () => void;
  'aria-label': string;
  children: ReactNode;
}

interface AutoSizingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number;
}

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  onTextChange: (value: string) => void;
}

interface ImagePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  list: ImagePlanItem[];
  onListChange: (list: ImagePlanItem[]) => void;
  chapters: ChapterState[];
}


// --- Reusable UI Components ---
const ActionButton = ({ onClick, children, className = 'text-blue-700 bg-blue-100 hover:bg-blue-200' }: ActionButtonProps) => (
  <button onClick={onClick} className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${className}`}>
    <PlusIcon />
    {children}
  </button>
);

const IconButton = ({ onClick, 'aria-label': ariaLabel, children }: IconButtonProps) => (
  <button onClick={onClick} className="ml-2 p-1.5 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-red-100 hover:text-red-600 transition-colors" aria-label={ariaLabel}>
    {children}
  </button>
);

const AutoSizingTextarea = ({ minRows = 1, ...props }: AutoSizingTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { if (textareaRef.current) { textareaRef.current.style.height = 'auto'; const scrollHeight = textareaRef.current.scrollHeight; textareaRef.current.style.height = `${scrollHeight}px`; } }, [props.value]);
  return <textarea ref={textareaRef} rows={minRows} {...props} />;
};

const TodoModal = ({ isOpen, onClose, text, onTextChange }: TodoModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg" onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Todoリスト</h2>
        <AutoSizingTextarea className="w-full p-3 border rounded-md" value={text} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onTextChange(e.target.value)} minRows={10} placeholder="タスクやメモを記入..." />
        <div className="text-right mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">閉じる</button>
        </div>
      </div>
    </div>
  );
};
const ImagePlanModal = ({ isOpen, onClose, list, onListChange, chapters }: ImagePlanModalProps) => {
  if (!isOpen) return null;
  const handleItemChange = (itemId: number, field: keyof ImagePlanItem, value: string | boolean) => { onListChange(list.map(item => item.id === itemId ? { ...item, [field]: value } : item)); };
  const handleAddItem = () => { const newItem: ImagePlanItem = { id: Date.now(), done: false, location: '0', description: '' }; onListChange([...list, newItem]); };
  const handleDeleteItem = (itemId: number) => { onListChange(list.filter(item => item.id !== itemId)); };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">画像・データ挿入計画リスト</h2>
        {/* ★ [変更] テーブルをコンテナで囲み、小さい画面で横スクロール可能にする */}
        <div className="overflow-auto max-h-[60vh]">
          <table className="w-full table-auto border-collapse min-w-[600px]">
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr>
                <th className="px-2 py-2 w-12 text-center">完了</th>
                <th className="px-4 py-2 text-left">挿入箇所</th>
                <th className="px-4 py-2 text-left">内容</th>
                <th className="px-2 py-2 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {list.map(item => (
                <tr key={item.id} className="border-b">
                  <td className="px-2 py-2 text-center"><input type="checkbox" checked={item.done} onChange={(e) => handleItemChange(item.id, 'done', e.target.checked)} /></td>
                  <td className="px-4 py-2">
                    <select value={item.location} onChange={(e) => handleItemChange(item.id, 'location', e.target.value)} className="w-full p-2 rounded-md appearance-none focus:outline-none bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 bg-no-repeat bg-right pr-8 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22/%3E%3C/svg%3E')]">
                      {chapters.map((chapter, chapterIndex) => (
                        <optgroup key={chapterIndex} label={`第${chapterIndex + 1}章 ${chapter.title}`}>
                          <option value={`${chapterIndex}`}>{`章全体`}</option>
                          {chapter.sections.map((section, sectionIndex) => (<option key={sectionIndex} value={`${chapterIndex}-${sectionIndex}`}>{`${chapterIndex + 1}.${sectionIndex + 1} ${section}`}</option>))}
                        </optgroup>
                      ))}
                      <option value="references">参考文献</option>
                    </select>
                  </td>
                  <td className="px-4 py-2"><input type="text" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} className="w-full p-1 border rounded-md" placeholder="グラフ、図、引用など..." /></td>
                  <td className="px-2 py-2 text-center"><IconButton onClick={() => handleDeleteItem(item.id)} aria-label="行を削除"><TrashIcon /></IconButton></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4"><ActionButton onClick={handleAddItem} className="text-gray-700 bg-gray-200 hover:bg-gray-300">行を追加</ActionButton></div>
        <div className="text-right mt-4"><button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">閉じる</button></div>
      </div>
    </div>
  );
};
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  thesisTitle: string;
  onThesisTitleChange: (title: string) => void;
  chapters: ChapterState[];
  selected: SelectedState | null;
  onNavigate: (chapterIndex: number | null, sectionIndex?: number | null, specialSection?: "references" | null) => void;
  onAddChapter: (index: number) => void;
  onAddSection: (chapterIndex: number) => void;
  onDeleteChapter: (chapterIndex: number) => void;
  onDeleteSection: (chapterIndex: number, sectionIndex: number) => void;
  onSubmit: () => void;
  onOpenTodo: () => void;
  onOpenImagePlan: () => void;
}


interface EditorPanelProps {
  chapters: ChapterState[];
  references: string;
  onInputChange: (chapterIndex: number, sectionIndex: number | null, value: string) => void;
  onDescriptionChange: (chapterIndex: number, sectionIndex: number | null, value: string) => void;
  onReferencesChange: (value: string) => void;
}


// --- Main Feature Components ---
const Sidebar = ({ isOpen, onClose, thesisTitle, onThesisTitleChange, chapters, selected, onNavigate, onAddChapter, onAddSection, onDeleteChapter, onDeleteSection, onSubmit, onOpenTodo, onOpenImagePlan }: SidebarProps) => (
  <>
    {/* ★ [変更] モバイル表示時にサイドバーの外側をクリックしたときに閉じるためのオーバーレイ */}
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
      {/* ★ [変更] モバイル用の閉じるボタン */}
      <button onClick={onClose} aria-label="メニューを閉じる" className="lg:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800">
        <CloseIcon />
      </button>

      <div className='flex-shrink-0 z-30'>
        <h2 className="font-bold mb-2">論文タイトル</h2>
        <input
          type="text"
          className="w-full p-2 rounded-md border border-gray-300"
          value={thesisTitle}
          onChange={(e) => onThesisTitleChange(e.target.value)}
          placeholder="論文タイトルを入力..."
        />
      </div>
      <div className="flex-grow overflow-y-auto pr-2 mt-4 pt-4 border-t">
        <h2 className="font-bold mb-4 flex-shrink-0">論文構成</h2>
        {chapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="mb-4">
            <div className="flex items-center justify-between">
              <button className={`flex-grow text-left px-2 py-1 rounded h-[25px] flex items-center overflow-hidden ${selected?.type === 'chapter' && selected.chapterIndex === chapterIndex ? 'bg-blue-200' : 'hover:bg-gray-200'}`} onClick={() => { onNavigate(chapterIndex); onClose(); }}>第{chapterIndex + 1}章 {chapter.title}</button>
              <IconButton onClick={() => onDeleteChapter(chapterIndex)} aria-label="章を削除"><TrashIcon /></IconButton>
            </div>
            <div className="ml-4">
              {chapter.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="flex items-center justify-between">
                  <button className={`flex-grow text-left px-2 py-1 rounded text-sm h-[25px] overflow-hidden ${selected?.type === 'section' && selected.chapterIndex === chapterIndex && selected.sectionIndex === sectionIndex ? 'bg-blue-100' : 'hover:bg-gray-200'}`} onClick={() => { onNavigate(chapterIndex, sectionIndex); onClose(); }}>{chapterIndex + 1}.{sectionIndex + 1} {section}</button>
                  <IconButton onClick={() => onDeleteSection(chapterIndex, sectionIndex)} aria-label="節を削除"><TrashIcon /></IconButton>
                </div>
              ))}
              <div className="mt-2 flex items-center justify-end space-x-2">
                <ActionButton onClick={() => onAddChapter(chapterIndex + 1)}>章を追加</ActionButton>
                <ActionButton onClick={() => onAddSection(chapterIndex)}>節を追加</ActionButton>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-4 pt-4 border-t border-gray-300">
          <button className={`w-full text-left px-2 py-1 rounded font-semibold ${selected?.type === 'references' ? 'bg-blue-200' : 'hover:bg-gray-200'}`} onClick={() => { onNavigate(null, null, 'references'); onClose(); }}>参考文献</button>
        </div>
      </div>
      <div className="flex-shrink-0 pt-4 border-t border-gray-200 space-y-2">
        <button onClick={onOpenTodo} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 border transition-colors"><ChecklistIcon /> To-doリスト</button>
        <button onClick={onOpenImagePlan} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 border transition-colors"><ImageIcon /> 挿入計画リスト</button>
        <button onClick={onSubmit} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-green-100 text-green-700 font-semibold rounded-lg shadow-sm hover:bg-green-200 transition-colors"><SendIcon /> 論文を保存する</button>
      </div>
    </aside>
  </>
);
const EditorPanel = ({ chapters, references, onInputChange, onDescriptionChange, onReferencesChange }: EditorPanelProps) => (
  <div className="flex-1 p-4 sm:p-8 overflow-y-auto pt-24 mt-12">
    {chapters.map((chapter, chapterIndex) => (
      <div key={chapterIndex} id={`chapter-${chapterIndex}`} className="mb-10 scroll-mt-24">
        <div className="flex items-center w-full p-4 mb-2 rounded-lg bg-white hover:bg-gray-100 focus-within:bg-gray-50 transition-colors duration-200">
          <span className="w-[100px] text-2xl font-bold text-gray-500 mr-2">第{chapterIndex + 1}章</span>
          <input type="text" className="w-full text-2xl font-bold bg-transparent focus:outline-none" placeholder="章のタイトル" value={chapter.title} onChange={(e) => onInputChange(chapterIndex, null, e.target.value)} />
        </div>
        <AutoSizingTextarea className="w-full p-4 mb-6 resize-none rounded-lg bg-white hover:bg-gray-100 focus-within:bg-gray-50 transition-colors duration-200" placeholder="章の説明文を入力" value={chapter.description} onChange={(e) => onDescriptionChange(chapterIndex, null, e.target.value)} minRows={3} />
        {chapter.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} id={`section-${chapterIndex}-${sectionIndex}`} className="mb-6 scroll-mt-24">
            <div className="flex items-center w-full p-4 mb-2 rounded-lg bg-white hover:bg-gray-100 focus-within:bg-gray-50 transition-colors duration-200">
              <span className="w-[50px] text-lg font-semibold text-gray-500 mr-2">{chapterIndex + 1}.{sectionIndex + 1}</span>
              <input type="text" className="w-full text-lg font-semibold bg-transparent focus:outline-none" placeholder="節のタイトル" value={section} onChange={(e) => onInputChange(chapterIndex, sectionIndex, e.target.value)} />
            </div>
            <AutoSizingTextarea className="w-full p-4 resize-none rounded-lg bg-white hover:bg-gray-100 focus-within:bg-gray-50 transition-colors duration-200" placeholder="節の説明文を入力" value={chapter.sectionDescriptions[sectionIndex]} onChange={(e) => onDescriptionChange(chapterIndex, sectionIndex, e.target.value)} minRows={5} />
          </div>
        ))}
      </div>
    ))}
    <div id="references" className="mt-16 pt-8 border-t-2 border-gray-300 scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">参考文献</h2>
      <AutoSizingTextarea className="w-full p-4 text-base leading-relaxed bg-white hover:bg-gray-100 focus:bg-gray-50 focus:outline-none transition-colors duration-200 rounded-lg" placeholder="参考文献をリスト形式で入力" value={references} onChange={(e) => onReferencesChange(e.target.value)} minRows={10} />
    </div>
  </div>
);
interface SelectedState {
  type: 'chapter' | 'section' | 'references';
  chapterIndex?: number; // '?' を付けて任意にする
  sectionIndex?: number; // '?' を付けて任意にする
}

// --- Main App Component ---
export default function ThesisEditor() {
  const router = useRouter()
  const [thesisTitle, setThesisTitle] = useState('卒業論文テーマ');
  const [chapters, setChapters] = useState([{ title: '序論', description: 'ここに「序論」の概要を記述します。', sections: ['研究背景', "研究目的"], sectionDescriptions: ['研究背景について述べます。', "研究目的について述べます。"] }, { title: '実験方法', description: '本研究で用いた実験方法について詳述します。', sections: ['材料', '装置'], sectionDescriptions: ['使用した試薬やサンプルについて記述します。', '使用した測定装置のモデル名や設定について記述します。'] }, { title: '結果と考察', description: '', sections: [], sectionDescriptions: [] }, { title: '結論', description: '', sections: [], sectionDescriptions: [] }, { title: '謝辞', description: '', sections: [], sectionDescriptions: [] },]);
  const [references, setReferences] = useState('1. Author, A. A. (2025). ...');
  const [selected, setSelected] = useState<SelectedState | null>(null);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [todoText, setTodoText] = useState('');
  const [isImagePlanModalOpen, setIsImagePlanModalOpen] = useState(false);
  const [imagePlanList, setImagePlanList] = useState([{ id: 1, done: false, location: '1-0', description: '実験装置の全体図' }, { id: 2, done: true, location: '2-1', description: '結果を示すグラフ' },]);
  // ★ [変更] サイドバーの開閉状態を管理するstate
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- Handlers ---
  const handleInputChange = (chapterIndex: number, sectionIndex: number | null, value: string) => { setChapters(prev => { const newChapters = JSON.parse(JSON.stringify(prev)); if (sectionIndex === null) { newChapters[chapterIndex].title = value; } else { newChapters[chapterIndex].sections[sectionIndex] = value; } return newChapters; }); };
  const handleDescriptionChange = (chapterIndex: number, sectionIndex: number | null, value: string) => { setChapters(prev => { const newChapters = JSON.parse(JSON.stringify(prev)); if (sectionIndex === null) { newChapters[chapterIndex].description = value; } else { newChapters[chapterIndex].sectionDescriptions[sectionIndex] = value; } return newChapters; }); };
  const handleAddChapter = (insertAtIndex: number) => { const newChapter = { title: '新しい章', description: '', sections: ['新しい節'], sectionDescriptions: [''] }; setChapters(prev => { const newChapters = [...prev]; newChapters.splice(insertAtIndex, 0, newChapter); return newChapters; }); };
  const handleDeleteChapter = (chapterIndex: number) => { if (window.confirm(`第${chapterIndex + 1}章を本当に削除しますか？`)) { setChapters(prev => prev.filter((_, index) => index !== chapterIndex)); setSelected(null); } };
  const handleAddSection = (chapterIndex: number) => { setChapters(prev => { const newChapters = JSON.parse(JSON.stringify(prev)); newChapters[chapterIndex].sections.push('新しい節'); newChapters[chapterIndex].sectionDescriptions.push(''); return newChapters; }); };
  const handleDeleteSection = (chapterIndex: number, sectionIndex: number) => { if (window.confirm(`第${chapterIndex + 1}.${sectionIndex + 1}節を本当に削除しますか？`)) { setChapters(prev => { const newChapters = JSON.parse(JSON.stringify(prev)); newChapters[chapterIndex].sections.splice(sectionIndex, 1); newChapters[chapterIndex].sectionDescriptions.splice(sectionIndex, 1); return newChapters; }); setSelected(null); } };
  const handleNavigation = (
    chapterIndex: number | null,
    sectionIndex: number | null = null,
    specialSection: 'references' | null = null
  ) => {
    let elementId;
    if (specialSection) {
      setSelected({ type: specialSection });
      elementId = specialSection;
    } else if (chapterIndex !== null && sectionIndex === null) { // chapterIndexがnullでないこともチェック
      setSelected({ type: 'chapter', chapterIndex });
      elementId = `chapter-${chapterIndex}`;
    } else if (chapterIndex !== null && sectionIndex !== null) { // 両方がnullでないことをチェック
      setSelected({ type: 'section', chapterIndex, sectionIndex });
      elementId = `section-${chapterIndex}-${sectionIndex}`;
    }

    // elementIdがundefinedになる可能性を避けるため、チェックを追加
    if (elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleSubmit = async () => {
    const chaptersForApi = chapters.map((chapter) => ({ title: chapter.title, description: chapter.description, progress: 0, sections: chapter.sections.map((sectionTitle, index) => ({ title: sectionTitle, description: chapter.sectionDescriptions[index] || '', })), }));
    const referencesForApi = references.split('\n').filter(line => line.trim() !== '').map(line => ({ title: line, url: '', }));

    const thesisData = { title: thesisTitle, chapters: chaptersForApi, references: referencesForApi, todoText: todoText, imagePlanList: imagePlanList, };

    try {
      const res = await fetch('/api/thesis/new', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(thesisData), });
      const data = await res.json();
      console.log('保存結果:', data);

      if (res.ok) {
        alert('論文が正常に保存されました！');
        router.push("/thesis/dashboard")
      } else {
        alert(`保存に失敗しました: ${data.message || '不明なエラー'}`);
      }
    } catch (error) {
      console.error('保存処理中にエラーが発生しました:', error);
      alert('通信エラーが発生しました。');
    }
  };

  return (
    // ★ [変更] flex-col lg:flex-row で画面サイズに応じてレイアウトを切り替える
    <div className="flex flex-col lg:flex-row w-full h-screen bg-gray-50">
      {/* ★ [変更] モバイル用のハンバーガーメニューボタン */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        aria-label="メニューを開く"
        className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-white rounded-full shadow-md text-gray-700"
      >
        <MenuIcon />
      </button>

      <Sidebar
        isOpen={isSidebarOpen} // ★ [変更] stateをpropsで渡す
        onClose={() => setIsSidebarOpen(false)} // ★ [変更] 閉じる関数をpropsで渡す
        thesisTitle={thesisTitle}
        onThesisTitleChange={setThesisTitle}
        chapters={chapters}
        selected={selected}
        onNavigate={handleNavigation}
        onAddChapter={handleAddChapter}
        onAddSection={handleAddSection}
        onDeleteChapter={handleDeleteChapter}
        onDeleteSection={handleDeleteSection}
        onSubmit={handleSubmit}
        onOpenTodo={() => setIsTodoModalOpen(true)}
        onOpenImagePlan={() => setIsImagePlanModalOpen(true)}
      />
      {/* ★ [変更] EditorPanelをmainタグで囲み、レイアウトの主体とする */}
      <main className="w-full flex-1 h-screen overflow-y-auto">
        <EditorPanel
          chapters={chapters}
          references={references}
          onInputChange={handleInputChange}
          onDescriptionChange={handleDescriptionChange}
          onReferencesChange={setReferences}
        />
      </main>

      <TodoModal
        isOpen={isTodoModalOpen}
        onClose={() => setIsTodoModalOpen(false)}
        text={todoText}
        onTextChange={setTodoText}
      />
      <ImagePlanModal
        isOpen={isImagePlanModalOpen}
        onClose={() => setIsImagePlanModalOpen(false)}
        list={imagePlanList}
        onListChange={setImagePlanList}
        chapters={chapters}
      />
    </div>
  );
}