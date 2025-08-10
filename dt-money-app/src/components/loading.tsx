/** biome-ignore-all lint/correctness/useExhaustiveDependencies:test */
/** biome-ignore-all lint/correctness/noUnusedVariables:test */
import { AuthContext } from '@/context/auth.context'
import { colors } from '@/styles/colors'
import { useContext, useEffect } from 'react'
import { ActivityIndicator, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type LoadingProps = {
  setIsLoading: (isLoading: boolean) => void
}

export function Loading({ setIsLoading }: LoadingProps) {
  const { restoreUserSession } = useContext(AuthContext)

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        setIsLoading(true)
        await restoreUserSession()
      } finally {
        setIsLoading(false)
      }
    }

    checkUserSession()
  }, [restoreUserSession, setIsLoading])

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background-primary">
      <Image
        className="h-[48px] w-[255]"
        source={require('@/assets/Logo.png')}
      />

      <ActivityIndicator color={colors.white} size="small" />
    </SafeAreaView>
  )
}
