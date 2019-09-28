<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-lg-6 col-md-7 col-sm-8">
        <div id="title" class="text-center text-h4 q-my-md bg-primary q-pa-md text-white rounded-borders"><!-- &#128301; --> Rumour Mill</div>
          <rumours :rumours="rumours" :picture="true" :chunk="10" />
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

  meta () {
    return {
      title: 'Rumours - Innouts',

      meta: {
        description: { name: 'description', content: 'Major football transfer rumours, covering the Premier League, La Liga, Serie A, Bundesliga and Ligue1.' },
        keywords: { name: 'keywords', content: ['football rumours', 'transfer rumours', 'transfer gossip', 'rumour mill', 'Innouts rumours'] },
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
        from.error = error
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
