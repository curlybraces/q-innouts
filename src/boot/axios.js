import axios from 'axios'
// import store from './store/index.js'
import { Cookies } from 'quasar'

export default async ({ Vue, ssrContext }) => {
  Vue.prototype.$axios = axios

  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies // otherwise we're on client

  const token = cookies.get('token')
  if (token) {
    Vue.prototype.$axios.defaults.headers.common['Authorization'] = token
  }
}
