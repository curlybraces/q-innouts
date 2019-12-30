<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-grow col-sm-10 col-md-8 col-lg-6">
        <div id="title" class="text-center text-h4 q-my-md bg-primary q-pa-md text-white rounded-borders relative-position">
          <!-- &#128301; --> Rumour Mill
          <router-link to="/submit-rumour" class="text-caption text-secondary no-decor absolute-bottom-left q-pa-xs">Got a rumour?</router-link>
        </div>
        <rumours v-if="rumours.length" :rumours="rumours" :picture="true" :chunk="10" :dense="$q.screen.lt.md" />
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
const Rumours = () => import('components/Rumours.vue')

export default {
  // name: 'Rumours',

  components: {
    Rumours
  },

  data () {
    return {
      rumours: [],
    }
  },

  computed: {
    rumourTitles () {
      let x = []
      if (this.rumours.length) {
        this.rumours.forEach(element => {
          x.push(element.title)
        })
      }
      return x
    }
  },

  meta () {
    return {
      title: 'Rumours - Innouts',

      meta: {
        description: { name: 'description', content: 'Major football transfer rumours, covering the Premier League, La Liga, Serie A, Bundesliga and Ligue1.' },
        keywords: { name: 'keywords', content: ['football rumours', 'transfer rumours', 'transfer gossip', 'rumour mill', 'Innouts rumours'].concat(this.rumourTitles) },
      },
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('api/rumours')
      .then(response => {
        next(vm => {
          vm.rumours = response.data
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

}
</script>

<style>
</style>
