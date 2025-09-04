import Image from 'next/image';
import Link from 'next/link'
import useSWR from 'swr';
import { fetcher } from '@/pages/utils';

const Header = () => {
  // ★ APIを叩いて、現在のユーザー情報を取得
  const { data: user, error, mutate } = useSWR('/api/auth/me', fetcher);

  const handleLogout = async () => {
    // ログアウトAPIを呼び出す
    await fetch('/api/auth/logout', { method: 'POST' });
    // useSWRのキャッシュをクリアして、UIを即座に更新
    mutate(null);
    // ★ router.pushをwindow.location.hrefに変更
    window.location.href = '/signin';
  };

  const isLoading = !user && !error;

  return (
    <>
      {/* {!user.isAdmin && ( */}
      <>
        <div className="navbar bg-base-100 text-primary flex fixed  top-0 shadow z-40">
          <div className="flex-1 ">
            
            <Link href="/">
            <div className="flex items-center">
               
                <Image src="/Grathes_logo.png" width={50} height={50} alt='' />

                <p className="font-bold text-zinc-700 text-xl">GraThes</p>
            </div>
         
           
            </Link>
          </div>

          <div className="flex-none gap-2">
            {isLoading ? (
              <div className="w-40 h-6 bg-gray-200 animate-pulse rounded-md mx-4"></div>
            ) : user ? (
              // ★★★ ログインしている場合の表示 ★★★
              <>
                <span className="text-sm text-gray-600 hidden md:block">{user.email}</span>

        
                  <Link href="/thesis/dashboard">
                    <p className="text-sm w-40 mx-4">ダッシュボード</p>
                  </Link>
                  <button onClick={handleLogout}>
                    <p className="text-sm w-40 mx-4">ログアウト</p>
                  </button>
              </>
            ) : (
              // ★★★ ログインしていない場合の表示 ★★★
              <>
                    <Link href="/auth">
                      <p className="text-sm w-40 mx-4">アカウント作成</p>
                    </Link>
                    <Link href="/auth">
                      <p className="text-sm w-40 mx-4">ログイン</p>
                    </Link>
              </>
            )}
          </div>
        </div>
      </>
    </>
  )
}

export default Header
