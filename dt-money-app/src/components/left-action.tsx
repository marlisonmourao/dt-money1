import { useBottomSheetContext } from '@/context/bottom-sheet.context'
import type { Transaction } from '@/shared/interfaces/transaction'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { View } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { EditTransactionForm } from './edit-transaction-form'

interface LeftActionProps {
  transaction: Transaction
}

export function LeftAction({ transaction }: LeftActionProps) {
  const { openBottomSheet } = useBottomSheetContext()

  return (
    <Pressable
      onPress={() =>
        openBottomSheet(<EditTransactionForm transaction={transaction} />, 1)
      }
    >
      <View className="h-[140] w-[80] items-center justify-center rounded-l-[6] bg-accent-blue-background-primary">
        <MaterialIcons color={colors.white} name="edit" size={30} />
      </View>
    </Pressable>
  )
}
