<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-grow col-lg-6 col-md-7 col-sm-8">
        <q-list class="bg-secondary" dar>
          <q-item-label header>Major other teams</q-item-label>
          <q-item v-for="team in teams" :key="team.id" :to="'/teams/'+team.slug">
            <q-item-section avatar>
              <q-avatar>
                <img :src="team.logo">
              </q-avatar>
            </q-item-section>
            <q-item-section >
              <q-item-label header>
                {{team.name}}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>
                {{team.country}}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Others',

  data () {
    return {
      teams: []
    }
  },

  computed: {
    teamNames () {
      let x = []
      if (this.teams) {
        this.teams.forEach(element => {
          x.push(element.name)
        })
      }
      return x
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('api/leagues/others')
      .then(response => {
        next(vm => {
          vm.teams = response.data.data
        })
      })
      .catch(error => {
        console.log(error)
        next(false)
      })
  },

  meta () {
    return {
      title: 'Other Teams - Innouts',

      meta: {
        description: { name: 'Major other European teams' },
        keywords: { name: 'keywords', content: this.teamNames },
      },
    }
  },

  created () {
    this.$store.commit('setRightDrawer', false)
  }

}
</script>
