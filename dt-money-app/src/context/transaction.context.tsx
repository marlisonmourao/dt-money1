import type { TransactionCategoryResponse } from '@/shared/interfaces/https/transaction-category-response'
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react'

import type { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request'
import type { UpdateTransactionRequest } from '@/shared/interfaces/https/update-transaction-request'
import type { TotalTransactions } from '@/shared/interfaces/total-transactions'
import type { Transaction } from '@/shared/interfaces/transaction'
import * as transactionService from '@/shared/services/dt-money/transaction.service'

export type TransactionContextType = {
  fetchCategories: () => Promise<void>
  categories: TransactionCategoryResponse[]
  transactions: Transaction[]
  totalTransactions: TotalTransactions
  createTransaction: (transaction: CreateTransactionRequest) => Promise<void>
  fetchTransactions: () => Promise<void>
  updateTransaction: (transaction: UpdateTransactionRequest) => Promise<void>
  refreshTransactions: () => Promise<void>
  refreshing: boolean
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
    setRefreshing(true)
    const transactionsResponse = await transactionService.getTransactions({
      page: 1,
      perPage: 10,
    })

    setTransactions(transactionsResponse.data)
    setTotalTransactions(transactionsResponse.totalTransactions)
    setRefreshing(false)
  }

  const fetchTransactions = async () => {
    const transactionsResponse = await transactionService.getTransactions({
      page: 1,
      perPage: 10,
    })

    setTransactions(transactionsResponse.data)
    setTotalTransactions(transactionsResponse.totalTransactions)
  }

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
