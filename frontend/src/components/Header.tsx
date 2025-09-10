import Image from 'next/image';
import Link from 'next/link'
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/utils';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  // ★ APIを叩いて、現在のユーザー情報を取得
  // const { data: user, error, mutate } = useSWR('/api/auth/me', fetcher);

  // const handleLogout = async () => {
  //   // ログアウトAPIを呼び出す
  //   await fetch('/api/auth/logout', { method: 'POST' });
  //   // useSWRのキャッシュをクリアして、UIを即座に更新
  //   mutate(null);
  //   // ★ router.pushをwindow.location.hrefに変更
  //   window.location.href = '/signin';
  // };

  // const isLoading = !user && !error;

  return (
    // <>
    //   {/* {!user.isAdmin && ( */}
    //   <>
    //      <div className="navbar bg-base-100 text-primary flex fixed  top-0 shadow z-40">
    //       <div className="flex-1 ">
            
    //         <Link href="/">
    //         <div className="flex items-center">
               
    //             <Image src="/Grathes_logo.png" width={50} height={50} alt='' />

    //             <p className="font-bold text-zinc-700 text-xl">GraThes</p>
    //         </div>
         
           
    //         </Link>
    //       </div>

    //       <div className="flex-none gap-2">
    //         {isLoading ? (
    //           <div className="w-40 h-6 bg-gray-200 animate-pulse rounded-md mx-4"></div>
    //         ) : user ? (
    //           // ★★★ ログインしている場合の表示 ★★★
    //           <>
    //             <span className="text-sm text-gray-600 hidden md:block">{user.email}</span>

        
    //               <Link href="/thesis/dashboard">
    //                 <p className="text-sm w-40 mx-4">ダッシュボード</p>
    //               </Link>
    //               <button onClick={handleLogout}>
    //                 <p className="text-sm w-40 mx-4">ログアウト</p>
    //               </button>
    //           </>
    //         ) : (
    //           // ★★★ ログインしていない場合の表示 ★★★
    //           <>
    //                 <Link href="/auth">
    //                   <p className="text-sm w-40 mx-4">アカウント作成</p>
    //                 </Link>
    //                 <Link href="/auth/signin">
    //                   <p className="text-sm w-40 mx-4">ログイン</p>
    //                 </Link>
    //           </>
    //         )}

    //         <Link href="/articles">
    //           <p className="text-sm w-40 mx-4">卒論Blog</p>
    //         </Link>
    //       </div>
    //     </div>
    //   </>
    // </> 
   
    
    <>
     
    
      <div className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          {/* ロゴ */}
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <Image src="/Grathes_logo.png" width={50} height={50} alt="GraThes" />
              <p className="ml-2 font-bold text-xl text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                GraThes
              </p>
            </div>
          </Link>

          {/* ナビゲーション（PC） */}
          <div className="hidden md:flex items-center gap-6 text-gray-700">
            <Link href="/articles" className="relative group">
              <span>卒論Tips</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/thesis/dashboard" className="relative group">
              <span>ダッシュボード</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/auth" className="relative group">
              <span>アカウント作成</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/auth/signin" className="relative group">
              <span>ログイン</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
            </Link>
          </div>

          

          {/* モバイルハンバーガー */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur-md shadow-md">
            <div className="flex flex-col px-6 py-4 gap-4 text-gray-700">
              <NavLink href="/articles" onClick={() => setIsOpen(false)}>卒論Tips</NavLink>
              <NavLink href="/thesis/dashboard" onClick={() => setIsOpen(false)}>ダッシュボード</NavLink>
              <NavLink href="/auth" onClick={() => setIsOpen(false)}>アカウント作成</NavLink>
              <NavLink href="/auth/signin" onClick={() => setIsOpen(false)}>ログイン</NavLink>
            </div>
          </div>
        )}
      </div>
    
    </> 

  )
}

// 共通リンクコンポーネント（ホバーアニメーション付き）
function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="relative group">
      <span>{children}</span>
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
    </Link>
  );
}

export default Header
