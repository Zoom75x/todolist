import css from "./TaskList.module.css";
import { ChangeTitle } from "../changeTitle/ChangeTitle.tsx";
import { BaseButton, BaseCheckbox } from "../../../../shared";
import { deleteTask, TaskResponseDTO } from "../../../../entity";
import { useAppDispatch } from "../../../../app/rootStore";
import { updateTask } from "../../../../entity/task/api/updateTask.ts";

export interface PropsType {
  filteredTasks: TaskResponseDTO[];
  disabled?: boolean;
}

export const TasksList = ({ filteredTasks }: PropsType) => {
  const dispatch = useAppDispatch();
  return (
    <ul className={css.tasks}>
      {filteredTasks?.map((task) => (
        <li key={task.id} className={task.isCompleted ? css.isDone : undefined}>
          <div className={css.container}>
            <BaseCheckbox
              checked={task.isCompleted}
              onChange={(event) => {
                dispatch(updateTask({ isCompleted: event.target.checked, taskId: task.id }));
              }}
            />
            <ChangeTitle
              title={task.title}
              saveTitle={(value, successCallback) => {
                dispatch(updateTask({ title: value, taskId: task.id, successCallback }));
              }}
              disabled={task.isCompleted}
            />
            <BaseButton
              disabled={task.isCompleted}
              onClick={()=> dispatch(deleteTask({id: task.id}))
            }
            >
              Delete
            </BaseButton>
          </div>
        </li>
      ))}
    </ul>
  );
};
