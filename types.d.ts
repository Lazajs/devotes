export interface User {
  name: string
  id: string,
  email: string
}

export interface DatabaseUser extends User {
  passwordHash: string
}