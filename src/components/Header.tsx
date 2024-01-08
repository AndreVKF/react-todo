import { Calendar } from 'phosphor-react'

import styles from './Header.module.css'

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div>
        <span className={styles.headerContent}>
          <Calendar size={40} weight="fill" />
          my<span>todo</span>
        </span>
      </div>
    </header>
  )
}
