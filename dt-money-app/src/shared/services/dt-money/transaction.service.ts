import { dtMoneyApi } from '@/shared/api/dt-money'
import type { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request'
import type { TransactionCategoryResponse } from '@/shared/interfaces/https/transaction-category-response'

export async function getTransactionCategories(): Promise<
  TransactionCategoryResponse[]
> {
  const { data } = await dtMoneyApi('/transaction/categories')

  return data
}

export async function createTransaction(transaction: CreateTransactionRequest) {
  await dtMoneyApi.post('/transaction', transaction)
}
