import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    // modules: {
    //   example
    // },
    state: {
      status: '',
      token: localStorage.getItem('token') || sessionStorage.getItem('token') || '',
      user: Object,
      // view: 'hHh lpr fff',
      // leftDrawer: true,
      // rightDrawer: true,
    },

    getters: {
      loggedIn: state => !!state.token,
      authStatus: state => state.status,
      user: state => state.user
      // view: state => state.view
    },

    mutations: {

      authRequest (state) {
        state.status = 'loading'
      },

      authSuccess (state, payload) {
        state.status = 'success'
        state.token = payload.token
        axios({ url: 'http://innouts.test/api/user', method: 'GET' })
          .then(resp => { state.user = resp.data.user })
          .catch(err => console.log(err))
      },

      authError (state) {
        state.status = 'error'
      },

      logout (state) {
        state.status = ''
        state.token = ''
        state.user = ''
      },

      updateUser (state, payload) {
        state.user = payload.user
        // alert('done')
      }

    },

    actions: {

      login ({ commit }, credentials) {
        return new Promise((resolve, reject) => {
          commit('authRequest')
          axios({ url: 'http://innouts.test/api/login', data: credentials, method: 'POST' })
            .then(resp => {
              let token = resp.data.token
              // let user = resp.data.user

              if (credentials.remember) {
                localStorage.setItem('token', token)
              } else {
                sessionStorage.setItem('token', token)
              }
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

              commit('authSuccess', { 'token': token })
              resolve(resp)
            })
            .catch(err => {
              commit('authError')
              localStorage.removeItem('token')
              reject(err)
            })
        })
      },

      logout ({ commit }) {
        return new Promise((resolve, reject) => {
          commit('logout')
          localStorage.removeItem('token')
          sessionStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          resolve()
        })
      },

      register ({ commit }, info) {
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({ url: 'http://innouts.test/api/register', data: info, method: 'POST' })
            .then(resp => {
              const token = resp.data.token
              // const user = resp.data.user
              localStorage.setItem('token', token)
              // Add the following line:
              axios.defaults.headers.common['Authorization'] = token
              commit('auth_success', token)
              resolve(resp)
            })
            .catch(err => {
              commit('auth_error', err)
              localStorage.removeItem('token')
              reject(err)
            })
        })
      },

      getUser ({ commit }, token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        return new Promise((resolve, reject) => {
          axios({ url: 'http://innouts.test/api/user', method: 'GET' })
            .then(resp => { commit('updateUser', { 'user': resp.data.user }) })
            .catch(err => console.log(err))
          resolve()
        })
      },

    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEV
  })

  return Store
}
