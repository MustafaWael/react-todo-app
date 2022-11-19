import axios from 'axios'

export class API {
  constructor(baseURL) {
    this.baseURL = baseURL
    this.token = localStorage.getItem('user-token') || null
    this.client = null
    this.user = null
  }

  createClient() {
    const client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
    this.client = client

    return client
  }

  async createUser(payload) {
    const res = await this.client.post('/users/signup', payload)
    this.updateToken(res.data?.token)
    this.saveToLocalStorage(res.data?.token)
    return res
  }

  async loginUser(payload) {
    const res = await this.client.post('/users/login', payload)
    this.updateToken(res.data?.token)
    this.saveToLocalStorage(res.data?.token)
    return res
  }

  logoutUser(allSessions) {
    this.clearLocalStorage()
    this.token = null
    return this.client.post(`/users/${allSessions ? 'logoutall' : 'logout'}`)
  }

  async getCurrentUser() {
    return this.client.get('users/me')
  }

  async updateUser(payload) {
    return this.client.patch('/users/me', payload)
  }

  removeUser() {
    this.clearLocalStorage()
    return this.client.delete('/users/me')
  }

  updateToken(token) {
    this.token = token
    this.client = this.createClient()
  }

  saveToLocalStorage(token) {
    token && localStorage.setItem('user-token', token)
  }

  clearLocalStorage() {
    localStorage.clear()
  }

  getTasks() {
    return this.client.get('/tasks')
  }

  createTask(payload) {
    return this.client.post(`/tasks`, payload)
  }

  deleteTask(id) {
    return this.client.delete(`/tasks/${id}`)
  }

  updateTask(id, payload) {
    return this.client.patch(`/tasks/${id}`, payload)
  }
}

const api = new API(import.meta.env.VITE_API_URL)
api.createClient()

export default api
