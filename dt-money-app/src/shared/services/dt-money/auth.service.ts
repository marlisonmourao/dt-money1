import type { LoginFormData } from '@/components/login-form'
import type { RegisterFormData } from '@/components/register-form'
import { dtMoneyApi } from '@/shared/api/dt-money'
import type { IAuthenticateResponse } from '@/shared/interfaces/https/authenticate.response'

export async function authenticate(
  userData: LoginFormData
): Promise<IAuthenticateResponse> {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    '/auth/login',
    userData
  )

  return data
}

export async function registerUser(
  userData: RegisterFormData
): Promise<IAuthenticateResponse> {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    '/auth/register',
    userData
  )

  return data
}
