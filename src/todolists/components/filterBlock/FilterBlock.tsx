import { FilterStateType } from '../todolist/TodoList.tsx'
import { BaseButton } from "../../../shared";

export interface PropsType {
  filterState: FilterStateType
  setFilterState: (filterState: FilterStateType) => void
}

const setColor = (filterState: FilterStateType, state: FilterStateType) => {
  return filterState === state
}

const listButton: FilterStateType[] = ['All', 'Active', 'Completed']

export const FilterBlock = ({ filterState, setFilterState }: PropsType) => {
  return (
    <div>
      {listButton.map((btn) => (
        <BaseButton
          key={btn}
          variant={setColor(filterState, btn) ? 'primary' : 'secondary'}
          onClick={() => {
            setFilterState(btn)
          }}
        >
          {btn}
        </BaseButton>
      ))}
    </div>
  )
}
