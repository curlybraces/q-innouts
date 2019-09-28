<template>
  <div>
    <div v-for="(rumour, idx) in rumours.slice((current-1)*chunk, current*chunk)" :key="rumour.id">
      <q-card class="bg-secondary">
        <q-badge color="accent" text-color="white" :label="rumour.created_at.split(' ')[0]" align="top" floating transparent />
        <div class="newsTitle text-center text-uppercase bg-primary text-secondary q-pa-sm" :class="titleClass" >{{rumour.title}}
        </div>
        <q-card-section v-if="picture" class="text-center q-py-sm">
          <q-img
            :src="rumour.picture" :ratio="16/9" :alt="rumour.title"
            spinner-color="white"
            style="height: 90px; max-width: 145px"
            class="border-primary rounded-borders"
          />
        </q-card-section>
        <q-card-section class="newsBody text-justify" :class="bodyClass" v-html="rumour.body" />
        <q-card-section>
          <div class="row justify-center">
            <div class="col col-sm-1">
              <q-btn @click="submitVote(1, rumour.id, idx)" round color="primary" :text-color="rumour.vote === 'up' ?  'green-4' : ''" icon="thumb_up" :size="btnSize" class="float-right q-mr-sm" />
            </div>
            <div class="col-6 col-sm-8">
              <q-linear-progress :value="rumour.upVotes/(rumour.upVotes+rumour.downVotes)" class="q-mt-md"
              color="positive" track-color="negative"
              />
            </div>
            <div class="col col-sm-1">
              <q-btn @click="submitVote(-1, rumour.id, idx)" round :text-color="rumour.vote === 'down' ?  'red-4' : ''" color="primary" icon="thumb_down" :size="btnSize" class="q-ml-sm" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
      <div class="q-pa-lg q-my-md flex flex-center">
        <q-pagination
            v-model="current"
            :max="Math.ceil(rumours.length/chunk)"
            :direction-links="true"
            :size="paginationSize"
        >
        </q-pagination>
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
      current: 1,
      bodyClass: {},
      titleClass: {},
      paginationSize: '14px'
    }
  },

  props: {
    rumours: Array,
    picture: {
      type: Boolean,
      default: false
    },
    chunk: {
      type: Number,
      default: 7
    },
    btnSize: {
      type: String,
      default: 'sm'
    },
    dense: {
      type: Boolean,
      default: false
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

  created () {
    if (this.dense) {
      this.paginationSize = '10px'
      this.bodyClass = {
        'text-body2': true,
      }
      this.titleClass = {
        'q-mt-sm': true,
        'text-subtitle2': true
      }
    } else {
      this.bodyClass = {
        'text-body1': true,
      }
      this.titleClass = {
        'q-mt-md': true,
        'text-subtitle1': true,
        'q-mb-sm': true
      }
    }
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
        this.$axios({ url: 'api/rumours/' + key, data: { userId: this.user.id, val: val }, method: 'PUT' })
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
