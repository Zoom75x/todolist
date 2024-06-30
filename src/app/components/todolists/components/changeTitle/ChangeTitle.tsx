import { useState } from 'react'
import { BaseButton, BaseInput } from '../../../../../shared'
import css from './ChangeTitle.module.css'

export interface PropsType {
  title: string
  saveTitle: (value: string, callback: () => void) => void
  disabled?: boolean
}

export const ChangeTitle = ({ title, saveTitle, disabled }: PropsType) => {
  const [titleIsVisible, setTitleIsVisible] = useState<boolean>(true)
  const [value, setValue] = useState<string>(title)

  const onCloseInput = () => {
    setTitleIsVisible(true)
  }
  const onSave = () => {
    saveTitle(value, onCloseInput)
  }
  return (
    <div>
      {titleIsVisible ? (
        <div className={css.container}>
          <div className={css.title}>{title}</div>
          <BaseButton
            onClick={() => {
              setTitleIsVisible(false)
            }}
            disabled={disabled}
          >
            Change
          </BaseButton>
        </div>
      ) : (
        <div>
          <BaseInput
            value={value}
            onChange={(event) => {
              setValue(event.target.value)
            }}
          />

          <BaseButton
            onClick={() => {
              setTitleIsVisible(true)
              setValue(title)
            }}
          >
            Cansel
          </BaseButton>

          <BaseButton onClick={() => onSave()}>Save</BaseButton>
        </div>
      )}
    </div>
  )
}
