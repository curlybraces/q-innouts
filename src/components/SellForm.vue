<template>
  <q-card>
    <q-card-section class="text-left text-h6 bg-red-3">
      <span class="text-left" style="color: red;">&#10134;</span> Sell Players
    </q-card-section>
    <q-card-section class="text-subtitle1 text-center">{{remSellCards}} sell card(s) remaining! (current window)</q-card-section>

    <q-card-section>
          <div class="q-gutter-md">
            <q-select dense filled v-model="selecteds" multiple :options="team.players" option-label="nickname" option-value="id" @input="check"
              options-selected-class="text-negative" :disable="!remSellCards" options-dense
             />
          </div>

        <q-form action method="post" @submit="submit">

          <q-markup-table class="table table-hover q-mb-md" v-if="unwanteds.length">
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
                  <q-select dense filled v-model="unwanted.votes" :options="Array(remSellCards+1).fill(0).map((e,i)=>i+1)"  @input="update"
                    options-selected-class="text-negative" options-dense options-cover
                  />
                </td>
                <td class="text-center">
                  <div @click="remove(unwanted)" class>&#10060;</div>
                </td>
              </tr>
            </tbody>
          </q-markup-table>

          <div v-if="this.unwanteds.length" class="row justify-center">
            <q-btn label="Submit" type="submit" :disable="this.unwanteds.length==0" color="primary"/>
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
    sellingList: null,
    sellQuota: null
  },

  data () {
    return {
      unwanteds: [],
      selecteds: [],
      remSellCards: null
    }
  },

  watch: {
    'sellQuota' () {
      this.remSellCards = this.sellQuota
    }
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
        this.selecteds.splice(this.selecteds.length, 1)
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

    update: function () {
      let x = this.votesSum()
      this.remSellCards = this.sellQuota - x
    },

    remove: function (player) {
      this.remSellCards += player.votes
      let index = this.unwanteds.indexOf(player)
      this.unwanteds.splice(index, 1)
      this.selecteds.splice(index, 1)
    },

    submit: function () {
      let x = this.votesSum()
      if (x <= this.sellQuota) {
        this.$axios
          .post('api/unwanteds', {
            players: JSON.stringify(this.unwanteds),
            team_id: this.team.id,
            userID: this.user.id
          })
          .then(response => {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: response.data.message
            })
            this.unwanteds = []
            this.remSellCards = this.sellQuota - x
            this.selecteds = []
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

    add: function (details) {
      this.selecteds.push(details.value)
      console.log(details)
    }
  }
}
</script>

<style>
</style>
