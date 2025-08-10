import { ListHeader } from '@/components/list-header'
import { TransactionCardList } from '@/components/transaction-card-list'
import { AuthContext } from '@/context/auth.context'
import { useSnackbarContext } from '@/context/snack-bar.context'
import { useTransactionContext } from '@/context/transaction.context'
import { AppError } from '@/shared/helpers/app-error'
import { Redirect } from 'expo-router'
import { useContext, useEffect } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const { user } = useContext(AuthContext)

  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
    refreshing,
  } = useTransactionContext()
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
    ;(async () => {
      await Promise.all([fetchTransactions(), handleFetchCategories()])
    })()
  }, [])

  if (!user?.id) {
    return <Redirect href="/" />
  }

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={ListHeader}
        refreshControl={
          <RefreshControl
            onRefresh={refreshTransactions}
            refreshing={refreshing}
          />
        }
        renderItem={({ item }) => <TransactionCardList transaction={item} />}
      />
    </SafeAreaView>
  )
}
