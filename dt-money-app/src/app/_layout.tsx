import { Stack } from 'expo-router'
import '../styles/global.css'

import { Loading } from '@/components/loading'
import { Snackbar } from '@/components/snackbar'
import { AuthContextProvider } from '@/context/auth.context'
import { SnackbarContextProvider } from '@/context/snack-bar.context'
import { useState } from 'react'
import { SystemBars } from 'react-native-edge-to-edge'

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    return <Loading setIsLoading={setIsLoading} />
  }

  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <SystemBars style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
        <Snackbar />
      </AuthContextProvider>
    </SnackbarContextProvider>
  )
}
