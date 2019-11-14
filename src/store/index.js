import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Cookies } from 'quasar'
// import example from './module-example'

Vue.use(Vuex)

const checkConsent = (cookies) => {
  if (cookies.has('cookieConsent')) {
    return true
  } else {
    return false
  }
}

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function ({ ssrContext }) {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies // otherwise we're on client

  const Store = new Vuex.Store({
    // modules: {
    //   example
    // },
    state: {
      status: '',
      // token: localStorage.getItem('token') || sessionStorage.getItem('token') || '',
      token: cookies.has('token') ? cookies.get('token') : '',
      adminToken: cookies.has('adminToken') ? cookies.get('adminToken') : '',
      cookieConsent: checkConsent(cookies),
      user: Object,
      admin: Object,
      view: 'hHh lpr fff',
      leftDrawer: false,
      rightDrawer: false,
    },

    getters: {
      loggedIn: state => !!state.token,
      adminIn: state => !!state.adminToken,
      authStatus: state => state.status,
      user: state => state.user,
      admin: state => state.admin,
      view: state => state.view,
      leftDrawer: state => state.leftDrawer,
      rightDrawer: state => state.rightDrawer,
      cookieConsent: state => state.cookieConsent
    },

    mutations: {

      authRequest (state) {
        state.status = 'loading'
      },

      authSuccess (state, payload) {
        state.status = 'success'
        state.token = payload.token
        axios({ url: 'api/user', method: 'GET' })
          .then(resp => { state.user = resp.data.user })
          .catch(err => console.log(err))
      },

      authError (state) {
        state.status = 'error'
      },

      logout (state) {
        state.status = ''
        state.token = ''
        state.user = {}
      },

      adminLogout (state) {
        state.adminToken = ''
        state.admin = {}
      },

      updateUser (state, payload) {
        state.user = payload.user
        // alert('done')
      },

      updateAdmin (state, payload) {
        state.admin = payload.admin
      },

      adminAuthSuccess (state, payload) {
        state.adminToken = payload.token
        axios({ url: 'api/admin', method: 'GET' })
          .then(resp => { state.admin = resp.data.admin })
          .catch(err => console.log(err))
      },

      setView (state, payload) {
        state.view = payload.view
      },

      setLeftDrawer (state, ld) {
        state.leftDrawer = ld
      },

      setRightDrawer (state, rd) {
        state.rightDrawer = rd
      },

      toggleLeftDrawer (state) {
        state.leftDrawer = !state.leftDrawer
      },

      cookieAccepted (state) {
        state.cookieConsent = true
      }

    },

    actions: {

      login ({ commit }, credentials) {
        return new Promise((resolve, reject) => {
          commit('authRequest')
          axios({ url: 'api/login', data: credentials, method: 'POST' })
            .then(resp => {
              let token = resp.data.token

              if (credentials.remember) {
                // localStorage.setItem('token', token)
                cookies.set('token', token, { expires: 10 })
              } else {
                // sessionStorage.setItem('token', token)
                cookies.set('token', token)
              }
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
              commit('authSuccess', { 'token': token })
              resolve(resp)
            })
            .catch(err => {
              commit('authError')
              // localStorage.removeItem('token')
              cookies.remove('token')
              reject(err)
            })
        })
      },

      adminLogin ({ commit }, credentials) {
        return new Promise((resolve, reject) => {
          axios({ url: 'api/admin-login', data: credentials, method: 'POST' })
            .then(resp => {
              let token = resp.data.access_token
              if (credentials.remember) {
                cookies.set('adminToken', token, { expires: 10 })
              } else {
                cookies.set('adminToken', token)
              }
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
              commit('adminAuthSuccess', { 'token': token })
              resolve(resp)
            })
            .catch(err => {
              // cookies.remove('token')
              reject(err)
            })
        })
      },

      logout ({ commit }) {
        return new Promise((resolve, reject) => {
          commit('logout')
          cookies.remove('token')
          // localStorage.removeItem('token')
          // sessionStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          resolve()
        })
      },

      adminLogout ({ commit }) {
        return new Promise((resolve, reject) => {
          commit('adminLogout')
          cookies.remove('adminToken')
          delete axios.defaults.headers.common['Authorization']
          resolve()
        })
      },

      register ({ commit }, info) {
        return new Promise((resolve, reject) => {
          // commit('auth_request')
          axios({ url: 'api/register', data: info, method: 'POST' })
            .then(resp => {
              // let token = resp.data.token
              // cookies.set('token', token)
              // Add the following line:
              // axios.defaults.headers.common['Authorization'] = token
              // commit('auth_success', token)
              resolve(resp)
            })
            .catch(err => {
              // commit('auth_error', err)
              // cookies.remove('token')
              reject(err)
            })
        })
      },

      getUser ({ commit }, token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        return new Promise((resolve, reject) => {
          axios({ url: 'api/user', method: 'GET' })
            .then(resp => { commit('updateUser', { 'user': resp.data.user }) })
            .catch(err => console.log(err))
          resolve()
        })
      },

      getAdmin ({ commit }, token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        return new Promise((resolve, reject) => {
          axios({ url: 'api/admin', method: 'GET' })
            .then(resp => { commit('updateAdmin', { 'admin': resp.data.admin }) })
            .catch(err => console.log(err))
          resolve()
        })
      },

      acceptCookies ({ commit }) {
        cookies.set('cookieConsent', true, { expires: 10 })
        commit('cookieAccepted')
      }

    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEV
  })
  return Store
}
