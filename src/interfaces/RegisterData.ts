export interface RegisterData {
  name: string
  email: string
  password: string
  rePassword: string
  phone: string
}

export interface SuccessRes {
  message: string
  user: User
  token: string
}
export interface FailedRes {
  message: string
  statusMsg:string
}

export interface User {
  name: string
  email: string
  role: string
}
