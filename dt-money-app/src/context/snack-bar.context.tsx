import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react'

export type SnackbarMessageType = 'ERROR' | 'SUCCESS'

interface NotifyMessageParams {
  message: string
  type: SnackbarMessageType
}

export type SnackbarContextType = {
  message: string | null
  type: SnackbarMessageType | null
  notify: (params: NotifyMessageParams) => void
}

const SnackbarContext = createContext({} as SnackbarContextType)

export function SnackbarContextProvider({ children }: PropsWithChildren) {
  const [message, setMessage] = useState<string | null>(null)
  const [type, setType] = useState<SnackbarMessageType | null>(null)

  function notify({ message, type }: NotifyMessageParams) {
    setMessage(message)
    setType(type)

    setTimeout(() => {
      setMessage(null)
      setType(null)
    }, 3000)
  }

  return (
    <SnackbarContext.Provider
      value={{
        message,
        type,
        notify,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  )
}

export function useSnackbarContext() {
  const context = useContext(SnackbarContext)

  return context
}
