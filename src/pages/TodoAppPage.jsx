import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { AddTask } from '../components/AddTask'
import { TaskList } from '../components/TaskList'
import { AuthContext } from '../context/Auth'
import { TaskProvider } from '../context/Task'

export const TodoAppPage = () => {
  const { user } = useContext(AuthContext)
  return (
    <TaskProvider>
      <Box mt={'100px'} w={'100%'} maxW={'600px'} mx={'auto'}>
        <Heading
          fontSize={'5xl'}
          mb={'60px'}
          color={'teal.100'}
          px={10}
          textAlign={'center'}
        >
          Hope completing your tasks{' '}
          <Text color={'teal.300'} as={'span'}>
            {user?.name.split(" ")[0]}
          </Text>
          .
        </Heading>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems="center"
        mx={'auto'}
      >
        <Box w={'100%'} maxW={'500px'} p={4}>
          <AddTask />
          <Flex
            background="teal.700"
            borderRadius={10}
            overflow="hidden"
            p={2}
            mb={10}
            height={'100%'}
            minH={'400px'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <TaskList w={'100%'} height={'100%'} minH={'400px'} />
          </Flex>
        </Box>
      </Box>
    </TaskProvider>
  )
}
