import { useRef } from 'react'
import { createContext, useState, useEffect } from 'react'
import API from '../api'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const TaskContext = createContext(null)

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [loadingTasks, setLoadingTasks] = useState(false)
  const [addLoading, setaddLoading] = useState(false)
  const [checkingForUpdate, setCheckingForUpdate] = useState(false)
  const [error, setError] = useState(null)
  const timeoutRef = useRef(null)

  const getTasks = async () => {
    try {
      setLoadingTasks(true)
      const { data } = await API.getTasks()
      setTasks(data)
      setLoadingTasks(false)
    } catch (err) {
      setLoadingTasks(false)
      setError(err.response?.data || { error: err.message })
    }
  }

  const addTask = async (payload) => {
    try {
      setaddLoading(true)
      const { data: createdTask } = await API.createTask(payload)
      const updatedTasks = [createdTask, ...tasks]
      setTasks(updatedTasks)
      setaddLoading(false)
    } catch (err) {
      setaddLoading(false)
      setError(err.response?.data || { error: err.message })
    }
  }

  const completeTask = async (id) => {
    try {
      // Set task completed to true
      const updatedTasks = tasks.map((task) =>
        task._id === id ? { ...task, completed: true } : task
      )
      setTasks(updatedTasks)
      await API.updateTask(id, { completed: true })
    } catch (err) {
      setError(err.response?.data || { error: err.message })
    }
  }

  const editTask = async (id, description) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task._id === id ? { ...task, description } : task
      )

      setTasks(updatedTasks)
      await API.updateTask(id, { description })
    } catch (err) {
      setError(err.response?.data || { error: err.message })
    }
  }

  const deleteTask = async (id) => {
    try {
      const updatedTasks = tasks.filter((task) => task._id !== id)
      setTasks(updatedTasks)
      await API.deleteTask(id)
    } catch (err) {
      console.log(err)
      setError(err.response?.data || { error: err.message })
    }
  }

  const revalidateTasks = async () => {
    try {
      setCheckingForUpdate(true)
      await API.getTasks()
      setCheckingForUpdate(false)
    } catch (err) {
      setError(err)
    }
  }

  useEffect(() => {
    tasks.length || getTasks()
    timeoutRef.current = setTimeout(() => {
      tasks.length && revalidateTasks()
    }, 1500)

    return () => clearTimeout(timeoutRef)
  }, [])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadingTasks,
        addLoading,
        error,
        checkingForUpdate,
        getTasks,
        addTask,
        completeTask,
        deleteTask,
        editTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
