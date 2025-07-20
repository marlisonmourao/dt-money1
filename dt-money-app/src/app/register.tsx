import { AuthHeader } from '@/components/auth-header'
import { DismissKeyboardView } from '@/components/dismiss-keyboard-view'
import { RegisterForm } from '@/components/register-form'
import { View } from 'react-native'

export default function Register() {
  return (
    <DismissKeyboardView>
      <View className="w-[87%] flex-1 self-center">
        <AuthHeader />

        <RegisterForm />
      </View>
    </DismissKeyboardView>
  )
}
