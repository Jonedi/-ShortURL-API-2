import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:7000/api/v1',
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
})

export default boot(({ app }) => {

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
