import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import css from './style.module.css'
interface PropsType
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string
}

export const BaseCheckbox = ({ ...props }: PropsType) => {
  return (
    <label className={css.container}>
      <input {...props} type={'checkbox'} className={css.checkBox} />
      <span className={css.checkMark} />
    </label>
  )
}
