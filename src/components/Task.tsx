import { Trash, Check } from 'phosphor-react'

import styles from './Task.module.css'
import { ToDoProps, useToDoList } from '../contexts/toDoContext'

export const Task = ({ id, description, isDone }: ToDoProps) => {
  const { deleteToDo, updateIsDone } = useToDoList()

  function handleSetDoneUpdate() {
    updateIsDone(id)
  }

  function handleDeleteToDo() {
    deleteToDo(id)
  }

  return (
    <article className={styles.container}>
      {isDone ? (
        <button className={styles.taskDoneBtn} onClick={handleSetDoneUpdate}>
          <Check weight="bold" />
        </button>
      ) : (
        <button className={styles.setDoneTask} onClick={handleSetDoneUpdate} />
      )}
      <p className={isDone ? styles.doneTask : ''}>{description}</p>
      <button className={styles.deleteTask} onClick={handleDeleteToDo}>
        <Trash size={20} />
      </button>
    </article>
  )
}
