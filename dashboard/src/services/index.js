import router from '@/router'
import { setGlobalLoading } from '@/store/global'
import axios from 'axios'
import AuthService from './auth'
import usersService from './users'
import feedbacksService from './feedbacks'

const API_ENVS = {
  production: 'https://backend-vue-course-dgkzh2yok-gui1703.vercel.app/',
  development: '',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] ?? API_ENVS.local
})

httpClient.interceptors.request.use(config => {
  setGlobalLoading(true)
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use(
  (response) => {
    setGlobalLoading(false)
    return response
  },

  (error) => {
    const canThrowAnError =
      error.request.error === 0 || error.request.status === 500

    if (canThrowAnError) {
      setGlobalLoading(false)
      throw new Error(error.message)
    }

    if (error.response.status === 401) {
      router.push({ name: 'Home' })
    }

    setGlobalLoading(false)
    return error
  }
)

export default {
  auth: AuthService(httpClient),
  users: usersService(httpClient),
  feedbacks: feedbacksService(httpClient)
}
