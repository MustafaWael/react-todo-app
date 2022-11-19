import { Flex } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import LoginCard from '../components/SigninCard'
import { AuthContext } from '../context/Auth'
import { LoadingPage } from './Loading'

export const LoginPage = () => {
  const { token, getCurrentUser } = useContext(AuthContext)

  useEffect(() => {
    getCurrentUser()
  }, [])

  return token ? (
    <LoadingPage description='Logging in'/>
  ) : (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'teal.800'}>
      <LoginCard />
    </Flex>
  )
}
