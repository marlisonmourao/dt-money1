import { Slot } from 'expo-router'
import '../styles/global.css'

import { Loading } from '@/components/loading'
import { Snackbar } from '@/components/snackbar'
import { AuthContext, AuthContextProvider } from '@/context/auth.context'
import { BottomSheetProvider } from '@/context/bottom-sheet.context'
import { SnackbarContextProvider } from '@/context/snack-bar.context'
import { TransactionContextProvider } from '@/context/transaction.context'
import { useContext } from 'react'
import { View } from 'react-native'
import { SystemBars } from 'react-native-edge-to-edge'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

function AppContent() {
  const { isRestoring } = useContext(AuthContext)

  if (isRestoring) {
    return <Loading setIsLoading={() => {}} />
  }

  return (
    <BottomSheetProvider>
      <SystemBars style="light" />
      <View className="flex-1 bg-background-primary">
        <Slot />
      </View>
      <Snackbar />
    </BottomSheetProvider>
  )
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <TransactionContextProvider>
        <SnackbarContextProvider>
          <AuthContextProvider>
            <AppContent />
          </AuthContextProvider>
        </SnackbarContextProvider>
      </TransactionContextProvider>
    </GestureHandlerRootView>
  )
}
