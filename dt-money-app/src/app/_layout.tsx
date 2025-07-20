import { Stack } from 'expo-router'
import '../styles/global.css'

import { SystemBars } from 'react-native-edge-to-edge'

export default function RootLayout() {
  return (
    <>
      <SystemBars style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  )
}
