import { AuthHeader } from '@/components/auth-header'
import { DismissKeyboardView } from '@/components/dismiss-keyboard-view'
import { SignInForm } from '@/components/login-form'
import { View } from 'react-native'

export default function SignIn() {
  return (
    <DismissKeyboardView>
      <View className="w-[87%] flex-1 self-center">
        <AuthHeader />

        <SignInForm />
      </View>
    </DismissKeyboardView>
  )
}
