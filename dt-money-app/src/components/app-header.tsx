import { Image, Text, TouchableOpacity, View } from 'react-native'

import { AuthContext } from '@/context/auth.context'
import { useBottomSheetContext } from '@/context/bottom-sheet.context'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { useContext } from 'react'
import { NewTransaction } from './new-transaction'

export function AppHeader() {
  const { handleLogout } = useContext(AuthContext)
  const { openBottomSheet } = useBottomSheetContext()

  return (
    <View className="w-full flex-row justify-between bg-background-primary p-8">
      <View>
        <Image
          className="h-[30px] w-[130px]"
          source={require('@/assets/Logo.png')}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-2 flex-row items-center gap-2"
          onPress={handleLogout}
        >
          <MaterialIcons color={colors.gray[700]} name="logout" size={15} />
          <Text className="text-base text-gray-700">Sair da conta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="h-[50px] w-[130px] items-center justify-center rounded-xl bg-accent-brand"
        onPress={() => openBottomSheet(<NewTransaction />, 0)}
      >
        <Text className="font-bold text-sm text-white">Nova transação</Text>
      </TouchableOpacity>
    </View>
  )
}
