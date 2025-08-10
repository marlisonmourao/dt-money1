import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { DeleteModal } from './delete-modal'

import { useSnackbarContext } from '@/context/snack-bar.context'
import * as transactionService from '@/shared/services/dt-money/transaction.service'

interface RightActionProps {
  id: number
}

export function RightAction({ id }: RightActionProps) {
  const [modalVisible, setModalVisible] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const { notify } = useSnackbarContext()

  function showModal() {
    setModalVisible(true)
  }

  function hideModal() {
    setModalVisible(false)
  }

  async function handleDeleteTransaction() {
    try {
      setIsDeleting(true)
      await transactionService.deleteTransaction(id)

      notify({
        message: 'Transação deletada com sucesso',
        type: 'SUCCESS',
      })

      hideModal()
    } catch {
      notify({
        message: 'Erro ao deletar transação',
        type: 'ERROR',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        className="h-[140] w-[80] items-center justify-center rounded-r-[5] bg-accent-red-background-primary"
        onPress={showModal}
      >
        <MaterialIcons color={colors.white} name="delete-outline" size={30} />
      </TouchableOpacity>

      <DeleteModal
        handleDeleteTransaction={handleDeleteTransaction}
        hideModal={hideModal}
        loading={isDeleting}
        visible={modalVisible}
      />
    </>
  )
}
