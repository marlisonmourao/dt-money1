import { AuthContext } from '@/context/auth.context'
import { Redirect } from 'expo-router'
import { useContext } from 'react'
import { Text, View } from 'react-native'

export default function Home() {
  const { user } = useContext(AuthContext)

  if (!user?.id) {
    return <Redirect href="/" />
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Home</Text>
    </View>
  )
}
