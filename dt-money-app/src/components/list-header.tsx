import { useTransactionContext } from '@/context/transaction.context'
import { TransactionTypes } from '@/shared/enums/transaction-types'
import { ScrollView, View } from 'react-native'
import { AppHeader } from './app-header'
import { FilterInput } from './filter-input'
import { TransactionCard } from './transaction-card'

export function ListHeader() {
  const { totalTransactions } = useTransactionContext()

  return (
    <>
      <AppHeader />

      <View className="w-full">
        <ScrollView
          className="h-[141]"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View className="h-[50] w-[100px] bg-background-primary" />
          <TransactionCard
            amount={totalTransactions.revenue}
            type={TransactionTypes.REVENUE}
          />

          <TransactionCard
            amount={totalTransactions.expense}
            type={TransactionTypes.EXPENSE}
          />

          <TransactionCard amount={totalTransactions.total} type="total" />
        </ScrollView>

        <FilterInput />
      </View>
    </>
  )
}
