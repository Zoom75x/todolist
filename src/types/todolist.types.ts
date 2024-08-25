export interface TodoListType {
  id: string
  title: string
}

export interface Task {
  id: string
  titleTask: string
  isDone: boolean
  todolistId: string
}

export interface TaskType {
  [key: string]: Task[]
}
