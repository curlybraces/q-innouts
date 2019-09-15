<template>
  <q-card class="column">
    <q-card-section class="text-h6 bg-green-3 text-left">
      <span style="">&#10133;</span> <q-icon name="add_circle" left size="2rem" color="green" class="" /> Sign Players
    </q-card-section>
    <q-card-section class="text-subtitle1 q-pa-sm">
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
        <q-input dense filled v-model="player" @keyup="search" label="Enter player name" />

        <!-- <div class="q-pa-md" style="max-width: 300px">
            <div class="q-gutter-md q-mx-auto">
              <q-select v-model="wanted" :options="hints" option-label="nickname" @change="push" />
            </div>
        </div> -->
            <div class="q-gutter-md q-mx-auto">
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
        >
          <!-- <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
            >
              <q-item-section avatar>
                <q-avatar :src="scope.opt.picture" />
              </q-item-section>
              <q-item-section>
                <q-item-label v-html="scope.opt.label" />
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template> -->
        </q-select>
        </div>

        <!-- <select
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
        </select> -->
        <!-- <button
          v-if="this.wantedPlayers.length"
          type="submit"
          class="form-control btn btn-primary mb-2"
          :disabled="wantedPlayers.length==0"
        >Submit</button> -->

    <!-- <br /> -->

    <q-markup-table class="table table-hover" v-if="this.wantedPlayers.length">
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
    signingList: Array,
    signQuota: Number
  },

  data () {
    return {
      hints: Array,
      player: '',
      wantedPlayers: [],
      wanted: null,
      show: false,
      remSignCards: Number
    }
  },

  mounted: function () {
    this.remSignCards = this.signQuota
  },

  updated: function () {
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
          .post('http://innouts.test/api/wanteds', {
            players: JSON.stringify(this.wantedPlayers),
            team: this.team.id,
            userID: this.user.id
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
          .post('http://innouts.test/api/search', { player: this.player, team: this.team.id })
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
