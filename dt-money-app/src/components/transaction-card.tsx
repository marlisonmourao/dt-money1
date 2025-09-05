import { useTransactionContext } from '@/context/transaction.context'
import { TransactionTypes } from '@/shared/enums/transaction-types'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'

import { Text, View } from 'react-native'

import { moneyMapper } from '@/shared/utils/money-mapper'
import clsx from 'clsx'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type TransactionTypeCardProps = TransactionTypes | 'total'

interface TransactionCardProps {
  type: TransactionTypeCardProps
  amount: number
}

interface CardData {
  label: string
  bgColor: string
}

interface IconsData {
  name: keyof typeof MaterialIcons.glyphMap
  color: string
}

const ICONS: Record<TransactionTypeCardProps, IconsData> = {
  [TransactionTypes.REVENUE]: {
    color: colors['accent-brand-light'],
    name: 'arrow-circle-up',
  },
  [TransactionTypes.EXPENSE]: {
    color: colors['accent-red'],
    name: 'arrow-circle-down',
  },
  total: {
    color: colors.white,
    name: 'attach-money',
  },
}

const CARD_DATA: Record<TransactionTypeCardProps, CardData> = {
  [TransactionTypes.EXPENSE]: {
    label: 'Saídas',
    bgColor: 'background-tertiary',
  },
  [TransactionTypes.REVENUE]: {
    label: 'Entradas',
    bgColor: 'background-tertiary',
  },
  total: {
    label: 'Total',
    bgColor: 'accent-brand-background-primary',
  },
}

export function TransactionCard({ type, amount }: TransactionCardProps) {
  const iconsData = ICONS[type]
  const cardData = CARD_DATA[type]

  const { transactions, filters } = useTransactionContext()

  const lastTransaction = transactions.find(
    ({ type: transactionType }) => transactionType.id === type
  )

  const renderDateInfo = () => {
    if (type === 'total') {
      return (
        <Text className="text-white">
          {filters.from && filters.to ? (
            <>
              {format(filters.from, 'd MMMM', { locale: ptBR })} até
              {format(filters.to, 'd MMMM', { locale: ptBR })}
            </>
          ) : (
            'Todo Período'
          )}
        </Text>
      )
    }

    return (
      <Text className="text-gray-700">
        {lastTransaction?.createdAt
          ? format(
              lastTransaction?.createdAt,
              `'Última ${cardData.label.toLocaleLowerCase()} em' d 'de' MMMM`,
              {
                locale: ptBR,
              }
            )
          : 'Nenhuma transação encontrada'}
      </Text>
    )
  }

  return (
    <View
      className={clsx(
        `bg-${cardData.bgColor} mr-6 min-w-[280] justify-between rounded-md px-8 py-6`,
        type === 'total' && 'mr-12'
      )}
    >
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-base text-white">{cardData.label}</Text>
        <MaterialIcons
          color={iconsData.color}
          name={iconsData.name}
          size={26}
        />
      </View>

      <View>
        <Text className="font-bold text-2xl text-gray-400">
          {moneyMapper(amount)}
        </Text>

        {renderDateInfo()}
      </View>
    </View>
  )
}
