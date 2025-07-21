import type { LoginFormData } from '@/components/login-form'
import { dtMoneyApi } from '@/shared/api/dt-money'
import type { AuthenticateResponse } from '@/shared/interfaces/https/authenticate.response'

export async function Authenticate(
  userData: LoginFormData
): Promise<AuthenticateResponse> {
  const { data } = await dtMoneyApi.post<AuthenticateResponse>(
    '/auth/login',
    userData
  )

  return data
}
