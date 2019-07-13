<template>
  <div class="row justify-center bordered">
    <div class="col-12 col-sm-4 col">  <!-- use 'row' class to define a container / parent -->
      <div class="col-grow col-sm-4 col-md-3 q-mx-auto">
        <div class="row justify-center">
          <div style="width: 200px;">
            <q-img alt="Quasar logo" :src="player.picture" class="q-mx-auto full-width" />
          </div>
        </div>
        <div class="row content-center bg-secondary q-mt-sm q-pb-sm">
          <div class="col-12 col-sm-grow text-center">
            <q-rating
              color="orange"
              class="q-mx-auto q-mt-sm"
              size="1.5rem"
              :value="player.rating"
              :max="5"
              @input="submitRating"
            />
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
          <q-item-section v-if="player.height" side>
            <q-item-label >{{player.height}} cm</q-item-label>
          </q-item-section>
        </q-item>
        <q-item >
          <q-item-section>
            <q-item-label>Weight</q-item-label>
          </q-item-section>
          <q-item-section v-if="player.weight" side>
            <q-item-label >{{player.weight}} kg</q-item-label>
          </q-item-section>
        </q-item>
        <q-item >
          <q-item-section>
            <q-item-label>Foot</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label >{{player.foot}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item >
          <q-item-section>
            <q-item-label>Position</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label >{{player.broadPosition}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>

</template>

<script>
import { date } from 'quasar'

export default {
  name: 'Player',

  data: () => ({
    ratingModel: 1,
    age: null,
    date: new Date(),
    birthFormatted: null,
  }),

  props: {
    player: null,
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
