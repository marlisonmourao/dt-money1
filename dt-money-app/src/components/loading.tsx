/** biome-ignore-all lint/correctness/useExhaustiveDependencies:test */
/** biome-ignore-all lint/correctness/noUnusedVariables:test */
import { colors } from '@/styles/colors'
import { ActivityIndicator, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export function Loading() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background-primary">
      <Image
        className="h-[48px] w-[255]"
        source={require('@/assets/Logo.png')}
      />
      <ActivityIndicator color={colors.white} size="small" />
    </SafeAreaView>
  )
}
