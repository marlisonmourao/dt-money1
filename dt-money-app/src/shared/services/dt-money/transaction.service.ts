import { dtMoneyApi } from '@/shared/api/dt-money'
import type { TransactionCategoryResponse } from '@/shared/interfaces/https/transaction-category-response'

export async function getTransactionCategories(): Promise<
  TransactionCategoryResponse[]
> {
  const { data } = await dtMoneyApi('/transaction/categories')

  return data
}
