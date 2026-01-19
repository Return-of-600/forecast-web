import axios from "axios"

const url = import.meta.env.VITE_APP_API_URL

function create(baseURL, options) {
  const instance = axios.create(Object.assign({ baseURL }, options)) 
  return instance
}

axios.interceptors.request.use(
  (config) => {
    console.warn('request ', config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    console.warn('response ', response)
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const posts = create(url)