<template>
  <q-page padding class="flex flex-center">
    <player :player="player" />
    <q-drawer
      v-model="rightDrawerOpen"
      content-class="bg-grey-2"
      side="right"
      elevated
    >
      <teammates :teammates="companions" @newPlayer="setPlayer"/>
      <!-- Fantasticie! I love my beatiful, kind, forgiving God -->
    </q-drawer>
  </q-page>
</template>

<script>
import axios from 'axios'
import Teammates from 'components/Teammates.vue'
import Player from 'components/Player.vue'

export default {
  // name: 'PageName',
  components: {
    Player,
    Teammates,
  },

  data () {
    return {
      player: null,
      companions: [],
      error: null,
      // leftDrawerOpen: this.$q.platform.is.desktop,
      rightDrawerOpen: this.$q.platform.is.desktop,
      // leftDrawerOpen: true
      // view: 'hHh lpr fff'
    }
  },

  watch: {
    'player' () {
      this.companions = this.player.team.players
    }
  },

  beforeRouteEnter (to, from, next) {
    if (from.name === 'player') {
      next()
    } else {
      axios.get('http://innouts.test/api/players/' + to.params.id)
        .then(response => {
          next(vm => {
            // vm.setData(response.data)
            vm.player = response.data.data
          })
        })
        .catch(error => {
          from.error = error
          next(false)
        })
    }
  },

  created: function () {
    this.$emit('sendView', ['hhh lpR fff', false, true])
  },

  methods: {
    setPlayer (idx) {
      this.player = this.player.team.players[idx]
      // let newp = this.player.team.players[id]
      // alert(id)
    }
  }
}
</script>

<style>
</style>
