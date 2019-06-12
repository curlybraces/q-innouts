import axios from 'axios'
// import store from './store/index.js'

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios

  const token = localStorage.getItem('token')
  if (token) {
    Vue.prototype.$axios.defaults.headers.common['Authorization'] = token
  }
}
