import { v4 as uuidv4 } from 'uuid'
import { TaskType, TodoListType } from '../../../types'

const todolistId1 = uuidv4()
const todolistId2 = uuidv4()

export const initialTodoLists: TodoListType[] = [
  { id: todolistId1, title: 'Лист1' },
  { id: todolistId2, title: 'Лист2' },
]

export const initialTasks: TaskType = {
  [todolistId1]: [
    { id: uuidv4(), titleTask: 'Хлеб', isDone: true, todolistId: todolistId1 },
    { id: uuidv4(), titleTask: 'Молоко', isDone: false, todolistId: todolistId1 },
    { id: uuidv4(), titleTask: 'Мясо', isDone: true, todolistId: todolistId1 },
  ],
  [todolistId2]: [
    { id: uuidv4(), titleTask: 'Яйца', isDone: true, todolistId: todolistId2 },
    { id: uuidv4(), titleTask: 'Овощи', isDone: false, todolistId: todolistId2 },
    { id: uuidv4(), titleTask: 'Фрукты', isDone: false, todolistId: todolistId2 },
  ],
}
