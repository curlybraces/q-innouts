<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-grow col-sm-7 col-md-6 bg-primar border-primary rounded-borders">
        <q-list v-if="friends.length" link class="bg-secondary" >
          <q-item v-for="friend in friends" :key="friend.id" :to="'/'+friend.id" active-class="text-white bg-primary"  clickable v-ripple>
            <q-item-section avatar>
              <q-avatar rounded>
                <img :src="friend.picture">
              </q-avatar>
            </q-item-section>
            <q-item-section class="text-subtitle1">{{friend.name}}</q-item-section>
            <q-item-section avatar>
              <q-avatar square>
                <img :src="friend.team.logo">
              </q-avatar>
            </q-item-section>
          </q-item>
        </q-list>
        <div v-else class="text-center text-subtitle2">
          No results found!
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Find',

  data () {
    return {
      friends: []
    }
  },

  beforeRouteEnter (to, from, next) {
    if (to.params.name.length >= 2) {
      axios.get('api/friends', { params: { name: to.params.name } })
        .then(response => {
          next(vm => {
            vm.setData(response)
            next()
          })
        })
        .catch(error => {
          console.log(error)
          next(false)
        })
    } else {
      next(vm => {
        this.friends = []
        next()
      })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (to.params.name.length >= 2) {
      axios.get('api/friends', { params: { name: to.params.name } })
        .then(response => {
          this.friends = response.data.users
        })
        .catch(error => {
          console.log(error)
          next(false)
        })
    } else {
      this.friends = []
    }
  },

  created () {
    this.$store.commit('setRightDrawer', false)
  },

  methods: {
    setData (response) {
      this.friends = response.data.users
    }
  }
}
</script>

<style>
</style>
