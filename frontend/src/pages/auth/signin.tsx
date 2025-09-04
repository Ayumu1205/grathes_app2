import axios from 'axios';
import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

// --- アイコンコンポーネント ---
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);


/**
 * モダンなサインインページコンポーネント
 */
export default function SignInPage() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<{ email: string, password: string }> = (data) => {
    const SignIn = async (data: SignInFormData) => {


    try {
      // 1. ログイン用のAPIエンドポイントにデータを送信
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), // { email, password } をJSON形式で送信
      });

      const result = await res.json();

      // 2. レスポンスのステータスコードで成功・失敗を判断
      if (res.ok) {
        // ログイン成功時の処理
        alert('ログインに成功しました！');
        // 例: ダッシュボードページへリダイレクト
        window.location.href = '/thesis/dashboard';
      } else {
        // ログイン失敗時の処理 (APIからのエラーメッセージを表示)
        alert(`ログインに失敗しました: ${result.message || '不明なエラー'}`);
      }
    } catch (error) {
      // 通信エラーなど、予期せぬエラーが発生した場合
      console.error('ログイン処理中にエラーが発生しました:', error);
      alert('通信エラーが発生しました。');
    }
  }
    SignIn(data)
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">サインイン</h1>
          <p className="text-gray-500 mt-2">アカウントにログインしてください</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* --- Email入力フィールド --- */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 sr-only">Email</label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'メールアドレスは必須です',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '有効なメールアドレスを入力してください'
                  }
                }}
                render={({ field }) => (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MailIcon />
                    </div>
                    <input
                      {...field}
                      id="email"
                      type="email"
                      autoComplete="email"
                      className={`w-full pl-10 pr-3 py-3 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition ${errors.email ? 'border-red-500 ring-red-500' : 'border-gray-200 focus:ring-black'}`}
                      placeholder="メールアドレス"
                    />
                  </div>
                )}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* --- Password入力フィールド --- */}
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700 sr-only">Password</label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'パスワードは必須です',
                }}
                render={({ field }) => (
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockIcon />
                    </div>
                    <input
                      {...field}
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      className={`w-full pl-10 pr-3 py-3 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition ${errors.password ? 'border-red-500 ring-red-500' : 'border-gray-200 focus:ring-black'}`}
                      placeholder="パスワード"
                    />
                  </div>
                )}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* --- サインインボタン --- */}
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
              >
                サインイン
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              アカウントをお持ちでないですか？{' '}
              <a href="/signup" className="font-medium text-black hover:underline">
                アカウント作成
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
// import axios, { AxiosResponse } from 'axios'
// import type { NextPage } from 'next'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import { useForm, SubmitHandler, Controller } from 'react-hook-form'
// import { useUserState } from '@/hooks/useGlobalState'

// type SignInFormData = {
//   email: string
//   password: string
// }

// const SignIn: NextPage = () => {
//   const router = useRouter()
//   const [user, setUser] = useUserState()

//   const { handleSubmit, control } = useForm<SignInFormData>({
//     defaultValues: { email: '', password: '' },
//   })

//   const validationRules = {
//     email: {
//       required: 'メールアドレスを入力してください。',
//       pattern: {
//         value: /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
//         message: '正しい形式のメールアドレスを入力してください。',
//       },
//     },
//     password: {
//       required: 'パスワードを入力してください。',
//     },
//   }

//   const onSubmit: SubmitHandler<SignInFormData> = (data) => {
//     const url = process.env.NEXT_PUBLIC_BACK + '/auth/sign_in'
//     const headers = { 'Content-Type': 'application/json' }

//     axios({ method: 'POST', url: url, data: data, headers: headers }).then((res: AxiosResponse) => {
//       localStorage.setItem('access-token', res.headers['access-token'])
//       localStorage.setItem('client', res.headers['client'])
//       localStorage.setItem('uid', res.headers['uid'])
//       setUser({
//         ...user,
//         isFetched: false,
//       })
//       router.push('/')
//     })
//   }

//   return (
//     <>
//       <div className="w-full h-[1000px] flex flex-col">
//         <p className="pt-24 pb-12 text-3xl flex justify-center">ログイン</p>
//         <div className=" flex flex-col items-center">
//           <form className="w-1/2" noValidate onSubmit={handleSubmit(onSubmit)}>
//             {/* Emailフォーム */}
//             <Controller
//               name="email"
//               control={control}
//               rules={validationRules.email}
//               render={({ field, fieldState }) => (
//                 <>
//                   <div className="mb-8">
//                     <label className="input input-bordered flex items-center gap-2">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 16 16"
//                         fill="currentColor"
//                         className="h-4 w-4 opacity-70"
//                       >
//                         <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
//                         <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
//                       </svg>
//                       <input {...field} name="email" type="text" className="grow" placeholder="Eメール" />
//                     </label>
//                     {fieldState.invalid && <p className="text-red-500 mt-2">{fieldState.error?.message}</p>}
//                   </div>
//                 </>
//               )}
//             />
//             {/* Passwordフォーム */}
//             <Controller
//               name="password"
//               control={control}
//               rules={validationRules.password}
//               render={({ field, fieldState }) => (
//                 <>
//                   <div className="mb-8">
//                     <label className="input input-bordered flex items-center gap-2">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 16 16"
//                         fill="currentColor"
//                         className="h-4 w-4 opacity-70"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
//                           clipRule="evenodd"
//                         />
//                       </svg>

//                       <input {...field} name="password" type="password" className="grow" placeholder="パスワード" />
//                     </label>
//                     {fieldState.invalid && <p className="text-red-500 mt-2">{fieldState.error?.message}</p>}
//                   </div>
//                 </>
//               )}
//             />
//             <input type="submit" value="ログイン" className="mt-12 btn w-full" />
//           </form>
//         </div>

//         <div className="flex justify-center mt-24 border-t border-zinc-400 ">
//           <div className="w-1/2 mb-48">
//             <Link href="/">
//               <input type="submit" value="Googleでログイン" className="mt-12 btn w-full bg-green-300" />
//             </Link>

//             <p className="mt-16 flex justify-center">アカウントをお持ちでない方</p>
//             <Link href="/auth">
//               <input type="submit" value="会員登録" className="mt-8 btn w-full bg-white" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default SignIn
