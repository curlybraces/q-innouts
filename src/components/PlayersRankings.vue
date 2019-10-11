<template>
  <div>
    <div class="row justify-center q-gutter-sm">
      <div class="col-12 col-sm-grow">
        <q-table
          title="World Best"
          :data="players.topOverall"
          :columns="overallColumns"
          :dense="$q.screen.lt.md"
          :pagination.sync="pagination"
          :rows-per-page-options="[5,10,0]"
          row-key="name"
          class="bg-secondary"
        >
          <q-td slot="body-cell-rank" slot-scope="value" :props="value">
            <div :style="medalStyle" v-if="value.value===1">&#129351;</div>
            <div :style="medalStyle" v-else-if="value.value===2">&#129352;</div>
            <div :style="medalStyle" v-else-if="value.value===3">&#129353;</div>
            <div v-else>{{value.value}}</div>
          </q-td>
          <q-td slot="body-cell-player" slot-scope="value" :props="value">
            <router-link :to="'/players/' + value.value.id" class="no-decor" >
              <div v-if="$q.platform.is.desktop" class="q-mx-aut person-thumbnail no-decor ellipsis">
                <q-img :src="value.value.picture" :alt="value.value.nickname" class="full-height self-cente" />
                  <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                    {{value.value.firstName}} {{value.value.lastName}}
                  </q-tooltip>
              </div>
              <div v-else >
                {{value.value.nickname}}
              </div>
            </router-link>
          </q-td>
        </q-table>
      </div>
      <div class="col-12 col-sm-auto">
        <q-table
          title="U-23 Top 20"
          :data="players.topU23"
          :columns="U23Columns"
          :dense="$q.screen.lt.md"
          :pagination.sync="u23Pagination"
          :rows-per-page-options="[5,10,0]"
          row-key="name"
          class="bg-secondary"
        >
          <q-td slot="body-cell-player" slot-scope="value" :props="value">
            <router-link :to="'/players/' + value.value.id" class="no-decor" >
              <div v-if="$q.platform.is.desktop" class="q-mx-aut person-thumbnail no-decor ellipsis">
                <q-img :src="value.value.picture" :alt="value.value.nickname" class="full-height self-cente" />
                  <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                    {{value.value.firstName}} {{value.value.lastName}}
                  </q-tooltip>
              </div>
              <div v-else >
                {{value.value.nickname}}
              </div>
            </router-link>
          </q-td>
        </q-table>
      </div>
    </div>
    <div class="row justify-cente q-gutter-y-sm q-pt-md">
      <div class="col-grow col-md-3 ">
        <q-table
          title="Top 20 GKs"
          :data="players.topGKs"
          :columns="GKColumns"
          :dense="$q.screen.lt.md"
          :pagination.sync="GKPagination"
          :rows-per-page-options="[5,10,0]"
          row-key="name"
          class="bg-secondary q-mr-xs"
        >
          <q-td slot="body-cell-player" slot-scope="value" :props="value">
            <router-link :to="'/players/' + value.value.id" class="no-decor" >
              <div v-if="$q.platform.is.desktop" class="q-mx-aut person-thumbnail no-decor ellipsis">
                <q-img :src="value.value.picture" :alt="value.value.nickname" class="full-height self-cente" />
                  <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                    {{value.value.firstName}} {{value.value.lastName}}
                  </q-tooltip>
              </div>
              <div v-else >
                {{value.value.nickname}}
              </div>
            </router-link>
          </q-td>
        </q-table>
      </div>
      <div class="col-grow col-md-3 ">
        <q-table
          title="Top 20 Defenders"
          :data="players.topDFs"
          :columns="DFColumns"
          :dense="$q.screen.lt.md"
          :pagination.sync="DFPagination"
          :rows-per-page-options="[5,10,0]"
          row-key="name"
          class="bg-secondary q-mx-xs"
        >
          <q-td slot="body-cell-player" slot-scope="value" :props="value">
            <router-link :to="'/players/' + value.value.id" class="no-decor" >
              <div v-if="$q.platform.is.desktop" class="q-mx-aut person-thumbnail no-decor ellipsis">
                <q-img :src="value.value.picture" :alt="value.value.nickname" class="full-height self-cente" />
                  <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                    {{value.value.firstName}} {{value.value.lastName}}
                  </q-tooltip>
              </div>
              <div v-else >
                {{value.value.nickname}}
              </div>
            </router-link>
          </q-td>
        </q-table>
      </div>
      <div class="col-grow col-md-3 ">
        <q-table
          title="Top 20 Midfielders"
          :data="players.topMDs"
          :columns="MFColumns"
          :dense="$q.screen.lt.md"
          :pagination.sync="MDPagination"
          :rows-per-page-options="[5,10,0]"
          row-key="name"
          class="bg-secondary q-mx-xs"
        >
          <q-td slot="body-cell-player" slot-scope="value" :props="value">
            <router-link :to="'/players/' + value.value.id" class="no-decor" >
              <div v-if="$q.platform.is.desktop" class="q-mx-aut person-thumbnail no-decor ellipsis">
                <q-img :src="value.value.picture" :alt="value.value.nickname" class="full-height self-cente" />
                  <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                    {{value.value.firstName}} {{value.value.lastName}}
                  </q-tooltip>
              </div>
              <div v-else >
                {{value.value.nickname}}
              </div>
            </router-link>
          </q-td>
        </q-table>
      </div>
      <div class="col-grow col-md-3">
        <q-table
          title="Top 20 Attackers"
          :data="players.topATs"
          :columns="ATColumns"
          :dense="$q.screen.lt.md"
          :pagination.sync="ATPagination"
          :rows-per-page-options="[5,10,0]"
          row-key="name"
          class="bg-secondary q-ml-xs"
        >
          <q-td slot="body-cell-player" slot-scope="value" :props="value">
            <router-link :to="'/players/' + value.value.id" class="no-decor" >
              <div v-if="$q.platform.is.desktop" class="q-mx-aut person-thumbnail no-decor ellipsis">
                <q-img :src="value.value.picture" :alt="value.value.nickname" class="full-height self-cente" />
                  <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                    {{value.value.firstName}} {{value.value.lastName}}
                  </q-tooltip>
              </div>
              <div v-else >
                {{value.value.nickname}}
              </div>
            </router-link>
          </q-td>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'

export default {
  // name: 'PlayersRankings',
  data () {
    return {
      GKColumns: [
        { name: 'player', required: true, label: 'Player', align: 'left', field: row => row },
        { name: 'height', align: 'left', label: 'Height', field: row => row.height, sortable: true },
        { name: 'score', align: 'left', label: 'Score', field: 'rating', sortable: true },
      ],
      DFColumns: [
        { name: 'player', required: true, label: 'Player', align: 'left', field: row => row },
        { name: 'Pos', align: 'left', label: 'Pos', field: row => row.specificPosition, sortable: true },
        { name: 'score', align: 'left', label: 'Score', field: 'rating', sortable: true },
      ],
      MFColumns: [
        { name: 'player', required: true, label: 'Player', align: 'left', field: row => row },
        { name: 'Pos', align: 'left', label: 'Pos', field: row => row.specificPosition, sortable: true },
        { name: 'score', align: 'left', label: 'Score', field: 'rating', sortable: true },
      ],
      ATColumns: [
        { name: 'player', required: true, label: 'Player', align: 'left', field: row => row },
        { name: 'Pos', align: 'left', label: 'Pos', field: row => row.specificPosition, sortable: true },
        { name: 'score', align: 'left', label: 'Score', field: 'rating', sortable: true },
      ],
      U23Columns: [
        { name: 'player', required: true, label: 'Player', align: 'left', field: row => row },
        { name: 'Pos', align: 'left', label: 'Pos', field: row => row.specificPosition, sortable: true },
        { name: 'age', align: 'left', label: 'Age', field: row => date.getDateDiff(date.formatDate(new Date(), 'YYYY-MM-DD'), row.birthday.date, 'years'), sortable: true },
        { name: 'score', align: 'left', label: 'Score', field: 'rating', sortable: true },
      ],
      overallColumns: [
        { name: 'rank', required: true, label: 'Rank', align: 'left', field: row => row.__index + 1, sortable: true },
        { name: 'player', required: true, label: 'Player', align: 'left', field: row => row },
        { name: 'nationality', align: 'left', label: 'Nationality', field: 'nationality', sortable: true },
        { name: 'age', align: 'left', label: 'Age', field: row => date.getDateDiff(date.formatDate(new Date(), 'YYYY-MM-DD'), row.birthday.date, 'years'), sortable: true },
        { name: 'pos', align: 'left', label: 'Pos', field: row => row.specificPosition, sortable: true },
        { name: 'score', align: 'left', label: 'Score', field: 'rating', sortable: true },
        { name: 'value', align: 'left', label: 'value', field: 'value', sortable: true },
      ],
      pagination: {
        rowsPerPage: 10,
        sortBy: 'rank',
        descending: false,
      },
      u23Pagination: {
        rowsPerPage: 10,
        sortBy: 'score',
        descending: true,
      },
      GKPagination: {
        rowsPerPage: 10,
        sortBy: 'score',
        descending: true,
      },
      DFPagination: {
        rowsPerPage: 10,
        sortBy: 'score',
        descending: true,
      },
      MDPagination: {
        rowsPerPage: 10,
        sortBy: 'score',
        descending: true,
      },
      ATPagination: {
        rowsPerPage: 10,
        sortBy: 'score',
        descending: true,
      },
      medalStyle: {}
    }
  },

  props: {
    players: {
      topOverall: null,
    },
  },

  created () {
    if (this.$q.platform.is.desktop) {
      this.medalStyle = {
        fontSize: '17px'
      }
    } else {
    }
  }
}
</script>

<style>
</style>
