<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-sm-6">
        <h4 id="title" class="text-center q-my-md">Rumour Mill</h4>
        <div v-for="rumour in rumours.slice((current-1)*10, current*10)" :key="rumour.id">
          <q-card>
            <h5 class="text-center bg-primary text-secondary q-mb-sm q-pa-md">{{rumour.title}}</h5>
            <q-card-section class="text-center">
              <img :src="rumour.picture" :alt="rumour.title" class="" width="145" height="90">
            </q-card-section>
            <q-card-section>
              {{rumour.body}}
            </q-card-section>
            <q-card-section>
              <div class="row justify-center">
                <div class="col-sm-1">
                 <q-btn round color="primary" icon="thumb_up" size="sm" class="float-right q-mr-sm" />
                </div>
                <div class="col-sm-8">
                  <q-linear-progress :value="rumour.upVotes/(rumour.upVotes+rumour.downVotes)" class="q-mt-md"
                  color="positive" track-color="negative"
                  />
                </div>
                <div class="col-sm-1">
                 <q-btn round color="primary" icon="thumb_down" size="sm" class="q-ml-sm" />
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
      rumours: [],
      current: 1,
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
    this.$emit('sendView', ['hhh lpR fff', false, false])
  },

  methods: {
    scrollToElement (el) {
      let target = getScrollTarget(el)
      let offset = el.offsetTop
      let duration = 1000
      setScrollPosition(target, offset, duration)
    },

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
