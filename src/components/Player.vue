<template>
  <div>
    <div class="row justify-center bordered rounded-borders">
      <div class="col-12 col-sm-4 col">  <!-- use 'row' class to define a container / parent -->
        <div class="col-grow col-sm-4 col-md-3 q-mx-auto">
          <div class="row justify-center">
            <div style="width: 200px;">
              <q-img :alt="player.firstName" :src="player.picture" placeholder-src="statics/images/players/picSoon.png" class="q-mx-auto full-width" />
            </div>
          </div>
          <div class="row content-center bg-secondary q-mt-sm q-pb-sm relative-position">
              <q-rating
                v-if="$q.screen.lt.md"
                color="orange"
                class="q-mx-auto q-mt-sm"
                size="1.5rem"
                :value="Math.round(rating/2)"
                :max="5"
                :disable="player.retired ? true : false"
                @input="submitRating"
              />
              <rating v-else @save="submitRating" :rating="rating" :archived="player.retired ? true : false"  color="orange" size="1.3rem" class="q-mx-auto q-mt-sm"/>
              <div class="absolute-bottom-right text-caption"><span title="votes">🗳</span>{{votes}}</div>
          </div>
          <div v-if="player.broadPosition" class="row justify-center q-py-sm rounded-borders bordered text-">
            <span title="approximate value" class="text-h6 q-mr-sm">€</span> <span class="text-subtitle2 self-center">{{value}} m</span>
          </div>
        </div>  <!-- children will default to 'col'  -->
      </div>
      <div class="col-grow col-sm-8 bg-secondary" :class="playerInfoClass">
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
              <q-item-label v-else ></q-item-label>
            </q-item-section>
          </q-item>
          <q-item >
            <q-item-section>
              <q-item-label>Weight</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label v-if="player.weight" >{{player.weight}} kg</q-item-label>
              <q-item-label v-else ></q-item-label>
            </q-item-section>
          </q-item>
          <q-item >
            <q-item-section>
              <q-item-label>Foot</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label v-if="player.foot" >{{player.foot}}</q-item-label>
              <q-item-label v-else ></q-item-label>
            </q-item-section>
          </q-item>
          <q-item >
            <q-item-section>
              <q-item-label>Position</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label v-if="player.broadPosition" >{{player.broadPosition}}</q-item-label>
              <q-item-label v-else >Manager</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div class="row justify-center">
      <q-tabs
        v-model="tab" dense inline-label
        class="bg-primary text-white shadow-2 full-width"
      >
        <q-tab v-if="player.specificPosition" name="transfers" label="Transfers" />
        <q-tab name="rumours" label="Rumours" />
        <q-tab name="editorials" label="Editorials" />
      </q-tabs>
      <q-tab-panels keep-alive v-model="tab" swipeable animated
      class="shadow- rounded-borders full-width q-mb-md"
      >
        <q-tab-panel name="transfers" :class="transfersClass">
          <q-markup-table v-if="transfers.length" dense separator="horizontal" bordere class="q-my-md" >
            <thead class="bg-primary text-white">
              <tr class="text-left">
                <th>From</th>
                <th>To</th>
                <th>Fee (€m)</th>
                <th>Notes</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transfer in transfers" :key="transfer.id">
                <td>{{ transfer.from.name }}</td>
                <td>{{ transfer.to.name }}</td>
                <td>{{ transfer.fee }}</td>
                <td>{{ transfer.notes }}</td>
                <td>{{ transfer.date }}</td>
              </tr>
            </tbody>
          </q-markup-table>
          <div v-else class="text-subtitle1 text-center text-black q-my-md">
            No recorded transfers!
          </div>
        </q-tab-panel>
        <q-tab-panel name="rumours">
          <rumours v-if="rumours.length" :rumours="rumours" :chunk="5" btnSize="xs" :dense="true" />
          <div v-else class="text-subtitle1 text-center q-my-md">No recent rumours!</div>
        </q-tab-panel>
        <q-tab-panel name="editorials">
          <articles v-if="articles.length" :articles="articles" :chunk="3" :dense="true" />
          <div v-else class="text-subtitle1 text-center text-black q-my-md">
            Nothing to display at this time!
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'
const Rating = () => import('components/Rating.vue')
const Rumours = () => import('components/Rumours.vue')
const Articles = () => import('components/Articles.vue')

export default {
  name: 'Player',

  components: {
    Rating,
    Rumours,
    Articles
  },

  data: () => ({
    ratingModel: 1,
    age: null,
    date: new Date(),
    birthFormatted: null,
    tab: 'rumours',
    rumours: [],
    articles: [],
    current: 1,
    playerInfoClass: {},
    transfersClass: {},
    transfers: [],
    votes: 0,
    rating: 0,
    value: 0,
    entity: null,
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
    color: String
  },

  computed: {
    loggedIn: function () {
      return this.$store.getters.loggedIn
    },

    user: function () {
      return this.$store.state.user
    },

    fullname () {
      return this.player.firstName + ' ' + this.player.lastName
    },

    teamName () {
      return this.player.team ? this.player.team.name : ''
    }
  },

  meta () {
    return {
      title: this.player.nickname + ' - Innouts',

      meta: {
        description: { name: 'description', content: this.fullname + ' is a football player from ' + this.player.nationality + ' playing for ' + this.teamName + '.' },
        keywords: { name: 'keywords', content: [this.player.nickname, this.fullname, this.player.teamName, this.fullname + ' transfers', this.fullname + ' rumours', this.fullname + ' height', this.fullname + ' age'] },
      },
    }
  },

  created: function () {
    this.setAge()
    if (this.$q.screen.lt.md) {
      this.playerInfoClass = {
        'q-pa-xs': true
      }
      this.transfersClass = {
        'q-pa-xs': true
      }
    } else {
      this.playerInfoClass = {
        'q-pa-md': true
      }
    }
  },

  watch: {
    'player' () {
      this.setAge()
      if (this.player.broadPosition) {
        this.entity = 'player'
        this.tab = 'transfers'
      } else {
        this.entity = 'manager'
        this.tab = 'rumours'
      }

      if (this.entity === 'player') {
        this.$axios.get('api/players/' + this.$route.params.id)
          .then(response => {
            let player = response.data.data
            this.rating = parseFloat(player.rating)
            this.votes = player.votes
            this.value = player.value
            this.transfers = player.transfers
            this.rumours = player.rumours
            this.articles = player.articles
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$axios.get('api/managers/' + this.$route.params.manager)
          .then(response => {
            let player = response.data.data
            this.rating = parseFloat(player.rating)
            this.votes = player.votes
            this.value = player.value
            this.transfers = []
            this.rumours = player.rumours
            this.articles = player.articles
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },

  methods: {
    submitRating: function (value) {
      let url = 'api/players/'
      // if the entity is a manager
      if (!(this.entity === 'player')) {
        url = 'api/managers/'
      }
      if (this.loggedIn) {
        if (this.$q.screen.lt.md) {
          value *= 2
        }
        // console.log(value)
        this.$axios({ url: url + this.player.id, data: { userId: this.user.id, value: value }, method: 'PUT' })
          .then(response => {
            this.rating = value
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
    },

    setAge () {
      if (this.player.birthday) {
        this.age = date.getDateDiff(date.formatDate(this.date, 'YYYY-MM-DD'), this.player.birthday.replace(/\s/, 'T') + 'Z', 'years')
        this.birthFormatted = date.formatDate(this.player.birthday.replace(/\s/, 'T') + 'Z', 'DD MMM, YYYY')
      }
    }

    // start () {
    //   this.startTime = new Date()
    // },

    // end () {
    //   this.endTime = new Date()
    //   let timeDiff = this.endTime - this.startTime // in ms
    //   // strip the ms
    //   // timeDiff /= 1000

    //   // get seconds
    //   // let diff = date.getDateDiff(this.startTime, this.startTime, 'seconds')
    //   // let seconds = Math.round(timeDiff)
    //   console.log(timeDiff + ' milliseconds')
    // }
  }

}
</script>

<style>
</style>
