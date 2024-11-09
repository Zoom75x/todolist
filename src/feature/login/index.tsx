import { BaseButton, BaseInput } from '../../shared'
import css from './styles.module.css'
import { useEffect, useState } from 'react'
import { sigIn } from '../../entity/user/api/sigIn.ts'
import { RootState, useAppDispatch } from '../../app/rootStore'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { authMe } from '../../entity'

export const Login = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const { isLoading, isAuthentificated, isInitialised } = useSelector((state: RootState) => state.userStore)

  const onClick = () => {
    if (login && password) dispatch(sigIn({ password, username: login }))
  }
  console.log(isAuthentificated)
  useEffect(() => {
    if (!isAuthentificated) {
      dispatch(authMe())
    }
  }, [])
  if (!isInitialised){
    return <>Loading...</>
  }
  if (isAuthentificated) {
    return <Navigate to={'/todolist'} />
  }
  return (
    <div className={css.container}>
      <div className={css.form}>
        <BaseInput
          disabled={isLoading}
          label={'login'}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <BaseInput
          disabled={isLoading}
          label={'password'}
          type={'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <BaseButton onClick={onClick} disabled={isLoading}>
          Войти в профиль
        </BaseButton>
      </div>
    </div>
  )
}
