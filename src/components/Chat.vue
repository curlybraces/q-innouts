<template>
  <div>
    <div class="row justify-center">
      <div class="col-sm-9 bg-secondar border-primary rounded-borders">
        <div class="row justify-center">
          <div class="col-lg-8 col-md-9 col-sm-10">
            <div  v-if="rumours.length">
              <!-- <h4 class="text-center q-my-md bg-primary q-pa-md text-white rounded-borders">&#128225; Rumour Mill</h4> -->
              <div v-for="(rumour, idx) in rumours.slice((current-1)*5, current*5)" :key="rumour.id">
                <q-card class="bg-secondary">
                  <h6 class="text-center text-uppercase bg-primary text-secondary q-mb-sm q-pa-md q-mt-md">{{rumour.title}}</h6>
                  <!-- <q-card-section class="text-center">
                    <img :src="rumour.picture" :alt="rumour.title" class="border-primary" width="145" height="90">
                  </q-card-section> -->
                  <q-card-section class="text-body1 text-justify" v-html="rumour.body" >
                    <img :src="rumour.picture" :alt="rumour.title" class="border-primary" width="145" height="90">

                  </q-card-section>
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
                    :max="Math.ceil(rumours.length/5)"
                    :direction-links="true"
                    size="15px"
                  >
                  </q-pagination>
              </div>
            </div>
            <div v-else class="text-subtitle1 text-center">No recent rumours!</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  name: 'Rumours',

  data () {
    return {
      rumours: [],
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

  created: function () {
    this.setData()
  },

  watch: {
    current () {
      this.scrollToElement(document.getElementById('title'))
    },
    $route () {
      // alert('change')
      this.setData()
    }
  },

  methods: {
    submitVote: function (val, key, index) {
      if (this.loggedIn) {
        this.$axios({ url: 'http://innouts.test/api/rumours/' + key, data: { userId: this.user.id, val: val }, method: 'PUT' })
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
    },

    scrollToElement (el) {
      let target = getScrollTarget(el)
      let offset = el.offsetTop
      let duration = 500
      setScrollPosition(target, offset, duration)
    },

    setData () {
      // alert('inside setData() ' + this.$route.params.team)
      this.$q.loading.show()
      this.$axios.get('http://innouts.test/api/rumours/teams/' + this.$route.params.team)
        .then(response => {
          this.rumours = response.data
          this.$q.loading.hide()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
</style>
