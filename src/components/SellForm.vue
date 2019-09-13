<template>
  <div>
    <p>{{remSellCards}} sell cards remaining! (current window)</p>

   <div class="q-pa-md" style="max-width: 300px">
      <div class="q-gutter-md">
         <q-select v-model="selecteds" multiple :options="team.players" option-label="nickname" />
      </div>
   </div>

    <form action method="post" @submit.prevent="submit">
      <div class="form-group">
        <label for="sel2">(hold control button to select more than one):</label>

        <select
          multiple
          class="form-control"
          id="sell"
          name="sell[]"
          chosen
          v-model="selecteds"
          @change="check"
        >
          <option
            v-for="player in team.players"
            :value="player"
            :key="player.id"
            :disabled="sellingList.includes(player.id)"
          >{{player.nickname}}</option>
        </select>
      </div>

      <table class="table table-hover" v-if="unwanteds.length">
        <thead>
          <tr>
            <td>Player</td>
            <td>Cards</td>
            <td class="text-center">Remove?</td>
          </tr>
        </thead>

        <tbody>
          <tr v-for="unwanted in unwanteds" :key="unwanted.id">
            <td>{{unwanted.player.firstName}} {{unwanted.player.lastName}}</td>
            <td>
              <form action>
                <div class>
                  <select
                    class="form-control form-control-sm"
                    id="sel1"
                    name="sellist1"
                    v-model="unwanted.votes"
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
              <div @click="remove(unwanted)" class>&#10060;</div>
            </td>
          </tr>
        </tbody>
      </table>

      <button type="submit" class="btn btn-primary" :disabled="this.unwanteds.length==0">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    team: Object,
    user: Object,
    sellingList: Array,
    sellQuota: Number
  },

  data () {
    return {
      unwanteds: [],
      selecteds: [],
      remSellCards: null
    }
  },

  created: function () {
    this.remSellCards = this.sellQuota
  },

  methods: {
    votesSum: function () {
      let x = 0

      this.unwanteds.forEach(element => {
        x += element.votes
      })

      return x
    },

    check: function ($event) {
      if (this.remSellCards === 0) {
        alert('You have run out of sell cards, please review your choices!')
      } else {
        this.unwanteds = []
        this.remSellCards = this.sellQuota
        this.selecteds.forEach(element => {
          this.unwanteds.push({
            player: element,
            votes: 1
          })
          this.remSellCards--
        })
      }
    },

    update: function (unwanted) {
      let x = this.votesSum()
      this.remSellCards = this.sellQuota - x
    },

    remove: function (player) {
      this.remSellCards += player.votes
      let index = this.unwanteds.indexOf(player)
      this.unwanteds.splice(index, 1)
    },

    submit: function () {
      let x = this.votesSum()

      if (x <= this.sellQuota) {
        this.$axios
          .post('/unwanteds', {
            players: JSON.stringify(this.unwanteds),
            team: this.team.id
          })
          .then(response => {
            alert(response.data.message)
            location.reload()
          })
          .catch(function (error) {
            console.log(error)
          })
      } else alert('You have used more cards than you got! fix it and retry.')
    }
  }
}
</script>

<style>
</style>
