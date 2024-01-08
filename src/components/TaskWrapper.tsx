import { ToDoProps } from '../contexts/toDoContext'
import { Task } from './Task'
import styles from './TaskWrapper.module.css'

interface TaskWrapperProps {
  toDoList: ToDoProps[]
}

export const TaskWrapper = ({ toDoList }: TaskWrapperProps) => {
  return (
    <div className={styles.container}>
      {toDoList.map((toDo) => (
        <Task
          key={toDo.id}
          id={toDo.id}
          description={toDo.description}
          isDone={toDo.isDone}
        />
      ))}
    </div>
  )
}
