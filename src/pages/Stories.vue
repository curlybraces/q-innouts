<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-grow col-sm-10 col-md-9 col-lg-8 bg-primar text-white border-primary rounded-borders">
        <div id="title" class="text-center text-h5 q-my-md bg-primary q-pa-md text-white rounded-borders">
          Latest Stories
        </div>
        <articles v-if="articles.length" :articles="articles" :chunk="10" :dense="$q.screen.lt.md" :taggedTeams="true" links="stories" :showBody="true" />
        <div v-else class="text-subtitle1 text-center text-black">
          Nothing to display at this time!
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import { date } from 'quasar'
const Articles = () => import('components/Articles.vue')

export default {
  name: 'Editorials',

  components: {
    Articles
  },

  data: () => {
    return {
      articles: [],
      date: new Date()
    }
  },

  meta () {
    return {
      title: 'Stories - Innouts',

      meta: {
        description: { name: 'description', content: 'Latest football stories of top European leagues and teams as they unfold.' },
        keywords: { name: 'keywords', content: ['football stories', 'football news', 'football talk', 'football reports', 'premier league analysis', 'football world', 'European football'] },
      },
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('api/bulletins')
      .then(response => {
        next(vm => {
          vm.setData(response)
          next()
        })
      })
      .catch(error => {
        this.$q.notify({ message: error.data.message })
        next(false)
      })
  },

  created: function () {
    this.$store.commit('setRightDrawer', false)
  },

  methods: {
    setData: function (res) {
      this.articles = res.data
      this.articles.forEach(element => {
        let diff = date.getDateDiff(this.date, element.created_at, 'days')
        element.time = diff
      })
    },

  }
}
</script>

<style>
</style>
