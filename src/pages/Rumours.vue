<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-lg-6 col-md-7 col-sm-8">
        <h4 id="title" class="text-center q-my-md bg-primary q-pa-md text-white rounded-borders">&#128225; Rumour Mill</h4>
        <div v-for="(rumour, idx) in rumours.slice((current-1)*10, current*10)" :key="rumour.id">
          <q-card class="bg-secondary">
            <h6 class="text-center text-uppercase bg-primary text-secondary q-mb-sm q-pa-md">{{rumour.title}}</h6>
            <q-card-section class="text-center">
              <img :src="rumour.picture" :alt="rumour.title" class="border-primary" width="145" height="90">
            </q-card-section>
            <q-card-section class="text-body1 text-justify" v-html="rumour.body" />
            <q-card-section>
              <div class="row justify-center">
                <div class="col col-sm-1">
                 <q-btn @click="submitVote(1, rumour.id, idx)" round color="primary" :text-color="rumour.vote === 'up' ?  'green-4' : ''" icon="thumb_up" size="sm" class="float-right q-mr-sm" />
                </div>
                <div class="col-6 col-sm-8">
                  <q-linear-progress :value="rumour.upVotes/(rumour.upVotes+rumour.downVotes)" class="q-mt-md"
                  color="positive" track-color="negative"
                  />
                </div>
                <div class="col col-sm-1">
                 <q-btn @click="submitVote(-1, rumour.id, idx)" round :text-color="rumour.vote === 'down' ?  'red-4' : ''" color="primary" icon="thumb_down" size="sm" class="q-ml-sm" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
         <div class="q-pa-lg q-my-md flex flex-center">
            <q-pagination
               v-model="current"
               :max="Math.ceil(rumours.length/10)"
               :direction-links="true"
               size="15px"
            >
            </q-pagination>
         </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import { scroll } from 'quasar'

const { getScrollTarget, setScrollPosition } = scroll
// const { offset } = dom

// Offset on screen
// console.log(offset(document.getElementById('title')))
// { top: 10, left: 100 }
export default {
  name: 'Rumours',

  data () {
    return {
      rumours: Array,
      current: 1,
    }
  },

  computed: {
    loggedIn: function () {
      return this.$store.getters.loggedIn
    },

    user: function () {
      return this.$store.state.user
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('http://innouts.test/api/rumours')
      .then(response => {
        next(vm => {
          vm.rumours = response.data.data
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

  methods: {
    scrollToElement (el) {
      let target = getScrollTarget(el)
      let offset = el.offsetTop
      let duration = 1000
      setScrollPosition(target, offset, duration)
    },

    submitVote: function (val, key, index) {
      if (this.loggedIn) {
        axios({ url: 'http://innouts.test/api/rumours/' + key, data: { userId: this.user.id, val: val }, method: 'PUT' })
          .then(response => {
            if (val === 1) {
              this.rumours[index].vote = 'up'
            } else {
              this.rumours[index].vote = 'down'
            }
            this.rumours[index].upVotes = response.data.ups
            this.rumours[index].downVotes = response.data.downs
          })
          .catch(error => {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'fas fa-exclamation-triangle',
              message: error.response.data.error
            })
          })
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Please login or register to rate.'
        })
      }
    }

  },

  watch: {
    current () {
      this.scrollToElement(document.getElementById('title'))
    }
  }

}
</script>

<style>
</style>
