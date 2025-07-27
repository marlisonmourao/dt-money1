import { AuthContext } from '@/context/auth.context'
import { Redirect } from 'expo-router'
import { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function Home() {
  const { user, handleLogout } = useContext(AuthContext)

  if (!user?.id) {
    return <Redirect href="/" />
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Home</Text>

      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}
