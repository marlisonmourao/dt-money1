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

import type { IAuthenticateResponse } from '@/shared/interfaces/https/authenticate.response'
import AsyncStorage from '@react-native-async-storage/async-storage'

type AuthContextType = {
  user: IUser | null
  token: string | null
  handleAuthenticate: (params: LoginFormData) => Promise<void>
  handleRegister: (params: RegisterFormData) => Promise<void>
  handleLogout: () => void
  restoreUserSession: () => Promise<string | null>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<IUser | null>(null)
  const [token, setToken] = useState<string | null>(null)

  async function handleAuthenticate(params: LoginFormData) {
    const { user: userData, token: tokenData } =
      await authService.authenticate(params)

    await AsyncStorage.setItem(
      '@dtmoney:user',
      JSON.stringify({ user: userData, token: tokenData })
    )

    setUser(userData)
    setToken(tokenData)
  }

  async function handleRegister(params: RegisterFormData) {
    const { user: userData, token: tokenData } =
      await authService.registerUser(params)

    await AsyncStorage.setItem(
      '@dtmoney:user',
      JSON.stringify({ user: userData, token: tokenData })
    )

    setUser(userData)
    setToken(tokenData)
  }

  async function handleLogout() {
    await AsyncStorage.removeItem('@dtmoney:user')

    setUser(null)
    setToken(null)
  }

  async function restoreUserSession() {
    try {
      const userData = await AsyncStorage.getItem('@dtmoney:user')

      if (userData) {
        const parsedData = JSON.parse(userData) as IAuthenticateResponse

        const { user: responseUser, token: responseToken } = parsedData

        setUser(responseUser)
        setToken(responseToken)

        return responseToken
      }

      return null
    } catch {
      return null
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
        restoreUserSession,
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
