import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

interface DeleteModalProps {
  visible: boolean
  hideModal: () => void
  handleDeleteTransaction: () => void
  loading: boolean
}

export function DeleteModal({
  visible,
  hideModal,
  loading,
  handleDeleteTransaction,
}: DeleteModalProps) {
  return (
    <View className="absolute flex-1">
      <Modal
        animationType="slide"
        onRequestClose={hideModal}
        transparent
        visible={visible}
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View className="flex-1 items-center justify-center bg-black/50">
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View className="z-10 m-5 h-[322] w-[90%] items-center rounded-[16] bg-background-secondary p-8 shadow-lg">
                <View className="w-full flex-row items-center justify-between border-gray-300 border-b pb-6">
                  <View className="flex-row items-center gap-6">
                    <MaterialIcons
                      color={colors.gray[400]}
                      name="error-outline"
                      size={25}
                    />

                    <Text className="text-white text-xl">
                      Apagar transação?
                    </Text>
                  </View>

                  <TouchableOpacity>
                    <MaterialIcons
                      color={colors.gray[800]}
                      name="close"
                      size={25}
                    />
                  </TouchableOpacity>
                </View>

                <View className="flex-1 items-center justify-center border-gray-300 border-b p-3">
                  <Text className="text-gray-500 text-lg leading-8">
                    Tem certeza que deseja apagar essa transação ? Esta ação não
                    pode ser desfeita
                  </Text>
                </View>

                <View className="w-full flex-row justify-end gap-4 p-6 pr-0 pb-0">
                  <TouchableOpacity
                    className="w-[100] items-center justify-center rounded-[6] border-2 border-accent-brand bg-none p-3"
                    onPress={hideModal}
                  >
                    <Text className="text-accent-brand">Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="w-[100] items-center justify-center rounded-[6] bg-accent-red-background-primary p-3"
                    disabled={loading}
                    onPress={handleDeleteTransaction}
                  >
                    <Text className="text-white">
                      {loading ? (
                        <ActivityIndicator color={colors.white} />
                      ) : (
                        'Apagar'
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}
