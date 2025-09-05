import { useTransactionContext } from '@/context/transaction.context'
import { TransactionTypes } from '@/shared/enums/transaction-types'
import Checkbox from 'expo-checkbox'
import { Text, TouchableOpacity, View } from 'react-native'

export function TypeFilter() {
  const { handleFilters, filters } = useTransactionContext()

  const selectType = (type: TransactionTypes) => {
    handleFilters({ key: 'typeId', value: type })
  }

  return (
    <View className="mb-6">
      <Text className="mb-5 font-medium text-base text-gray-700">
        Tipo de transação
      </Text>

      <TouchableOpacity
        className="flex-row items-center py-2"
        onPress={() => selectType(TransactionTypes.REVENUE)}
      >
        <Checkbox
          className="mr-4"
          value={filters.typeId === TransactionTypes.REVENUE}
        />

        <Text className="text-lg text-white">Entrada</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row items-center py-2"
        onPress={() => selectType(TransactionTypes.EXPENSE)}
      >
        <Checkbox
          className="mr-4"
          value={filters.typeId === TransactionTypes.EXPENSE}
        />

        <Text className="text-lg text-white">Saída</Text>
      </TouchableOpacity>
    </View>
  )
}
