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
    ]
  },
  {
    path: '/test',
    component: () => import('layouts/Test.vue'),
    // children: [
    //   { path: '', component: () => import('pages/Index.vue') },
    // ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
