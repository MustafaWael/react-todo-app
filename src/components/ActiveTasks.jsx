import { useContext } from 'react'
import { TaskContext } from '../context/Task'
import { sortByDate } from '../utils'
import { TaskItem } from './TaskItem'

export const ActiveTasks = () => {
  const { tasks } = useContext(TaskContext)

  const sortedActiveTasks = sortByDate(
    tasks.filter((task) => !task.completed),
    'createdAt'
  )

  return sortedActiveTasks.map(({ description, _id }) => (
    <TaskItem
      key={_id}
      description={description}
      isCompleted={false}
      id={_id}
    />
  ))
}
