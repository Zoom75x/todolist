import { ReactNode } from 'react'
import css from './styles.module.css'
import { BaseButton } from '../baseButton/BaseButton.tsx'

interface PropsType {
  children: ReactNode
  titleCancel?: string
  titleOk?: string
  onCancel: () => void
  onOk: () => void
}

export const BaseModalWindow = ({
  children,
  titleCancel = 'Отмена',
  titleOk = 'Ок',
  onCancel,
  onOk,
}: PropsType) => {
  return (
    <div className={css.overlay}>
      <div className={css.container}>
        <div className={css.close} onClick={onCancel}>
          x
        </div>
        <div className={css.body}>{children}</div>
        <div className={css.btnContainer}>
          <BaseButton variant={'outline'} onClick={onCancel}>
            {titleCancel}
          </BaseButton>
          <BaseButton variant={'primary'} onClick={onOk}>
            {titleOk}
          </BaseButton>
        </div>
      </div>
    </div>
  )
}
