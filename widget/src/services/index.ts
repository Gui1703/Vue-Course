import axios from 'axios'
// import FeedbacksService from './feedbacks'

const API_ENVS = {
  production: 'https://backend-vue-course-dgkzh2yok-gui1703.vercel.app/',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS.local
})

httpClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const canThrowAnError = error.request.status === 0 ||
    error.request.status === 500

  if (canThrowAnError) {
    throw new Error(error.message)
  }

  return error
})

export default {
  // feedbacks: FeedbacksService(httpClient)
}
