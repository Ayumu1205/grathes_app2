import axios, { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useUserState } from '@/hooks/useGlobalState'

type SignInFormData = {
  email: string
  password: string
}

const SignIn: NextPage = () => {
  const router = useRouter()
  const [user, setUser] = useUserState()

  const { handleSubmit, control } = useForm<SignInFormData>({
    defaultValues: { email: '', password: '' },
  })

  const validationRules = {
    email: {
      required: 'メールアドレスを入力してください。',
      pattern: {
        value: /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
        message: '正しい形式のメールアドレスを入力してください。',
      },
    },
    password: {
      required: 'パスワードを入力してください。',
    },
  }

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    const url = process.env.NEXT_PUBLIC_BACK + '/auth/sign_in'
    const headers = { 'Content-Type': 'application/json' }

    axios({ method: 'POST', url: url, data: data, headers: headers }).then((res: AxiosResponse) => {
      localStorage.setItem('access-token', res.headers['access-token'])
      localStorage.setItem('client', res.headers['client'])
      localStorage.setItem('uid', res.headers['uid'])
      setUser({
        ...user,
        isFetched: false,
      })
      router.push('/')
    })
  }

  return (
    <>
      <div className="w-full h-[1000px] flex flex-col">
        <p className="pt-24 pb-12 text-3xl flex justify-center">ログイン</p>
        <div className=" flex flex-col items-center">
          <form className="w-1/2" noValidate onSubmit={handleSubmit(onSubmit)}>
            {/* Emailフォーム */}
            <Controller
              name="email"
              control={control}
              rules={validationRules.email}
              render={({ field, fieldState }) => (
                <>
                  <div className="mb-8">
                    <label className="input input-bordered flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                      >
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                      </svg>
                      <input {...field} name="email" type="text" className="grow" placeholder="Eメール" />
                    </label>
                    {fieldState.invalid && <p className="text-red-500 mt-2">{fieldState.error?.message}</p>}
                  </div>
                </>
              )}
            />
            {/* Passwordフォーム */}
            <Controller
              name="password"
              control={control}
              rules={validationRules.password}
              render={({ field, fieldState }) => (
                <>
                  <div className="mb-8">
                    <label className="input input-bordered flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <input {...field} name="password" type="password" className="grow" placeholder="パスワード" />
                    </label>
                    {fieldState.invalid && <p className="text-red-500 mt-2">{fieldState.error?.message}</p>}
                  </div>
                </>
              )}
            />
            <input type="submit" value="ログイン" className="mt-12 btn w-full" />
          </form>
        </div>

        <div className="flex justify-center mt-24 border-t border-zinc-400 ">
          <div className="w-1/2 mb-48">
            <Link href="/">
              <input type="submit" value="Googleでログイン" className="mt-12 btn w-full bg-green-300" />
            </Link>

            <p className="mt-16 flex justify-center">アカウントをお持ちでない方</p>
            <Link href="/auth">
              <input type="submit" value="会員登録" className="mt-8 btn w-full bg-white" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
