import { Box } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { RequireAuth } from './components/RequiredAuth'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/SigninPage'
import { SignupPage } from './pages/SignupPage'
import { TodoAppPage } from './pages/TodoAppPage'

function App() {
  return (
    <Box bg={'teal.800'} minH={'100vh'}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/app"
          element={
            <RequireAuth>
              <TodoAppPage />
            </RequireAuth>
          }
        />
      </Routes>
    </Box>
  )
}

export default App
