import { ClipboardText } from 'phosphor-react'

import styles from './NoTasks.module.css'

export const NoTasks = () => {
  return (
    <div className={styles.container}>
      <ClipboardText size={56} />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  )
}
