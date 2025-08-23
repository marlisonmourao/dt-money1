import { useBottomSheetContext } from '@/context/bottom-sheet.context'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'
import { DateFilter } from './date-filter'

export function TransactionFilters() {
  const { closeBottomSheet } = useBottomSheetContext()

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
    </View>
  )
}
