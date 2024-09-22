import './App.module.css'
import { useContext, useEffect } from 'react'
import { TodolistProvider } from './app/provider'
import { TodoLists } from './todolists'
import { Login } from './feature/login'
import { AuthContext, AuthProvider } from './app/provider/authProvider'
import { BaseButton } from './shared'
import { Provider, useSelector } from "react-redux";
import { RootState, rootStore } from "./app/rootStore";


export const App = () => {
  const  {name}  = useSelector((state: RootState) => state.userStore)
    console.log(name)
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
      <Provider store={rootStore}>
      <App />
      </Provider>
    </AuthProvider>
  )
}
