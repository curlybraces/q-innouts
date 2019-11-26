<template>
  <q-card>
    <q-card-section class="text-h6 bg-green-3 text-left">
      <span style="">&#10133;</span> Sign Players
    </q-card-section>
    <q-card-section class="text-subtitle1 q-pa-s">
      {{remSignCards}} sign card(s) remaining (current window)
    </q-card-section>

    <q-card-section class="q-pa-sm" style="">
      <q-form class="q-mb-md" @submit="onSubmit">
        <q-input dense filled v-model="player" debounce="1000" label="Enter player name" :disable="!remSignCards" />
        <div class="q-gutter-md q-mx-auto q-my-sm">
        <q-select
          v-show="hints.length"
          dense
          filled
          v-model="wanted"
          :options="hints"
          option-label="nickname"
          option-value="id"
          @input="push"
          color="teal"
          clearable
          options-cover
          options-selected-class="text-deep-orange"
          class="q-mx-none"
        >
          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
              dense
            >
              <q-item-section avatar>
                <q-avatar square>
                  <q-img :src="scope.opt.picture" placeholder-src="statics/images/players/picSoon.png"/>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label v-text="scope.opt.firstName + ' ' +  scope.opt.lastName" />
                <q-item-label caption>{{ scope.opt.team.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        </div>

    <q-markup-table :dense="$q.screen.lt.md" class="table table-hover q-mb-md" v-if="this.wantedPlayers.length">
      <thead>
        <tr>
          <td>Player</td>
          <td>Team</td>
          <td>Cards</td>
          <td class="text-center">Remove?</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="wanted in wantedPlayers" :key="wanted.id">
          <td>{{wanted.player.firstName}} {{wanted.player.lastName}}</td>
          <td>{{wanted.player.team.name}}</td>
          <td>
            <q-select dense filled v-model="wanted.votes" :options="Array(remSignCards+1).fill(0).map((e,i)=>i+1)"  @input="update"
              options-selected-class="text-positive" options-dense options-cover
            />
          </td>
          <td class="text-center">
            <div @click="remove(wanted)" class>&#10060;</div>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
        <div v-if="this.wantedPlayers.length">
          <q-btn label="Submit" type="submit" color="primary"/>
        </div>
    </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    team: Object,
    user: Object,
    signingList: null,
    signQuota: Number
  },

  data () {
    return {
      hints: [],
      player: '',
      wantedPlayers: [],
      wanted: null,
      show: false,
      remSignCards: null
    }
  },

  watch: {
    'signQuota' () {
      this.remSignCards = this.signQuota
    },

    'player' () {
      this.search()
    }
  },

  methods: {
    votesSum: function () {
      let x = 0
      this.wantedPlayers.forEach(element => {
        x += element.votes
      })
      return x
    },

    onSubmit: function () {
      let x = this.votesSum()
      if (x <= this.signQuota) {
        this.$axios
          .post('api/wanteds', {
            players: JSON.stringify(this.wantedPlayers),
            suitor_id: this.team.id,
            user_id: this.user.id
          })
          .then(response => {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: response.data.message
            })
            this.wantedPlayers = []
            this.remSignCards = this.signQuota - x
            // location.reload()
          })
          .catch(error => {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'fas fa-exclamation-triangle',
              message: error.response.data.message
            })
          })
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'You have used more cards than you got! fix and retry.'
        })
      }
    },

    search: function () {
      if (this.player.length) {
        this.$axios
          .post('api/search', { player: this.player, team: this.team.id })
          .then(response => (this.hints = response.data))
          .catch(function (error) {
            this.$q.notify({ message: error.data.message })
          })
      } else {
        this.hints = []
      }
    },

    unique: function (item) {
      let uniq = true

      if (this.wantedPlayers.length >= 1) {
        this.wantedPlayers.forEach(function (element) {
          if (element.id === item.id) {
            uniq = false
          }
        })
      }
      return uniq
    },

    push: function (player) {
      if (this.remSignCards > 0) {
        if (this.unique(this.wanted)) {
          this.wantedPlayers.push({
            player: this.wanted,
            votes: 1
          })
          this.remSignCards -= 1
          this.player = ''
          this.wanted = null
          this.hints = []
        } else {
          alert('player already in your list!')
        }
      } else {
        alert('You have run out of cards!')
      }
    },

    update: function () {
      // alert($event.target.value)
      let x = this.votesSum()
      this.remSignCards = this.signQuota - x
    },

    remove: function (wanted) {
      this.remSignCards += wanted.votes
      this.wantedPlayers.pop(wanted)
    }
  }
}
</script>

<style>
</style>
