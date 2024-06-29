import {Dispatch, SetStateAction, useState} from "react";
import {TodoListType} from "../../TodoLists.tsx";

export interface PropsType {
    title: string
    todoListId: string
    setTodolists: Dispatch<SetStateAction<TodoListType[]>>
}

export const ChangeTitle = ({title, todoListId, setTodolists}: PropsType) => {
    const [titleIsVisible, settitleIsVisible] = useState<boolean>(true)
    const [value, setValue] = useState<string>(title)

    const onSaveTitle = () => {
        setTodolists(prevState => {
            const newArr =prevState.map((tdl)=> tdl.id===todoListId?{...tdl, title:value} : tdl)

            return newArr
        })
        settitleIsVisible(true)
    }
    return (
        <div>
            {titleIsVisible ? (
                <div>
                    {title}
                    <button onClick={()=>{
                        settitleIsVisible(false)
                    }}>change Title
                    </button>
                </div>
            ) : (
                <div>
                    <input value={value} onChange={(event)=>{
                        setValue(event.target.value)
                    }}/>
                    <button onClick={()=>{
                        settitleIsVisible(true)
                        setValue(title)
                    }}>Cansel</button>
                    <button onClick={onSaveTitle}>Save</button>
                </div>)}
        </div>)
}