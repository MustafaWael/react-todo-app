import { useContext } from 'react'
import { motion } from 'framer-motion'
import { TaskContext } from '../context/Task'
import { sortByDate } from '../utils'
import { TaskItem } from './TaskItem'
import { Text } from '@chakra-ui/react'

export const CompletedTasks = () => {
  const { tasks } = useContext(TaskContext)

  const sortedCompletedTasks = sortByDate(
    tasks.filter((task) => task.completed),
    'updatedAt'
  )

  return (
    <>
      {sortedCompletedTasks.length ? <CompletedTasksSeparator /> : null}
      {sortedCompletedTasks.map(({ description, _id }) => (
        <TaskItem
          key={_id}
          description={description}
          isCompleted={true}
          id={_id}
        />
      ))}
    </>
  )
}

const CompletedTasksSeparator = () => (
  <motion.li layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <Text fontSize={'lg'} color={'teal.200'}>
      Completed tasks
    </Text>
  </motion.li>
)
