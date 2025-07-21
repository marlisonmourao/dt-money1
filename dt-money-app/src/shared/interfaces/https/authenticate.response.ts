import type { IUser } from './user-interface'

export interface IAuthenticateResponse {
  user: IUser
  token: string
}
