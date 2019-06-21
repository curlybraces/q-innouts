const ID = () => import('pages/ID.vue')

const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: 'players/:id',
        component: ID,
      },
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
        path: '/rankings', component: () => import('pages/Rankings.vue')
      },
      {
        path: '/login', component: () => import('pages/Login.vue')
      },
      {
        path: '/register', component: () => import('pages/Register.vue')
      },
      {
        path: '/settings', component: () => import('pages/Profile.vue'), meta: { requiresAuth: true }
      },
      // keep as last route
      {
        path: '/:user', name: 'profile', component: () => import('pages/Profile.vue'), meta: { requiresAuth: true }
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
