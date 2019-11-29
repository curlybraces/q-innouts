import gtm from 'components/gtm'

export default ({ router }) => {
  router.afterEach((to, from) => {
    gtm.logPage(to.path)
  })
}
