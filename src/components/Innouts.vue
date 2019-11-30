<template>
  <div>
    <div class="row justify-center">
      <div class="col-sm-12">
        <div class="row justify-center q-pa-md">
          <div class="col-sm-2">
            <q-select dense rounded standout v-model="window" :options="windows"
                  option-value="id" option-label="name" :display-value="`Window: ${window ? window.name : '*none*'}`"
                  dark bg-color="primary" options-cover options-dense
            />
          </div>
        </div>
        <h6 class="text-center q-my-md bg-primary text-secondary">Official Transfers</h6>
        <div class="row q-gutter-md">
          <div class="col-grow col-md">
            <div>
              <q-table
                class="my-sticky-header-table"
                :title="'In ' + '(€' + inTotal +'m)'"
                :data="inTransfers"
                :columns="transferInColumns"
                :visible-columns="inVisibleColumns"
                :dense="$q.screen.lt.md"
                row-key="id"
                rows-per-page-label="Transfers per page"
                :rows-per-page-options="[5,10,15]"
                :loading="loading"
                color="primary"
                table-header-class="bg-primary text-white"
              >
                <q-td slot="body-cell-name" slot-scope="value" :props="value">
                  <router-link :to="'/players/' + value.value.id + '/' + value.value.slug" class="no-decor" >
                    {{value.value.nickname}}
                  </router-link>
                </q-td>
                <q-td slot="body-cell-from" slot-scope="value" :props="value">
                  <router-link v-if="value.value.league_id" :to="'/teams/' + value.value.slug" >
                    <div class="team-thumbnail q-mx-auto"> <q-img :src="value.value.logo" :alt="value.value.name" contain class="mh-100" /> </div>
                      <q-tooltip :delay="300" :offset="[0,3]"  transition-show="scale" transition-hide="scale" >
                        {{value.value.name}}
                      </q-tooltip>
                  </router-link>
                  <div v-else class="team-thumbnail q-mx-auto"><q-img :title="value.value.name" contain  :src="value.value.logo" :alt="value.value.name" class="team-thumbnail" /> </div>
                </q-td>
                <q-td slot="body-cell-rating" slot-scope="value" :props="value">
                  <q-rating
                    class="q-mx-auto q-mt-sm"
                    size="1.5rem"
                    icon="thumb_up"
                    :style="{color: value.value.color}"
                    :value="value.value.rating"
                    :max="5"
                    @input="submitRating($event, value.value.id, value.value.__index, 'ins')"
                    :readonly="window.rateArchived"
                  />
                </q-td>
              </q-table>
            </div>
          </div>
          <div class="col-grow col-md">
            <div>
              <q-table
                class="my-sticky-header-table "
                :title="'Out ' + '(€' + outTotal +'m)'"
                :data="outTransfers"
                :columns="transferOutColumns"
                :visible-columns="outVisibleColumns"
                :dense="$q.screen.lt.md"
                row-key="id"
                rows-per-page-label="Transfers per page"
                :rows-per-page-options="[5,10,15]"
                :loading="loading"
                color="primary"
                table-header-class="bg-primary text-white"
              >
                <q-td slot="body-cell-name" slot-scope="value" :props="value">
                  <router-link :to="'/players/' + value.value.id + '/' + value.value.slug" class="no-decor" >
                    {{value.value.nickname}}
                  </router-link>
                </q-td>
                <q-td slot="body-cell-to" slot-scope="value" :props="value">
                  <router-link v-if="value.value.league_id" :to="'/teams/' + value.value.slug" >
                    <div class="team-thumbnail q-mx-auto"> <q-img :src="value.value.logo" :alt="value.value.name" contain class="mh-100" /> </div>
                      <q-tooltip :delay="300" :offset="[0,3]"  transition-show="scale" transition-hide="scale" >
                        {{value.value.name}}
                      </q-tooltip>
                  </router-link>
                  <div v-else class="team-thumbnail q-mx-auto"><q-img :title="value.value.name" contain  :src="value.value.logo" :alt="value.value.name" class="team-thumbnail" /> </div>
                </q-td>
                <q-td slot="body-cell-rating" slot-scope="value" :props="value">
                  <q-rating
                    class="q-mx-auto q-mt-sm"
                    size="1.5rem"
                    icon="thumb_up"
                    :style="{color: value.value.color}"
                    :value="value.value.rating"
                    :max="5"
                    @input="submitRating($event, value.value.id, value.value.__index, 'outs')"
                    :readonly="window.rateArchived"
                  />
                </q-td>
              </q-table>
            </div>
          </div>
        </div>
        <q-separator spaced />
        <h6 class="text-center q-my-md bg-primary text-secondary">Fans' Transfers!</h6>
        <div class="row q-gutter-md">
          <div class="col-grow col-md">
            <div>
              <q-table
                class="my-sticky-header-table"
                title="Ins"
                :data="wanteds"
                :columns="wantedColumns"
                row-key="id"
                rows-per-page-label="Transfers per page"
                :rows-per-page-options="[5,10,15]"
                :loading="loading"
                :pagination.sync="wantedPagination"
                color="primary"
                table-header-class="bg-green-2"
              >
                <template v-slot:top>
                  <div class="q-table__control">
                    <div class="q-table__title"><span class="emoji">&#128525;</span> In</div>
                  </div>
                </template>
                <q-td slot="body-cell-name" slot-scope="value" :props="value">
                  <router-link :to="'/players/' + value.value.id + '/' + value.value.slug" class="no-decor" >
                    {{value.value.nickname}}
                  </router-link>
                </q-td>
                <q-td slot="body-cell-team" slot-scope="value" :props="value">
                <router-link v-if="value.value.league_id" :to="'/teams/' + value.value.slug" >
                  <div class="team-thumbnail q-mx-auto"> <q-img :src="value.value.logo" :alt="value.value.name" contain class="mh-100" /> </div>
                    <q-tooltip :delay="300" :offset="[0,3]"  transition-show="scale" transition-hide="scale" >
                      {{value.value.name}}
                    </q-tooltip>
                </router-link>
                <div v-else class="team-thumbnail q-mx-auto"><q-img :title="value.value.name" contain  :src="value.value.logo" :alt="value.value.name" class="team-thumbnail" /> </div>
                </q-td>
                <q-td slot="body-cell-cards" slot-scope="value" :props="value">
                  <q-linear-progress :value="value.value" class="q-mt-md"
                  color="positive" :title="value.value*100+'%'"
                  />
                </q-td>
              </q-table>
            </div>
          </div>
          <div class="col-grow col-md">
            <div>
              <q-table
                class="my-sticky-header-table"
                title="Outs"
                :data="unwanteds"
                :columns="unwantedColumns"
                row-key="id"
                rows-per-page-label="Transfers per page"
                :rows-per-page-options="[5,10,15]"
                :loading="loading"
                :pagination.sync="unwantedPagination"
                color="primary"
                table-header-class="bg-red-2"
              >
                <template v-slot:top>
                  <div class="q-table__control">
                    <div class="q-table__title"><span class="emoji">&#128548;</span> Out</div>
                  </div>
                </template>
                <q-td slot="body-cell-name" slot-scope="value" :props="value">
                  <router-link :to="'/players/' + value.value.id + '/' + value.value.slug" class="no-decor" >
                    {{value.value.nickname}}
                  </router-link>
                </q-td>
                <q-td slot="body-cell-cards" slot-scope="value" :props="value">
                  <q-linear-progress :value="value.value" class="q-mt-md"
                  color="negative" :title="value.value*100+'%'"
                  />
                </q-td>
              </q-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Innouts',

  props: {
    team: Object
  },

  data () {
    return {
      loading: true,
      transferInColumns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player,
          sortable: true,
          style: 'max-width: 100px',
          classes: 'bg-grey-2 ellipsis'
        },
        { name: 'from', align: 'center', label: 'From', field: row => row.from },
        { name: 'date', align: 'center', label: 'Date', field: row => row.date, sortable: true },
        { name: 'fee', align: 'center', label: 'Fee (€m)', field: row => row.fee, sortable: true },
        { name: 'notes', align: 'center', label: 'Notes', field: row => row.notes, style: 'max-width: 100px', classes: 'ellipsis' },
        { name: 'rating', align: 'center', label: 'Rating', field: row => row, sortable: true },
      ],
      transferOutColumns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player,
          sortable: true,
          style: 'max-width: 100px',
          classes: 'bg-grey-2 ellipsis'
        },
        { name: 'to', align: 'center', label: 'To', field: row => row.to },
        { name: 'date', align: 'center', label: 'Date', field: row => row.date, sortable: true },
        { name: 'fee', align: 'center', label: 'Fee (€m)', field: row => row.fee, sortable: true },
        { name: 'notes', align: 'center', label: 'Notes', field: row => row.notes, sortable: true, style: 'max-width: 100px', classes: 'ellipsis', title: 'lol' },
        { name: 'rating', align: 'center', label: 'Rating', field: row => row, sortable: true },
      ],
      inVisibleColumns: [],
      outVisibleColumns: [],
      wantedColumns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player,
        },
        { name: 'team', align: 'center', label: 'Team', field: row => row.team },
        { name: 'cards', align: 'center', label: 'Cards Assigned', field: row => row.cardRatio, sortable: true },
        { name: 'total', align: 'center', label: 'Total', field: row => row.cardTotal, sortable: true },
      ],
      wantedPagination: {
        sortBy: 'cards',
        descending: true,
      },
      unwantedColumns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player,
        },
        { name: 'position', align: 'center', label: 'Position', field: row => row.player.broadPosition },
        { name: 'cards', align: 'center', label: 'Cards Assigned', field: row => row.cardRatio, sortable: true },
        { name: 'total', align: 'center', label: 'Total', field: row => row.cardTotal, sortable: true },
      ],
      unwantedPagination: {
        sortBy: 'cards',
        descending: true,
      },
      windows: [],
      window: null,
      inTransfers: [],
      outTransfers: [],
      inTotal: 0,
      outTotal: 0,
      wanteds: [],
      unwanteds: []
    }
  },

  computed: {
    loggedIn: function () {
      return this.$store.getters.loggedIn
    },

    user: function () {
      return this.$store.state.user
    }
  },

  created: function () {
    this.$q.loading.show()
    if (this.$q.platform.is.mobile) {
      this.inVisibleColumns = ['name', 'from', 'date', 'fee', 'notes']
      this.outVisibleColumns = ['name', 'to', 'date', 'fee', 'notes']
    } else {
      this.inVisibleColumns = ['name', 'from', 'date', 'fee', 'notes', 'rating']
      this.outVisibleColumns = ['name', 'to', 'date', 'fee', 'notes', 'rating']
    }
    this.$axios.get('api/windows')
      .then(response => {
        this.windows = response.data.visibleWindows
        this.windows[0] = response.data.lastWindow
        this.windows.unshift(response.data.activeWindow)
        this.window = response.data.activeWindow
        this.transfers = this.window.transfers
        // this.windowChange()
        this.loading = false
        this.$q.loading.hide()
      })
      .catch(error => {
        this.$q.notify({ message: error.data.message })
      })
  },

  methods: {
    windowChange: function () {
      // alert('inside windowChange() ' + this.$route.params.team)
      // alert(typeof (this.transfers[0].from.id))
      // alert(typeof (this.$route.params.team))
      this.inTransfers = []
      this.outTransfers = []
      this.wanteds = []
      this.unwanteds = []

      this.transfers.forEach(elem => {
        if (elem.from.id === parseInt(this.team.id)) {
          this.outTransfers.push(elem)
        } else if (elem.to.id === parseInt(this.team.id)) {
          this.inTransfers.push(elem)
        }
      })

      this.window.wanteds.forEach(elem => {
        if (elem.suitor.id === parseInt(this.team.id)) {
          this.wanteds.push(elem)
        }
      })

      this.window.unwanteds.forEach(elem => {
        if (elem.player.team_id === parseInt(this.team.id)) {
          this.unwanteds.push(elem)
        }
      })

      this.inTotal = this.countMoney('ins')
      this.outTotal = this.countMoney('outs')
    },

    submitRating: function (value, id, index, inOut) {
      if (this.loggedIn) {
        this.$axios({ url: 'api/transfers/' + id, data: { userId: this.user.id, value: value }, method: 'PUT' })
          .then(response => {
            if (inOut === 'ins') {
              this.inTransfers[index].rating = value
            } else {
              this.outTransfers[index].rating = value
            }
          })
          .catch(error => {
            this.$q.notify({
              color: 'negative',
              textColor: 'white',
              icon: 'fas fa-exclamation-triangle',
              message: error.response.data.error
            })
          })
      } else {
        this.$q.notify({
          color: 'primary',
          textColor: 'secondary',
          icon: 'fas fa-exclamation-triangle',
          message: 'Please login or register to rate.'
        })
      }
    },

    countMoney (inOut) {
      let total = 0
      if (inOut === 'ins') {
        this.inTransfers.forEach(elem => {
          total += elem.fee
        })
      } else {
        this.outTransfers.forEach(elem => {
          total += elem.fee
        })
      }
      return total
    }
  },

  watch: {
    window () {
      this.loading = true
      if ('transfers' in this.window) {
        this.transfers = this.window.transfers
        this.windowChange()
        this.loading = false
      } else {
        this.$axios.get('api/windows/' + this.window.id)
          .then(response => {
            this.window.transfers = response.data.data.transfers
            this.transfers = this.window.transfers
            this.windowChange()
            this.loading = false
          })
          .catch(error => {
            this.$q.notify({ message: error.data.message })
            this.loading = false
          })
      }
      // this.loading = false
    },

    'team' () {
      this.windowChange()
    }

  }
}
</script>

<style>
</style>
