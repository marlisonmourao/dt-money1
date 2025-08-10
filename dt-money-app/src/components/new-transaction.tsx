import { useBottomSheetContext } from '@/context/bottom-sheet.context'
import { useSnackbarContext } from '@/context/snack-bar.context'
import { useTransactionContext } from '@/context/transaction.context'
import { AppError } from '@/shared/helpers/app-error'
import type { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import CurrencyInput from 'react-native-currency-input'
import { z, ZodError } from 'zod'
import { Button } from './button'
import { ErrorMessage } from './error-message'
import { SelectCategoryModal } from './select-category-modal'
import { TransactionTypeSelector } from './select-type'

const transactionSchema = z.object({
  description: z.string().trim().min(1, { message: 'Descrição é obrigatória' }),
  typeId: z.number().min(1, { message: 'Tipo é obrigatório' }),
  value: z.number().min(1, { message: 'Valor é obrigatório' }),
  categoryId: z.number().min(1, { message: 'Categoria é obrigatória' }),
})

type ValidationError = Partial<
  Record<keyof z.infer<typeof transactionSchema>, string>
>

export const NewTransaction = () => {
  const { closeBottomSheet } = useBottomSheetContext()
  const { createTransaction } = useTransactionContext()
  const { notify } = useSnackbarContext()

  const [validationError, setValidationError] =
    useState<ValidationError | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [transaction, setTransaction] = useState<CreateTransactionRequest>({
    description: '',
    typeId: 0,
    value: 0,
    categoryId: 0,
  })

  async function handleCreateTransaction() {
    try {
      setValidationError(null)
      setIsSubmitting(true)

      transactionSchema.parse(transaction)

      await createTransaction(transaction)

      setIsSubmitting(false)
      closeBottomSheet()
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.issues.reduce(
          (acc: ValidationError, issue: z.ZodIssue) => {
            const field = issue.path[0] as keyof z.infer<
              typeof transactionSchema
            >
            if (field) {
              acc[field] = issue.message
            }
            return acc
          },
          {} as ValidationError
        )

        setValidationError(validationErrors)
        setIsSubmitting(false)

        return
      }

      if (error instanceof AppError) {
        notify({
          message: error.message,
          type: 'ERROR',
        })

        setIsSubmitting(false)
      }
    }
  }

  const setTransactionData = (
    key: keyof CreateTransactionRequest,
    value: string | number
  ) => {
    setTransaction((prevData) => ({
      ...prevData,
      [key]: value,
    }))
  }

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        className="w-full flex-row items-center justify-between"
        onPress={closeBottomSheet}
      >
        <Text className="font-bold text-white text-xl">Nova transação</Text>
        <MaterialIcons color={colors.gray[700]} name="close" size={20} />
      </TouchableOpacity>

      <View className="my-8 flex-1">
        <TextInput
          className="my-2 h-[50px] rounded-md bg-background-primary pl-4 text-lg text-white"
          onChangeText={(text) => setTransactionData('description', text)}
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
        />

        {validationError?.description && (
          <ErrorMessage>{validationError?.description}</ErrorMessage>
        )}

        <CurrencyInput
          className="my-2 h-[50px] rounded-md bg-background-primary pl-4 text-lg text-white"
          delimiter="."
          minValue={0}
          onChangeValue={(value) => setTransactionData('value', value ?? 0)}
          precision={2}
          prefix="R$ "
          separator=","
          value={transaction.value}
        />

        {validationError?.value && (
          <ErrorMessage>{validationError?.value}</ErrorMessage>
        )}

        <SelectCategoryModal
          onSelectCategory={(categoryId) =>
            setTransactionData('categoryId', categoryId)
          }
          selectedCategory={transaction.categoryId}
        />

        {validationError?.categoryId && (
          <ErrorMessage>{validationError?.categoryId}</ErrorMessage>
        )}

        <TransactionTypeSelector
          setTransactionType={(typeId) => setTransactionData('typeId', typeId)}
          typeId={transaction.typeId}
        />

        {validationError?.typeId && (
          <ErrorMessage>{validationError?.typeId}</ErrorMessage>
        )}

        <View className="mt-4">
          <Button disabled={isSubmitting} onPress={handleCreateTransaction}>
            <Text className="text-lg text-white">
              {isSubmitting ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                'Criar transação'
              )}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  )
}
