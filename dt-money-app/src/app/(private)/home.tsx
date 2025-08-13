import { EmptyList } from '@/components/empty-list'
import { ListHeader } from '@/components/list-header'
import { TransactionCardList } from '@/components/transaction-card-list'
import { AuthContext } from '@/context/auth.context'
import { useSnackbarContext } from '@/context/snack-bar.context'
import { useTransactionContext } from '@/context/transaction.context'
import { AppError } from '@/shared/helpers/app-error'
import { colors } from '@/styles/colors'
import { Redirect } from 'expo-router'
import { useContext, useEffect } from 'react'
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
  const { user } = useContext(AuthContext)

  const {
    fetchCategories,
    fetchTransactions,
    transactions,
    refreshTransactions,
    handleLoadings,
    loadingMoreTransaction,
    loadings,
  } = useTransactionContext()
  const { notify } = useSnackbarContext()

  async function handleFetchCategories() {
    try {
      handleLoadings({
        key: 'initial',
        value: true,
      })
      await fetchCategories()
    } catch (error) {
      if (error instanceof AppError) {
        notify({
          message: error.message,
          type: 'ERROR',
        })
      }
    } finally {
      handleLoadings({
        key: 'initial',
        value: false,
      })
    }
  }

  async function handleFetchInitialTransactions() {
    try {
      handleLoadings({
        key: 'initial',
        value: true,
      })
      await fetchTransactions({
        page: 1,
      })
    } catch (error) {
      if (error instanceof AppError) {
        notify({
          message: error.message,
          type: 'ERROR',
        })

        return
      }

      notify({
        message: 'Erro ao carregar transações',
        type: 'ERROR',
      })
    } finally {
      handleLoadings({
        key: 'initial',
        value: false,
      })
    }
  }

  async function handleLoadingMoreTransactions() {
    try {
      handleLoadings({
        key: 'loadMore',
        value: true,
      })
      await loadingMoreTransaction()
    } catch (error) {
      if (error instanceof AppError) {
        notify({
          message: error.message,
          type: 'ERROR',
        })

        return
      }

      notify({
        message: 'Error ao carregar mais transações',
        type: 'ERROR',
      })
    } finally {
      handleLoadings({
        key: 'loadMore',
        value: false,
      })
    }
  }

  async function handleRefreshTransaction() {
    try {
      handleLoadings({
        key: 'refresh',
        value: true,
      })
      await refreshTransactions()
    } catch (error) {
      if (error instanceof AppError) {
        notify({
          message: error.message,
          type: 'ERROR',
        })

        return
      }

      notify({
        message: 'Erro ao atualizar transações',
        type: 'ERROR',
      })
    } finally {
      handleLoadings({
        key: 'refresh',
        value: false,
      })
    }
  }

  useEffect(() => {
    ;(async () => {
      await Promise.all([
        handleFetchInitialTransactions(),
        handleFetchCategories(),
      ])
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
        ListEmptyComponent={loadings.initial ? null : <EmptyList />}
        ListFooterComponent={
          loadings.loadMore ? (
            <ActivityIndicator
              color={colors['accent-brand-light']}
              size="large"
            />
          ) : null
        }
        ListHeaderComponent={ListHeader}
        onEndReached={() => handleLoadingMoreTransactions()}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            onRefresh={handleRefreshTransaction}
            refreshing={loadings.refresh}
          />
        }
        renderItem={({ item }) => <TransactionCardList transaction={item} />}
      />
    </SafeAreaView>
  )
}
