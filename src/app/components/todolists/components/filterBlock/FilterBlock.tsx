import {FilterStateType} from "../todolist/TodoList.tsx"
export interface PropsType {
    filterState: FilterStateType
    setFilterState: (filterState: FilterStateType) => void
}

const setColor = (filterState: FilterStateType, state: FilterStateType) => {
    return {background: filterState === state ? "red" : ""}
}
export const FilterBlock = ({filterState, setFilterState}: PropsType) => {


    return (
        <div>
            <button style={setColor(filterState, "All")}
                    onClick={() => {
                        setFilterState("All")
                    }}>All
            </button>
            <button style={setColor(filterState, "Active")}
                    onClick={() => setFilterState("Active")}>Active
            </button>
            <button style={setColor(filterState, "Completed")}
                    onClick={() => setFilterState("Completed")}>Completed
            </button>
        </div>
    )
}