/** biome-ignore-all lint/suspicious/noConsole: after */
/** biome-ignore-all lint/suspicious/useAwait: after */
/** biome-ignore-all lint/correctness/noUnusedVariables: after */
import type { LoginFormData } from '@/components/login-form'
import type { RegisterFormData } from '@/components/register-form'
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react'

type AuthContextType = {
  user: null
  token: string | null
  handleAuthenticate: (params: LoginFormData) => Promise<void>
  handleRegister: (params: RegisterFormData) => Promise<void>
  handleLogout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  async function handleAuthenticate(params: LoginFormData) {
    console.log(params)
  }

  async function handleRegister(params: RegisterFormData) {
    console.log(params)
  }

  function handleLogout() {
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  return context
}
