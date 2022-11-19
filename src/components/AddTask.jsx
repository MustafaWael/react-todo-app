import { Button, Flex, Input } from '@chakra-ui/react'
import { useContext, useRef } from 'react'
import { TaskContext } from '../context/Task'

export const AddTask = () => {
  const { addTask, addLoading } = useContext(TaskContext)
  const taskDescRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault()
    const payload = { description: taskDescRef.current.value, completed: false }
    addTask(payload)
    taskDescRef.current.value = ''
  }

  return (
    <form onSubmit={submitHandler}>
      <Flex mb={8} columnGap={4}>
        <Input
          ref={taskDescRef}
          color="teal.50"
          _placeholder={{ color: 'teal.50' }}
          placeholder="Type your task"
          size={'lg'}
          autoFocus
        />
        <Button
          colorScheme={'teal'}
          isLoading={addLoading}
          type="submit"
          size={'lg'}
        >
          Add
        </Button>
      </Flex>
    </form>
  )
}
