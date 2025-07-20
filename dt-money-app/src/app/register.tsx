import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function Register() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Register</Text>
      <Link href="/">Signin</Link>
    </View>
  )
}
