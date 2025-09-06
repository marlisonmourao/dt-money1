import { useBottomSheetContext } from '@/context/bottom-sheet.context'
import { useSnackbarContext } from '@/context/snack-bar.context'
import { useTransactionContext } from '@/context/transaction.context'
import { AppError } from '@/shared/helpers/app-error'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'
import { Button } from './button'
import { CategoryFilter } from './category-fillter'
import { DateFilter } from './date-filter'
import { TypeFilter } from './type-filter'

export function TransactionFilters() {
  const { closeBottomSheet } = useBottomSheetContext()

  const { notify } = useSnackbarContext()

  const { fetchTransactions, handleLoadings, resetFilters } =
    useTransactionContext()

  async function handleFetchTransactions() {
    try {
      handleLoadings({
        key: 'refresh',
        value: true,
      })
      await fetchTransactions({ page: 1 })
    } catch (error) {
      if (error instanceof AppError) {
        notify({
          message: error.message,
          type: 'ERROR',
        })

        return
      }
    } finally {
      handleLoadings({
        key: 'refresh',
        value: false,
      })

      closeBottomSheet()
    }
  }

  return (
    <View className="flex-1 bg-gray[1000] p-6">
      <View className="flex-row justify-between">
        <Text className="mb-5 font-bold text-white text-xl">
          Filtrar transações
        </Text>

        <TouchableOpacity onPress={closeBottomSheet}>
          <MaterialIcons color={colors.gray[600]} name="close" size={20} />
        </TouchableOpacity>
      </View>

      <DateFilter />

      <CategoryFilter />

      <TypeFilter />

      <View className="flex-row gap-4">
        <Button className="flex-1" mode="outline" onPress={resetFilters}>
          Limpar
        </Button>
        <Button className="flex-1" onPress={handleFetchTransactions}>
          Filtrar
        </Button>
      </View>
    </View>
  )
}
