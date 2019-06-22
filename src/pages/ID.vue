<template>
  <q-page padding class="">
    <div class="row justify-center self-center">
      <div class="col-grow col-sm-10 col-lg-7 col-xl-5 bordered rounded-borders">
        <player :player="activePlayer" />
      </div>
    </div>
    <div class="row justify-center">
      <div v-if="$q.screen.lt.sm" class="col-grow bordered rounded-borders">
        <ul id="teammates" class="q-px-sm">
          <li v-for="(mate, idx) in companions" :key="mate.id">
            <q-item dense @click="setPlayer(idx)" exact :to="'/players/' + mate.id" class="q-pa-xs text-capitalize ellipsis" >
              {{mate.nickname}}
              <!-- <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                  {{player.firstName}} {{player.lastName}}
              </q-tooltip> -->
            </q-item>
          </li>
        </ul>
      </div>
    </div>
    <q-drawer
      v-model="rightDrawerOpen"
      :mini="$q.screen.lt.md"
      content-class="bg-grey-2"
      :breakpoint="600"
      side="right"
      elevated
    >
      <teammates :teammates="companions" @newPlayer="setPlayer"/>
    </q-drawer>
    <!-- <div >
    </div> -->
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
    if (this.$q.screen.gt.sm) {
      this.$emit('sendView', ['hhh lpR fff', false, true])
    }
    this.$emit('sendView', ['hhh lpR fff', false, false])
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

<style lang="stylus">

#teammates
  columns: 4;
  list-style-type: none;

</style>
