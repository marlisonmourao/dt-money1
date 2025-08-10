import type { TotalTransactions } from '../total-transactions'
import type { Transaction } from '../transaction'

export type GetTransactionParams = {
  page: number
  perPage: number
  from?: Date
  to?: Date
  categoryId?: string
  searchTerm?: string
}

export interface GetTransactionResponse {
  data: Transaction[]
  totalTransactions: TotalTransactions
  totalRows: number
  totalPages: number
  page: number
  perPage: number
}
