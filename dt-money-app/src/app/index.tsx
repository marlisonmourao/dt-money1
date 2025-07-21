import { AuthHeader } from '@/components/auth-header'
import { DismissKeyboardView } from '@/components/dismiss-keyboard-view'
import { SignInForm } from '@/components/login-form'
import { AuthContext } from '@/context/auth.context'
import { Redirect } from 'expo-router'
import { useContext } from 'react'
import { View } from 'react-native'

export default function SignIn() {
  const { user } = useContext(AuthContext)

  if (user?.id) {
    return <Redirect href="/home" />
  }

  return (
    <DismissKeyboardView>
      <View className="w-[87%] flex-1 self-center">
        <AuthHeader />

        <SignInForm />
      </View>
    </DismissKeyboardView>
  )
}
