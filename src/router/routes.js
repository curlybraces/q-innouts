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
        path: '/:user', component: () => import('pages/Profile.vue')
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
