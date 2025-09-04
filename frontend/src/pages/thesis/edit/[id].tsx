// import { useRouter } from 'next/router';
// import { useState, useRef, useEffect, useMemo } from 'react';
// import useSWR from 'swr';
// import { TrashIcon, PlusIcon,SendIcon,ChecklistIcon,ImageIcon,GearIcon,Loading } from '@/components/UiParts';
// import { fetcher } from '@/pages/utils';
// import { ChapterState } from '@/type';


// // --- Main App Component ---
// export default function ThesisEditPage() {
//   const router = useRouter();
//   const {id} = router.query;

//   // --- States ---
//   const [thesisTitle, setThesisTitle] = useState('');
//   const [chapters, setChapters] = useState<ChapterState[]> ([]);
//   const [references, setReferences] = useState('');
//   const [selected, setSelected] = useState(null);
//   const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
//   const [todoText, setTodoText] = useState('');
//   const [isImagePlanModalOpen, setIsImagePlanModalOpen] = useState(false);
//   const [imagePlanList, setImagePlanList] = useState([]);
//   const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
//   const [targetWordCount, setTargetWordCount] = useState(20000);
//   const [deadline, setDeadline] = useState('');
//   const [wordCountWeight, setWordCountWeight] = useState(70);

//   // --- Data Fetching ---
//   const { data: thesisData, error, isLoading } = useSWR(id ? `/api/thesis/${id}` : null, fetcher);

//   // --- Effects ---
//   useEffect(() => {
//     if (thesisData) {
//       const chaptersFromDb = (thesisData.chapters || []).map(chapter => ({ title: chapter.title || '', description: chapter.description || '', sections: (chapter.sections || []).map(section => section.title || ''), sectionDescriptions: (chapter.sections || []).map(section => section.description || ''), }));
//       const referencesFromDb = (thesisData.references || []).map(ref => ref.title).join('\n');
//       setThesisTitle(thesisData.title || '');
//       setChapters(chaptersFromDb);
//       setReferences(referencesFromDb);
//       setTodoText(thesisData.todoText || '');
//       setImagePlanList(thesisData.imagePlanList || []);
//       setTargetWordCount(thesisData.targetWordCount || 20000);
//       setDeadline(thesisData.deadline || '');
//       setWordCountWeight(thesisData.wordCountWeight || 70);
//     }
//   }, [thesisData]);

//   const wordCount = useMemo(() => { let count = 0; (chapters || []).forEach(ch => { count += (ch.description || '').length; (ch.sectionDescriptions || []).forEach(desc => { count += (desc || '').length; }); }); count += (references || '').length; return count; }, [chapters, references]);

//   // --- Handlers ---
//   const handleInputChange = (chapterIndex: number, sectionIndex: number, value: number) => { setChapters(prev => { const newChapters = JSON.parse(JSON.stringify(prev)); if (sectionIndex === null) { newChapters[chapterIndex].title = value; } else { newChapters[chapterIndex].sections[sectionIndex] = value; } return newChapters; }); };
//   const handleDescriptionChange = (chapterIndex: number, sectionIndex: number, value: number) => { setChapters(prev => { const newChapters = JSON.parse(JSON.stringify(prev)); if (sectionIndex === null) { newChapters[chapterIndex].description = value; } else { newChapters[chapterIndex].sectionDescriptions[sectionIndex] = value; } return newChapters; }); };
//   const handleAddChapter = (insertAtIndex: number) => { const newChapter = { title: '新しい章', description: '', sections: ['新しい節'], sectionDescriptions: [''] }; setChapters(prev => { const newChapters = [...prev]; newChapters.splice(insertAtIndex, 0, newChapter); return newChapters; }); };
//   const handleDeleteChapter = (chapterIndex: number) => { if (window.confirm(`第${chapterIndex + 1}章を本当に削除しますか？`)) { setChapters(prev => prev.filter((_, index) => index !== chapterIndex)); setSelected(null); } };
//   const handleAddSection = (chapterIndex: number) => { setChapters(prev => { const newChapters = JSON.parse(JSON.stringify(prev)); newChapters[chapterIndex].sections.push('新しい節'); newChapters[chapterIndex].sectionDescriptions.push(''); return newChapters; }); };
//   const handleDeleteSection = (chapterIndex: number, sectionIndex: number) => { if (window.confirm(`第${chapterIndex + 1}.${sectionIndex + 1}節を本当に削除しますか？`)) { setChapters(prev => { const newChapters = JSON.parse(JSON.stringify(prev)); newChapters[chapterIndex].sections.splice(sectionIndex, 1); newChapters[chapterIndex].sectionDescriptions.splice(sectionIndex, 1); return newChapters; }); setSelected(null); } };
//   const handleNavigation = (chapterIndex: number, sectionIndex = null, specialSection = null) => { let elementId; if (specialSection) { setSelected({ type: specialSection }); elementId = specialSection; } else if (sectionIndex === null) { setSelected({ type: 'chapter', chapterIndex }); elementId = `chapter-${chapterIndex}`; } else { setSelected({ type: 'section', chapterIndex, sectionIndex }); elementId = `section-${chapterIndex}-${sectionIndex}`; } const element = document.getElementById(elementId); if (element) { element.scrollIntoView({ behavior: 'smooth', block: 'start' }); } };
//   const handleSaveSettings = (newSetting: numbers) => { setTargetWordCount(newSettings.targetWordCount); setDeadline(newSettings.deadline); setWordCountWeight(newSettings.wordCountWeight); };

//   const handleSubmit = async () => {
//     if (!id) return;
//     const chaptersForApi = chapters.map((chapter) => ({ title: chapter.title, description: chapter.description, sections: chapter.sections.map((sectionTitle, index) => ({ title: sectionTitle, description: chapter.sectionDescriptions[index] || '', })), }));
//     const referencesForApi = references.split('\n').filter(line => line.trim() !== '').map(line => ({ title: line, url: '', }));
//     const thesisDataToUpdate = {
//       title: thesisTitle,
//       chapters: chaptersForApi,
//       references: referencesForApi,
//       todoText: todoText,
//       imagePlanList: imagePlanList,
//       wordCount: wordCount,
//       targetWordCount: targetWordCount,
//       deadline: deadline ? new Date(deadline).toISOString() : null,
//       wordCountWeight: wordCountWeight,
//     };

//     try {
//       const res = await fetch(`/api/thesis/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(thesisDataToUpdate), });
//       const data = await res.json();
//       console.log('更新結果:', data);
//       if (res.ok) {
//         alert('論文が正常に更新されました！');
//         window.location.href = `/thesis/${id}`;
//       } else {
//         alert(`更新に失敗しました: ${data.message || '不明なエラー'}`);
//       }
//     } catch (error) {
//       console.error('更新処理中にエラーが発生しました:', error);
//       alert('通信エラーが発生しました。');
//     }
//   };

//   if (isLoading || !id || !thesisData) return <Loading />;
//   if (error) return <div>データ取得エラー</div>;

//   // --- ここからがJSX ---

//   const ActionButton = ({ onClick, children, className = 'text-blue-700 bg-blue-100 hover:bg-blue-200' }) => (<button onClick={onClick} className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${className}`}><PlusIcon />{children}</button>);
//   const IconButton = ({ onClick, 'aria-label': ariaLabel, children }) => (<button onClick={onClick} className="ml-2 p-1.5 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-red-100 hover:text-red-600 transition-colors" aria-label={ariaLabel}>{children}</button>);

//   const AutoSizingTextarea = ({ minRows = 1, ...props }) => {
//     const textareaRef = useRef(null);
//     useEffect(() => {
//       if (textareaRef.current) {
//         textareaRef.current.style.height = 'auto';
//         const scrollHeight = textareaRef.current.scrollHeight;
//         textareaRef.current.style.height = `${scrollHeight}px`;
//       }
//     }, [props.value]);
//     return <textarea ref={textareaRef} rows={minRows} {...props} />;
//   };

//   const TodoModal = ({ isOpen, onClose, text, onTextChange }) => { if (!isOpen) return null; return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}><div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}><h2 className="text-xl font-bold mb-4">Todoリスト</h2><AutoSizingTextarea className="w-full p-3 border rounded-md" value={text} onChange={(e) => onTextChange(e.target.value)} minRows={10} placeholder="タスクやメモを記入..." /><div className="text-right mt-4"><button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">閉じる</button></div></div></div>); };
//   const ImagePlanModal = ({ isOpen, onClose, list, onListChange, chapters }) => { if (!isOpen) return null; const handleItemChange = (itemId, field, value) => { onListChange(list.map(item => item.id === itemId ? { ...item, [field]: value } : item)); }; const handleAddItem = () => { const newItem = { id: Date.now(), done: false, location: '0', description: '' }; onListChange([...list, newItem]); }; const handleDeleteItem = (itemId) => { onListChange(list.filter(item => item.id !== itemId)); }; return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}><div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}><h2 className="text-xl font-bold mb-4">画像・データ挿入計画リスト</h2><div className="overflow-y-auto max-h-[60vh]"><table className="w-full table-auto border-collapse"><thead className="sticky top-0 bg-gray-100"><tr><th className="px-2 py-2 w-12 text-center">完了</th><th className="px-4 py-2 text-left">挿入箇所</th><th className="px-4 py-2 text-left">内容</th><th className="px-2 py-2 w-12"></th></tr></thead><tbody>{list.map(item => (<tr key={item.id} className="border-b"><td className="px-2 py-2 text-center"><input type="checkbox" checked={item.done} onChange={(e) => handleItemChange(item.id, 'done', e.target.checked)} /></td><td className="px-4 py-2"><select value={item.location} onChange={(e) => handleItemChange(item.id, 'location', e.target.value)} className="w-full p-2 rounded-md appearance-none focus:outline-none bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 bg-no-repeat bg-right pr-8 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22/%3E%3C/svg%3E')]">{chapters.map((chapter, chapterIndex) => (<optgroup key={chapterIndex} label={`第${chapterIndex + 1}章 ${chapter.title}`}><option value={`${chapterIndex}`}>{`章全体`}</option>{chapter.sections.map((section, sectionIndex) => (<option key={sectionIndex} value={`${chapterIndex}-${sectionIndex}`}>{`${chapterIndex + 1}.${sectionIndex + 1} ${section}`}</option>))}</optgroup>))}<option value="references">参考文献</option></select></td><td className="px-4 py-2"><input type="text" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} className="w-full p-1 border rounded-md" placeholder="グラフ、図、引用など..." /></td><td className="px-2 py-2 text-center"><IconButton onClick={() => handleDeleteItem(item.id)} aria-label="行を削除"><TrashIcon /></IconButton></td></tr>))}</tbody></table></div><div className="mt-4"><ActionButton onClick={handleAddItem} className="text-gray-700 bg-gray-200 hover:bg-gray-300">行を追加</ActionButton></div><div className="text-right mt-4"><button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">閉じる</button></div></div></div>); };
//   const Calendar = ({ value, onChange }) => { const [displayDate, setDisplayDate] = useState(value ? new Date(value) : new Date()); const selectedDate = value ? new Date(value) : null; const year = displayDate.getFullYear(); const month = displayDate.getMonth(); const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]; const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"]; const firstDayOfMonth = new Date(year, month, 1).getDay(); const daysInMonth = new Date(year, month + 1, 0).getDate(); const handlePrevMonth = () => setDisplayDate(new Date(year, month - 1, 1)); const handleNextMonth = () => setDisplayDate(new Date(year, month + 1, 1)); const isSameDay = (d1, d2) => d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate(); const today = new Date(); const calendarDays = Array(firstDayOfMonth).fill(null).map((_, i) => <div key={`empty-${i}`} className="w-10 h-10"></div>); for (let day = 1; day <= daysInMonth; day++) { const currentDate = new Date(year, month, day); const isSelected = isSameDay(currentDate, selectedDate); const isToday = isSameDay(currentDate, today); let buttonClasses = "w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"; if (isSelected) buttonClasses += " bg-blue-600 text-white font-bold"; else if (isToday) buttonClasses += " bg-blue-100 text-blue-600"; calendarDays.push(<div key={day} className="flex justify-center items-center"><button onClick={() => onChange(currentDate)} className={buttonClasses}>{day}</button></div>); } return (<div className="bg-white rounded-lg shadow-lg p-4 border w-80"><div className="flex justify-between items-center mb-4"><button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-100"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button><div className="font-semibold text-center">{year}年 {monthNames[month]}</div><button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-100"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7-7"></path></svg></button></div><div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">{daysOfWeek.map(day => <div key={day}>{day}</div>)}</div><div className="grid grid-cols-7 gap-1">{calendarDays}</div></div>); };
//   const SettingsModal = ({ isOpen, onClose, settings, onSave }) => { const [localSettings, setLocalSettings] = useState(settings); const [isCalendarOpen, setIsCalendarOpen] = useState(false); useEffect(() => { const formattedDeadline = settings.deadline ? new Date(settings.deadline).toISOString().split('T')[0] : ''; setLocalSettings({ ...settings, deadline: formattedDeadline }); }, [settings]); if (!isOpen) return null; const handleChange = (e) => { const { name, value, type } = e.target; setLocalSettings(prev => ({ ...prev, [name]: type === 'number' || type === 'range' ? parseInt(value, 10) : value })); }; const handleDateSelect = (date) => { const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0]; setLocalSettings(prev => ({ ...prev, deadline: dateString })); setIsCalendarOpen(false); }; const handleSave = () => { onSave(localSettings); onClose(); }; return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}><div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}><h2 className="text-xl font-bold mb-6">論文設定</h2><div className="space-y-4"><div><label htmlFor="targetWordCount" className="block text-sm font-medium text-gray-700">目標文字数</label><input type="number" id="targetWordCount" name="targetWordCount" value={localSettings.targetWordCount || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" /></div><div><label className="block text-sm font-medium text-gray-700">提出期限</label><div className="relative mt-1"><button onClick={() => setIsCalendarOpen(!isCalendarOpen)} className="input input-bordered w-full text-left pr-10">{localSettings.deadline ? new Date(localSettings.deadline).toLocaleDateString() : '日付を選択'}</button>{isCalendarOpen && (<div className="absolute top-full mt-2 z-20"><Calendar value={localSettings.deadline} onChange={handleDateSelect} /></div>)}</div></div><div><label htmlFor="wordCountWeight" className="block text-sm font-medium text-gray-700">進捗の重み付け (文字数: {localSettings.wordCountWeight}%)</label><input type="range" id="wordCountWeight" name="wordCountWeight" min="0" max="100" value={localSettings.wordCountWeight || 70} onChange={handleChange} className="mt-1 block w-full" /><div className="flex justify-between text-xs text-gray-500"><span>タスク重視</span><span>文字数重視</span></div></div></div><div className="text-right mt-6"><button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">設定を保存</button></div></div></div>); };

  
//   const wordCountProgress = (targetWordCount || 0) > 0 ? ((wordCount || 0) / (targetWordCount || 1)) * 100 : 0;
//   const safeImagePlanList = imagePlanList || [];
//   const totalImagePlans = safeImagePlanList.length;
//   const completedImagePlans = safeImagePlanList.filter(item => item.done).length;
//   const taskProgress = totalImagePlans > 0 ? (completedImagePlans / totalImagePlans) * 100 : 0;
//   const overallProgress = (wordCountProgress * ((wordCountWeight || 70) / 100)) + (taskProgress * ((100 - (wordCountWeight || 70)) / 100));
//   const progressBarColor = overallProgress >= 99 ? 'bg-green-500' : overallProgress > 70 ? 'bg-blue-500' : 'bg-yellow-500';

//   return (
//     <>
//     <div className="flex w-full h-screen">
//       {/* --- Sidebar --- */}
//       <div className="w-1/4 bg-gray-100 border-r p-4 pt-24 flex flex-col">
//         <div className='flex-shrink-0'>
//           <h2 className="font-bold mb-2">論文タイトル</h2>
//           <input type="text" className="w-full p-2 rounded-md border border-gray-300" value={thesisTitle} onChange={(e) => setThesisTitle(e.target.value)} placeholder="論文タイトルを入力..." />
//         </div>
//         <div className="flex-shrink-0 mt-4 pt-4 border-t">
//           <div className="flex justify-between items-center mb-1 text-sm"><span className="font-medium text-gray-600">総合進捗</span><span className="font-bold text-gray-800">{Math.round(overallProgress)}%</span></div>
//           <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2"><div className={`${progressBarColor} h-2.5 rounded-full transition-all duration-500 ease-out`} style={{ width: `${overallProgress}%` }}></div></div>
//           <div className="text-xs text-gray-500 text-center"><span>{(wordCount || 0).toLocaleString()} / {(targetWordCount || 0).toLocaleString()} 字</span></div>
//         </div>
//         <div className="flex-grow overflow-y-auto pr-2 mt-4 pt-4 border-t">
//           <h2 className="font-bold mb-4 flex-shrink-0">論文構成</h2>
//           {chapters.map((chapter, chapterIndex) => (
//             <div key={chapterIndex} className="mb-4">
//               <div className="flex items-center justify-between"><button className={`flex-grow text-left px-2 py-1 rounded h-[25px] flex items-center overflow-hidden ${selected?.type === 'chapter' && selected.chapterIndex === chapterIndex ? 'bg-blue-200' : 'hover:bg-gray-200'}`} onClick={() => handleNavigation(chapterIndex)}>第{chapterIndex + 1}章 {chapter.title}</button><IconButton onClick={() => handleDeleteChapter(chapterIndex)} aria-label="章を削除"><TrashIcon /></IconButton></div>
//               <div className="ml-4">{chapters[chapterIndex].sections.map((section, sectionIndex) => (<div key={sectionIndex} className="flex items-center justify-between"><button className={`flex-grow text-left px-2 py-1 rounded text-sm h-[25px] overflow-hidden ${selected?.type === 'section' && selected.chapterIndex === chapterIndex && selected.sectionIndex === sectionIndex ? 'bg-blue-100' : 'hover:bg-gray-200'}`} onClick={() => handleNavigation(chapterIndex, sectionIndex)}>{chapterIndex + 1}.{sectionIndex + 1} {section}</button><IconButton onClick={() => handleDeleteSection(chapterIndex, sectionIndex)} aria-label="節を削除"><TrashIcon /></IconButton></div>))}<div className="mt-2 flex items-center justify-end space-x-2"><ActionButton onClick={() => handleAddChapter(chapterIndex + 1)}>章を追加</ActionButton><ActionButton onClick={() => handleAddSection(chapterIndex)}>節を追加</ActionButton></div></div>
//             </div>
//           ))}
//           <div className="mt-4 pt-4 border-t border-gray-300"><button className={`w-full text-left px-2 py-1 rounded font-semibold ${selected?.type === 'references' ? 'bg-blue-200' : 'hover:bg-gray-200'}`} onClick={() => handleNavigation(null, null, 'references')}>参考文献</button></div>
//         </div>
//         <div className="flex-shrink-0 pt-4 border-t border-gray-200 space-y-2">
//           <button onClick={() => setIsSettingsModalOpen(true)} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 border transition-colors"><GearIcon /> 論文設定</button>
//           <button onClick={() => setIsTodoModalOpen(true)} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 border transition-colors"><ChecklistIcon /> To-doリスト</button>
//           <button onClick={() => setIsImagePlanModalOpen(true)} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 border transition-colors"><ImageIcon /> 挿入計画リスト</button>
//           <button onClick={handleSubmit} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-green-100 text-green-700 font-semibold rounded-lg shadow-sm hover:bg-green-200 transition-colors"><SendIcon /> 論文を更新する</button>
//         </div>
//       </div>

//       {/* --- EditorPanel --- */}
//       <div className="flex-1 p-8 overflow-y-auto pt-24">{chapters.map((chapter, chapterIndex) => (<div key={chapterIndex} id={`chapter-${chapterIndex}`} className="mb-10 scroll-mt-24"><div className="flex items-center w-full p-4 mb-2 rounded-lg bg-white hover:bg-gray-100 focus-within:bg-gray-50 transition-colors duration-200"><span className="text-2xl font-bold text-gray-500 mr-2">第{chapterIndex + 1}章</span><input type="text" className="w-full text-2xl font-bold bg-transparent focus:outline-none" placeholder="章のタイトル" value={chapter.title} onChange={(e) => handleInputChange(chapterIndex, null, e.target.value)} /></div><AutoSizingTextarea className="w-full p-4 mb-6 resize-none rounded-lg bg-white hover:bg-gray-100 focus-within:bg-gray-50 transition-colors duration-200" placeholder="章の説明文を入力" value={chapter.description} onChange={(e) => handleDescriptionChange(chapterIndex, null, e.target.value)} minRows={3} />{chapter.sections.map((section, sectionIndex) => (<div key={sectionIndex} id={`section-${chapterIndex}-${sectionIndex}`} className="ml-8 mb-6 scroll-mt-24"><div className="flex items-center w-full p-4 mb-2 rounded-lg bg-white hover:bg-gray-100 focus-within:bg-gray-50 transition-colors duration-200"><span className="text-lg font-semibold text-gray-500 mr-2">{chapterIndex + 1}.{sectionIndex + 1}</span><input type="text" className="w-full text-lg font-semibold bg-transparent focus:outline-none" placeholder="節のタイトル" value={section} onChange={(e) => handleInputChange(chapterIndex, sectionIndex, e.target.value)} /></div><AutoSizingTextarea className="w-full p-4 resize-none rounded-lg bg-white hover:bg-gray-100 focus-within:bg-gray-50 transition-colors duration-200" placeholder="節の説明文を入力" value={chapter.sectionDescriptions[sectionIndex]} onChange={(e) => handleDescriptionChange(chapterIndex, sectionIndex, e.target.value)} minRows={5} /></div>))}</div>))}<div id="references" className="mt-16 pt-8 border-t-2 border-gray-300 scroll-mt-24"><h2 className="text-2xl font-bold text-gray-700 mb-4">参考文献</h2><AutoSizingTextarea className="w-full p-4 text-base leading-relaxed bg-white hover:bg-gray-100 focus:bg-gray-50 focus:outline-none transition-colors duration-200 rounded-lg" placeholder="参考文献をリスト形式で入力" value={references} onChange={(e) => setReferences(e.target.value)} minRows={10} /></div></div>

//       {/* --- Modals --- */}
//       <TodoModal isOpen={isTodoModalOpen} onClose={() => setIsTodoModalOpen(false)} text={todoText} onTextChange={setTodoText} />
//       <ImagePlanModal isOpen={isImagePlanModalOpen} onClose={() => setIsImagePlanModalOpen(false)} list={imagePlanList} onListChange={setImagePlanList} chapters={chapters} />
//       <SettingsModal
//         isOpen={isSettingsModalOpen}
//         onClose={() => setIsSettingsModalOpen(false)}
//         settings={{ targetWordCount, deadline, wordCountWeight }}
//         onSave={handleSaveSettings}
//       />
//     </div>
//     </>
//   );
// }


import { useRouter } from 'next/router';
import { useState, useRef, useEffect , useMemo } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/pages/utils';


// --- ユーティリティ関数とアイコン ---

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
);
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);
const ChecklistIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);
const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
);
// ★ 設定ボタン用のアイコンを追加
const GearIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);



const EditorPanel = ({ chapters, references, onInputChange, onDescriptionChange, onReferencesChange }) => (<div className="flex-1 p-8 overflow-y-auto pt-24">{chapters.map((chapter, chapterIndex) => (<div key={chapterIndex} id={`chapter-${chapterIndex}`} className="mb-10 scroll-mt-24"><div className="flex items-center w-full p-4 mb-2 rounded-lg bg-white hover:bg-gray-100 focus-within:bg-gray-50 transition-colors duration-200"><span className="text-2xl font-bold text-gray-500 mr-2">第{chapterIndex + 1}章</span><input type="text" className="w-full text-2xl font-bold bg-transparent focus:outline-none" placeholder="章のタイトル" value={chapter.title} onChange={(e) => onInputChange(chapterIndex, null, e.target.value)} /></div><AutoSizingTextarea className="w-full p-4 mb-6 resize-none rounded-lg bg-white hover:bg-gray-100 focus-within:bg-gray-50 transition-colors duration-200" placeholder="章の説明文を入力" value={chapter.description} onChange={(e) => onDescriptionChange(chapterIndex, null, e.target.value)} minRows={3} />{chapter.sections.map((section, sectionIndex) => (<div key={sectionIndex} id={`section-${chapterIndex}-${sectionIndex}`} className="ml-8 mb-6 scroll-mt-24"><div className="flex items-center w-full p-4 mb-2 rounded-lg bg-white hover:bg-gray-100 focus-within:bg-gray-50 transition-colors duration-200"><span className="text-lg font-semibold text-gray-500 mr-2">{chapterIndex + 1}.{sectionIndex + 1}</span><input type="text" className="w-full text-lg font-semibold bg-transparent focus:outline-none" placeholder="節のタイトル" value={section} onChange={(e) => onInputChange(chapterIndex, sectionIndex, e.target.value)} /></div><AutoSizingTextarea className="w-full p-4 resize-none rounded-lg bg-white hover:bg-gray-100 focus-within:bg-gray-50 transition-colors duration-200" placeholder="節の説明文を入力" value={chapter.sectionDescriptions[sectionIndex]} onChange={(e) => onDescriptionChange(chapterIndex, sectionIndex, e.target.value)} minRows={5} /></div>))}</div>))}<div id="references" className="mt-16 pt-8 border-t-2 border-gray-300 scroll-mt-24"><h2 className="text-2xl font-bold text-gray-700 mb-4">参考文献</h2><AutoSizingTextarea className="w-full p-4 text-base leading-relaxed bg-white hover:bg-gray-100 focus:bg-gray-50 focus:outline-none transition-colors duration-200 rounded-lg" placeholder="参考文献をリスト形式で入力" value={references} onChange={(e) => onReferencesChange(e.target.value)} minRows={10} /></div></div>);


const Loading = () => <div className="w-full h-screen flex items-center justify-center">データを読み込んでいます...</div>;


// --- 再利用可能なUIコンポーネント ---
const ActionButton = ({ onClick, children, className = 'text-blue-700 bg-blue-100 hover:bg-blue-200' }) => (<button onClick={onClick} className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${className}`}><PlusIcon />{children}</button>);
const IconButton = ({ onClick, 'aria-label': ariaLabel, children }) => (<button onClick={onClick} className="ml-2 p-1.5 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-red-100 hover:text-red-600 transition-colors" aria-label={ariaLabel}>{children}</button>);
const AutoSizingTextarea = ({ minRows = 1, ...props }) => { const textareaRef = useRef(null); useEffect(() => { if (textareaRef.current) { textareaRef.current.style.height = 'auto'; const scrollHeight = textareaRef.current.scrollHeight; textareaRef.current.style.height = `${scrollHeight}px`; } }, [props.value]); return <textarea ref={textareaRef} rows={minRows} {...props} />; };
const TodoModal = ({ isOpen, onClose, text, onTextChange }) => { if (!isOpen) return null; return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}><div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}><h2 className="text-xl font-bold mb-4">Todoリスト</h2><AutoSizingTextarea className="w-full p-3 border rounded-md" value={text} onChange={(e) => onTextChange(e.target.value)} minRows={10} placeholder="タスクやメモを記入..." /><div className="text-right mt-4"><button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">閉じる</button></div></div></div>); };
const ImagePlanModal = ({ isOpen, onClose, list, onListChange, chapters }) => { if (!isOpen) return null; const handleItemChange = (itemId, field, value) => { onListChange(list.map(item => item.id === itemId ? { ...item, [field]: value } : item)); }; const handleAddItem = () => { const newItem = { id: Date.now(), done: false, location: '0', description: '' }; onListChange([...list, newItem]); }; const handleDeleteItem = (itemId) => { onListChange(list.filter(item => item.id !== itemId)); }; return (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}><div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}><h2 className="text-xl font-bold mb-4">画像・データ挿入計画リスト</h2><div className="overflow-y-auto max-h-[60vh]"><table className="w-full table-auto border-collapse"><thead className="sticky top-0 bg-gray-100"><tr><th className="px-2 py-2 w-12 text-center">完了</th><th className="px-4 py-2 text-left">挿入箇所</th><th className="px-4 py-2 text-left">内容</th><th className="px-2 py-2 w-12"></th></tr></thead><tbody>{list.map(item => (<tr key={item.id} className="border-b"><td className="px-2 py-2 text-center"><input type="checkbox" checked={item.done} onChange={(e) => handleItemChange(item.id, 'done', e.target.checked)} /></td><td className="px-4 py-2"><select value={item.location} onChange={(e) => handleItemChange(item.id, 'location', e.target.value)} className="w-full p-2 rounded-md appearance-none focus:outline-none bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 bg-no-repeat bg-right pr-8 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22/%3E%3C/svg%3E')]">{chapters.map((chapter, chapterIndex) => (<optgroup key={chapterIndex} label={`第${chapterIndex + 1}章 ${chapter.title}`}><option value={`${chapterIndex}`}>{`章全体`}</option>{chapter.sections.map((section, sectionIndex) => (<option key={sectionIndex} value={`${chapterIndex}-${sectionIndex}`}>{`${chapterIndex + 1}.${sectionIndex + 1} ${section}`}</option>))}</optgroup>))}<option value="references">参考文献</option></select></td><td className="px-4 py-2"><input type="text" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} className="w-full p-1 border rounded-md" placeholder="グラフ、図、引用など..." /></td><td className="px-2 py-2 text-center"><IconButton onClick={() => handleDeleteItem(item.id)} aria-label="行を削除"><TrashIcon /></IconButton></td></tr>))}</tbody></table></div><div className="mt-4"><ActionButton onClick={handleAddItem} className="text-gray-700 bg-gray-200 hover:bg-gray-300">行を追加</ActionButton></div><div className="text-right mt-4"><button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">閉じる</button></div></div></div>); };
// ★★★ 設定モーダルコンポーネントを追加 ★★★
const SettingsModal = ({ isOpen, onClose, settings, onSave }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    const formattedDeadline = settings.deadline ? new Date(settings.deadline).toISOString().split('T')[0] : '';
    setLocalSettings({ ...settings, deadline: formattedDeadline });
  }, [settings]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setLocalSettings(prev => ({
      ...prev,
      [name]: type === 'number' || type === 'range' ? parseInt(value, 10) : value
    }));
  };

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-6">論文設定</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="targetWordCount" className="block text-sm font-medium text-gray-700">目標文字数</label>
            <input type="number" id="targetWordCount" name="targetWordCount" value={localSettings.targetWordCount || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">提出期限</label>
            <input type="date" id="deadline" name="deadline" value={localSettings.deadline || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            
     
          </div>
          <div>
            <label htmlFor="wordCountWeight" className="block text-sm font-medium text-gray-700">進捗の重み付け (文字数: {localSettings.wordCountWeight}%)</label>
            <input type="range" id="wordCountWeight" name="wordCountWeight" min="0" max="100" value={localSettings.wordCountWeight || 70} onChange={handleChange} className="mt-1 block w-full" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>タスク重視</span>
              <span>文字数重視</span>
            </div>
          </div>
        </div>
        <div className="text-right mt-6">
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">設定を保存</button>
        </div>
      </div>
    </div>
  );
};


const Sidebar = ({
  thesisTitle,
  onThesisTitleChange,
  wordCount,
  targetWordCount,
  imagePlanList,
  wordCountWeight,
  chapters,
  selected,
  onNavigate,
  onAddChapter,
  onAddSection,
  onDeleteChapter,
  onDeleteSection,
  onSubmit,
  onOpenTodo,
  onOpenImagePlan,
  onOpenSettings
}) => {
  const wordCountProgress = (targetWordCount || 0) > 0 ? ((wordCount || 0) / (targetWordCount || 1)) * 100 : 0;
  const safeImagePlanList = imagePlanList || [];
  const totalImagePlans = safeImagePlanList.length;
  const completedImagePlans = safeImagePlanList.filter(item => item.done).length;
  const taskProgress = totalImagePlans > 0 ? (completedImagePlans / totalImagePlans) * 100 : 0;
  const overallProgress = (wordCountProgress * ((wordCountWeight || 70) / 100)) + (taskProgress * ((100 - (wordCountWeight || 70)) / 100));
  const progressBarColor = overallProgress >= 99 ? 'bg-green-500' : overallProgress > 70 ? 'bg-blue-500' : 'bg-yellow-500';

  return (
    <div className="w-1/4 bg-gray-100 border-r p-4 pt-24 flex flex-col">
      <div className='flex-shrink-0'>
        <h2 className="font-bold mb-2">論文タイトル</h2>
        <input
          type="text"
          className="w-full p-2 rounded-md border border-gray-300"
          value={thesisTitle}
          onChange={(e) => onThesisTitleChange(e.target.value)}
          placeholder="論文タイトルを入力..."
        />
      </div>
      <div className="flex-shrink-0 mt-4 pt-4 border-t">
        <div className="flex justify-between items-center mb-1 text-sm">
          <span className="font-medium text-gray-600">総合進捗</span>
          <span className="font-bold text-gray-800">{Math.round(overallProgress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div className={`${progressBarColor} h-2.5 rounded-full transition-all duration-500 ease-out`} style={{ width: `${overallProgress}%` }}></div>
        </div>
        <div className="text-xs text-gray-500 text-center">
          <span>{(wordCount || 0).toLocaleString()} / {(targetWordCount || 0).toLocaleString()} 字</span>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto pr-2 mt-4 pt-4 border-t">
        <h2 className="font-bold mb-4 flex-shrink-0">論文構成</h2>
        {chapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="mb-4">
            <div className="flex items-center justify-between">
              <button className={`flex-grow text-left px-2 py-1 rounded h-[25px] flex items-center overflow-hidden ${selected?.type === 'chapter' && selected.chapterIndex === chapterIndex ? 'bg-blue-200' : 'hover:bg-gray-200'}`} onClick={() => onNavigate(chapterIndex)}>第{chapterIndex + 1}章 {chapter.title}</button>
              <IconButton onClick={() => onDeleteChapter(chapterIndex)} aria-label="章を削除"><TrashIcon /></IconButton>
            </div>
            <div className="ml-4">
              {chapter.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="flex items-center justify-between">
                  <button className={`flex-grow text-left px-2 py-1 rounded text-sm h-[25px] overflow-hidden ${selected?.type === 'section' && selected.chapterIndex === chapterIndex && selected.sectionIndex === sectionIndex ? 'bg-blue-100' : 'hover:bg-gray-200'}`} onClick={() => onNavigate(chapterIndex, sectionIndex)}>{chapterIndex + 1}.{sectionIndex + 1} {section}</button>
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
          <button className={`w-full text-left px-2 py-1 rounded font-semibold ${selected?.type === 'references' ? 'bg-blue-200' : 'hover:bg-gray-200'}`} onClick={() => onNavigate(null, null, 'references')}>参考文献</button>
        </div>
      </div>
      <div className="flex-shrink-0 pt-4 border-t border-gray-200 space-y-2">
        <button onClick={onOpenSettings} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 border transition-colors"><GearIcon /> 論文設定</button>
        <button onClick={onOpenTodo} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 border transition-colors"><ChecklistIcon /> To-doリスト</button>
        <button onClick={onOpenImagePlan} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-white text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-50 border transition-colors"><ImageIcon /> 挿入計画リスト</button>
        <button onClick={onSubmit} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-green-100 text-green-700 font-semibold rounded-lg shadow-sm hover:bg-green-200 transition-colors"><SendIcon /> 論文を更新する</button>
      </div>
    </div>
  );
}

// --- Main App Component ---
export default function ThesisEditPage() {
    const router = useRouter()
    const { id } = router.query



  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathParts = window.location.pathname.split('/');
      const currentId = pathParts[pathParts.length - 1];
      if (!isNaN(parseInt(currentId))) {
        setId(currentId);
      }
    }
  }, []);

  const { data: thesisData, error, isLoading } = useSWR(id ? `/api/thesis/${id}` : null, fetcher);

  // --- States ---
  const [thesisTitle, setThesisTitle] = useState('');
  const [chapters, setChapters] = useState([]);
  const [references, setReferences] = useState('');
  const [selected, setSelected] = useState(null);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [todoText, setTodoText] = useState('');
  const [isImagePlanModalOpen, setIsImagePlanModalOpen] = useState(false);
  const [imagePlanList, setImagePlanList] = useState([]);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [targetWordCount, setTargetWordCount] = useState(20000);
  const [deadline, setDeadline] = useState('');
  const [wordCountWeight, setWordCountWeight] = useState(70);

  useEffect(() => {
    if (thesisData) {
      const chaptersFromDb = (thesisData.chapters || []).map(chapter => ({ title: chapter.title || '', description: chapter.description || '', sections: (chapter.sections || []).map(section => section.title || ''), sectionDescriptions: (chapter.sections || []).map(section => section.description || ''), }));
      const referencesFromDb = (thesisData.references || []).map(ref => ref.title).join('\n');
      setThesisTitle(thesisData.title || '');
      setChapters(chaptersFromDb);
      setReferences(referencesFromDb);
      setTodoText(thesisData.todoText || '');
      setImagePlanList(thesisData.imagePlanList || []);
      setTargetWordCount(thesisData.targetWordCount || 20000);
      setDeadline(thesisData.deadline || '');
      setWordCountWeight(thesisData.wordCountWeight || 70);
    }
  }, [thesisData]);

  const wordCount = useMemo(() => {
    let count = 0;
    (chapters || []).forEach(ch => {
      count += (ch.description || '').length;
      (ch.sectionDescriptions || []).forEach(desc => {
        count += (desc || '').length;
      });
    });
    count += (references || '').length;
    return count;
  }, [chapters, references]);

  // --- Handlers ---
  const handleInputChange = (chapterIndex, sectionIndex, value) => { setChapters(prev => { const newChapters = JSON.parse(JSON.stringify(prev)); if (sectionIndex === null) { newChapters[chapterIndex].title = value; } else { newChapters[chapterIndex].sections[sectionIndex] = value; } return newChapters; }); };
  const handleDescriptionChange = (chapterIndex, sectionIndex, value) => { setChapters(prev => { const newChapters = JSON.parse(JSON.stringify(prev)); if (sectionIndex === null) { newChapters[chapterIndex].description = value; } else { newChapters[chapterIndex].sectionDescriptions[sectionIndex] = value; } return newChapters; }); };
  const handleAddChapter = (insertAtIndex) => { const newChapter = { title: '新しい章', description: '', sections: ['新しい節'], sectionDescriptions: [''] }; setChapters(prev => { const newChapters = [...prev]; newChapters.splice(insertAtIndex, 0, newChapter); return newChapters; }); };
  const handleDeleteChapter = (chapterIndex) => { if (window.confirm(`第${chapterIndex + 1}章を本当に削除しますか？`)) { setChapters(prev => prev.filter((_, index) => index !== chapterIndex)); setSelected(null); } };
  const handleAddSection = (chapterIndex) => { setChapters(prev => { const newChapters = JSON.parse(JSON.stringify(prev)); newChapters[chapterIndex].sections.push('新しい節'); newChapters[chapterIndex].sectionDescriptions.push(''); return newChapters; }); };
  const handleDeleteSection = (chapterIndex, sectionIndex) => { if (window.confirm(`第${chapterIndex + 1}.${sectionIndex + 1}節を本当に削除しますか？`)) { setChapters(prev => { const newChapters = JSON.parse(JSON.stringify(prev)); newChapters[chapterIndex].sections.splice(sectionIndex, 1); newChapters[chapterIndex].sectionDescriptions.splice(sectionIndex, 1); return newChapters; }); setSelected(null); } };
  const handleNavigation = (chapterIndex, sectionIndex = null, specialSection = null) => { let elementId; if (specialSection) { setSelected({ type: specialSection }); elementId = specialSection; } else if (sectionIndex === null) { setSelected({ type: 'chapter', chapterIndex }); elementId = `chapter-${chapterIndex}`; } else { setSelected({ type: 'section', chapterIndex, sectionIndex }); elementId = `section-${chapterIndex}-${sectionIndex}`; } const element = document.getElementById(elementId); if (element) { element.scrollIntoView({ behavior: 'smooth', block: 'start' }); } };
  const handleSaveSettings = (newSettings) => {
    setTargetWordCount(newSettings.targetWordCount);
    setDeadline(newSettings.deadline);
    setWordCountWeight(newSettings.wordCountWeight);
  };

  const handleSubmit = async () => {
    if (!id) return;
    const chaptersForApi = chapters.map((chapter) => ({ title: chapter.title, description: chapter.description, sections: chapter.sections.map((sectionTitle, index) => ({ title: sectionTitle, description: chapter.sectionDescriptions[index] || '', })), }));
    const referencesForApi = references.split('\n').filter(line => line.trim() !== '').map(line => ({ title: line, url: '', }));
    const thesisDataToUpdate = {
      title: thesisTitle,
      chapters: chaptersForApi,
      references: referencesForApi,
      todoText: todoText,
      imagePlanList: imagePlanList,
      wordCount: wordCount,
      targetWordCount: targetWordCount,
      deadline: deadline ? new Date(deadline).toISOString() : null,
      wordCountWeight: wordCountWeight,
    };

    try {
      const res = await fetch(`/api/thesis/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(thesisDataToUpdate), });
      const data = await res.json();
      console.log('更新結果:', data);

      if (res.ok) {
        alert('論文が正常に更新されました！');
        router.push("/thesis/dashboard")
      } else {
        alert(`更新に失敗しました: ${data.message || '不明なエラー'}`);
      }
    } catch (error) {
      console.error('更新処理中にエラーが発生しました:', error);
      alert('通信エラーが発生しました。');
    }
  };

  if (isLoading || !id || !thesisData) return <Loading />;
  if (error) return <div>データ取得エラー</div>;

  return (
    <div className="flex w-full h-screen">
      <Sidebar
        thesisTitle={thesisTitle}
        onThesisTitleChange={setThesisTitle}
        wordCount={wordCount}
        targetWordCount={targetWordCount}
        imagePlanList={imagePlanList}
        wordCountWeight={wordCountWeight}
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
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />
      <EditorPanel
        chapters={chapters}
        references={references}
        onInputChange={handleInputChange}
        onDescriptionChange={handleDescriptionChange}
        onReferencesChange={setReferences}
      />
      <TodoModal isOpen={isTodoModalOpen} onClose={() => setIsTodoModalOpen(false)} text={todoText} onTextChange={setTodoText} />
      <ImagePlanModal isOpen={isImagePlanModalOpen} onClose={() => setIsImagePlanModalOpen(false)} list={imagePlanList} onListChange={setImagePlanList} chapters={chapters} />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={{ targetWordCount, deadline, wordCountWeight }}
        onSave={handleSaveSettings}
      />
    </div>
  );
}