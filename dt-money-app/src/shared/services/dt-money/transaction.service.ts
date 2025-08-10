import { dtMoneyApi } from '@/shared/api/dt-money'
import type { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request'

import type { TransactionCategoryResponse } from '@/shared/interfaces/https/transaction-category-response'

import type {
  GetTransactionParams,
  GetTransactionResponse,
} from '@/shared/interfaces/https/get-transactionts'

import type { UpdateTransactionRequest } from '@/shared/interfaces/https/update-transaction-request'
import qs from 'qs'

export async function getTransactionCategories(): Promise<
  TransactionCategoryResponse[]
> {
  const { data } = await dtMoneyApi('/transaction/categories')

  return data
}

export async function createTransaction(transaction: CreateTransactionRequest) {
  await dtMoneyApi.post('/transaction', transaction)
}

export async function getTransactions(
  params: GetTransactionParams
): Promise<GetTransactionResponse> {
  const { data } = await dtMoneyApi.get('/transaction', {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
  })

  return data
}

export async function deleteTransaction(id: number) {
  await dtMoneyApi.delete(`/transaction/${id}`)
}

export async function updateTransaction(transaction: UpdateTransactionRequest) {
  await dtMoneyApi.put('/transaction', transaction)
}
