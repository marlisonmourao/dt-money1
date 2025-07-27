import { Slot } from 'expo-router'
import '../styles/global.css'

import { Loading } from '@/components/loading'
import { Snackbar } from '@/components/snackbar'
import { AuthContextProvider } from '@/context/auth.context'
import { BottomSheetProvider } from '@/context/bottom-sheet.context'
import { SnackbarContextProvider } from '@/context/snack-bar.context'
import { useState } from 'react'
import { View } from 'react-native'
import { SystemBars } from 'react-native-edge-to-edge'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <GestureHandlerRootView className="flex-1">
      <SnackbarContextProvider>
        <AuthContextProvider>
          {isLoading ? (
            <Loading setIsLoading={setIsLoading} />
          ) : (
            <BottomSheetProvider>
              <SystemBars style="light" />
              <View className="flex-1 bg-background-primary">
                <Slot />
              </View>
              <Snackbar />
            </BottomSheetProvider>
          )}
        </AuthContextProvider>
      </SnackbarContextProvider>
    </GestureHandlerRootView>
  )
}
