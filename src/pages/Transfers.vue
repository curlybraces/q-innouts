<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col col-md-8">
        <div class="row justify-center q-pa-md">
          <div class="col-sm-3">
            <q-select dense rounded standout v-model="window" :options="windows"
                  option-value="id" option-label="name" :display-value="`Window: ${window ? window.name : '*none*'}`"
                  dark bg-color="primary"
             />
          </div>
        </div>
        <div class="q-pa-md">
          <q-table
            class="my-sticky-header-table bg-secondary"
            title="Transfers"
            :dense="$q.screen.lt.md"
            :grid="$q.screen.xs"
            :data="filteredTransfers"
            :columns="columns"
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
            <!-- customization for small devices -->
            <template v-slot:item="props">
              <div
                class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                :style="props.selected ? 'transform: scale(0.95);' : ''"
              >
                <q-card class="bg-secondary">
                  <q-list dense>
                    <q-item v-for="(col, idx) in props.cols" :key="col.id">
                      <q-item-section>
                        <q-item-label>{{ col.label }}</q-item-label>
                      </q-item-section>
                      <q-item-section v-if="idx === 0" side>
                        <router-link :to="'/players/' + col.value.id + '/' + col.value.slug" class="no-decor">
                          <q-item-label caption>{{ col.value.nickname }}</q-item-label>
                        </router-link>
                      </q-item-section>
                      <q-item-section v-else-if="[3,4].includes(idx)" side>
                        <q-item-label caption>{{ col.value }}</q-item-label>
                      </q-item-section>
                      <q-item-section v-else-if="[1,2].includes(idx)" side>
                        <router-link :to="'/teams/' + col.value.slug" class="no-decor">
                          <q-item-label caption>{{ col.value.name }}</q-item-label>
                        </router-link>
                      </q-item-section>
                      <q-item-section v-else side>
                        <q-rating
                          class=""
                          color="primary"
                          size="1.5rem"
                          icon="thumb_up"
                          :id="col.value.id"
                          :value="col.value.rating"
                          :max="5"
                          @input="submitRating($event, col.value.id, col.value.__index)"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
              </div>
            </template>

            <q-td slot="body-cell-name" slot-scope="value" :props="value">
              <router-link :to="'/players/' + value.value.id + '/' + value.value.slug" class="no-decor" >
                {{value.value.nickname}}
              </router-link>
            </q-td>

            <q-td slot="body-cell-from" slot-scope="value" :props="value">
              <router-link v-if="value.value.slug" :to="'/teams/' + value.value.slug" >
                <q-img :src="value.value.logo" :alt="value.value.name" class="team-thumbnail" />
                  <q-tooltip :delay="300" transition-show="scale" transition-hide="scale" >
                    {{value.value.name}}
                  </q-tooltip>
              </router-link>
              <q-img v-else :title="value.value.name"  :src="value.value.logo" :alt="value.value.name" class="team-thumbnail" />
            </q-td>

            <q-td slot="body-cell-to" slot-scope="value" :props="value">
              <router-link v-if="value.value.slug" :to="'/teams/' + value.value.slug" >
                <q-img :src="value.value.logo" :alt="value.value.name" class="team-thumbnail" />
                  <q-tooltip :delay="300" transition-show="scale" transition-hide="scale" >
                    {{value.value.name}}
                  </q-tooltip>
              </router-link>
              <q-img v-else :title="value.value.name"  :src="value.value.logo" :alt="value.value.name" class="team-thumbnail" />
            </q-td>

            <q-td slot="body-cell-rating" slot-scope="value" :props="value">
              <div class="row">
                <div class="col-10 col-sm-grow">
                  <q-rating
                    class=""
                    :style="{color: value.value.color}"
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
// import { date } from 'quasar'

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
        { name: 'fee', align: 'center', label: 'Fee (£m)', field: row => row.loan ? 'Loan' : row.fee ? row.fee : 'Free', sortable: true },
        { name: 'rating', align: 'center', label: 'Rating', field: row => row, sortable: true },
      ],
      transfers: [],
      filteredTransfers: [],
      myPagination: {
        rowsPerPage: 10
      },
      loading: false,
      window: null,
      windows: [],
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
  },

  watch: {
    window () {
      this.loading = true
      this.transfers = this.window.transfers
      this.filteredTransfers = this.transfers
      this.loading = false
    },

    'filter' () {
      this.loading = true
      if (this.filter.length) {
        this.filteredTransfers = []
        this.transfers.forEach(element => {
          // console.log(element.player.nickname.toLowerCase().includes(this.filter))
          if (element.player.firstName.toLowerCase().includes(this.filter) || element.player.lastName.toLowerCase().includes(this.filter)) {
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
        // alert(index)
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
