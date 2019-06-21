<template>
  <q-page padding class="">
    <div class="row justify-center self-center">
      <div class="col-sm-10 col-md-8 col-lg-6 bordered rounded-borders">
        <player :player="activePlayer" />
      </div>
    </div>
    <q-drawer
      v-model="rightDrawerOpen"
      :mini="$q.screen.lt.md"
      content-class="bg-grey-2"
      :breakpoint="300"
      side="right"
      elevated
    >
      <teammates :teammates="companions" @newPlayer="setPlayer"/>
      <!-- Fantasticie! I love my beatiful, kind, forgiving God -->
    </q-drawer>
    <!-- <q-page-sticky v-if="$q.platform.is.mobile" position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="arrow_left" color="accent" @click="miniState = true" />
    </q-page-sticky> -->
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
      activePlayer: null,
      companions: [],
      error: null,
      // leftDrawerOpen: this.$q.platform.is.desktop,
      rightDrawerOpen: true,
      // miniState: this.$q.screen.lt.md,
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
            vm.activePlayer = vm.player
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
    // alert(this.$q.platform.is.mobile)
  },

  methods: {
    setPlayer (idx) {
      this.activePlayer = this.player.team.players[idx]
      // let newp = this.player.team.players[id]
      // alert(id)
    }
  }
}
</script>

<style>
</style>
