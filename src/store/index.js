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
      token: localStorage.getItem('token') || '',
      user: Object
    },

    getters: {
      loggedIn: state => !!state.token,
      authStatus: state => state.status,
    },

    mutations: {

      authRequest (state) {
        state.status = 'loading'
      },

      authSuccess (state, payload) {
        state.status = 'success'
        state.token = payload.token
        state.user = payload.user
      },

      authError (state) {
        state.status = 'error'
      },

      logout (state) {
        state.status = ''
        state.token = ''
        state.user = Object
      },

    },

    actions: {

      login ({ commit }, credentials) {
        return new Promise((resolve, reject) => {
          commit('authRequest')
          axios({ url: 'http://innouts.test/api/login', data: credentials, method: 'POST' })
            .then(resp => {
              let token = resp.data.token
              // const user = resp.data.user
              localStorage.setItem('token', token)
              axios.defaults.headers.common['Authorization'] = token
              commit('authSuccess', { 'token': token, 'user': resp.data.user })
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
              const user = resp.data.user
              localStorage.setItem('token', token)
              // Add the following line:
              axios.defaults.headers.common['Authorization'] = token
              commit('auth_success', token, user)
              resolve(resp)
            })
            .catch(err => {
              commit('auth_error', err)
              localStorage.removeItem('token')
              reject(err)
            })
        })
      },

    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEV
  })

  return Store
}
