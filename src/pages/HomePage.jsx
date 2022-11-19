import { Flex, Container, Heading, Stack, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Managing } from '../components/Illustration/Managing'

export const HomePage = () => {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
          color={'teal.200'}
        >
          Managing your day{' '}
          <Text as={'span'} color={'orange.400'}>
            made easy
          </Text>
        </Heading>
        <Text color={'teal.50'} maxW={'3xl'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar
          tristique faucibus. Suspendisse faucibus eget lacus sed mollis.
          Vestibulum auctor vestibulum auctor. Integer est lectus, egestas a
          ullamcorper eu, gravida finibus felis.
        </Text>
        <Button
          rounded={'full'}
          px={6}
          colorScheme={'orange'}
          bg={'orange.400'}
          _hover={{ bg: 'orange.500' }}
        >
          <Link to="/signup">Get started</Link>
        </Button>

        <Flex w={'full'}>
          <Managing
            height={{ sm: '24rem', lg: '28rem' }}
            mt={{ base: 12, sm: 16 }}
          />
        </Flex>
      </Stack>
    </Container>
  )
}
