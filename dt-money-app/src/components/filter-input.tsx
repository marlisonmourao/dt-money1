import { useBottomSheetContext } from '@/context/bottom-sheet.context'
import { useSnackbarContext } from '@/context/snack-bar.context'
import { useTransactionContext } from '@/context/transaction.context'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'

import { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { TransactionFilters } from './transaction-filters'

export function FilterInput() {
  const { pagination, setSearchText, searchText, fetchTransactions } =
    useTransactionContext()

  const { openBottomSheet } = useBottomSheetContext()

  const { notify } = useSnackbarContext()

  const [text, setText] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchText(text)
    }, 500)

    return () => clearTimeout(handler)
  }, [text])

  useEffect(() => {
    ;(async () => {
      try {
        await fetchTransactions({ page: 1 })
      } catch {
        notify({
          message: 'Erro ao buscar transações',
          type: 'ERROR',
        })
      }
    })()
  }, [searchText])

  return (
    <View className="z-10 mb-4 w-[90%] self-center">
      <View className="mt-4 mb-3 w-full flex-row items-center justify-between">
        <Text className="font-bold text-white text-xl">Transações</Text>

        <Text className="text-gray-500">
          {pagination.totalRows ?? 0}{' '}
          {(pagination.totalRows ?? 0 > 1) ? 'transações' : 'transação'}
        </Text>
      </View>

      <View className="relative h-16 w-full flex-row items-center">
        <TextInput
          className="h-[50] w-full rounded-md bg-background-primary pr-12 pl-4 text-lg text-white"
          onChangeText={setText}
          placeholder="Pesquisar transação"
          placeholderTextColor={colors.gray[600]}
          value={text}
        />

        <TouchableOpacity
          className="absolute right-0 mr-3 h-full items-center justify-center p-2"
          onPress={() => openBottomSheet(<TransactionFilters />, 1)}
        >
          <MaterialIcons
            color={colors['accent-brand-light']}
            name="filter-list"
            size={26}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
