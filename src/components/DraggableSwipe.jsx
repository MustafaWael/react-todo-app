import { Box } from '@chakra-ui/react'
import { animate, motion } from 'framer-motion'
import { useContext } from 'react'
import { TaskContext } from '../context/Task'

export const DraggableSwipe = ({ children, id, x, isCompleted }) => {
  const { completeTask, deleteTask } = useContext(TaskContext)

  const onDragEndHandler = () => {
    const velocity = x.getVelocity()
    const direction = x.get() > 0 ? 1 : 0
    if (!direction && isCompleted) {
      x.stop()
    }
    if (x.get() >= 50 || x.get() <= -50) {
      if (velocity >= 100 || velocity <= -100) {
        animate(x, direction ? 500 : -500, {
          bounce: 0,
          duration: 0.4,
          ease: 'easeOut',
        })

        x.onChange((_) => {
          if (x.get() >= 500 && direction) deleteTask(id, isCompleted)
          if (x.get() <= -500 && !direction) {
            completeTask(id)
          }
        })
      }
    }
  }

  return (
    <Box
      as={motion.div}
      drag="x"
      whileTap={{ cursor: 'grabbing' }}
      whileHover={{ cursor: 'grabbing' }}
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, scale: 1.002, willChange: 'transform' }}
      pos={'absolute'}
      inset="0"
      rounded={'lg'}
      h={'100%'}
      fontSize="lg"
      color={'teal.50'}
      backgroundColor="teal.900"
      display="flex"
      alignItems={'center'}
      p={'2.5'}
      onDragEnd={onDragEndHandler}
      dragElastic={{ left: isCompleted ? 0 : 0.3, right: 0.3 }}
      onPointerUp={() => {
        animate(x, 0, { bounce: 0, duration: 0.4, ease: 'easeOut' })
      }}
    >
      {children}
    </Box>
  )
}
