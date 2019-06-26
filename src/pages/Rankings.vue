<template>
  <q-page padding>
    <q-splitter
      v-model="splitterModel"
    >

      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          active-bg-color="secondary"
          class="bg-primary text-accent"

        >
          <q-tab name="teams" icon="mail" label="Teams" />
          <q-tab name="players" icon="alarm" label="Players" />
          <q-tab name="managers" icon="movie" label="Managers" />
          <q-tab name="fans" icon="movie" label="Fans" />
        </q-tabs>
      </template>

      <template v-slot:after>
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
                        <!-- {{value.value.name}} -->
                    </div>
                  </router-link>
                </q-td>
              </q-table>
            </div>
          </q-tab-panel>

          <q-tab-panel name="players">
            <div class="text-h4 q-mb-md">players</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
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
                  <router-link :to="'/teams/' + value.value.id" class="no-decor text-bod1 text-capitalize q-ml-sm" >
                    {{value.value.firstName}} {{value.value.lastName}}
                  </router-link>
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
            <div class="text-h4 q-mb-md">Fans</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Rankings',

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
          // format: val => `${val}`,
          // sortable: true
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
        {
          name: 'manager',
          required: true,
          label: 'Manager',
          align: 'left',
          field: row => row,
        },
        { name: 'team', align: 'left', label: 'Team', field: row => row.team, sortable: true },
        { name: 'score', align: 'left', label: 'Score', field: 'rating', sortable: true },
      ],
      managersPagination: {
        rowsPerPage: 10,
        sortBy: 'score',
        descending: true,
      },
      managers: [],
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

  created: function () {
    this.$emit('sendView', ['hhh lpR fff', false, false])
  },

  methods: {
    panelChange: function (newVal, oldVal) {
      if (newVal === 'managers' && this.managers.length === 0) {
        this.$q.loading.show()
        axios.get('http://innouts.test/api/managers')
          .then(response => {
            this.managers = response.data
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
