import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

interface PropsType
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string
}

export const BaseInput = ({ label, ...props }: PropsType) => {
  return (
    <div>
      {label && <span>{label}</span>}
      <input {...props} />
    </div>
  )
}
