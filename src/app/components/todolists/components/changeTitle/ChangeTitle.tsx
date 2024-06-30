import {useState} from "react";

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
                    {title}
                    <button onClick={() => {
                        setTitleIsVisible(false)
                    }}>change Title
                    </button>
                </div>
            ) : (
                <div>

                    <input value={value} onChange={(event) => {
                        setValue(event.target.value)
                    }}/>

                    <button onClick={() => {
                        setTitleIsVisible(true)
                        setValue(title)
                    }}>Cansel
                    </button>

                    <button onClick={() => onSave()}>Save
                    </button>

                </div>)}
        </div>)
}