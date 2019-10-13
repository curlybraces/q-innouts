const ID = () => import('pages/ID.vue')

const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: 'players/:id/:slug',
        name: 'player',
        component: ID,
      },
      { path: '/managers/:manager', name: 'manager', component: () => import('pages/ID.vue') },
      {
        path: '/leagues/:league', component: () => import('pages/League.vue')
      },
      {
        path: '/rumours', component: () => import('pages/Rumours.vue')
      },
      {
        path: '/transfers', component: () => import('pages/Transfers.vue')
      },
      {
        path: '/teams/:team', component: () => import('pages/Team.vue')
      },
      {
        path: '/articles/:article/:slug', component: () => import('pages/Article.vue')
      },
      {
        path: '/editorials', component: () => import('pages/Editorials.vue')
      },
      {
        path: '/rankings', component: () => import('pages/Rankings.vue')
      },
      {
        path: '/login', name: 'login', component: () => import('pages/Login.vue')
      },
      {
        path: '/register', component: () => import('pages/Register.vue')
      },
      {
        path: '/forgot-password', component: () => import('pages/Forgot.vue')
      },
      {
        path: '/reset-password/:token', component: () => import('pages/ResetPassword.vue')
      },
      {
        path: '/home', name: 'home', component: () => import('pages/Home.vue'), meta: { requiresAuth: true }
      },
      {
        path: '/settings', name: 'settings', component: () => import('pages/Settings.vue'), meta: { requiresAuth: true }
      },
      {
        path: '/admin', name: 'adminPanel', component: () => import('pages/Admin.vue'), meta: { requiresAuth: true }
      },
      {
        path: '/admin-login', component: () => import('pages/AdminLogin.vue')
      },
      {
        path: '/find/:name', name: 'find', component: () => import('pages/Find.vue')
      },
      // keep as last route
      {
        path: '/:user/:slug', name: 'profile', component: () => import('pages/Profile.vue')
      },
    ]
  },
  {
    path: '/test',
    component: () => import('layouts/Test.vue'),
    // children: [
    //   { path: '', component: () => import('pages/Index.vue') },
    // ]
  },

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
