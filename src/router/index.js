import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */
/* , ssrContext  => this can be one of the args */
export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    store.commit('setLeftDrawer', false)
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (to.name === 'adminPanel') {
        console.log('inside to.name')
        console.log(store.getters.adminIn)
        if (store.getters.adminIn) {
          next('/admin')
        } else {
          next('/admin-login')
        }
      } else {
        if (store.getters.loggedIn) {
          next()
          return
        }
        next('/login')
      }
    } else {
      next()
    }
  })

  return Router
}
