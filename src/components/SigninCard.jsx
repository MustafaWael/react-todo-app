import { useContext, useRef } from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'
import { AuthContext } from '../context/Auth'

export default function LoginCard() {
  const { loginLoading: loading, login, error } = useContext(AuthContext)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const submitHandler = async (e) => {
    e.preventDefault()
    const credintials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    login(credintials)
  }

  return (
    <>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color={'teal.200'}>
            Sign in to your account
          </Heading>
          <Text fontSize={'lg'} color={'teal.50'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={'teal.900'} boxShadow={'lg'} p={8}>
          {error && (
            <Alert status="error" marginBottom={8} rounded={'md'}>
              <Stack spacing={1}>
                <Flex alignItems="center">
                  <AlertIcon
                    css={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <WarningIcon />
                  </AlertIcon>
                  <AlertTitle>Submitting Error</AlertTitle>
                </Flex>
                <AlertDescription>{error?.error}</AlertDescription>
              </Stack>
            </Alert>
          )}
          <form onSubmit={submitHandler}>
            <Stack spacing={4}>
              <FormControl id="email" color={'teal.50'}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" required ref={emailRef} />
              </FormControl>
              <FormControl id="password" color={'teal.50'}>
                <FormLabel>Password</FormLabel>
                <Input type="password" required ref={passwordRef} />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  isLoading={loading}
                  loadingText="Signing in"
                  type="submit"
                  colorScheme={'teal'}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </>
  )
}
