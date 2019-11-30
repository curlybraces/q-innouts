<template>
  <q-infinite-scroll @load="onLoad" :offset="200">
    <!-- <div v-for="(rumour, idx) in rumours.slice((current-1)*chunk, current*chunk)" :key="rumour.id"> -->
    <div v-for="(rumour, idx) in rumourBag" :key="rumour.id">
      <q-card class="bg-secondary">
        <q-badge color="accent" text-color="white" :label="rumour.created_at.split(' ')[0]" align="top" floating transparent />
        <div class="newsTitle text-center text-uppercase bg-primary text-secondary q-pa-sm" :class="titleClass" >{{rumour.title}}
        </div>
        <q-card-section v-if="picture" class="text-center q-py-sm">
          <q-img
            :src="rumour.picture" :ratio="16/9" :alt="rumour.title"
            spinner-color="white"
            :style="picStyle"
            class="border-primary rounded-borders"
          />
        </q-card-section>
        <q-card-section class="newsBody3 text-justify" :class="bodyClass" v-html="rumour.body" />
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
    <template v-if="remains" v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
      <!-- <div class="q-pa-lg q-my-md flex flex-center">
        <q-pagination
            v-model="current"
            :max="Math.ceil(rumours.length/chunk)"
            :direction-links="true"
            :size="paginationSize"
        >
        </q-pagination>
      </div> -->
  </q-infinite-scroll>
</template>

<script>
const chunk = function (array, size) {
  if (!array.length) {
    return []
  }
  const head = array.slice(0, size)
  const tail = array.slice(size)

  return [head, ...chunk(tail, size)]
}

// import { scroll } from 'quasar'
// const { getScrollTarget, setScrollPosition } = scroll

export default {
  name: 'Rumours',
  data () {
    return {
      // current: 1,
      bodyClass: {},
      titleClass: {},
      rumourChunks: [],
      rumourBag: [],
      // paginationSize: '14px'
      // remains: true,
      picStyle: {
        height: '90px',
        maxWidth: '145px'
      }
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
    },

    remains () {
      return !(this.rumourBag.length === this.rumours.length)
    }
  },

  created () {
    this.rumourChunks = chunk(this.rumours, this.chunk)
    this.rumourBag = this.rumourChunks[0]
    if (this.dense) {
      // this.paginationSize = '10px'
      this.picStyle = {
        height: '65px',
        maxWidth: '105px'
      }
      this.bodyClass = {
        'text-body2': true,
        'q-pa-sm': true
      }
      this.titleClass = {
        'q-mt-sm': true,
        'text-subtitle2': true
      }
    } else {
      this.bodyClass = {
        'text-body1': true,
        'q-mt-sm': true
      }
      this.titleClass = {
        'q-mt-md': true,
        'text-subtitle1': true,
        'q-mb-sm': true
      }
    }
  },

  methods: {
    // scrollToElement (el) {
    //   let target = getScrollTarget(el)
    //   let offset = el.offsetTop
    //   let duration = 1000
    //   setScrollPosition(target, offset, duration)
    // },

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
              color: 'red-10',
              textColor: 'white',
              icon: 'fas fa-exclamation-triangle',
              message: error.response.data.error
            })
          })
      } else {
        this.$q.notify({
          color: 'primary',
          textColor: 'secondary',
          icon: 'fas fa-exclamation-triangle',
          message: 'Please login or register to rate.'
        })
      }
    },

    onLoad (index, done) {
      setTimeout(() => {
        if (this.rumourChunks[index]) {
          this.rumourBag.push(...this.rumourChunks[index])
          done()
        }
      }, 2500)
    },

  },

  // watch: {
  //   current () {
  //     this.scrollToElement(document.getElementById('title'))
  //   }
  // }
}
</script>

<style>
</style>
