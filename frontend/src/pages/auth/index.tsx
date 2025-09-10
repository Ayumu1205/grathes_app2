import axios, { AxiosResponse } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {LockIcon, MailIcon} from "../../components/UiParts"


type SignUpFormData = {
  email: string
  password: string
}

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
      const url = '/api/auth/signup'

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
