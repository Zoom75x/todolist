import { createContext, ReactNode, useState } from 'react'
import { ACCESS_TOKEN, BASE_URL } from '../../../shared'

interface AuthContextType {
  isAuthentificated: boolean
  signIn: (login: string, password: string) => void
  authMe: () => void
  logOut: () => void
}

interface PropsType {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)
export const AuthProvider = ({ children }: PropsType) => {
  const [isAuthentificated, setIsAuthentificated] = useState<boolean>(false)
  const signIn = async (login: string, password: string) => {
    const result = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      body: JSON.stringify({ username: login, password: password }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (result.ok) {
      const data = await result.json()
      localStorage.setItem(ACCESS_TOKEN, data.access_token)
      setIsAuthentificated(true)
    }
  }
  const authMe = async () => {
    const access_token = localStorage.getItem(ACCESS_TOKEN)
    if (access_token) {
      const result = await fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` },
      })
      if (result.ok) {
        setIsAuthentificated(true)
      } else {
        console.log('AuthErr')
        localStorage.removeItem(ACCESS_TOKEN)
      }
    }
  }
  const logOut = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    setIsAuthentificated(false)
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthentificated,
        signIn,
        authMe,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
