export interface CreateAccount {
  username: string,
  email: string,
  password: string,
  role: string
}
export interface Login {
  email: string,
  password: string,
  role: string
}

// export interface LoginResponse {
//   token: string,
//   userId: string
// }
