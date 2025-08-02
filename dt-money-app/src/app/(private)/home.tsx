import { AppHeader } from '@/components/app-header'
import { AuthContext } from '@/context/auth.context'
import { useSnackbarContext } from '@/context/snack-bar.context'
import { useTransactionContext } from '@/context/transaction.context'
import { AppError } from '@/shared/helpers/app-error'
import { Redirect } from 'expo-router'
import { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const { user } = useContext(AuthContext)

  const { fetchCategories } = useTransactionContext()
  const { notify } = useSnackbarContext()

  async function handleFetchCategories() {
    try {
      await fetchCategories()
    } catch (error) {
      if (error instanceof AppError) {
        notify({
          message: error.message,
          type: 'ERROR',
        })
      }
    }
  }

  useEffect(() => {
    handleFetchCategories()
  }, [])

  if (!user?.id) {
    return <Redirect href="/" />
  }

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <AppHeader />
    </SafeAreaView>
  )
}
