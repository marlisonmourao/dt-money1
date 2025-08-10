import { useTransactionContext } from '@/context/transaction.context'
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { Checkbox } from 'expo-checkbox'

interface Props {
  selectedCategory: number
  onSelectCategory: (categoryId: number) => void
}

export function SelectCategoryModal({
  onSelectCategory,
  selectedCategory,
}: Props) {
  const [showModal, setShowModal] = useState(false)

  const { categories } = useTransactionContext()

  function handleModal() {
    setShowModal((prev) => !prev)
  }

  const selected = useMemo(
    () => categories.find((category) => category.id === selectedCategory),
    [categories, selectedCategory]
  )

  const handleSelectCategory = (categoryId: number) => {
    onSelectCategory(categoryId)
    setShowModal(false)
  }

  return (
    <>
      <TouchableOpacity
        className="my-2 h-[50px] justify-center rounded-[6px] bg-background-primary pl-6"
        onPress={handleModal}
      >
        <Text
          className={clsx('text-lg', selected ? 'text-white' : 'text-gray-700')}
        >
          {selected?.name ?? 'Categoria'}
        </Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent visible={showModal}>
        <TouchableWithoutFeedback>
          <View className="flex-1 items-center justify-center bg-black/50">
            <View className="w-[90%] rounded-xl bg-background-secondary p-4">
              <Text className="mb-4 text-lg text-white">
                Selecione sua categoria
              </Text>

              <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className={clsx(
                      'mb-2 flex-row items-center rounded-lg p-4',
                      selected?.id === item.id ? 'bg-gray-800' : 'bg-gray-700'
                    )}
                    onPress={() => handleSelectCategory(item.id)}
                  >
                    <Checkbox
                      className="mr-2"
                      onValueChange={() => handleSelectCategory(item.id)}
                      value={selected?.id === item.id}
                    />
                    <Text className="text-lg text-white">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}
