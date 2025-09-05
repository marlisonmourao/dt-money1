import type { TransactionCategoryResponse } from '@/shared/interfaces/https/transaction-category-response'
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react'

import type { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request'
import type {
  Filters,
  Pagination,
} from '@/shared/interfaces/https/get-transactionts'
import type { UpdateTransactionRequest } from '@/shared/interfaces/https/update-transaction-request'
import type { TotalTransactions } from '@/shared/interfaces/total-transactions'
import type { Transaction } from '@/shared/interfaces/transaction'
import * as transactionService from '@/shared/services/dt-money/transaction.service'

interface FetchTransactionParams {
  page: number
}

interface Loadings {
  initial: boolean
  refresh: boolean
  loadMore: boolean
}

interface HandleLoadingsParams {
  key: keyof Loadings
  value: boolean
}

interface HandleFiltersParams {
  key: keyof Filters
  value: Date | number | boolean
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
  loadingMoreTransaction: () => Promise<void>
  loadings: Loadings
  handleLoadings: (params: HandleLoadingsParams) => void
  pagination: Pagination
  setSearchText: (text: string) => void
  searchText: string

  filters: Filters
  handleFilters: (params: HandleFiltersParams) => void
  handleCategoryFilters: (categoryId: number) => void
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
  const [searchText, setSearchText] = useState('')
  const [filters, setFilters] = useState<Filters>({
    typeId: undefined,
    categoryIds: {},
    from: undefined,
    to: undefined,
  })

  const [loadings, setLoadings] = useState<Loadings>({
    initial: false,
    refresh: false,
    loadMore: false,
  })

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 15,
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

  const refreshTransactions = useCallback(async () => {
    const { page, perPage } = pagination

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
  }, [pagination])

  const fetchTransactions = useCallback(
    async ({ page }: FetchTransactionParams) => {
      const transactionsResponse = await transactionService.getTransactions({
        page,
        perPage: pagination.perPage,
        searchText,
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
    },
    [pagination, searchText]
  )

  function handleLoadings(params: HandleLoadingsParams) {
    setLoadings((prevLoadings) => ({
      ...prevLoadings,
      [params.key]: params.value,
    }))
  }

  const loadingMoreTransaction = useCallback(async () => {
    if (loadings.loadMore || pagination.page >= pagination.totalPages) {
      return
    }

    await fetchTransactions({ page: pagination.page + 1 })
  }, [loadings.loadMore, pagination])

  function handleFilters(params: HandleFiltersParams) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [params.key]: params.value,
    }))
  }

  function handleCategoryFilters(categoryId: number) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categoryIds: {
        ...prevFilters.categoryIds,
        [categoryId]: !prevFilters.categoryIds?.[categoryId],
      },
    }))
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
        loadingMoreTransaction,
        loadings,
        handleLoadings,
        pagination,
        searchText,
        setSearchText,
        filters,
        handleFilters,
        handleCategoryFilters,
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
