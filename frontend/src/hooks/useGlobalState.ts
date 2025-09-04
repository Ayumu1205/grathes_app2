import useSWR from 'swr'

export const useUserState = () => {
  //userの型の定義
  type userStateType = {
    id: number
    name: string
    email: string
    avatar: string
    isSignedIn: boolean
    isFetched: boolean
  }
  //userの初期値を設定
  const fallbackData: userStateType = {
    id: 0,
    name: '',
    email: '',
    avatar: '0',
    isSignedIn: false,
    isFetched: false,
  }

  const { data: state, mutate: setState } = useSWR('user', null, {
    fallbackData: fallbackData,
  })
  return [state, setState] as [userStateType, (value: userStateType) => void]
}
