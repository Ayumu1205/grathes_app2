import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useUserState } from '@/hooks/useGlobalState'

export function useRequireSignedIn() {
  const router = useRouter()
  const [user] = useUserState()

  useEffect(() => {
    if (user.isFetched && !user.isSignedIn) {
      router.push('/auth/sign_in')
    }
  }, [user, router])
}
