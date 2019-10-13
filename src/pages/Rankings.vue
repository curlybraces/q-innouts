<template>
  <q-page paddin>
    <q-splitter
      v-if="$q.platform.is.desktop"
      v-model="splitterModel"
      class="bg-secondary"
    >
      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          :dense="$q.platform.is.mobile"
          active-bg-color="primary"
          active-color="yellow-14"
          class="bg-primar"
        >
          <q-tab name="teams" label="Teams" />
          <q-tab name="players" label="Players" />
          <q-tab name="managers" label="Managers" />
          <q-tab name="fans" label="Fans" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="jump-up"
          transition-next="jump-down"
          @before-transition="panelChange"
        >
          <q-tab-panel name="teams">
            <div class="column">
              <q-table
                title="Teams Ranking"
                :data="teams"
                :columns="columns"
                :dense="$q.screen.lt.md"
                :rows-per-page-options="[10,20,0]"
                :pagination.sync="myPagination"
                row-key="name"
                class="bg-secondary"
              >
                <q-td slot="body-cell-team" slot-scope="value" :props="value">
                  <router-link :to="'/teams/' + value.value.slug" >
                    <div id="" class="q-mx-aut team-thumbnail no-decor ellipsis">
                      <q-img :src="value.value.logo" :alt="value.value.name" class="full-height self-cente" />
                        <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{value.value.name}}
                        </q-tooltip>
                    </div>
                  </router-link>
                </q-td>
              </q-table>
            </div>
          </q-tab-panel>

          <q-tab-panel name="players" class="q-pa-s">
            <players-rankings :players="players" />
          </q-tab-panel>

          <q-tab-panel name="managers">
            <div class="column">
              <q-table
                title="Managers Ranking"
                :data="managers"
                :columns="managerColumns"
                :dense="$q.screen.lt.md"
                :pagination.sync="managersPagination"
                :rows-per-page-options="[10,20,0]"
                row-key="name"
                class="bg-secondary"
              >
                <q-td slot="body-cell-rank" slot-scope="value" :props="value">
                  <div :style="medalStyle" v-if="value.value===1">&#129351;</div>
                  <div :style="medalStyle" v-else-if="value.value===2">&#129352;</div>
                  <div :style="medalStyle" v-else-if="value.value===3">&#129353;</div>
                  <div v-else>{{value.value}}</div>
                </q-td>
                <q-td slot="body-cell-manager" slot-scope="value" :props="value">
                  <router-link :to="'/managers/' + value.value.slug" class="no-decor" >
                    <div id="" class="row inline person-thumbnail no-decor ellipsis">
                      <q-img :src="value.value.picture" :alt="value.value.name" class="full-height self-cente" />
                    </div>
                  </router-link>
                </q-td>

                <q-td slot="body-cell-team" slot-scope="value" :props="value">
                  <div id="" class="q-mx-aut  no-decor ellipsis">
                    <router-link :to="'/teams/' + value.value.slug" >
                      <q-img :src="value.value.logo" :alt="value.value.name" class="full-height team-thumbnail self-cente" />
                        <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{value.value.name}}
                        </q-tooltip>
                    </router-link>
                  </div>
                </q-td>
              </q-table>
            </div>
          </q-tab-panel>
          <q-tab-panel name="fans">
            <div class="column">
              <q-table
                title="Fans Ranking"
                :data="fans"
                :columns="fansColumns"
                :dense="$q.screen.lt.md"
                :pagination.sync="fansPagination"
                :rows-per-page-options="[10,20,0]"
                row-key="fan"
                class="bg-secondary"
              >
                <q-td slot="body-cell-fan" slot-scope="value" :props="value">
                  <router-link :to="'/' + value.value.id + '/' + value.value.slug" class="no-decor" >
                    <div class="row inline person-thumbnail no-decor ellipsis">
                      <q-img :src="value.value.picture" :alt="value.value.name" class="full-height self-cente" />
                    </div>
                  </router-link>
                </q-td>

                <q-td slot="body-cell-team" slot-scope="value" :props="value">
                  <div class="q-mx-aut  no-decor ellipsis">
                    <router-link :to="'/teams/' + value.value.slug" >
                      <q-img :src="value.value.logo" :alt="value.value.name" class="full-height team-thumbnail self-cente" />
                        <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{value.value.name}}
                        </q-tooltip>
                    </router-link>
                  </div>
                </q-td>
              </q-table>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
    <div v-else>
      <q-tabs
        v-model="tab"
        dense
        no-caps
        class="bg-blue-grey text-white shadow-2"
      >
        <q-tab name="teams" label="Teams" />
        <q-tab name="players"  label="Players" />
        <q-tab name="managers"  label="Managers" />
        <q-tab name="fans"  label="Fans" />
      </q-tabs>
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
          @before-transition="panelChange"
        >
          <q-tab-panel :class="mobilePanelClass" name="teams">
            <div class="column">
              <q-table
                title="Teams Ranking"
                :data="teams"
                :columns="columns"
                :dense="$q.screen.lt.md"
                :rows-per-page-options="[10,20,0]"
                :pagination.sync="myPagination"
                row-key="name"
                class="bg-secondary"
              >
                <q-td slot="body-cell-team" slot-scope="value" :props="value">
                  <router-link :to="'/teams/' + value.value.slug" >
                    <div id="" class="q-mx-aut team-thumbnail no-decor ellipsis">
                      <q-img :src="value.value.logo" :alt="value.value.name" class="full-height self-cente" />
                        <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{value.value.name}}
                        </q-tooltip>
                    </div>
                  </router-link>
                </q-td>
              </q-table>
            </div>
          </q-tab-panel>

          <q-tab-panel :class="mobilePanelClass" name="players">
            <players-rankings :players="players" />
          </q-tab-panel>

          <q-tab-panel :class="mobilePanelClass" name="managers">
            <div class="column">
              <q-table
                title="Managers Ranking"
                :data="managers"
                :columns="managerColumns"
                :dense="$q.screen.lt.md"
                :pagination.sync="managersPagination"
                :rows-per-page-options="[10,20,0]"
                row-key="name"
                class="bg-secondary"
              >
                <q-td slot="body-cell-manager" slot-scope="value" :props="value">
                  <div id="" class="row inline person-thumbnail no-decor ellipsis">
                    <!-- henlo -->
                    <q-img :src="value.value.picture" :alt="value.value.name" class="full-height self-cente" />
                  </div>
                </q-td>

                <q-td slot="body-cell-team" slot-scope="value" :props="value">
                  <div id="" class="q-mx-aut  no-decor ellipsis">
                    <router-link :to="'/teams/' + value.value.slug" >
                      <q-img :src="value.value.logo" :alt="value.value.name" class="full-height team-thumbnail self-cente" />
                        <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{value.value.name}}
                        </q-tooltip>
                    </router-link>
                  </div>
                </q-td>
              </q-table>
            </div>
          </q-tab-panel>
          <q-tab-panel :class="mobilePanelClass" name="fans">
            <div class="column">
              <q-table
                title="Fans Ranking"
                :data="fans"
                :columns="fansColumns"
                :dense="$q.screen.lt.md"
                :pagination.sync="fansPagination"
                :rows-per-page-options="[10,20,0]"
                row-key="name"
                class="bg-secondary"
              >
                <q-td slot="body-cell-fan" slot-scope="value" :props="value">
                  <router-link :to="'/' + value.value.id + '/' + value.value.slug" class="no-decor" >
                    <div class="row inline person-thumbnail no-decor ellipsis">
                      <q-img :src=" value.value.picture" :alt="value.value.name" class="full-height self-cente" />
                    </div>
                  </router-link>
                </q-td>

                <q-td slot="body-cell-team" slot-scope="value" :props="value">
                  <div class="q-mx-aut  no-decor ellipsis">
                    <router-link :to="'/teams/' + value.value.slug" >
                      <q-img :src="value.value.logo" :alt="value.value.name" class="full-height team-thumbnail self-cente" />
                        <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{value.value.name}}
                        </q-tooltip>
                    </router-link>
                  </div>
                </q-td>
              </q-table>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import { date } from 'quasar'
const PlayersRankings = () => import('components/PlayersRankings.vue')

export default {
  name: 'Rankings',

  components: {
    PlayersRankings
  },

  data () {
    return {
      tab: 'teams',
      splitterModel: 10,
      myPagination: {
        rowsPerPage: 10,
        sortBy: 'totalTrophies',
        descending: true,
      },
      columns: [
        { name: 'team', required: true, label: 'Team', align: 'left', field: row => row },
        { name: 'totalTrophies', align: 'center', label: 'Major Trophies', field: 'totalTrophies', sortable: true },
        { name: 'popularity', align: 'center', label: 'Popularity', field: 'popularity', sortable: true },
        { name: 'european', align: 'center', label: 'European Success', field: 'european', sortable: true },
        { name: 'elimination', align: 'center', label: 'Elimination Tournaments', field: 'elimination', sortable: true },
        { name: 'league', align: 'center', label: 'League Success', field: 'league', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'fanLevel', label: 'Fan Level', field: 'fanLevel', sortable: true },
        { name: 'squadScore', label: 'Squad Score', field: 'squadScore', sortable: true },
        { name: 'squadValue', label: 'Squad Value (£m)', field: 'squadValue', sortable: true },
      ],
      teams: [],
      managerColumns: [
        { name: 'rank', required: true, label: 'Rank', align: 'left', field: row => row.__index + 1, sortable: true },
        { name: 'manager', required: true, label: 'Manager', align: 'left', field: row => row },
        { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.firstName + ' ' + row.lastName },
        { name: 'age', align: 'left', label: 'Age', field: row => date.getDateDiff(date.formatDate(new Date(), 'YYYY-MM-DD'), row.birthday, 'years'), sortable: true },
        { name: 'nationality', align: 'left', label: 'Nationality', field: row => row.nationality, sortable: true },
        { name: 'team', align: 'left', label: 'Team', field: row => row.team, sortable: true },
        { name: 'score', align: 'center', label: 'Score', field: 'rating', sortable: true },
      ],
      managersPagination: {
        rowsPerPage: 10,
        sortBy: 'rank',
        descending: false,
      },
      managers: [],
      players: Object,
      fansColumns: [
        { name: 'fan', required: true, label: 'Fan', align: 'left', field: row => row },
        { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.name.replace(/\b\w/g, l => l.toUpperCase()) },
        { name: 'nationality', align: 'left', label: 'Nationality', field: row => row.nationality, sortable: true },
        { name: 'team', align: 'left', label: 'Team', field: row => row.team, sortable: true },
        { name: 'level', align: 'left', label: 'Level', field: 'level', format: val => `${val.toFixed(2)}`, sortable: true },
      ],
      fansPagination: {
        rowsPerPage: 10,
        sortBy: 'level',
        descending: true,
      },
      fans: [],
      medalStyle: {},
      mobilePanelClass: {}
    }
  },

  meta () {
    return {
      title: 'Rankings | Innouts',

      meta: {
        description: { name: 'description', content: 'Check the latest rankings of best teams, players and managers from the European football world.' },
        keywords: { name: 'keywords', content: ['football players rankings', 'best football players', 'best football managers', 'best football teams', 'latest football rankings', 'football\'s best'] },
      },
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('api/rankings/teams')
      .then(response => {
        next(vm => {
          vm.teams = response.data.teams
        })
      })
      .catch(error => {
        from.error = error
        next(false)
      })
  },

  beforeCreate: function () {
    this.$q.loading.show({
      delay: 400 // ms
    })
  },

  created: function () {
    this.$store.commit('setView', {
      view: 'hhh lpR fff'
    })
    this.$store.commit('setRightDrawer', false)
    if (this.$q.platform.is.desktop) {
      this.medalStyle = {
        fontSize: '17px'
      }
    } else {
      this.mobilePanelClass = {
        'q-pa-xs': true
      }
    }
    this.$q.loading.hide()
  },

  methods: {
    panelChange: function (newVal, oldVal) {
      if (newVal === 'managers' && this.managers.length === 0) {
        this.$q.loading.show()
        axios.get('api/managers')
          .then(response => {
            this.managers = response.data
            this.$q.loading.hide()
          })
          .catch(error => {
            this.error = error
          })
      } else if (newVal === 'players' && !this.players.topOverall) {
        this.$q.loading.show()
        axios.get('api/rankings/players')
          .then(response => {
            this.players = response.data
            this.$q.loading.hide()
          })
          .catch(error => {
            this.error = error
          })
      } else if (newVal === 'fans' && this.fans.length === 0) {
        this.$q.loading.show()
        axios.get('api/rankings/fans')
          .then(response => {
            this.fans = response.data
            this.$q.loading.hide()
          })
          .catch(error => {
            this.error = error
          })
      }
    },

  }

}
</script>

<style>
</style>
