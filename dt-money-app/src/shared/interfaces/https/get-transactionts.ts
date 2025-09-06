import type { TotalTransactions } from '../total-transactions'
import type { Transaction } from '../transaction'

export type GetTransactionParams = {
  page: number
  perPage: number
  from?: Date
  to?: Date
  categoryIds?: number[]
  searchText?: string
}

export interface GetTransactionResponse {
  data: Transaction[]
  totalTransactions: TotalTransactions
  totalRows: number
  totalPages: number
  page: number
  perPage: number
}

export interface Pagination {
  page: number
  perPage: number
  totalRows?: number
  totalPages: number
}

export interface Filters {
  from?: Date
  to?: Date
  typeId?: number
  categoryIds?: Record<number, boolean>
}