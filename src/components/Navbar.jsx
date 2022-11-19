import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  AlertDialogHeader,
} from '@chakra-ui/react'
import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/Auth'
import { ProfileSettings } from './Modals/ProfileSettins'

export default function Navbar() {
  const { user, logout, logoutAllLoading, logoutLoading } =
    useContext(AuthContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure()
  const cancelRef = useRef()

  const logoutHandler = async (allSessions) => {
    await logout(allSessions)
    onClose()
  }

  return (
    <Box>
      <Flex
        bgColor={'teal.900'}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}
      >
        <Flex flex={{ base: 1 }}>
          <Text as={Link} to={'/'} fontFamily={'heading'} color={'teal.50'}>
            TODO
          </Text>
        </Flex>

        <Stack
          justify={'flex-end'}
          direction={'row'}
          alignItems="center"
          spacing={6}
        >
          {!user ? (
            <>
              <Button
                as={Link}
                to={'/login'}
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
                color="teal.50"
              >
                Sign In
              </Button>
              <Button
                as={Link}
                to={'/signup'}
                fontSize={'sm'}
                fontWeight={600}
                colorScheme="teal"
              >
                Sign Up
              </Button>
            </>
          ) : null}

          {user ? (
            <Flex alignItems={'center'}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  w={2}
                  height={10}
                  bgColor={'teal.800'}
                  _hover={{
                    textDecor: 'none',
                  }}
                >
                  <Flex
                    justifyContent={'center'}
                    color={'teal.50'}
                    alignItems="center"
                    textTransform={'uppercase'}
                  >
                    {user?.name?.substring(0, 1)}
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} to={'/app'} fontSize={'lg'}>
                    Todo app
                  </MenuItem>
                  <MenuItem
                    paddingInline={4}
                    fontSize={'lg'}
                    onClick={onOpenModal}
                  >
                    Profile settings
                  </MenuItem>
                  <MenuItem
                    paddingInline={4}
                    fontSize={'lg'}
                    color={'red.500'}
                    onClick={onOpen}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : null}
        </Stack>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout user
            </AlertDialogHeader>

            <AlertDialogBody>
              Do you want to log out from all sessions? Click continue to log
              out from all sessions
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => logoutHandler(false)}
                isLoading={logoutLoading}
                loadingText="Logging out"
              >
                Log out
              </Button>
              <Button
                colorScheme="teal"
                onClick={() => logoutHandler(true)}
                isLoading={logoutAllLoading}
                loadingText="Logging out"
                ml={3}
              >
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <ProfileSettings isOpen={isOpenModal} onClose={onCloseModal} />
    </Box>
  )
}
