import type { TransactionCategoryResponse } from '@/shared/interfaces/https/transaction-category-response'
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react'

import type { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request'
import * as transactionService from '@/shared/services/dt-money/transaction.service'

export type TransactionContextType = {
  fetchCategories: () => Promise<void>
  categories: TransactionCategoryResponse[]
  createTransaction: (transaction: CreateTransactionRequest) => Promise<void>
}

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
)

export function TransactionContextProvider({ children }: PropsWithChildren) {
  const [categories, setCategories] = useState<TransactionCategoryResponse[]>(
    []
  )

  async function fetchCategories() {
    const categoriesResponse =
      await transactionService.getTransactionCategories()

    setCategories(categoriesResponse)
  }

  async function createTransaction(transaction: CreateTransactionRequest) {
    await transactionService.createTransaction(transaction)
  }

  return (
    <TransactionContext.Provider
      value={{ categories, fetchCategories, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactionContext() {
  const context = useContext(TransactionContext)

  return context
}
