import { useKeyboardVisible } from '@/shared/hooks/use-keyboard-visible'
import { Image, View } from 'react-native'

export function AuthHeader() {
  const keyboardIsVisible = useKeyboardVisible()

  if (keyboardIsVisible) {
    return
  }

  return (
    <View className="min-h-40 w-full items-center justify-center">
      <Image
        alt="Logo"
        className="h-[48px] w-[255px]"
        source={require('@/assets/Logo.png')}
      />
    </View>
  )
}
