import './App.module.css'
import { BaseButton } from './shared'
import { Provider } from 'react-redux'
import { rootStore, useAppDispatch } from './app/rootStore'
import { logOut } from './entity/user/store'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthenticateRoute } from "./app/routing";
import { LoginPage, TodolistsPage } from "./pages";

export const App = () => {
  const dispatch = useAppDispatch()
  const onClickLogOut = () => {dispatch(logOut())}
  return (
    <div>
      <BaseButton onClick={onClickLogOut}>Выйти из профиля</BaseButton>
    </div>
  )
}
export const WrapperApp = () => {
  return (
    <Provider store={rootStore}>
      <BrowserRouter>
        <Routes>
          <Route path={'/login'} element={<LoginPage />} />
          <Route element={<AuthenticateRoute/>}/>
          <Route path={'/'} element={<>MainPage</>} />
          <Route path={'/todolist'} element={<TodolistsPage/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
