import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import api from '../api'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [signupLoading, setSignupLoading] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const [logoutAllLoading, setLogoutAllLoading] = useState(false)
  const [logoutLoading, setLogoutLoading] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [removeLoading, setRemoveLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const token = api.token

  const signup = async (payload) => {
    try {
      setSignupLoading(true)
      const {
        data: { user },
      } = await api.createUser(payload)
      setUser(user)
      setSignupLoading(false)
      setError(null)
      navigate('/app', { replace: true })
    } catch (err) {
      setSignupLoading(false)
      const passwordError = err.response?.data?.errors?.password
      if (passwordError)
        setError({ error: `Password length should be grater than (7)` })
      else setError(err.response?.data)
    }
  }

  const login = async (payload) => {
    try {
      setLoginLoading(true)
      const {
        data: { user },
      } = await api.loginUser(payload)
      setUser(user)
      setLoginLoading(false)
      setError(null)
      navigate('/app', { replace: true })
    } catch (err) {
      setLoginLoading(false)
      setError(err.response?.data)
    }
  }

  const logout = async (allSessions = false) => {
    try {
      if (!token) return
      let logoutFromAllSessions
      if (typeof allSessions === 'boolean') {
        logoutFromAllSessions = allSessions
      } else {
        logoutFromAllSessions = false
      }

      logoutFromAllSessions || setLogoutLoading(true)
      logoutFromAllSessions && setLogoutAllLoading(true)
      await api.logoutUser(logoutFromAllSessions)
      logoutFromAllSessions || setLogoutLoading(false)
      logoutFromAllSessions && setLogoutAllLoading(false)

      setUser(null)
      setError(null)
      localStorage.clear()
      navigate('/', { replace: true })
    } catch (err) {
      setUser(null)
      navigate('/', { replace: true })
      setError(err.response?.data)
      localStorage.clear()
    }
  }

  const getCurrentUser = async () => {
    try {
      if (!token) return

      setLoadingUser(true)
      const { data } = await api.getCurrentUser()
      setUser(data)
      setLoadingUser(false)
      setError(null)
      navigate('/app', { replace: true })
    } catch (err) {
      setError(err)
    }
  }

  const updateUser = async (payload) => {
    try {
      if (!token) return

      setUpdateLoading(true)
      const { data } = await api.updateUser(payload)
      setUser(data)
      setUpdateLoading(false)
      setError(null)
    } catch (err) {
      console.log(err)
      setError(err.response?.data)
    }
  }

  const removeUser = async () => {
    try {
      if (!token) return
      setRemoveLoading(true)
      await api.removeUser()
      setRemoveLoading(false)
      setUser(null)
      setError(null)
      navigate('/', { replace: true })
      localStorage.clear()
    } catch (err) {
      setUser(null)
      setError(err.response?.data)
      localStorage.clear()
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loadingUser,
        signupLoading,
        loginLoading,
        logoutLoading,
        logoutAllLoading,
        updateLoading,
        removeLoading,
        error,
        login,
        logout,
        signup,
        getCurrentUser,
        updateUser,
        removeUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
