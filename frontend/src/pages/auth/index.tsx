import axios, { AxiosResponse } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
 * モダンなサインアップページコンポーネント
 */
export default function SignUpPage() {
  const router = useRouter()
  // ★ useFormフックをセットアップ
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange' // 入力中にバリデーションを実行
  });

  //登録ボタン押した後の処理
  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    const SignUp = async (data: SignUpFormData) => {
     
      //Railsサーバー環境用URL
      const url = process.env.NEXT_PUBLIC_FRONT + '/api/auth/signup'

      //ヘッダー情報
      const headers = { 'Content-Type': 'application/json' }

      //認証用URL(メール文に添付するURL)

      await axios({
        method: 'POST',
        url: url,
        data: { ...data },
        headers: headers,
      }).then((res: AxiosResponse) => {
        //localStrageにユーザー情報を保存
        localStorage.setItem('access-token', res.headers['access-token'] || '')
        localStorage.setItem('client', res.headers['client'] || '')
        localStorage.setItem('uid', res.headers['uid'] || '')

        console.log(res.data)
        //Railsサーバーからレスポンス来た後の遷移先
        router.push('/auth/send_mail')
      })
    }
    SignUp(data)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">アカウント作成</h1>
          <p className="text-gray-500 mt-2">新しいアカウントを作成して論文の執筆を始めましょう！</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          {/* ★ handleSubmitでラップしたonSubmit関数を渡す */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* --- Email入力フィールド --- */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 sr-only">Email</label>
              {/* ★ Controllerで入力コンポーネントをラップ */}
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
              {/* ★ バリデーションエラーメッセージの表示 */}
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
                  minLength: {
                    value: 8,
                    message: 'パスワードは8文字以上で入力してください'
                  }
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

            {/* --- サインアップボタン --- */}
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
              >
                アカウントを作成
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              すでにアカウントをお持ちですか？{' '}
              <Link href="/auth/signin" className="font-medium text-black hover:underline">
                ログイン
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
/*
コードの変更点
・Next.js/Rails/AWS講座のsignupページとほぼ同じ
・SnackbarやisLodingは入れていない
・muiを使用しないため、TextFieldコンポーネントの代わりにinputタグを使用
・同様の理由で、Stackコンポーネントの代わりにformタグを使用
・同様の理由で、LoadingButtonコンポーネントの代わりにinputタグを使用

検証内容
・JSONファイルの送信確認
Branchの都合上、backendでJSONを返すシステムを作るのが面倒なため
Postmanでモックサーバーを作成し、フロントエンドフォームで入力
送信後に指定したアドレスに遅れているか確認した
結果：Postmanで送信したJSONを確認。PostmanからNext.jsにmessageを送信できている。
    受け取ったJSONでpasswordが見れるのでSelializerで隠す必要あり
*/
// // pages/signup.tsx
// "use client";
// import { useState } from 'react';

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   password?: string;
// };

// const SignUp = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage('Processing...');
//     setError('');
//     const url = `${process.env.NEXT_PUBLIC_BACK}/auth`

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage('Registration successful!');
//         console.log('User created:', data);
//       } else {
//         setMessage(`Error: ${data.message || 'Something went wrong.'}`);
//       }
//     } catch {
//       setMessage('Network error. Please try again.');
//     }
//   };

  

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-center text-gray-900">
//           ユーザー登録
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {error && (
//             <p className="p-3 text-sm text-center text-red-800 bg-red-100 rounded-md">
//               {error}
//             </p>
//           )}
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               ユーザー名
//             </label>
//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               メールアドレス
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               パスワード
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//             >
//               サインアップ
//             </button>
//           </div>
//         </form>
//       </div>
//         {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default SignUp;