import type { TransactionCategoryResponse } from '@/shared/interfaces/https/transaction-category-response'
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react'

import type { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request'
import type { Pagination } from '@/shared/interfaces/https/get-transactionts'
import type { UpdateTransactionRequest } from '@/shared/interfaces/https/update-transaction-request'
import type { TotalTransactions } from '@/shared/interfaces/total-transactions'
import type { Transaction } from '@/shared/interfaces/transaction'
import * as transactionService from '@/shared/services/dt-money/transaction.service'

interface FetchTransactionParams {
  page: number
}

export type TransactionContextType = {
  fetchCategories: () => Promise<void>
  categories: TransactionCategoryResponse[]
  transactions: Transaction[]
  totalTransactions: TotalTransactions
  createTransaction: (transaction: CreateTransactionRequest) => Promise<void>
  fetchTransactions: ({ page }: FetchTransactionParams) => Promise<void>
  updateTransaction: (transaction: UpdateTransactionRequest) => Promise<void>
  refreshTransactions: () => Promise<void>
  refreshing: boolean
  loadingMoreTransaction: () => Promise<void>
}

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
)

export function TransactionContextProvider({ children }: PropsWithChildren) {
  const [categories, setCategories] = useState<TransactionCategoryResponse[]>(
    []
  )
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>(
    {
      expense: 0,
      revenue: 0,
      total: 0,
    }
  )

  const [refreshing, setRefreshing] = useState(false)

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 3,
    totalRows: 0,
    totalPages: 0,
  })

  async function fetchCategories() {
    const categoriesResponse =
      await transactionService.getTransactionCategories()

    setCategories(categoriesResponse)
  }

  async function createTransaction(transaction: CreateTransactionRequest) {
    await transactionService.createTransaction(transaction)

    await refreshTransactions()
  }

  async function updateTransaction(transaction: UpdateTransactionRequest) {
    await transactionService.updateTransaction(transaction)

    await refreshTransactions()
  }

  async function refreshTransactions() {
    const { page, perPage } = pagination

    setRefreshing(true)
    const transactionsResponse = await transactionService.getTransactions({
      page: 1,
      perPage: page * perPage,
    })

    setTransactions(transactionsResponse.data)
    setTotalTransactions(transactionsResponse.totalTransactions)

    setPagination({
      ...pagination,
      page,
      totalPages: transactionsResponse.totalPages,
      totalRows: transactionsResponse.totalRows,
    })
    setRefreshing(false)
  }

  const fetchTransactions = useCallback(
    async ({ page }: FetchTransactionParams) => {
      setRefreshing(true)

      const transactionsResponse = await transactionService.getTransactions({
        page,
        perPage: pagination.perPage,
      })

      if (page === 1) {
        setTransactions(transactionsResponse.data)
      } else {
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          ...transactionsResponse.data,
        ])
      }

      setTotalTransactions(transactionsResponse.totalTransactions)

      setPagination({
        ...pagination,
        page,
        totalRows: transactionsResponse.totalRows,
        totalPages: transactionsResponse.totalPages,
      })

      setRefreshing(false)
    },
    [pagination]
  )

  const loadingMoreTransaction = useCallback(async () => {
    if (refreshing || pagination.page >= pagination.totalPages) {
      return
    }

    await fetchTransactions({ page: pagination.page + 1 })
  }, [refreshing, pagination])

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        categories,
        fetchCategories,
        createTransaction,
        fetchTransactions,
        totalTransactions,
        updateTransaction,
        refreshTransactions,
        refreshing,
        loadingMoreTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactionContext() {
  const context = useContext(TransactionContext)

  return context
}
