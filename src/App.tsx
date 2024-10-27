import './App.module.css'
import { useEffect } from 'react'
import { TodoLists } from './todolists'
import { Login } from './feature/login'
import { BaseButton } from './shared'
import { Provider, useSelector } from 'react-redux'
import { RootState, rootStore, useAppDispatch } from './app/rootStore'
import { authMe } from './entity/user/api/autMe.ts'
import { logOut } from './entity/user/store'
import { ToastContainer } from './shared';
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  const { name, isAuthentificated, isInitialised } = useSelector(
    (state: RootState) => state.userStore
  )
  const dispatch = useAppDispatch()
  console.log(name)
  useEffect(() => {
    if (!isAuthentificated) {
      dispatch(authMe())
    }
  }, [])
  if (!isInitialised) {
    return <>Loading</>
  }
  if (!isAuthentificated) {
    return <Login />
  }
  const onClickLogOut = () => {
    dispatch(logOut())
  }
  return (
    <div>
      <BaseButton onClick={onClickLogOut}>Выйти из профиля</BaseButton>
      <TodoLists />
    </div>
  )
}
export const WrapperApp = () => {
  return (
    <Provider store={rootStore}>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
      />
    </Provider>
  )
}
