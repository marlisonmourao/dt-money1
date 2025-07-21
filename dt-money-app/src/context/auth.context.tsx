import type { LoginFormData } from '@/components/login-form'
import type { RegisterFormData } from '@/components/register-form'
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react'

import type { IUser } from '@/shared/interfaces/https/user-interface'
// biome-ignore lint/performance/noNamespaceImport: after
import * as authService from '@/shared/services/dt-money/auth.service'

type AuthContextType = {
  user: IUser | null
  token: string | null
  handleAuthenticate: (params: LoginFormData) => Promise<void>
  handleRegister: (params: RegisterFormData) => Promise<void>
  handleLogout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<IUser | null>(null)
  const [token, setToken] = useState<string | null>(null)

  async function handleAuthenticate(params: LoginFormData) {
    const { user: userData, token: tokenData } =
      await authService.authenticate(params)

    setUser(userData)
    setToken(tokenData)
  }

  async function handleRegister(params: RegisterFormData) {
    const { user: userData, token: tokenData } =
      await authService.registerUser(params)

    setUser(userData)
    setToken(tokenData)
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
