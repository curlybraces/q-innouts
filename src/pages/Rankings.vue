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
                  <router-link :to="'/teams/' + value.value.id" >
                    <div id="" class="q-mx-aut team-thumbnail no-decor ellipsis">
                      <q-img :src="'statics/' + value.value.logo" :alt="value.value.name" class="full-height self-cente" />
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
                <q-td slot="body-cell-manager" slot-scope="value" :props="value">
                  <div id="" class="row inline person-thumbnail no-decor ellipsis">
                    <q-img :src="'statics/' + value.value.picture" :alt="value.value.name" class="full-height self-cente" />
                  </div>
                  <!-- <router-link :to="'/teams/' + value.value.id" class="no-decor text-bod1 text-capitalize q-ml-sm" >
                    {{value.value.firstName}} {{value.value.lastName}}
                  </router-link> -->
                </q-td>

                <q-td slot="body-cell-team" slot-scope="value" :props="value">
                  <div id="" class="q-mx-aut  no-decor ellipsis">
                    <router-link :to="'/teams/' + value.value.id" >
                      <q-img :src="'statics/' + value.value.logo" :alt="value.value.name" class="full-height team-thumbnail self-cente" />
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
                row-key="name"
                class="bg-secondary"
              >
                <q-td slot="body-cell-fan" slot-scope="value" :props="value">
                  <router-link :to="'/' + value.value.id" class="no-decor" >
                    <div class="row inline person-thumbnail no-decor ellipsis">
                      <q-img :src="value.value.picture" :alt="value.value.name" class="full-height self-cente" />
                    </div>
                  </router-link>
                  <!-- <router-link :to="'/teams/' + value.value.id" class="no-decor text-bod1 text-capitalize q-ml-sm" >
                    {{value.value.name}}
                  </router-link> -->
                </q-td>

                <q-td slot="body-cell-team" slot-scope="value" :props="value">
                  <div class="q-mx-aut  no-decor ellipsis">
                    <router-link :to="'/teams/' + value.value.id" >
                      <q-img :src="'statics/' + value.value.logo" :alt="value.value.name" class="full-height team-thumbnail self-cente" />
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
        class="bg-accent text-white shadow-2"
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
                  <router-link :to="'/teams/' + value.value.id" >
                    <div id="" class="q-mx-aut team-thumbnail no-decor ellipsis">
                      <q-img :src="'statics/' + value.value.logo" :alt="value.value.name" class="full-height self-cente" />
                        <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{value.value.name}}
                        </q-tooltip>
                    </div>
                  </router-link>
                </q-td>
              </q-table>
            </div>
          </q-tab-panel>

          <q-tab-panel name="players">
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
                <q-td slot="body-cell-manager" slot-scope="value" :props="value">
                  <div id="" class="row inline person-thumbnail no-decor ellipsis">
                    <!-- henlo -->
                    <q-img :src="'statics/' + value.value.picture" :alt="value.value.name" class="full-height self-cente" />
                  </div>
                </q-td>

                <q-td slot="body-cell-team" slot-scope="value" :props="value">
                  <div id="" class="q-mx-aut  no-decor ellipsis">
                    <router-link :to="'/teams/' + value.value.id" >
                      <q-img :src="'statics/' + value.value.logo" :alt="value.value.name" class="full-height team-thumbnail self-cente" />
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
                row-key="name"
                class="bg-secondary"
              >
                <q-td slot="body-cell-fan" slot-scope="value" :props="value">
                  <router-link :to="'/' + value.value.id" class="no-decor" >
                    <div class="row inline person-thumbnail no-decor ellipsis">
                      <q-img :src=" value.value.picture" :alt="value.value.name" class="full-height self-cente" />
                    </div>
                  </router-link>
                  <!-- <router-link :to="'/teams/' + value.value.id" class="no-decor text-bod1 text-capitalize q-ml-sm" >
                    {{value.value.name}}
                  </router-link> -->
                </q-td>

                <q-td slot="body-cell-team" slot-scope="value" :props="value">
                  <div class="q-mx-aut  no-decor ellipsis">
                    <router-link :to="'/teams/' + value.value.id" >
                      <q-img :src="'statics/' + value.value.logo" :alt="value.value.name" class="full-height team-thumbnail self-cente" />
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
        {
          name: 'team',
          required: true,
          label: 'Team',
          align: 'left',
          field: row => row,
        },
        { name: 'totalTrophies', align: 'center', label: 'Major Trophies', field: 'totalTrophies', sortable: true },
        { name: 'popularity', align: 'center', label: 'Popularity', field: 'popularity', sortable: true },
        { name: 'european', align: 'center', label: 'European Success', field: 'european', sortable: true },
        { name: 'elimination', align: 'center', label: 'Elimination Tournaments', field: 'elimination', sortable: true },
        { name: 'league', align: 'center', label: 'League Success', field: 'league', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'fanLevel', label: 'Fan Level', field: 'fanLevel', sortable: true },
        { name: 'squadScore', label: 'Squad Score', field: 'squadScore', sortable: true },
      ],
      teams: [],
      managerColumns: [
        { name: 'manager', required: true, label: 'Manager', align: 'left', field: row => row },
        { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.firstName + ' ' + row.lastName },
        { name: 'age', align: 'left', label: 'Age', field: row => date.getDateDiff(date.formatDate(new Date(), 'YYYY-MM-DD'), row.birthday, 'years'), sortable: true },
        { name: 'nationality', align: 'left', label: 'Nationality', field: row => row.nationality, sortable: true },
        { name: 'team', align: 'left', label: 'Team', field: row => row.team, sortable: true },
        { name: 'score', align: 'left', label: 'Score', field: 'rating', sortable: true },
      ],
      managersPagination: {
        rowsPerPage: 10,
        sortBy: 'score',
        descending: true,
      },
      managers: [],
      players: null,
      fansColumns: [
        { name: 'fan', required: true, label: 'Fan', align: 'left', field: row => row },
        { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.name.replace(/\b\w/g, l => l.toUpperCase()) },
        { name: 'nationality', align: 'left', label: 'Nationality', field: row => row.nationality, sortable: true },
        { name: 'team', align: 'left', label: 'Team', field: row => row.team, sortable: true },
        { name: 'level', align: 'left', label: 'Level', field: 'fanLevel', format: val => `${val.toFixed(2)}`, sortable: true },
      ],
      fansPagination: {
        rowsPerPage: 10,
        sortBy: 'level',
        descending: true,
      },
      fans: [],
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('http://innouts.test/api/rankings/teams')
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
    this.$q.loading.hide()
  },

  methods: {
    panelChange: function (newVal, oldVal) {
      if (newVal === 'managers' && this.managers.length === 0) {
        this.$q.loading.show({
          delay: 200
        })
        axios.get('http://innouts.test/api/managers')
          .then(response => {
            this.managers = response.data
          })
          .catch(error => {
            this.error = error
          })
        this.$q.loading.hide()
      } else if (newVal === 'players' && !this.players) {
        this.$q.loading.show()
        axios.get('http://innouts.test/api/rankings/players')
          .then(response => {
            this.players = response.data
          })
          .catch(error => {
            this.error = error
          })
        this.$q.loading.hide()
      } else if (newVal === 'fans' && this.fans.length === 0) {
        this.$q.loading.show()
        axios.get('http://innouts.test/api/rankings/fans')
          .then(response => {
            this.fans = response.data
          })
          .catch(error => {
            this.error = error
          })
        this.$q.loading.hide()
      }
    },

  }

}
</script>

<style>
</style>
