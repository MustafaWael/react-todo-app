import { EditIcon } from '@chakra-ui/icons'
import { Box, Flex, ListItem, Text } from '@chakra-ui/react'
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import { useRef, useState } from 'react'
import { DraggableSwipe } from './DraggableSwipe'
import { EditingTemplate } from './EditingTemplate'

export const TaskItem = ({ description, isCompleted, id }) => {
  const x = useMotionValue(0)
  const scale = useTransform(x, [-80, 80], [0, 1])
  const scale2 = useTransform(x, [100, -100], [0, 1])
  const background = useTransform(
    x,
    [80, 0, -80],
    ['#ff5858', '#285E61', '#2c6d70']
  )
  const [isEditing, setIsEditing] = useState(false)
  const clickHandler = () => {
    setIsEditing(!isEditing)
  }

  return (
    <ListItem
      as={motion.div}
      layout
      width={'full'}
      h={'60px'}
      rounded={'lg'}
      overflow="clip"
      userSelect="none"
      pos="relative"
      display={'flex'}
      justifyContent={'space-between'}
      alignItems="center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence>
        {isEditing ? (
          <EditingTemplate
            clickHandler={clickHandler}
            description={description}
            id={id}
            key={id}
            isCompleted={isCompleted}
          />
        ) : (
          <Box
            as={motion.div}
            width={'full'}
            h={'60px'}
            rounded={'lg'}
            overflow="clip"
            userSelect="none"
            bgColor={'teal.100'}
            pos="absolute"
            zIndex={'10'}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems="center"
            px={'4'}
            style={{ background, willChange: 'transform, opacity' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <Text
              as={motion.p}
              willChange="transform"
              style={{ scale, color: '#E6FFFA' }}
              fontSize={'lg'}
              fontWeight="medium"
              transformOrigin={'left'}
            >
              Delete
            </Text>
            <Text
              as={motion.p}
              willChange="transform"
              style={{ scale: scale2, color: '#E6FFFA' }}
              fontSize={'lg'}
              fontWeight="medium"
              color="whatsapp.800"
              transformOrigin={'right'}
            >
              Complete
            </Text>

            <DraggableSwipe id={id} x={x} isCompleted={isCompleted}>
              <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                w={'full'}
              >
                <Box>{description}</Box>
                <EditIcon
                  fontSize={'1.5rem'}
                  onClick={clickHandler}
                  cursor={'pointer'}
                />
              </Flex>
            </DraggableSwipe>
          </Box>
        )}
      </AnimatePresence>
    </ListItem>
  )
}
