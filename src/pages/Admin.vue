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

            <div class="text-subtitle1 q-mt-md q-mb-xs text-capitalize">admin name</div>

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
            <div class="text-h5 q-pa-sm bordered bg-secondary">Create new article</div>
            <q-form
              @submit="onArticleSubmit"
              @reset="onArticleReset"
              class="q-gutter-sm"
            >
              <q-input v-model="articleTitle" label="title" class="q-mb-sm" />
              <q-editor v-model="articleBody" min-height="14rem" />
              <q-uploader
                url="http://localhost:4444/upload" label="Choose appropriate image" hide-upload-btn
                style="max-width: 300px" accept="image/*" :max-file-size="800000"
                class="q-my-sm" ref="article"
              />
            <div class="q-mt-lg">
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
            </q-form>
          </q-tab-panel>

          <q-tab-panel name="rumours">
            <div class="column">
              <div class="text-h5 q-pa-sm bordered bg-secondary">Create new rumour</div>
              <q-form
                @submit="onRumourSubmit"
                @reset="onRumourReset"
                class="q-gutter-sm"
              >
                <q-input v-model="rumourTitle" label="title" class="q-mb-sm" />
                <q-editor v-model="rumourBody" min-height="7rem" />
                <q-uploader
                  url="http://localhost:4444/upload" label="Choose appropriate image" hide-upload-btn
                  style="max-width: 300px" accept="image/*" :max-file-size="90000"
                  class="q-my-sm" ref="rumour"
                />
              <div class="q-mt-lg">
                <q-btn label="Submit" type="submit" color="primary" />
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
              </q-form>
            </div>
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
                      <q-input v-model="fee" label="Fee (m£)" type="number" class="q-mb-sm" />
                    </div>
                    <div class="col-md-2">
                      <q-input v-model="date" label="Date" type="date" class="q-mb-sm" />
                    </div>
                    <div class="col-md-2 self-center">
                      <q-toggle v-model="loan" label="Loan transfer?" />
                    </div>
                    <div class="col-md-2">
                      <q-input v-if="loan" v-model="returnDate" label="Return date" type="date" class="q-mb-sm" />
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
  </q-page>
</template>

<script>
const BulletinAdmin = () => import('components/BulletinAdmin.vue')

export default {
  name: 'AdminPanel',

  components: {
    BulletinAdmin,
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
      loan: false,
      date: null,
      returnDate: null,

    }
  },

  watch: {
    'team' () {
      this.player = null
      this.$axios.get('http://innouts.test/api/teams/players/' + this.team.id)
        .then(response => {
          this.players = response.data
        })
        .catch(error => {
          console.log(error)
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

    this.$axios.get('http://innouts.test/api/leagues')
      .then(response => {
        this.leagues = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },

  methods: {
    logout () {

    },

    onArticleReset () {
      this.articleTitle = ''
      this.articleBody = ''
      this.$refs.article.reset()
    },

    onArticleSubmit () {
      if (this.articleTitle.length && this.articleBody.length && this.$refs.article.files[0]) {
        let formData = new FormData()
        formData.append('picture', this.$refs.article.files[0])
        formData.append('title', this.articleTitle)
        formData.append('body', this.articleBody)
        let headers = {
          'Content-Type': 'multipart/form-data'
        }
        this.$axios.post('http://innouts.test/api/articles', formData, headers)
          .then(response => {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'Article created!'
            })
            this.onArticleReset()
          })
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Title, body and picture are not filled!'
        })
      }
    },

    onRumourReset () {
      this.rumourTitle = ''
      this.rumourBody = ''
      this.$refs.rumour.reset()
    },

    onRumourSubmit () {
      if (this.rumourTitle.length && this.rumourBody.length && this.$refs.rumour.files[0]) {
        let formData = new FormData()
        formData.append('picture', this.$refs.rumour.files[0])
        formData.append('title', this.rumourTitle)
        formData.append('body', this.rumourBody)
        let headers = {
          'Content-Type': 'multipart/form-data'
        }
        this.$axios.post('http://innouts.test/api/rumours', formData, headers)
          .then(response => {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              message: 'Rumour created!'
            })
            this.onRumourReset()
          })
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Title, body and picture are not filled!'
        })
      }
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
      this.loan = false
      this.date = null
      this.returnDate = null
    },

    onTransferSubmit () {
      if (this.player && this.targetTeam && this.date) {
        this.$axios({ url: 'http://innouts.test/api/transfers', data: { player_id: this.player.id, from: this.team.id, to: this.targetTeam.id, fee: this.fee, date: this.date, loan: this.loan, returnDate: this.returnDate }, method: 'POST' })
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
