export interface FailedRes {
  message: string
  errors: Errors
}

export interface Errors {
  value: string
  msg: string
  param: string
  location: string
}

export interface SuccessRes {
  message: string
  user: User
  token: string
}

export interface User {
  name: string
  email: string
  role: string
}
