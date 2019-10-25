<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-grow col-lg-6 col-md-7 col-sm-8">
        <q-list>
          <q-item v-for="team in teams" :key="team.id" :to="'/teams/'+team.slug">
            <q-item-section avatar>
              <q-avatar>
                <img :src="team.logo">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              {{team.name}}
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

}
</script>
