import { Flex, Image, List, Spinner, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { TaskContext } from '../context/Task'
import { ActiveTasks } from './ActiveTasks'
import { CompletedTasks } from './CompletedTasks'
import thinkingIllustration from '../assets/martina-man-thinking-about-an-important-question.gif'

export const TaskList = (props) => {
  const { loadingTasks, checkingForUpdate, tasks } = useContext(TaskContext)

  if (loadingTasks)
    return (
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        gap={4}
        flexDir={'column'}
      >
        <Text color={'teal.100'} fontSize={'2xl'} fontWeight={'bold'}>
          Loading Tasks
        </Text>
        <Spinner size={'lg'} emptyColor="teal.200" color={'teal.600'} />
      </Flex>
    )
    
  return (tasks.length && !loadingTasks) ? (
    <List
      as={motion.ul}
      layout
      listStyleType={'none'}
      display="flex"
      flexDir={'column'}
      rowGap={5}
      overflow="hidden"
      {...props}
    >
      {checkingForUpdate && <CheckingForUpdates />}
      <ActiveTasks />
      <CompletedTasks />
    </List>
  ) : (
    <Image src={thinkingIllustration} />
  )
}

const CheckingForUpdates = () => (
  <motion.li>
    <Flex alignItems={'center'} justifyContent={'center'} gap={4}>
      <Text fontSize={'xl'} color={'teal.200'}>
        Check for updates
      </Text>
      <Spinner size={'md'} emptyColor="teal.200" color={'teal.600'} />
    </Flex>
  </motion.li>
)
