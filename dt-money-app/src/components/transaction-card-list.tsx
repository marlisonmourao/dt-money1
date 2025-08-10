import { TransactionTypes } from '@/shared/enums/transaction-types'
import type { Transaction } from '@/shared/interfaces/transaction'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import clsx from 'clsx'
import { format } from 'date-fns'
import { Text, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import { RightAction } from './right-action'

interface TransactionCardListProps {
  transaction: Transaction
}

export function TransactionCardList({ transaction }: TransactionCardListProps) {
  const isExpense = transaction.type.id === TransactionTypes.EXPENSE

  return (
    <Swipeable
      containerStyle={{
        alignItems: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
        marginBottom: 16,
        paddingHorizontal: 16,
      }}
      overshootRight={false}
      renderRightActions={() => <RightAction id={transaction.id} />}
    >
      <View className="h-[140] rounded-[6] bg-background-tertiary p-6">
        <Text className="text-base text-white">{transaction.description}</Text>

        <Text
          className={clsx('mt-2 font-bold text-2xl', {
            'text-accent-red': isExpense,
            'text-accent-brand-light': !isExpense,
          })}
        >
          {isExpense && '-'}
          R$ {transaction.value.toFixed(2).replace('.', ',')}
        </Text>

        <View className="w-full flex-row items-center justify-between">
          <View className="mt-3 flex-row items-center">
            <MaterialIcons
              color={colors.gray[700]}
              name="label-outline"
              size={23}
            />

            <Text className="ml-2 text-base text-gray-700">
              {transaction.category.name}
            </Text>
          </View>

          <View className="mt-3 flex-row items-center">
            <MaterialIcons
              color={colors.gray[700]}
              name="calendar-month"
              size={20}
            />

            <Text className="ml-2 text-base text-gray-700">
              {format(transaction.createdAt, 'dd/MM/yyyy')}
            </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  )
}
