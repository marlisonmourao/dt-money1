import { useTransactionContext } from '@/context/transaction.context'
import clsx from 'clsx'
import { format, isValid } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'

export const DateFilter = () => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)

  const { handleFilters, filters } = useTransactionContext()

  const onStartCancel = () => {
    setShowStartDatePicker(false)
  }
  const onStartConfirm = (selectedDate: Date) => {
    setShowStartDatePicker(false)
    handleFilters({ key: 'from', value: selectedDate })
  }

  const onEndCancel = () => {
    setShowEndDatePicker(false)
  }
  const onEndConfirm = (selectedDate: Date) => {
    setShowEndDatePicker(false)
    handleFilters({ key: 'to', value: selectedDate })
  }

  const formattedDate = (date?: Date) => {
    if (!(date && isValid(date))) {
      return
    }

    return format(date, 'dd/MM/yyyy', {
      locale: ptBR,
    })
  }

  return (
    <>
      <Text className="mb-5 font-medium text-base text-gray-700">Data</Text>

      <View className="mb-6 flex-row justify-between">
        <View className="w-[48%]">
          <TouchableOpacity
            className="rounded-md border-gray-800 border-b p-2"
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text
              className={clsx('text-lg', {
                'text-gray-700': !filters.from,
                'text-gray-100': filters.from,
              })}
            >
              {formattedDate(filters.from) || 'De'}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-[48%]">
          <TouchableOpacity
            className="rounded-md border-gray-800 border-b p-2"
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text
              className={clsx('text-lg', {
                'text-gray-700': !filters.to,
                'text-gray-100': filters.to,
              })}
            >
              {formattedDate(filters.to) || 'De'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <DateTimePicker
        cancelTextIOS="Cancelar"
        confirmTextIOS="Confirmar"
        date={filters.from || new Date()}
        isVisible={showStartDatePicker}
        locale="pt-BR"
        mode="date"
        onCancel={onStartCancel}
        onConfirm={onStartConfirm}
      />

      <DateTimePicker
        cancelTextIOS="Cancelar"
        confirmTextIOS="Confirmar"
        date={filters.to || new Date()}
        isVisible={showEndDatePicker}
        locale="pt-BR"
        mode="date"
        onCancel={onEndCancel}
        onConfirm={onEndConfirm}
      />
    </>
  )
}
