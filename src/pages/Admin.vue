<template>
  <q-page>
    <q-splitter
      v-if="$q.platform.is.desktop"
      v-model="splitterModel"
      class=""
    >
      <template v-slot:before class="bg-accent">
        <div class="row justify-center no-wrap q-pa-sm bordere bg-primary">
          <div class="column items-center">
            <q-avatar size="90px">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSyb_bl2yTpKhgn__vbbP9_2hPU8AfzvyhH16xZnK1l1zH3MxaP">
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs text-capitalize text-white">{{admin.firstname}} {{admin.lastname}}</div>

            <q-btn
              color="secondary"
              text-color="primary"
              label="Logout"
              @click="logout"
              push
              size="sm"
              v-close-popup
            />
          </div>
        </div>
        <q-tabs
          v-model="tab"
          vertical
          :dense="$q.platform.is.mobile"
          active-bg-color="primary"
          active-color="accent"
          class="bg-primar"
        >
          <q-tab name="overview" label="overview" />
          <q-tab name="bulletins" label="Bulletins" />
          <q-tab name="articles" label="Articles" />
          <q-tab name="rumours" label="rumours" />
          <q-tab name="transfers" label="transfers" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="jump-up"
          transition-next="jump-down"
        >
          <q-tab-panel name="overview">
            <div class="column">
              # of users
              <div class="row">
                <div class="col-md-2 text-h6">overall: </div>
                <div class="col-md-2 text-h6">month: </div>
                <div class="col-md-2 text-h6">week: </div>
                <div class="col-md-2 text-h6">yesterday: </div>
                <div class="col-md-2 text-h6">today: </div>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="bulletins">
            <div class="column">
              <bulletin-admin />
            </div>
          </q-tab-panel>

          <q-tab-panel name="articles" class="q-pa-s">
            <article-admin />
          </q-tab-panel>

          <q-tab-panel name="rumours">
            <rumour-admin />
          </q-tab-panel>
          <q-tab-panel name="transfers">
            <div class="column">
              <div class="text-h5 q-pa-sm bordered bg-secondary">New transfer</div>
                <q-form
                  @submit="onTransferSubmit"
                  @reset="onTransferReset"
                  class="q-gutter-sm"
                >
                  <div class="text-h5 q-mt-sm q-pa-sm">Player</div>
                  <div class="row justify q-my-sm q-gutter-x-sm">
                    <div class="col-md-3">
                      <q-select filled v-model="league" :options="leagues" option-label="name" option-value="id" label="League" />
                    </div>
                    <div class="col-md-3">
                      <q-select filled v-model="team" :options="teams" option-label="name" option-value="id" label="Team" />
                    </div>
                    <div class="col-md-3">
                      <q-select filled v-model="player" :options="players" option-label="nickname" option-value="id" label="Player" />
                    </div>
                    <div class="col-md-3"></div>
                  </div>
                  <div class="text-h5 q-pa-sm">To</div>
                  <div class="row justify q-my-sm q-gutter-x-sm">
                    <div class="col-md-3">
                      <q-select filled v-model="targetLeague" :options="leagues" option-label="name" option-value="id" label="League" />
                    </div>
                    <div class="col-md-3">
                      <q-select filled v-model="targetTeam" :options="targetTeams" option-label="name" option-value="id" label="Team" />
                    </div>
                    <div class="col-md-3">
                      <!-- <q-select filled v-model="player" :options="players" option-label="name" option-value="id" label="League" /> -->
                    </div>
                    <div class="col-md-3"></div>
                  </div>
                  <div class="text-h5 q-pa-sm">Details</div>
                  <div class="row justify q-my-sm q-gutter-x-sm">
                    <div class="col-md-2">
                      <q-input v-model="fee" label="Fee (€m)" type="number" class="q-mb-sm" />
                    </div>
                    <div class="col-md-2 self-center">
                      <q-input v-model="notes" label="Notes" type="text" />
                    </div>
                    <div class="col-md-2">
                      <q-input v-model="date" label="Date" type="date" class="q-mb-sm" />
                    </div>
                    <div class="col-md-2">
                      <q-input v-model="returnDate" label="Return date" type="date" class="q-mb-sm" />
                    </div>
                  </div>
                  <div class="q-mt-lg">
                    <q-btn label="Submit" type="submit" color="primary" />
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                  </div>
                </q-form>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
    <div class="text-h6 q-pa-sm" v-else>
      Admin page is optimized for desktop use only!
    </div>
  </q-page>
</template>

<script>
const BulletinAdmin = () => import('components/BulletinAdmin.vue')
const ArticleAdmin = () => import('components/ArticleAdmin.vue')
const RumourAdmin = () => import('components/RumourAdmin.vue')

export default {
  name: 'AdminPanel',

  components: {
    BulletinAdmin,
    ArticleAdmin,
    RumourAdmin
  },

  data () {
    return {
      tab: 'overview',
      splitterModel: 20,
      articleTitle: '',
      articleBody: '',
      rumourTitle: '',
      rumourBody: '',
      leagues: [],
      teams: [],
      league: null,
      team: null,
      players: [],
      player: null,
      targetLeague: null,
      targetTeams: [],
      targetTeam: null,
      fee: null,
      notes: '',
      date: null,
      returnDate: null,

    }
  },

  computed: {
    admin: function () {
      return this.$store.getters.admin
    }
  },

  watch: {
    'team' () {
      this.player = null
      this.$axios.get('api/teams/players/' + this.team.id)
        .then(response => {
          this.players = response.data
        })
        .catch(error => {
          this.$q.notify({ message: error.data.message })
        })
    },
    'league' () {
      this.teams = this.league.teams
      this.team = null
      this.player = null
    },
    'targetLeague' () {
      this.targetTeams = this.targetLeague.teams
      this.targetTeam = null
    }
  },

  created () {
    this.$store.commit('setRightDrawer', false)

    this.$store.dispatch('getAdmin', this.$q.cookies.get('adminToken'))

    this.$axios.get('api/leagues')
      .then(response => {
        this.leagues = response.data
      })
      .catch(error => {
        this.$q.notify({ message: error.data.message })
      })
  },

  methods: {
    logout: function () {
      this.$store.dispatch('adminLogout').then(() => {
        this.$router.push('/')
      })
    },

    onTransferReset () {
      this.league = null
      this.team = null
      this.teams = []
      this.players = []
      this.player = null
      this.targetLeague = null
      this.targetTeams = []
      this.targetTeam = null
      this.fee = null
      this.notes = ''
      this.date = null
      this.returnDate = null
    },

    onTransferSubmit () {
      if (this.player && this.targetTeam && this.date) {
        this.$axios({ url: 'api/transfers', data: { player_id: this.player.id, from: this.team.id, to: this.targetTeam.id, fee: this.fee, date: this.date, notes: this.notes, returnDate: this.returnDate }, method: 'POST' })
          .then(response => {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'Transfer completed!'
            })
            this.onTransferReset()
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
          message: 'Player, destination and date are not filled!'
        })
      }
    },
  }

}
</script>

<style>
</style>
