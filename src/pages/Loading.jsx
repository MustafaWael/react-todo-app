import { Flex, Spinner, Text } from '@chakra-ui/react'

export const LoadingPage = ({ description = "Loading" }) => {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      w={'auto'}
      height={'calc(100vh - 60px)'}
      gap={4}
      flexDir={"column"}
    >
      <Text color={'teal.100'} fontSize={'2xl'} fontWeight={"bold"}>
        {description}
      </Text>
      <Spinner size={'lg'} emptyColor='teal.200' color={"teal.600"}/>
    </Flex>
  )
}
