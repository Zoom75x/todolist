import { BaseButton, BaseInput } from '../../shared'
import css from './styles.module.css'
import { useState } from 'react'
import { sigIn } from '../../entity/user/api/sigIn.ts'
import { RootState, useAppDispatch } from '../../app/rootStore'
import { useSelector } from 'react-redux'

export const Login = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const { isLoading } = useSelector((state: RootState) => state.userStore)
  const onClick = () => {
    if (login && password) dispatch(sigIn({ password, username: login }))
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
