import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

import { v4 as uuid } from 'uuid'

export interface ToDoProps {
  id: string
  description: string
  isDone: boolean
}

interface ToDoContextProps {
  toDoList: ToDoProps[]
  addToDo: (description: string) => void
  deleteToDo: (id: string) => void
  updateIsDone: (id: string) => void
  toDoCount: number
  doneToDoCount: number
}

interface UpdateLocalStorageProps {
  newToDoList: ToDoProps[]
}

const ToDoContext = createContext<ToDoContextProps>({} as ToDoContextProps)

const localStorageKey = '@myToDoList'

export const ToDoProvider = ({ children }: { children: ReactNode }) => {
  const [toDoList, setToDoList] = useState<ToDoProps[]>([])
  const toDoCount = toDoList.length
  const doneToDoCount = toDoList.filter((todo) => todo.isDone).length

  function updateLocalStorage({ newToDoList }: UpdateLocalStorageProps) {
    if (newToDoList.length === 0) {
      localStorage.removeItem(localStorageKey)
      return
    }

    const toDoListStr = JSON.stringify(newToDoList)
    localStorage.setItem(localStorageKey, toDoListStr)
  }

  function addToDo(description: string) {
    const newToDo = {
      id: uuid(),
      isDone: false,
      description,
    }

    const newToDoList = [newToDo, ...toDoList]

    touchToDoList({ newToDoList })
  }

  function deleteToDo(id: string) {
    const newToDoList = toDoList.filter((todo) => todo.id !== id)

    touchToDoList({ newToDoList })
  }

  function updateIsDone(id: string) {
    const toDoIndex = toDoList.findIndex((todo) => todo.id === id)

    if (toDoIndex === -1) return

    const newToDoList = [...toDoList]
    newToDoList[toDoIndex].isDone = !newToDoList[toDoIndex].isDone

    touchToDoList({ newToDoList })
  }

  function touchToDoList({ newToDoList }: UpdateLocalStorageProps) {
    setToDoList(newToDoList)
    updateLocalStorage({ newToDoList })
  }

  // init toDoList
  useEffect(() => {
    const toDoListOnLocalStorage = localStorage.getItem(localStorageKey)

    if (toDoListOnLocalStorage) {
      const storedToDoList = JSON.parse(toDoListOnLocalStorage)
      setToDoList(storedToDoList)
    }
  }, [])

  return (
    <ToDoContext.Provider
      value={{
        toDoList,
        addToDo,
        deleteToDo,
        toDoCount,
        doneToDoCount,
        updateIsDone,
      }}
    >
      {children}
    </ToDoContext.Provider>
  )
}

export function useToDoList(): ToDoContextProps {
  return useContext(ToDoContext)
}
