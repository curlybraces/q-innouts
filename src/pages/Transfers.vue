<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-sm-8">
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
            title="Treats"
            :data="transfers"
            :columns="columns"
            row-key="id"
            rows-per-page-label="Transfers per page"
            :pagination.sync="myPagination"
            :rows-per-page-options="[10,15,20,0]"
            :loading="loading"
            color="primary"
            table-header-class="bg-primary text-white"
          >
            <!-- <q-td slot="body-cell-name" slot-scope="value" :props="value">
              <img :src="value.value" width="20" height="20" alt="hi">
            </q-td> -->

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
              <!-- <div class="q-mx-auto"> -->
                <q-rating
                  color="primary"
                  class="q-mx-auto q-mt-sm"
                  size="1.5rem"
                  icon="thumb_up"
                  :value="3"
                  :max="5"
                />
              <!-- </div> -->
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
        { name: 'rating', align: 'center', label: 'Rating', field: row => row.rating, sortable: true },
        // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
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
  }
}
</script>

<style lang="stylus">

#team-thumbnail
  width: 25px;
  height: 25px;

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
