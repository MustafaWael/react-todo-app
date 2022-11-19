import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useContext, useRef } from 'react'
import { AuthContext } from '../../context/Auth'

export const ProfileSettings = ({ isOpen, onClose }) => {
  const { updateUser, removeUser, removeLoading } = useContext(AuthContext)
  const [loadingUsername, setLoadingUsername] = useState(false)
  const [loadingPassword, setLoadingPassword] = useState(false)
  const passwordRef = useRef(null)
  const usernameRef = useRef(null)

  const updatePassword = async (e) => {
    try {
      e && e.preventDefault()
      const password = passwordRef.current.value
      setLoadingPassword(true)
      await updateUser({ password })
      setLoadingPassword(false)
      onClose()
    } catch (_) {
      setLoadingPassword(false)
    }
  }

  const updateUsername = async (e) => {
    try {
      e && e.preventDefault()
      const username = usernameRef.current.value
      setLoadingUsername(true)
      await updateUser({ name: username })
      setLoadingUsername(false)
      onClose()
    } catch (_) {
      setLoadingUsername(false)
    }
  }

  const removeUserHandler = async () => {
    await removeUser()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box>
            <form onSubmit={updateUsername}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Flex gap={2}>
                  <Input placeholder="New name" ref={usernameRef} required />
                  <Button type="submit" isLoading={loadingUsername}>
                    Save
                  </Button>
                </Flex>
              </FormControl>
            </form>
          </Box>

          <Box mt={2}>
            <form onSubmit={updatePassword}>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Flex gap={2}>
                  <Input
                    placeholder="New password"
                    ref={passwordRef}
                    required
                  />
                  <Button type="submit" isLoading={loadingPassword}>
                    Save
                  </Button>
                </Flex>
              </FormControl>
            </form>
          </Box>
          <Divider mt={4} />
          <Flex mt={4} alignItems="center" justifyContent={'space-between'}>
            <Text color={'red.600'}>Do you want to delete your account?</Text>
            <Button
              colorScheme={'red'}
              onClick={removeUserHandler}
              isLoading={removeLoading}
            >
              Delete
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
