/** biome-ignore-all lint/style/useBlockStatements: fds */
import { useSnackbarContext } from '@/context/snack-bar.context'
import { Text, View } from 'react-native'

export function Snackbar() {
  const { message, type } = useSnackbarContext()

  if (!(message && type)) return null

  const bgColor = `${type === 'SUCCESS' ? 'bg-accent-brand-background-primary' : 'bg-accent-red-background-primary'}`

  return (
    <View
      className={`absolute bottom-10 z-10 h-[50px] w-[90%] justify-center self-center rounded-xl ${bgColor} p-2`}
    >
      <Text className="font-bold text-base text-white">{message}</Text>
    </View>
  )
}
