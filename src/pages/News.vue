<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-grow col-sm-10 col-md-8 col-lg-7">
        <div class="text-center text-h5 bg-primary q-pa-md text-white rounded-borders">
          Latest News
        </div>
        <news :news="news"/>
        <div to="/submit-rumour" class="text-caption text-center">News from BBC Sports</div>
      </div>
    </div>
  </q-page>
</template>

<script>

const News = () => import('components/News.vue')
const Parser = require('rss-parser')
const parser = new Parser()

export default {
  name: 'NewsPage',
  components: {
    News
  },

  data () {
    return {
      news: []
    }
  },

  meta () {
    return {
      title: 'News - Innouts',

      meta: {
        description: { name: 'description', content: 'Latest football news.' },
        keywords: { name: 'keywords', content: ['football news', 'latest football', 'soccer news'] },
      },
    }
  },

  beforeRouteEnter (to, from, next) {
    let CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    parser.parseURL(CORS_PROXY + 'http://feeds.bbci.co.uk/sport/football/rss.xml?edition=uk')
      .then(feed => {
        next(vm => {
          vm.news = feed.items
          next()
        })
      })
      .catch(error => {
        this.$q.notify({ message: error.data.message })
        next(false)
      })
  },
}
</script>
