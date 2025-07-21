import { Stack } from 'expo-router'
import '../styles/global.css'

import { Loading } from '@/components/loading'
import { AuthContextProvider } from '@/context/auth.context'
import { useState } from 'react'
import { SystemBars } from 'react-native-edge-to-edge'

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    return <Loading setIsLoading={setIsLoading} />
  }

  return (
    <AuthContextProvider>
      <SystemBars style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </AuthContextProvider>
  )
}
