<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-grow col-sm-7 col-md-6 bg-primar border-primary rounded-borders">
        <q-list v-if="friends.length" link class="bg-secondary" >
          <q-infinite-scroll @load="onLoad" :offset="100">
            <q-item v-for="friend in friendsBag" :key="friend.id" :to="'/'+friend.id+'/'+friend.slug" active-class="text-white bg-primary"  clickable v-ripple>
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
            <template v-if="remains" v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>
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

const chunk = function (array, size) {
  if (!array.length) {
    return []
  }
  const head = array.slice(0, size)
  const tail = array.slice(size)

  return [head, ...chunk(tail, size)]
}

export default {
  name: 'Find',

  data () {
    return {
      friends: [],
      friendsChunks: [],
      friendsBag: [],
      remains: true,
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
      this.friendsChunks = chunk(this.friends, 12)
      this.friendsBag = this.friendsChunks[0]
    },

    onLoad (index, done) {
      setTimeout(() => {
        if (this.friendsChunks[index]) {
          this.friendsBag.push(...this.friendsChunks[index])
          done()
        }
        if (this.friendsBag.length === this.friends.length) {
          this.remains = false
        }
      }, 2500)
    },
  }
}
</script>

<style>
</style>
