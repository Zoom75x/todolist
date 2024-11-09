import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../rootStore'
import { useEffect } from 'react'
import { authMe } from '../../entity'
import { Navigate, useOutlet } from "react-router-dom";
import { BaseLayout } from "../../shared";
import { Header } from "../../feature";
import { SideBar } from "../../feature/sideBar/sideBar.tsx";

export const AuthenticateRoute = () => {
  const { isAuthentificated, isInitialised } = useSelector((state: RootState) => state.userStore)
  const dispatch = useAppDispatch()
  const outlet = useOutlet()

  useEffect(() => {
    if (!isAuthentificated) {
      dispatch(authMe())
    }
  }, [])

  if (!isInitialised) {
    return <>Loading...</>
  }

  if (!isAuthentificated) {
    return <Navigate to={'/login'}/>
  }
  return <BaseLayout outlet={outlet} header={<Header/>} sideBar={<SideBar/>}/>
}
