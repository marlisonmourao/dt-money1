import { useTransactionContext } from '@/context/transaction.context'
import Checkbox from 'expo-checkbox'
import { Text, TouchableOpacity, View } from 'react-native'

export function CategoryFilter() {
  const { categories, handleCategoryFilters, filters } = useTransactionContext()

  return (
    <View className="mb-6">
      <Text className="mb-5 font-medium text-base text-gray-700">
        Categorias
      </Text>

      {categories.map((category) => (
        <TouchableOpacity
          className="flex-row items-center py-2"
          key={category.id}
          onPress={() => handleCategoryFilters(category.id)}
        >
          <Checkbox
            className="mr-4"
            onValueChange={() => handleCategoryFilters(category.id)}
            value={filters.categoryIds?.[category.id]}
          />

          <Text className="text-lg text-white">{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
