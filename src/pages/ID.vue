<template>
  <q-page padding>
    <div>
      <div id="head" class="row justify-center self-center">
        <div class="col-grow col-sm-10 col-lg-7 col-xl-5">
          <player :player="activePlayer" :color="person.team.color" />
        </div>
      </div>
      <q-list separator v-if="$q.screen.lt.sm && companions.length" class="q-mt-lg bg-secondary" link bordered dense>
          <q-item-label header class="q-pt-sm q-px-sm text-subtitle1 text-center">{{person.team.name}} squad</q-item-label>
            <q-item v-for="(mate) in companions" :key="mate.id" :to="'/players/'+mate.id + '/' + mate.slug" @click="scrollUp" active-class="text-white bg-primary"  clickable v-ripple dense>
              <q-item-section avatar>
                <q-avatar rounded>
                  <q-img :src="mate.picture" placeholder-src="statics/images/picSoon.jpg" />
                </q-avatar>
              </q-item-section>
              <q-item-section>{{mate.nickname}}</q-item-section>
              <q-item-section side>{{mate.specificPosition}}</q-item-section>
            </q-item>
      </q-list>
      <q-drawer
        v-if="companions.length"
        :value="rightDrawerOpen"
        :mini="$q.screen.lt.md"
        content-class="bg-grey-2"
        :breakpoint="600"
        side="right"
        elevated
      >
        <teammates :teammates="companions" :team="person.team"/>
      </q-drawer>
    </div>
  </q-page>
</template>

<script>

import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll
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
      person: {
        team: {
          name: 'team'
        }
      },
      activePlayer: {
      },
      companions: [],
      error: null,
    }
  },

  computed: {
    rightDrawerOpen: function () {
      return this.$store.getters.rightDrawer
    }
  },

  watch: {
    companions () {
      if (!this.companions.length) {
        this.$store.commit('setRightDrawer', false)
      }
    }
  },

  beforeRouteEnter (to, from, next) {
    // alert('beforeRouteEnter')
    if (from.name === 'player' && to.name === 'player') {
      next()
    } else if (to.name === 'manager') {
      axios.get('api/managers/' + to.params.manager)
        .then(response => {
          next(vm => {
            vm.person = response.data.data
            vm.activePlayer = vm.person
            vm.companions = vm.person.players
          })
        })
        .catch(error => {
          this.$q.notify({ message: error.data.message })
          next(false)
        })
    } else {
      axios.get('api/players/' + to.params.id)
        .then(response => {
          // alert('response')
          next(vm => {
            // alert('next')
            vm.person = response.data.data
            vm.activePlayer = vm.person
            vm.companions = vm.person.teammates
          })
        })
        .catch(error => {
          this.$q.notify({ message: error.data.message })
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
    },

    scrollUp: function () {
      this.scrollToElement(document.getElementById('head'))
    },

    scrollToElement (el) {
      let target = getScrollTarget(el)
      let offset = el.offsetTop
      let duration = 500
      setScrollPosition(target, offset, duration)
    },
  }
}
</script>

<style lang="stylus">

#teammates
  columns: 4;
  list-style-type: none;

</style>
