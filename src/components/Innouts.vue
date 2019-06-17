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
        <h6 class="text-center q-my-md">Official Transfers</h6>
        <div class="row">
          <div class="col">
            <div class="q-pa-md">
              <q-table
                class="my-sticky-header-table"
                title="Ins"
                :data="inTransfers"
                :columns="transferInColumns"
                row-key="id"
                rows-per-page-label="Transfers per page"
                :rows-per-page-options="[5,10,15]"
                :loading="loading"
                color="primary"
                table-header-class="bg-primary text-white"
              >
                <q-td slot="body-cell-from" slot-scope="value" :props="value">
                  <div id="team-thumbnail" class="q-mx-auto">
                    <img :src="'statics/' + value.value.logo" :alt="value.value.name" class="full-height">
                      <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                        {{value.value.name}}
                    </q-tooltip>
                  </div>
                </q-td>
                <q-td slot="body-cell-rating" slot-scope="value" :props="value">
                  <q-rating
                    color="primary"
                    class="q-mx-auto q-mt-sm"
                    size="1.5rem"
                    icon="thumb_up"
                    :value="3"
                    :max="5"
                  />
                </q-td>
              </q-table>
            </div>
          </div>
          <div class="col">
            <div class="q-pa-md">
              <q-table
                class="my-sticky-header-table"
                title="Outs"
                :data="outTransfers"
                :columns="transferOutColumns"
                row-key="id"
                rows-per-page-label="Transfers per page"
                :rows-per-page-options="[5,10,15]"
                :loading="loading"
                color="primary"
                table-header-class="bg-primary text-white"
              >
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
                    color="primary"
                    class="q-mx-auto q-mt-sm"
                    size="1.5rem"
                    icon="thumb_up"
                    :value="3"
                    :max="5"
                  />
                </q-td>
              </q-table>
            </div>
          </div>
        </div>
        <q-separator spaced />
        <h6 class="text-center q-my-md">Fans' Transfers!</h6>
        <div class="row">
          <div class="col">
            <div class="q-pa-md">
              <q-table
                class="my-sticky-header-table"
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
                <q-td slot="body-cell-team" slot-scope="value" :props="value">
                  <div id="team-thumbnail" class="q-mx-auto">
                    <img :src="'statics/' + value.value.logo" :alt="value.value.name" class="full-height">
                      <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                        {{value.value.name}}
                    </q-tooltip>
                  </div>
                </q-td>
              </q-table>
            </div>
          </div>
          <div class="col">
            <div class="q-pa-md">
              <q-table
                class="my-sticky-header-table"
                title="Outs"
                :data="unwanteds"
                :columns="unwantedColumns"
                row-key="id"
                rows-per-page-label="Transfers per page"
                :rows-per-page-options="[5,10,15]"
                :loading="loading"
                color="primary"
                table-header-class="bg-primary text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

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
          field: row => row.player.nickname,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'from', align: 'center', label: 'From', field: row => row.from },
        { name: 'date', align: 'center', label: 'Date', field: row => row.date, sortable: true },
        { name: 'fee', align: 'center', label: 'Fee (m£)', field: row => row.fee, sortable: true },
        { name: 'rating', align: 'center', label: 'Rating', field: row => row.rating, sortable: true },
      ],
      transferOutColumns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player.nickname,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'to', align: 'center', label: 'To', field: row => row.to },
        { name: 'date', align: 'center', label: 'Date', field: row => row.date, sortable: true },
        { name: 'fee', align: 'center', label: 'Fee (m£)', field: row => row.fee, sortable: true },
        { name: 'rating', align: 'center', label: 'Rating', field: row => row.rating, sortable: true },
      ],
      wantedColumns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player.nickname,
          format: val => `${val}`,
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
          field: row => row.player.nickname,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'position', align: 'center', label: 'Position', field: row => row.broadPosition },
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

  created: function () {
    this.$q.loading.show()
    this.$axios.get('http://innouts.test/api/windows')
      .then(response => {
        this.windows = response.data.data
        this.window = this.windows[0]
        this.transfers = this.window.transfers
        this.windowChange()
        this.loading = false
        this.$q.loading.hide()
      })
      .catch(error => {
        this.error = error
      })
  },

  methods: {
    windowChange: function () {
      this.inTransfers = []
      this.outTransfers = []
      this.wanteds = []
      this.unwanteds = []

      this.transfers.forEach(elem => {
        if (elem.from.id === this.team.id) {
          this.outTransfers.push(elem)
        } else if (elem.to.id === this.team.id) {
          this.inTransfers.push(elem)
        }
      })

      this.window.wanteds.forEach(elem => {
        if (elem.suitor.id === this.team.id) {
          this.wanteds.push(elem)
        }
      })

      this.window.unwanteds.forEach(elem => {
        if (elem.player.team_id === this.team.id) {
          this.unwanteds.push(elem)
        }
      })
    }
  },

  watch: {
    window () {
      this.loading = true
      this.transfers = this.window.transfers
      this.windowChange()
      this.loading = false
    }
  }
}
</script>

<style>
</style>
