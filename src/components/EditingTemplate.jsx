import { CheckIcon } from '@chakra-ui/icons'
import { Button, Flex, FormControl, Input } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useContext } from 'react'
import { TaskContext } from '../context/Task'

export const EditingTemplate = ({
  clickHandler = () => {},
  description = '',
  id = '',
  isCompleted,
  ...props
}) => {
  const inputRef = useRef(null)
  const { editTask } = useContext(TaskContext)

  const editHandler = (e) => {
    e.preventDefault()
    const newDescription = inputRef.current.value
    editTask(id, newDescription, isCompleted)
    clickHandler()
  }

  return (
    <FormControl
      as={motion.form}
      onSubmit={editHandler}
      w={'full'}
      zIndex={'9'}
      {...props}
      style={{ willChange: 'transform, opacity' }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, transition: { bounce: 0 } }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <Flex alignItems="center" w={'full'} columnGap={5}>
        <Input
          type={'text'}
          defaultValue={description}
          ref={inputRef}
          color={'teal.50'}
        />
        <Flex gap={2}>
          <Button type="submit" colorScheme={'teal'}>
            <CheckIcon fontSize={'1rem'} cursor={'pointer'} />
          </Button>
          <Button onClick={clickHandler} colorScheme={'red'}>
            Cancel
          </Button>
        </Flex>
      </Flex>
    </FormControl>
  )
}
