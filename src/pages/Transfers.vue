<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col col-md-11 col-lg-9">
        <div class="row justify-center q-pa-md">
          <div class="col-sm-3">
            <q-select dense rounded standout v-model="window" :options="windows"
                  option-value="id" option-label="name" :display-value="`Window: ${window ? window.name : '*none*'}`"
                   bg-color="primar" options-dense options-cover options-selected-class="text-accent"
             />
          </div>
        </div>
        <div :class="tableWrapperClass">
          <q-table
            class="my-sticky-header-table bg-secondary"
            title="Transfers"
            :dense="$q.screen.lt.md"
            :data="filteredTransfers"
            :columns="columns"
            :visible-columns="visibleColumns"
            :filter="filter"
            :filter-method="filterMethod"
            row-key="id"
            rows-per-page-label="Transfers per page"
            :pagination.sync="myPagination"
            :rows-per-page-options="[10,15,20,0]"
            :loading="loading"
            color="primary"
            table-header-class="bg-primary text-white"
          >
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
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
              <div class="row">
                <div class="col-10 col-sm-grow">
                  <q-rating
                    class=""
                    color="primary"
                    size="1.5rem"
                    icon="thumb_up"
                    :id="value.value.id"
                    :value="value.value.rating"
                    :max="5"
                    @input="submitRating($event, value.value.id, value.value.__index)"
                    :readonly="window.rateArchived"
                  />
                </div>
                <div class="col-sm-2 col-grow text-overline">
                  {{value.value.votes}}
                </div>
              </div>
            </q-td>

          </q-table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Transfers',

  data () {
    return {
      filter: '',
      columns: [
        { name: 'name', required: true, label: 'Player', align: 'left', field: row => row.player, sortable: true },
        { name: 'from', align: 'center', label: 'From', field: row => row.from },
        { name: 'to', align: 'center', label: 'To', field: row => row.to },
        { name: 'date', align: 'center', label: 'Date', field: row => row.date, sortable: true },
        { name: 'fee', align: 'center', label: 'Fee (€m)', field: row => row.fee, sortable: true },
        { name: 'notes', align: 'center', label: 'Notes', field: row => row.notes, sortable: true },
        { name: 'rating', align: 'center', label: 'Rating', field: row => row, sortable: true },
      ],
      visibleColumns: [],
      transfers: [],
      filteredTransfers: [],
      myPagination: {
        rowsPerPage: 10
      },
      loading: false,
      window: null,
      windows: [],
      tableWrapperClass: {}
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

  meta () {
    return {
      title: 'Transfers - Innouts',

      meta: {
        description: { name: 'description', content: 'Latest bigger football transfers, covering the Premier League, La Liga, Serie A, Bundesliga and Ligue1' },
        keywords: { name: 'keywords', content: ['football transfers', 'latest transfers', 'football transfer window', 'transfer gossip'] },
      },
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('api/windows')
      .then(response => {
        next(vm => {
          vm.windows = response.data.visibleWindows
          vm.windows[0] = response.data.lastWindow
          vm.window = vm.windows[0]
          vm.transfers = vm.window.transfers
        })
      })
      .catch(error => {
        console.log(error)
        next(false)
      })
  },

  created: function () {
    this.$store.commit('setRightDrawer', false)

    if (this.$q.platform.is.mobile) {
      this.visibleColumns = ['name', 'from', 'to', 'date', 'fee', 'notes']
    } else {
      this.visibleColumns = ['name', 'from', 'to', 'date', 'fee', 'notes', 'rating']
      this.tableWrapperClass['q-pa-md'] = true
    }
  },

  watch: {
    window () {
      this.loading = true
      if ('transfers' in this.window) {
        this.transfers = this.window.transfers
        this.filteredTransfers = this.transfers
      } else {
        axios.get('api/windows/' + this.window.id)
          .then(response => {
            this.window.transfers = response.data.data.transfers
            this.transfers = this.window.transfers
            this.filteredTransfers = this.transfers
            this.loading = false
          })
          .catch(error => {
            console.log(error)
            this.loading = false
          })
      }
    },

    'filter' () {
      this.loading = true
      if (this.filter.length) {
        this.filteredTransfers = []
        this.transfers.forEach(element => {
          if (element.player.firstName.toLowerCase().includes(this.filter.toLowerCase()) || element.player.lastName.toLowerCase().includes(this.filter.toLowerCase())) {
            this.filteredTransfers.push(element)
          }
        })
      } else {
        this.filteredTransfers = this.transfers
      }
      this.loading = false
    }
  },

  methods: {
    submitRating: function (value, id, index) {
      if (this.loggedIn) {
        axios({ url: 'api/transfers/' + id, data: { userId: this.user.id, value: value }, method: 'PUT' })
          .then(response => {
            this.transfers[index].rating = value
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
          message: 'Please login or register to rate.'
        })
      }
    },

    filterMethod () {
      return this.filteredTransfers
    }
  },
}
</script>

<style lang="stylus">

.my-sticky-header-table
  /* max height is important */
  .q-table__middle
    max-height 800px

  thead tr:first-child th
    position sticky
    top 0
    opacity 1
    z-index 1

</style>
