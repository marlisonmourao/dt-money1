import { useBottomSheetContext } from '@/context/bottom-sheet.context'
import type { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import CurrencyInput from 'react-native-currency-input'
import { TransactionTypeSelector } from './select-type'

export const NewTransaction = () => {
  const { closeBottomSheet } = useBottomSheetContext()

  const [transaction, setTransaction] = useState<CreateTransactionRequest>({
    description: '',
    typeId: 0,
    value: 0,
  })

  const setTransactionData = (
    key: keyof CreateTransactionRequest,
    value: string | number
  ) => {
    setTransaction((prevData) => ({
      ...prevData,
      [key]: value,
    }))
  }

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        className="w-full flex-row items-center justify-between"
        onPress={closeBottomSheet}
      >
        <Text className="font-bold text-white text-xl">Nova transação</Text>
        <MaterialIcons color={colors.gray[700]} name="close" size={20} />
      </TouchableOpacity>

      <View className="my-8 flex-1">
        <TextInput
          className="my-2 h-[50px] rounded-md bg-background-primary pl-4 text-lg text-white"
          onChangeText={(text) => setTransactionData('description', text)}
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
        />
        <CurrencyInput
          className="my-2 h-[50px] rounded-md bg-background-primary pl-4 text-lg text-white"
          delimiter="."
          minValue={0}
          onChangeValue={(value) => setTransactionData('value', value ?? 0)}
          precision={2}
          prefix="R$ "
          separator=","
          value={transaction.value}
        />
        <TransactionTypeSelector
          setTransactionType={(typeId) => setTransactionData('typeId', typeId)}
          typeId={transaction.typeId}
        />
      </View>
    </View>
  )
}
