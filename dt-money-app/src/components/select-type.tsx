import { TransactionTypes } from '@/shared/enums/transaction-types'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import clsx from 'clsx'
import { Text, TouchableOpacity, View } from 'react-native'

interface TransactionTypeSelectorProps {
  setTransactionType: (typeId: TransactionTypes) => void
  typeId?: number
}

export function TransactionTypeSelector({
  setTransactionType,
  typeId,
}: TransactionTypeSelectorProps) {
  return (
    <View className="mt-2 flex-row justify-between gap-2">
      <TouchableOpacity
        className={clsx(
          'h[58px] flex-1 flex-row items-center justify-center p-2',
          typeId === TransactionTypes.REVENUE
            ? 'bg-accent-brand'
            : 'bg-background-tertiary'
        )}
        onPress={() => setTransactionType(TransactionTypes.REVENUE)}
      >
        <MaterialIcons
          className="mr-2"
          color={
            typeId === TransactionTypes.REVENUE
              ? colors.white
              : colors['accent-brand-light']
          }
          name="arrow-circle-up"
          size={30}
        />
        <Text
          className={clsx(
            'font-bold',
            typeId === TransactionTypes.REVENUE
              ? 'text-white'
              : 'text-accent-brand-light'
          )}
        >
          Entrada
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={clsx(
          'h[58px] flex-1 flex-row items-center justify-center p-2',
          typeId === TransactionTypes.EXPENSE
            ? 'bg-accent-red'
            : 'bg-background-tertiary'
        )}
        onPress={() => setTransactionType(TransactionTypes.EXPENSE)}
      >
        <MaterialIcons
          className="mr-2"
          color={
            typeId === TransactionTypes.EXPENSE
              ? colors.white
              : colors['accent-red']
          }
          name="arrow-circle-down"
          size={24}
        />
        <Text
          className={clsx(
            'font-bold',
            typeId === TransactionTypes.EXPENSE
              ? 'text-white'
              : 'text-accent-red'
          )}
        >
          Saída
        </Text>
      </TouchableOpacity>
    </View>
  )
}
