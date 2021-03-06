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
        path: '/leagues/others', component: () => import('pages/Others.vue')
      },
      {
        path: '/leagues/:league', component: () => import('pages/League.vue')
      },
      {
        path: '/rumours', component: () => import('pages/Rumours.vue')
      },
      {
        path: '/highlights', component: () => import('pages/Highlights.vue')
      },
      {
        path: '/news', component: () => import('pages/News.vue')
      },
      {
        path: '/submit-rumour', component: () => import('pages/UserCreateRumour.vue'), meta: { requiresAuth: true }
      },
      {
        path: '/transfers', component: () => import('pages/Transfers.vue')
      },
      {
        path: '/teams/:team', component: () => import('pages/Team.vue')
      },
      {
        path: '/stories', component: () => import('pages/Stories.vue')
      },
      {
        path: '/stories/:story/:slug', component: () => import('pages/Story.vue')
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
      {
        path: '/about', component: () => import('pages/About.vue')
      },
      {
        path: '/guide', component: () => import('pages/Guide.vue')
      },
      {
        path: '/privacy-policy', component: () => import('pages/Policy.vue')
      },
      {
        path: '/terms', component: () => import('pages/Terms.vue')
      },
      {
        path: '/purchase-cards', name: 'buy', component: () => import('pages/Buy.vue'), meta: { requiresAuth: true }
      },
      // keep as last route
      {
        path: '/:user/:slug', name: 'profile', component: () => import('pages/Profile.vue')
      },
    ]
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
