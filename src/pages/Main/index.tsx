import { SyntheticEvent, useRef } from 'react'
import { PlusCircle } from 'phosphor-react'

import { Header } from '../../components/Header'
import { NoTasks } from '../../components/NoTasks'
import { TaskWrapper } from '../../components/TaskWrapper'
import { useToDoList } from '../../contexts/toDoContext'

import styles from './styles.module.css'

export const Main = () => {
  const newTodoInputRef = useRef<HTMLInputElement>(null)

  const { toDoList, addToDo, toDoCount, doneToDoCount } = useToDoList()

  function handleNewToDo(event: SyntheticEvent) {
    event.preventDefault()

    const description = newTodoInputRef.current?.value

    if (!description) return

    addToDo(description)
    newTodoInputRef.current.value = ''
  }

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainWrapper}>
        <form className={styles.inputContainer} onSubmit={handleNewToDo}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            ref={newTodoInputRef}
          />

          <button type="submit">
            Criar <PlusCircle size={20} />
          </button>
        </form>

        <header className={styles.headerWrapper}>
          <div>
            <p className={styles.createdTasks}>Tarefas criadas</p>
            <span>{toDoCount}</span>
          </div>

          <div>
            <p className={styles.finishedTasks}>Concluídas</p>
            <span>
              {doneToDoCount} de {toDoCount}
            </span>
          </div>
        </header>

        <section className={styles.tasksSection}>
          {toDoList.length !== 0 ? (
            <TaskWrapper toDoList={toDoList} />
          ) : (
            <NoTasks />
          )}
        </section>
      </main>
    </div>
  )
}
