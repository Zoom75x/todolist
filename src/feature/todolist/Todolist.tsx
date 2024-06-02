import {setFilterStateType} from "../../App.tsx";

interface Props {
    title: string
    tasks: Task[]
    setFilterState:(filterState:setFilterStateType)=>void
}

export interface Task {
    id: number
    task: string
    isDone: boolean
}

export const Todolist = ({title, tasks, setFilterState}: Props) => {
    console.log(tasks)
    return (
        <>
            <div>{title}</div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input type={"checkbox"} checked={task.isDone}/>{task.task})
                    </li>))}
            </ul>
            <div>
                <button onClick={()=> setFilterState("All")}>All</button>
                <button onClick={()=> setFilterState("Active")}>Active</button>
                <button onClick={()=> setFilterState("Closed")}>Closed</button>
            </div>
        </>
    )
}