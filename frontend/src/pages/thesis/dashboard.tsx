import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FiFilePlus } from 'react-icons/fi';
import useSWR from 'swr';
import { fetcher } from '../utils'; // パスは実際の環境に合わせてください
import { ClockIcon, ListCheckIcon, ImagePlusIcon, ChevronDownIcon, DocumentTextIcon, Loading } from '@/components/UiParts'; // パスは実際の環境に合わせてください

// --- アイコンコンポーネント (UiPartsにない場合) ---
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

/**
 * ダッシュボードページ
 */
export default function Dashboard() {
  const url = '/api/thesis'; // APIのURLは環境に合わせて調整してください

  const { data, error, isLoading } = useSWR(url, fetcher);

  const [expandedStates, setExpandedStates] = useState({});

  const handleToggleSection = (thesisId, section) => {
    setExpandedStates(prev => ({
      ...prev,
      [thesisId]: prev[thesisId] === section ? null : section,
    }));
  };

  const [countdown, setCountdown] = useState({});

  useEffect(() => {
    if (!data?.allThesis) return;

    const intervals = data.allThesis.map(thesis => {
      const calculateCountdown = () => {
        if (!thesis.deadline) return;
        const now = new Date();
        const deadlineDate = new Date(thesis.deadline);
        const diff = deadlineDate.getTime() - now.getTime();
        const days = diff > 0 ? Math.floor(diff / (1000 * 60 * 60 * 24)) : 0;
        setCountdown(prev => ({ ...prev, [thesis.id]: days }));
      };
      calculateCountdown();
      return setInterval(calculateCountdown, 1000 * 60 * 60);
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, [data]);


  if (error) return <div>データ取得エラー</div>
  if (isLoading) return <Loading />

  const theses = data?.allThesis ?? []
  return (
    <div className="bg-gray-50 min-h-screen p-8 pt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">論文ダッシュボード</h1>
      </div>

      <div className="space-y-6">
        {theses.length > 0 ? (
          theses.map(thesis => {
            const {
              id, title, wordCount, targetWordCount, deadline, updatedAt, todoText, imagePlanList
            } = thesis;

            const currentWordCount = wordCount || 0;
            const safeTargetWordCount = targetWordCount || 20000;
            const safeImagePlanList = imagePlanList || [];
            const wordCountProgress = safeTargetWordCount > 0 ? (currentWordCount / safeTargetWordCount) * 100 : 0;
            const totalImagePlans = safeImagePlanList.length;
            const completedImagePlans = safeImagePlanList.filter(item => item.done).length;
            const taskProgress = totalImagePlans > 0 ? (completedImagePlans / totalImagePlans) * 100 : 0;
            const overallProgress = (wordCountProgress * 0.7) + (taskProgress * 0.3);
            const todoCount = (todoText || '').split('\n').filter(line => line.trim() !== '').length;
            const imagePlanCount = safeImagePlanList.filter(item => !item.done).length;
            const progressBarColor = overallProgress >= 99 ? 'bg-green-500' : overallProgress > 70 ? 'bg-blue-500' : 'bg-yellow-500';
            const lastUpdated = updatedAt ? new Date(updatedAt).toLocaleDateString() : '更新日不明';
            const expandedSection = expandedStates[id];
            const daysRemaining = countdown[id] || 0;

            const todoItems = (todoText || '').split('\n').filter(line => line.trim() !== '');

            return (
              <div key={id} className="bg-white rounded-xl shadow-md p-6 w-full max-w-2xl mx-auto hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full flex-shrink-0">{lastUpdated}</span>
                </div>
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600">総合進捗</span>
                    <span className="text-sm font-bold text-gray-800">{Math.round(overallProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className={`${progressBarColor} h-2.5 rounded-full transition-all duration-500 ease-out`} style={{ width: `${overallProgress}%` }}></div>
                  </div>
                  <div className="text-xs text-gray-500 text-right mt-1">
                    <span>文字数: {Math.round(wordCountProgress)}%</span>
                    <span className="mx-2">|</span>
                    <span>挿入計画: {Math.round(taskProgress)}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <button onClick={() => handleToggleSection(id, 'todo')} className="w-full flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <ListCheckIcon />
                      <span>残りのToDo: <span className="font-bold text-gray-800">{todoCount}</span> 件</span>
                      <span className="ml-auto"><ChevronDownIcon expanded={expandedSection === 'todo'} /></span>
                    </button>
                    <div className={`grid transition-all duration-500 ease-in-out ${expandedSection === 'todo' ? 'grid-rows-[1fr] pt-2' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <div className="p-4 bg-gray-50/80 rounded-lg max-h-48 overflow-y-auto">
                          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            {todoItems.length > 0 ? todoItems.map((item, index) => <li key={index}>{item}</li>) : <li>タスクはありません。</li>}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button onClick={() => handleToggleSection(id, 'imagePlan')} className="w-full flex items-center text-sm text-gray-600 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <ImagePlusIcon />
                      <span>画像/データ挿入: <span className="font-bold text-gray-800">{imagePlanCount}</span> 件</span>
                      <span className="ml-auto"><ChevronDownIcon expanded={expandedSection === 'imagePlan'} /></span>
                    </button>
                    <div className={`grid transition-all duration-500 ease-in-out ${expandedSection === 'imagePlan' ? 'grid-rows-[1fr] pt-2' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <div className="p-4 bg-gray-50/80 rounded-lg max-h-48 overflow-y-auto">
                          <ul className="text-sm text-gray-700 space-y-2">
                            {safeImagePlanList.length > 0 ? safeImagePlanList.map(item => (
                              <li key={item.id} className="flex items-center">
                                <input type="checkbox" checked={item.done} disabled className="mr-2" />
                                <span className={item.done ? 'line-through text-gray-400' : ''}>{item.description}</span>
                                <span className="ml-auto text-xs bg-white px-2 py-0.5 rounded-full">{item.location}</span>
                              </li>
                            )) : <li>計画はありません。</li>}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 mt-5 pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <DocumentTextIcon />
                    <span>{currentWordCount.toLocaleString()} / {safeTargetWordCount.toLocaleString()} 字</span>
                  </div>
                  {/* ★★★ 修正箇所 ★★★ */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center font-medium">
                      <ClockIcon />
                      {deadline && daysRemaining > 0 ? (
                        <span>提出まであと <span className="text-red-500 font-bold text-base">{daysRemaining}</span> 日</span>
                      ) : (
                        <span className="text-gray-500">提出日情報なし</span>
                      )}
                    </div>
                    <Link href={`/thesis/${id}`} passHref legacyBehavior>
                      <a className="flex items-center text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors">
                        詳細を見る
                        <ArrowRightIcon />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">作成された論文はありません。</p>
        )}

        <a href="/thesis/test" className="block">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 w-full max-w-2xl mx-auto text-gray-400 hover:bg-gray-100 hover:border-gray-400 transition-colors flex flex-col items-center justify-center h-[288px]">
            <FiFilePlus className="h-8 w-8" />
            <span className="mt-2 font-semibold">新規論文作成</span>
          </div>
        </a>
      </div>
    </div>
  );
}