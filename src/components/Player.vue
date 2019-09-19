<template>
  <div>
    <div class="row justify-center bordered rounded-borders">
      <div class="col-12 col-sm-4 col">  <!-- use 'row' class to define a container / parent -->
        <div class="col-grow col-sm-4 col-md-3 q-mx-auto">
          <div class="row justify-center">
            <div style="width: 200px;">
              <q-img :alt="player.firstName" :src="player.picture" class="q-mx-auto full-width" />
            </div>
          </div>
          <div class="row content-center bg-secondary q-mt-sm q-pb-sm">
            <div class="col-12 col-sm-grow text-center">
              <!-- <q-rating
                color="orange"
                class="q-mx-auto q-mt-sm"
                size="1.5rem"
                :value="player.rating"
                :max="5"
                @input="submitRating"
              /> -->
              <rating />
            </div>
            <div class="col-grow col-sm-2 q-mt-sm text-overline self-center text-center">{{player.votes}}</div>
          </div>
        </div>  <!-- children will default to 'col'  -->
      </div>
      <div class="col-grow col-sm-8 q-pa-md bg-secondary">
        <q-list dense class="rounded-borders bg-primary" bordere dark>
          <q-item>
            <q-item-section>
              <q-item-label>First Name</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label >{{player.firstName}}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item >
            <q-item-section>
              <q-item-label>Last Name</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label >{{player.lastName}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item >
            <q-item-section>
              <q-item-label>Nationality</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label >{{player.nationality}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item >
            <q-item-section>
              <q-item-label>Birth</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label >{{birthFormatted}} ({{age}})</q-item-label>
            </q-item-section>
          </q-item>
          <q-item >
            <q-item-section>
              <q-item-label>Height</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label v-if="player.height" >{{player.height}} cm</q-item-label>
              <q-item-label v-else >NA</q-item-label>
            </q-item-section>
          </q-item>
          <q-item >
            <q-item-section>
              <q-item-label>Weight</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label v-if="player.weight" >{{player.weight}} kg</q-item-label>
              <q-item-label v-else >NA</q-item-label>
            </q-item-section>
          </q-item>
          <q-item >
            <q-item-section>
              <q-item-label>Foot</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label v-if="player.foot" >{{player.foot}}</q-item-label>
              <q-item-label v-else >NA</q-item-label>
            </q-item-section>
          </q-item>
          <q-item >
            <q-item-section>
              <q-item-label>Position</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label v-if="player.broadPosition" >{{player.broadPosition}}</q-item-label>
              <q-item-label v-else >NA</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div v-if="player.specificPosition" class="row justify-center">
      <q-tabs
        v-model="tab" dense inline-label
        class="bg-primary text-white shadow-2 full-width"
      >
        <q-tab name="rumours" icon="chat" label="Rumours" />
        <q-tab name="editorials" icon="info" label="Editorials" />
      </q-tabs>
      <q-tab-panels keep-alive v-model="tab" swipeable animated
      class="shadow- rounded-borders full-width"
      >
        <q-tab-panel name="rumours">
          <div  v-if="rumours.length">
            <div v-for="(rumour, idx) in rumours.slice((current-1)*5, current*5)" :key="rumour.id">
              <q-card class="bg-secondary">
                <div class="text-center text-uppercase bg-primary text-secondary q-mb-sm q-pa-sm q-mt-sm text-subtitle2">{{rumour.title}}</div>
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
        </q-tab-panel>
        <q-tab-panel name="editorials">
          <q-list v-if="articles.length" :dense="$q.screen.lt.md" bordered padding separato dark>
            <q-item clickable v-for="article in articles" :key="article.id" :to="'/articles/'+article.id" class="bg-primary">
              <q-item-section to thumbnail class="q-ml-non">
                <img :src="article.picture">
              </q-item-section>

              <q-item-section top>
                <q-item-label header class="text-subtitle1" >{{article.title}}</q-item-label>
                <!-- <q-item-label lines="1" caption>Chelsea Consider Signing Goloving From Monaco less than 10 months after initial failing. It is believed the negotiations are already at an advanced stage</q-item-label> -->
              </q-item-section>

              <q-item-section side >
                <q-item-label caption>11:56</q-item-label>
                <q-item-label caption>share</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <div v-else class="text-subtitle1 text-center text-black">
            Nothing to display at this time!
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'
const Rating = import('components/Rating.vue')

export default {
  name: 'Player',

  components: {
    Rating,
  },

  data: () => ({
    ratingModel: 1,
    age: null,
    date: new Date(),
    birthFormatted: null,
    tab: 'rumours',
    panel: 'rumours',
    rumours: [],
    articles: [],
    current: 1
  }),

  props: {
    player: {
      type: Object,
      default: function () {
        return {
          birthday: '',
          firstName: 'ab',
          rating: null,
        }
      }
    },
    // player: {
    //   rating: 0.0
    // }
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
    this.age = date.getDateDiff(date.formatDate(this.date, 'YYYY-MM-DD'), this.player.birthday, 'years')
    this.birthFormatted = date.formatDate(this.player.birthday, 'DD MMM, YYYY')
  },

  watch: {
    'player' () {
      this.age = date.getDateDiff(date.formatDate(this.date, 'YYYY-MM-DD'), this.player.birthday, 'years')
      this.birthFormatted = date.formatDate(this.player.birthday, 'DD MMM, YYYY')
      if (this.player.specificPosition) {
        this.$axios.get('http://innouts.test/api/rumours/players/' + this.$route.params.id)
          .then(response => {
            this.rumours = response.data
            this.$q.loading.hide()
          })
          .catch(error => {
            console.log(error)
          })
        this.$axios.get('http://innouts.test/api/articles/players/' + this.$route.params.id)
          .then(response => {
            this.articles = response.data
            this.$q.loading.hide()
          })
          .catch(error => {
            this.error = error
          })
      }
    }
  },

  methods: {
    submitRating: function (value) {
      if (this.loggedIn) {
        this.$axios({ url: 'http://innouts.test/api/players/' + this.player.id, data: { userId: this.user.id, value: value }, method: 'PUT' })
          .then(response => {
            this.player.rating = value
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
  }

}
</script>

<style>
</style>
