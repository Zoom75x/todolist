import { BaseButton, BaseInput } from '../../shared'
import css from './styles.module.css'
import { useContext, useState } from "react";
import { AuthContext } from "../../app/provider/authProvider";

export const Login = () => {
  const {signIn} = useContext(AuthContext)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const onClick =()=> {
    if(login&&password)
    signIn(login,password)
  }
  return (
    <div className={css.container}>
      <div className={css.form}>
        <BaseInput
          label={'login'}
          value={login}
          onChange={(e) => setLogin(e.target.value)} />
        <BaseInput
          label={'password'}
          type={'password'}
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />
        <BaseButton onClick={onClick}>Войти в профиль</BaseButton>
      </div>
    </div>
  )
}
