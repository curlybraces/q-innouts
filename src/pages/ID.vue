<template>
  <q-page padding class="">
    <div>
      <div class="row justify-center self-center">
        <div class="col-grow col-sm-10 col-lg-7 col-xl-5 bordered rounded-borders">
          <player :player="activePlayer" />
        </div>
      </div>
      <div v-if="$q.screen.lt.sm" class="row justify-center">
        <div  class="col-grow bordered rounded-borders bg-secondary">
          <div class="q-pt-sm q-px-sm text-subtitle1 text-center">{{player.team.name}} squad</div>
          <ul id="teammates" class="q-px-sm">
            <li v-for="(mate, idx) in companions" :key="mate.id">
              <q-item dense @click="setPlayer(idx)" exact :to="'/players/' + mate.id" class="q-pa-xs text-capitalize ellipsis" >
                {{mate.nickname}}
              </q-item>
            </li>
          </ul>
        </div>
      </div>
      <q-drawer
        :value="rightDrawerOpen"
        :mini="$q.screen.lt.md"
        content-class="bg-grey-2"
        :breakpoint="600"
        side="right"
        elevated
      >
        <teammates :teammates="companions" :team="player.team.name" @newPlayer="setPlayer"/>
      </q-drawer>
    </div>
  </q-page>
</template>

<script>

import axios from 'axios'
import Teammates from 'components/Teammates.vue'
import Player from 'components/Player.vue'

export default {
  name: 'ID',

  components: {
    Player,
    Teammates,
  },

  data () {
    return {
      player: null,
      activePlayer: null,
      companions: [],
      error: null,
    }
  },

  computed: {
    rightDrawerOpen: function () {
      return this.$store.getters.rightDrawer
    }
  },

  beforeRouteEnter (to, from, next) {
    // alert('beforeRouteEnter')
    if (from.name === 'player') {
      next()
    } else {
      axios.get('http://innouts.test/api/players/' + to.params.id)
        .then(response => {
          // alert('response')
          next(vm => {
            // alert('next')
            vm.player = response.data.data
            vm.activePlayer = vm.player
            vm.companions = vm.player.teammates
          })
        })
        .catch(error => {
          from.error = error
          next(false)
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    this.companions.forEach(element => {
      if (element.id === parseInt(to.params.id)) {
        this.activePlayer = element
        next()
      }
    })
  },

  // created: () => {
  //   alert('created')
  // },

  beforeCreate: function () {
    this.$store.commit('setView', {
      view: 'hhh lpR fff'
    })
    if (this.$q.screen.gt.sm) {
      this.$store.commit('setRightDrawer', true)
    } else {
      this.$store.commit('setRightDrawer', false)
    }
  },

  methods: {
    setPlayer (idx) {
      this.activePlayer = this.player.teammates[idx]
    }
  }
}
</script>

<style lang="stylus">

#teammates
  columns: 4;
  list-style-type: none;

</style>
