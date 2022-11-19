import { useState, useContext, useRef } from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link as ChakraLink,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon, WarningIcon } from '@chakra-ui/icons'
import { AuthContext } from '../context/Auth'
import { Link } from 'react-router-dom'

export default function SignupCard() {
  const { signupLoading: loading, signup, error } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)
  const usernameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const submitHandler = async (e) => {
    e.preventDefault()
    const credintials = {
      name: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    signup(credintials)
  }

  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'} textAlign={'center'} color={'teal.200'}>
          Sign up
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
            <FormControl id="firstName" color={'teal.50'}>
              <FormLabel>Username</FormLabel>
              <Input type="text" required ref={usernameRef} />
            </FormControl>
            <FormControl id="email" color={'teal.50'}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" required ref={emailRef} />
            </FormControl>
            <FormControl id="password" color={'teal.50'}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  required
                  ref={passwordRef}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    colorScheme={'teal'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Stack>
          <Stack spacing={10} mt={4}>
            <Button
              colorScheme={'teal'}
              type="submit"
              isLoading={loading}
              loadingText="Signing up"
              size="lg"
            >
              Sign up
            </Button>
          </Stack>
        </form>
        <Stack pt={6}>
          <Text align={'center'} color={'teal.50'}>
            Already a user?{' '}
            <ChakraLink as={Link} to="/login" color={'teal.200'}>
              Login
            </ChakraLink>
          </Text>
        </Stack>
      </Box>
    </Stack>
  )
}
