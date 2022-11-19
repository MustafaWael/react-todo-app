import { Flex } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import SignupCard from '../components/SignupCard'
import { AuthContext } from '../context/Auth'
import { LoadingPage } from './Loading'

export const SignupPage = () => {
  const { token, getCurrentUser } = useContext(AuthContext)

  useEffect(() => {
    getCurrentUser()
  }, [])

  return token ? (
    <LoadingPage description="Logging in" />
  ) : (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'teal.800'}>
      <SignupCard />
    </Flex>
  )
}
