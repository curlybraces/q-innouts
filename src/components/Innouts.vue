<template>
  <div>
    <div class="row justify-center">
      <div class="col-sm-11">
        <div class="row justify-center q-pa-md">
          <div class="col-sm-2">
            <q-select dense rounded standout v-model="window" :options="windows"
                  option-value="id" option-label="name" :display-value="`Window: ${window ? window.name : '*none*'}`"
                  dark bg-color="primary"
            />
          </div>
        </div>
        <h6 class="text-center q-my-md bg-primary text-secondary">Official Transfers</h6>
        <div class="row q-gutter-md">
          <div class="col-grow col-md">
            <div>
              <q-table
                class="my-sticky-header-table"
                title="Ins"
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
                  <router-link :to="'/players/' + value.value.id" class="no-decor" >
                    {{value.value.nickname}}
                  </router-link>
                </q-td>
                <q-td slot="body-cell-from" slot-scope="value" :props="value">
                  <router-link :to="'/teams/' + value.value.id" >
                    <div id="" class="q-mx-auto team-thumbnail">
                      <q-img :src="'statics/' + value.value.logo" :alt="value.value.name" class="full-height self-cente" />
                        <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{value.value.name}}
                        </q-tooltip>
                    </div>
                  </router-link>
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
                  <router-link :to="'/players/' + value.value.id" class="no-decor" >
                    {{value.value.nickname}}
                  </router-link>
                </q-td>
                <q-td slot="body-cell-to" slot-scope="value" :props="value">
                  <router-link :to="'/teams/' + value.value.id" >
                    <div id="" class="q-mx-auto team-thumbnail">
                      <q-img :src="'statics/' + value.value.logo" :alt="value.value.name" class="full-height self-center" />
                        <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{value.value.name}}
                        </q-tooltip>
                    </div>
                  </router-link>
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
                  />
                </q-td>
              </q-table>
            </div>
          </div>
        </div>
        <q-separator spaced />
        <h6 class="text-center q-my-md bg-primary text-secondary">Fans' Wishlist!</h6>
        <div class="row q-gutter-md">
          <div class="col-grow col-md">
            <div>
              <q-table
                class="my-sticky-header-table bg-green-2"
                title="Ins"
                :data="wanteds"
                :columns="wantedColumns"
                row-key="id"
                rows-per-page-label="Transfers per page"
                :rows-per-page-options="[5,10,15]"
                :loading="loading"
                color="primary"
                table-header-class="bg-primary text-white"
              >
                <q-td slot="body-cell-name" slot-scope="value" :props="value">
                  <router-link :to="'/players/' + value.value.id" class="no-decor" >
                    {{value.value.nickname}}
                  </router-link>
                </q-td>
                <q-td slot="body-cell-team" slot-scope="value" :props="value">
                  <router-link :to="'/teams/' + value.value.id" >
                    <div id="" class="q-mx-auto team-thumbnail">
                      <q-img :src="'statics/' + value.value.logo" :alt="value.value.name" class="full-height self-center" />
                        <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{value.value.name}}
                        </q-tooltip>
                    </div>
                  </router-link>
                </q-td>
                <q-td slot="body-cell-cards" slot-scope="value" :props="value">
                  <q-linear-progress :value="6/10" class="q-mt-md"
                  color="positive" track-color=""
                  />
                </q-td>
              </q-table>
            </div>
          </div>
          <div class="col-grow col-md">
            <div>
              <q-table
                class="my-sticky-header-table bg-red-2"
                title="Outs"
                :data="unwanteds"
                :columns="unwantedColumns"
                row-key="id"
                rows-per-page-label="Transfers per page"
                :rows-per-page-options="[5,10,15]"
                :loading="loading"
                color="primary"
                table-header-class="bg-primary text-white"
              >
                <q-td slot="body-cell-name" slot-scope="value" :props="value">
                  <router-link :to="'/players/' + value.value.id" class="no-decor" >
                    {{value.value.nickname}}
                  </router-link>
                </q-td>
                <q-td slot="body-cell-cards" slot-scope="value" :props="value">
                  <q-linear-progress :value="4/10" class="q-mt-md"
                  color="negative" track-color=""
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
          sortable: true
        },
        { name: 'from', align: 'center', label: 'From', field: row => row.from },
        { name: 'date', align: 'center', label: 'Date', field: row => row.date, sortable: true },
        { name: 'fee', align: 'center', label: 'Fee (m£)', field: row => row.fee, sortable: true },
        { name: 'rating', align: 'center', label: 'Rating', field: row => row, sortable: true },
      ],
      transferOutColumns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player,
          sortable: true
        },
        { name: 'to', align: 'center', label: 'To', field: row => row.to },
        { name: 'date', align: 'center', label: 'Date', field: row => row.date, sortable: true },
        { name: 'fee', align: 'center', label: 'Fee (m£)', field: row => row.fee, sortable: true },
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
          sortable: true
        },
        { name: 'team', align: 'center', label: 'Team', field: row => row.targetTeam },
        { name: 'cards', align: 'center', label: 'Cards', field: row => row.date, sortable: true },
      ],
      unwantedColumns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player,
          sortable: true
        },
        { name: 'position', align: 'center', label: 'Position', field: row => row.player.broadPosition },
        { name: 'cards', align: 'center', label: 'Cards', field: row => row.date, sortable: true },
      ],
      windows: [],
      window: null,
      inTransfers: [],
      outTransfers: [],
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
      this.inVisibleColumns = ['name', 'from', 'date', 'fee']
      this.outVisibleColumns = ['name', 'to', 'date', 'fee']
    } else {
      this.inVisibleColumns = ['name', 'from', 'date', 'fee', 'rating']
      this.outVisibleColumns = ['name', 'to', 'date', 'fee', 'rating']
    }
    this.$axios.get('http://innouts.test/api/windows')
      .then(response => {
        this.windows = response.data.data
        this.window = this.windows[0]
        this.transfers = this.window.transfers
        // this.windowChange()
        this.loading = false
        this.$q.loading.hide()
      })
      .catch(error => {
        this.error = error
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
        if (elem.from.id === parseInt(this.$route.params.team)) {
          this.outTransfers.push(elem)
        } else if (elem.to.id === parseInt(this.$route.params.team)) {
          this.inTransfers.push(elem)
        }
      })

      this.window.wanteds.forEach(elem => {
        if (elem.suitor.id === parseInt(this.$route.params.team)) {
          this.wanteds.push(elem)
        }
      })

      this.window.unwanteds.forEach(elem => {
        if (elem.player.team_id === parseInt(this.$route.params.team)) {
          this.unwanteds.push(elem)
        }
      })
    },

    submitRating: function (value, id, index, inOut) {
      if (this.loggedIn) {
        this.$axios({ url: 'http://innouts.test/api/transfers/' + id, data: { userId: this.user.id, value: value }, method: 'PUT' })
          .then(response => {
            if (inOut === 'ins') {
              this.inTransfers[index].rating = value
            } else {
              this.outTransfers[index].rating = value
            }
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

  watch: {
    window () {
      this.loading = true
      this.transfers = this.window.transfers
      this.windowChange()
      this.loading = false
    },

    $route () {
      // alert('route change')
      this.windowChange()
    }
  }
}
</script>

<style>
</style>
