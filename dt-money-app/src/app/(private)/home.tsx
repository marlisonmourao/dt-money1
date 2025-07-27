import { AppHeader } from '@/components/app-header'
import { AuthContext } from '@/context/auth.context'
import { Redirect } from 'expo-router'
import { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const { user } = useContext(AuthContext)

  if (!user?.id) {
    return <Redirect href="/" />
  }

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <AppHeader />
    </SafeAreaView>
  )
}
