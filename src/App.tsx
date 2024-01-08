import { ToDoProvider } from './contexts/toDoContext'
import { Main } from './pages/Main'

function App() {
  return (
    <ToDoProvider>
      <Main />
    </ToDoProvider>
  )
}

export default App
