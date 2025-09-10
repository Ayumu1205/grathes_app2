
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {MailIcon, LockIcon, Loading} from "../../components/UiParts"
import { useState } from 'react';

type SignInFormData = {
  email: string
  password: string
}
const SpinnerIcon = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

/**
 * モダンなサインインページコンポーネント
 */
export default function SignInPage() {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<{ email: string, password: string }> = (data) => {
    // ★ 処理開始時にローディング状態をtrueにする
    setIsSubmitting(true);

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
    } finally {
      setIsSubmitting(false);
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
                disabled={isSubmitting} // ローディング中はボタンを無効化
                className="w-full py-3 px-4 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors flex justify-center items-center disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <SpinnerIcon />
                    <span className="ml-2">ログイン中...</span>
                  </>
                ) : (
                  'サインイン'
                )}
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
