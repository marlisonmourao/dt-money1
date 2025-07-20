import { Stack } from 'expo-router'
import '../styles/global.css'

import { AuthContextProvider } from '@/context/auth.context'
import { SystemBars } from 'react-native-edge-to-edge'

export default function RootLayout() {
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
