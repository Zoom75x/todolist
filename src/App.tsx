import './App.module.css'
import { useContext, useEffect } from 'react'
import { TodolistProvider } from './app/provider'
import { TodoLists } from './todolists'
import { Login } from './feature/login'
import { AuthContext, AuthProvider } from './app/provider/authProvider'
import { BaseButton } from './shared'
export const App = () => {
  const { isAuthentificated, authMe, logOut } = useContext(AuthContext)
  useEffect(() => {
    if (!isAuthentificated) {
      authMe()
    }
  }, [])
  if (!isAuthentificated) {
    return <Login />
  }
  return (
    <div>
      <BaseButton onClick={logOut}>Выйти из профиля</BaseButton>
      <TodolistProvider>
        <TodoLists />
      </TodolistProvider>
    </div>
  )
}
export const WrapperApp = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}
