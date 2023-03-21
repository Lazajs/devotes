export interface User {
  name: string
  id: string,
  email: string
}

export interface DatabaseUser extends User {
  passwordHash: string
  provider: 'linkedin' | 'github' | 'credentials'
}

type InputFieldTypes = 'password' | 'email' | 'name' | 'form'

export interface InputFieldError {
  from: InputFieldTypes,
  msg: string
}