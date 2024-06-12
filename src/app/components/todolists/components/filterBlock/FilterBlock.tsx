export interface PropsType {
    filterState: filterStateType
    setFilterState: (filterState: filterStateType) => void
}

export type filterStateType = "All" | "Active" | "Completed"

const setColor = (filterState: filterStateType, state: filterStateType) => {
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