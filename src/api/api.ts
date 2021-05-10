import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: { 'API-KEY': 'aa0ce35b-7a47-4082-88c6-89d4e3cc20a7' }
})

export enum ResultCodes {
  Success = 0,
  Error = 1
}

export enum ResultCodeCaptcha {
  CaptchaIsRequired = 10
}

export interface APIResponse<T = {}, U = ResultCodes> {
  data: T
  resultCode: U
  messages: Array<string>
}
