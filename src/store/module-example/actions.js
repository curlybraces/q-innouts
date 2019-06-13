import axios from 'axios'
// export function someAction (/* context */) {

// }
export const login = ({ commit }, user) => {
  return new Promise((resolve, reject) => {
    commit('authRequest')
    axios({ url: 'http://innouts.test/api/login', data: user, method: 'POST' })
      .then(resp => {
        const token = resp.data.token
        const user = resp.data.user
        // console.log(user)
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = token
        commit('authSuccess', token, user)
        resolve(resp)
      })
      .catch(err => {
        commit('authError')
        localStorage.removeItem('token')
        reject(err)
      })
  })
}

export function logout ({ commit }) {
  return new Promise((resolve, reject) => {
    commit('logout')
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    resolve()
  })
}
