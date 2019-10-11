<template>
  <q-card class="column">
    <q-card-section class="text-h6 bg-green-3 text-left">
      <span style="">&#10133;</span> Sign Players
    </q-card-section>
    <q-card-section class="text-subtitle1 q-pa-s">
      {{remSignCards}} sign card(s) remaining! (current window)
    </q-card-section>

    <q-card-section class="q-pa-md" style="">
      <q-form class="q-mb-md" @submit="onSubmit">
        <!-- <label for="player" class="mb-2 q-mr-sm">Enter player name</label>
        <input
          type="text"
          class="form-control q-mb-md mr-sm-2"
          v-model="player"
          :disabled="this.signQuota==0"
          id="player"
          name="player"
          placeholder="Kaka"
          @keyup="search"
          list="hints"
        /> -->
        <q-input dense filled v-model="player" @keyup="search" debounce="600" label="Enter player name" />

        <!-- <div class="q-pa-md" style="max-width: 300px">
            <div class="q-gutter-md q-mx-auto">
              <q-select v-model="wanted" :options="hints" option-label="nickname" @change="push" />
            </div>
        </div> -->
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
          options-selected-class="text-deep-orange"
          class="q-mx-none"
        >
          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
            >
              <q-item-section avatar>
                <q-avatar>
                  <img :src="scope.opt.picture">
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

    <q-markup-table class="table table-hover q-mb-md" v-if="this.wantedPlayers.length">
      <thead>
        <tr>
          <td>Player</td>
          <td>Club</td>
          <td>Cards</td>
          <td class="text-center">Remove?</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="wanted in wantedPlayers" :key="wanted.id">
          <td>{{wanted.player.firstName}} {{wanted.player.lastName}}</td>
          <td>{{wanted.player.team.name}}</td>
          <td>
            <form action>
              <div class>
                <select
                  class="form-control form-control-sm"
                  id="sel1"
                  name="sellist1"
                  v-model="wanted.votes"
                  @change="update"
                >
                  <option v-for="opt in (remSignCards+1)" :value="opt" :key="opt">{{opt}}</option>
                  <!-- <option :value="2">2</option>
                  <option :value="3">3</option>
                  <option :value="4">4</option> -->
                </select>
              </div>
            </form>
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
    }
  },

  // created: function () {
  //   this.remSignCards = this.signQuota
  // },

  // mounted: function () {
  //   this.remSignCards = this.signQuota
  // },

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
            alert(response.data.message)
            location.reload()
          })
          .catch(function (error) {
            console.log(error)
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
            console.log(error)
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
