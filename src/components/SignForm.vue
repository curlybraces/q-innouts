<template>
  <div>
    <p>{{remSignCards}} sign cards remaining! (current window)</p>

    <form class="form-inline" @submit.prevent="onSubmit">
      <label for="player" class="mb-2 mr-sm-2">Player</label>
      <input
        type="text"
        class="form-control mb-2 mr-sm-2"
        v-model="player"
        :disabled="this.signQuota==0"
        id="player"
        name="player"
        placeholder="Kaka"
        @keyup="search"
        list="hints"
      />

      <select
        v-if="this.hints.length"
        name="wanted"
        id="wanted"
        class="form-control mb-2 mr-sm-2"
        v-model="wanted"
        @change="push"
      >
        <option selected disabled>Open</option>
        <option
          v-for="hint in this.hints"
          :value="hint"
          :key="hint.id"
          :disabled="signingList.includes(hint.id)"
        >{{hint.nickname}}</option>
      </select>
      <button
        v-if="this.wantedPlayers.length"
        type="submit"
        class="form-control btn btn-primary mb-2"
        :disabled="wantedPlayers.length==0"
      >Submit</button>
      <br />
    </form>
    <br />

    <table class="table table-hover" v-if="this.wantedPlayers.length">
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
                  <option :value="1">1</option>
                  <option :value="2">2</option>
                  <option :value="3">3</option>
                  <option :value="4">4</option>
                </select>
              </div>
            </form>
          </td>
          <td class="text-center">
            <div @click="remove(wanted)" class>&#10060;</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    team: Object,
    user: Object,
    signingList: Array,
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

  created: function () {
    this.remSignCards = this.signQuota
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
          .post('/wanteds', {
            players: JSON.stringify(this.wantedPlayers),
            team: this.team.id,
            user: this.user
          })
          .then(response => {
            alert(response.data.message)
            location.reload()
          })
          .catch(function (error) {
            console.log(error)
          })
      } else alert('You have used more cards than you got! fix it and retry.')
    },

    search: function () {
      if (this.player.length) {
        this.$axios
          .post('/api/search', { player: this.player, team: this.team.id })
          .then(response => (this.hints = response.data))
          .catch(function (error) {
            console.log(error)
          })
      }
    },

    unique: function (item) {
      let uniq = true

      if (this.wantedPlayers.length >= 1) {
        this.wantedPlayers.forEach(function (element) {
          if (element.player.id === item.id) {
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

    update: function ($event) {
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
