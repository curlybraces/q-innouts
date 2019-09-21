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
              <div class="text-h5 q-pa-sm bordered bg-secondary">Create new bulletin</div>
              <q-form
                @submit="onBulletinSubmit"
                @reset="onBulletinReset"
                class="q-gutter-sm"
              >
                <q-input v-model="bulletinTitle" label="title" class="q-mb-sm" />
                <q-editor v-model="bulletinBody" min-height="8rem" />
                <q-uploader
                  url="http://localhost:4444/upload" label="Choose appropriate image"
                  style="max-width: 300px" accept="image/*" :max-file-size="800000"
                  class="q-my-sm"
                />
              <div class="q-mt-lg">
                <q-btn label="Submit" type="submit" color="primary" />
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
              </q-form>
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
                url="http://localhost:4444/upload" label="Choose appropriate image"
                style="max-width: 300px" accept="image/*" :max-file-size="800000"
                class="q-my-sm"
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
                  url="http://localhost:4444/upload" label="Choose appropriate image"
                  style="max-width: 300px" accept="image/*" :max-file-size="100000"
                  class="q-my-sm"
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
                      <q-select filled v-model="player" :options="players" option-label="name" option-value="id" label="Player" />
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
                      <q-select filled v-model="player" :options="players" option-label="name" option-value="id" label="League" />
                    </div>
                    <div class="col-md-3"></div>
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
export default {
  name: 'AdminPanel',

  data () {
    return {
      tab: 'overview',
      splitterModel: 20,
      bulletinTitle: '',
      bulletinBody: 'Type-in the body...',
      articleTitle: '',
      articleBody: 'Type-in the body...',
      rumourTitle: '',
      rumourBody: 'Type-in the body...',
      leagues: [],
      teams: [],
      league: null,
      team: null,
      players: [],
      player: null,
      targetLeague: null,
      targetTeams: [],
      targetTeam: null,
      fee: '',
      loan: false,
      date: '',
      returnDate: '',

    }
  },

  watch: {
    'team' () {
      console.log('team change')
    },
    'league' () {
      this.teams = this.league.teams
    },
    'targetLeague' () {
      this.targetTeams = this.targetLeague.teams
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

    onBulletinReset () {
      this.bulletinTitle = ''
      this.bulletinBody = 'Type-in the body...'
    },

    onBulletinSubmit () {

    },

    onArticleReset () {
      this.articleTitle = ''
      this.articleBody = 'Type-in the body...'
    },

    onArticleSubmit () {

    },

    onRumourReset () {
      this.rumourTitle = ''
      this.rumourBody = 'Type-in the body...'
    },

    onRumourSubmit () {

    },

    onTransferReset () {
      this.league = null
      this.team = null
      this.players = []
      this.player = null
      this.targetLeague = null
      this.targetTeams = []
      this.targetTeam = null
      this.fee = ''
      this.loan = false
      this.date = ''
      this.returnDate = ''
    },

    onTransferSubmit () {

    },
  }

}
</script>

<style>
</style>
