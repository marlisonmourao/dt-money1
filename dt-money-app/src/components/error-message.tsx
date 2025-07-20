import { Text, View } from 'react-native'

import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'

export function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <View className="mt-1 flex-row items-center">
      <MaterialIcons
        className="mr-1"
        color={colors['accent-red-background-primary']}
        name="error-outline"
        size={16}
      />

      <Text className="text-accent-red-background-primary">{children}</Text>
    </View>
  )
}
