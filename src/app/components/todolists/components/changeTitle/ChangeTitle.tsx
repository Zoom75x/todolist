import {useState} from "react";
import {BaseButton} from "../../../../../shared";
import css from  "./ChangeTitle.module.css"
export interface PropsType {
    title: string
    saveTitle: (value: string, callback: () => void) => void
}

export const ChangeTitle = ({title, saveTitle}: PropsType) => {
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
                <div>
                    <div className={css.container}>{title}</div>
                    <BaseButton onClick={() => {
                        setTitleIsVisible(false)
                    }}>change Title
                    </BaseButton>
                </div>
            ) : (
                <div>

                    <input value={value} onChange={(event) => {
                        setValue(event.target.value)
                    }}/>

                    <BaseButton onClick={() => {
                        setTitleIsVisible(true)
                        setValue(title)
                    }}>Cansel
                    </BaseButton>

                    <BaseButton onClick={() => onSave()}>Save
                    </BaseButton>

                </div>)}
        </div>)
}