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
            class="my-sticky-header-table"
            title="Transfers"
            :dense="$q.screen.lt.md"
            :grid="$q.screen.xs"
            :data="transfers"
            :columns="columns"
            :filter="filter"
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
                <q-card>
                  <!-- <q-card-section>
                    <q-checkbox dense v-model="props.selected" :label="props.row.name" />
                  </q-card-section> -->
                  <!-- <q-separator /> -->
                  <q-list dense>
                    <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.id">
                      <q-item-section>
                        <q-item-label>{{ col.label }} {{props.cols[0].label}}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label caption>{{ col.value }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card>
              </div>
            </template>

            <q-td slot="body-cell-from" slot-scope="value" :props="value">
              <div id="team-thumbnail" class="q-mx-auto">
                <img :src="'statics/' + value.value.logo" :alt="value.value.name" class="full-height">
                  <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                    {{value.value.name}}
                </q-tooltip>
              </div>
            </q-td>

            <q-td slot="body-cell-to" slot-scope="value" :props="value">
              <div id="team-thumbnail" class="q-mx-auto">
                <img :src="'statics/' + value.value.logo" :alt="value.value.name" class="full-height">
                  <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                    {{value.value.name}}
                </q-tooltip>
              </div>
            </q-td>

            <q-td slot="body-cell-rating" slot-scope="value" :props="value">
                <q-rating
                  class=""
                  color="primary"
                  size="1.5rem"
                  icon="thumb_up"
                  :id="value.value.id"
                  :value="value.value.rating"
                  :max="5"
                  @input="submitRating($event, value.value.id)"
                />
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
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player.nickname,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'from', align: 'center', label: 'From', field: row => row.from },
        { name: 'to', align: 'center', label: 'To', field: row => row.to },
        { name: 'date', align: 'center', label: 'Date', field: row => row.date, sortable: true },
        { name: 'fee', align: 'center', label: 'Fee (m£)', field: row => row.fee, sortable: true },
        { name: 'rating', align: 'center', label: 'Rating', field: row => row, sortable: true },
      ],

      transfers: [],
      myPagination: {
        rowsPerPage: 10
      },
      loading: true,
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

  beforeRouteEnter (to, from, next) {
    axios.get('http://innouts.test/api/windows')
      .then(response => {
        next(vm => {
          vm.windows = response.data.data
          vm.window = vm.windows[0]
          vm.transfers = vm.window.transfers
          vm.loading = false
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

  watch: {
    window () {
      this.loading = true
      this.transfers = this.window.transfers
      this.loading = false
    }
  },

  methods: {
    submitRating: function (value, id) {
      if (this.loggedIn) {
        axios({ url: 'http://innouts.test/api/transfers/' + id, data: { userId: this.user.id, value: value }, method: 'PUT' })
          .then(response => {
            // this.rumours[key - 1].upVotes = response.data.ups
            // this.rumours[key - 1].downVotes = response.data.downs
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
