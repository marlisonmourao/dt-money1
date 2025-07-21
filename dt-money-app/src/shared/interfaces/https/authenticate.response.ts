import type { User } from './user-interface'

export interface AuthenticateResponse {
  user: User
  token: string
}
