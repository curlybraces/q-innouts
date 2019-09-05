<template>
  <q-page padding class="bg-secondary">
    <div class="q-pa-sm q-gutter-y-lg">
      <q-carousel
        arrows
        animated
        v-model="slide"
        :height="carouselHeight"
      >
        <q-carousel-slide v-for="bulletin in bulletins" :key="bulletin.id" :name="bulletin.id" :img-src="bulletin.picture">
          <div class="absolute-bottom custom-caption">
            <div class="text-h4" >{{bulletin.title}}</div>
            <div class="text-subtitle1" v-text="bulletin.body"></div>
          </div>
        </q-carousel-slide>
      </q-carousel>

      <q-list v-if="$q.platform.is.mobile" padding link bordered dense class="col bg-secondary" >
        <q-item-label header>Latest Editorials</q-item-label>
        <div v-for="(article) in articles" :key="article.id">
          <q-item :to="'/articles/'+article.id"  clickable v-ripple>
            <q-item-section class="text-subtitle1 ellipsis d-block" no-wrap>
              {{article.title}}
              <q-tooltip :delay="550" :offset="[0,20]" anchor="top middle"   transition-show="scale" transition-hide="scale" >
                {{article.title}}
              </q-tooltip>
            </q-item-section>
            <q-item-section side >
              <q-item-label caption>Today</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
        </div>
      </q-list>

      <q-table
        class="my-sticky-header-table bg-secondary"
        title="Biggest Transfers Summer 2019"
        :dense="$q.screen.lt.md"
        :data="transfers"
        :columns="columns"
        :visible-columns="visibleColumns"
        row-key="id"
        hide-bottom
        rows-per-page-label="Transfers per page"
        :pagination.sync="myPagination"
        :rows-per-page-options="[10,15,20,0]"
        color="primary"
        table-header-class="bg-primary text-white"
      >
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
                    <router-link :to="'/players/' + col.value.id" class="no-decor">
                      <q-item-label caption>{{ col.value.nickname }}</q-item-label>
                    </router-link>
                  </q-item-section>
                  <q-item-section v-else-if="[3,4].includes(idx)" side>
                    <q-item-label caption>{{ col.value }}</q-item-label>
                  </q-item-section>
                  <q-item-section v-else-if="[1,2].includes(idx)" side>
                    <router-link :to="'/teams/' + col.value.id" class="no-decor">
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
              class=""
              :style="{color: value.value.color}"
              size="1.5rem"
              icon="thumb_up"
              :id="value.value.id"
              :value="value.value.rating"
              :max="5"
              @input="submitRating($event, value.value.id, value.value.__index)"
            />
        </q-td>

      </q-table>
      <div class="row q-gutter-md">
        <div class="col-grow col-md">
          <div>
            <q-table
              class="my-sticky-header-table bg-green-2"
              title="Players in Demand"
              :data="wanteds"
              :columns="wantedColumns"
              row-key="id"
              hide-bottom
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
              title="Players for Sale"
              :data="unwanteds"
              :columns="unwantedColumns"
              row-key="id"
              hide-bottom
              rows-per-page-label="Transfers per page"
              :rows-per-page-options="[5,10,15]"
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
    <q-drawer
      :value="rightDrawerOpen"
      :mini="$q.screen.lt.md"
      content-class="bg-secondary"
      :breakpoint="600"
      :width="380"
      side="right"
      elevated
    >
      <q-list padding link dense class="col bg-secondary" >
        <q-item-label header>Latest Editorials</q-item-label>
        <div v-for="(article) in articles" :key="article.id">
          <q-item :to="'/articles/'+article.id"  clickable v-ripple>
            <q-item-section class="text-subtitle1 ellipsis d-block" no-wrap>
              {{article.title}}
              <q-tooltip :delay="550" :offset="[0,20]" anchor="top middle"   transition-show="scale" transition-hide="scale" >
                {{article.title}}
              </q-tooltip>
            </q-item-section>
            <q-item-section side >
              <q-item-label caption>Today</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
        </div>
      </q-list>
    </q-drawer>
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->
  </q-page>
</template>

<style lang="stylus">

.custom-caption
  text-align center
  padding 12px
  color white
  background-color rgba(0, 0, 0, .3)

</style>

<script>
import axios from 'axios'

export default {
  name: 'HomePage',

  data: () => {
    return {
      slide: 1,
      carouselHeight: '',
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player,
          sortable: true
        },
        { name: 'from', align: 'center', label: 'From', field: row => row.from },
        { name: 'to', align: 'center', label: 'To', field: row => row.to },
        { name: 'date', align: 'center', label: 'Date', field: row => row.date, sortable: true },
        { name: 'fee', align: 'center', label: 'Fee (m£)', field: row => row.fee, sortable: true },
        { name: 'rating', align: 'center', label: 'Rating', field: row => row },
      ],
      visibleColumns: ['name', 'from', 'to', 'date', 'fee', 'rating'],
      transfers: [],
      myPagination: {
        rowsPerPage: 10
      },
      wantedColumns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player,
          sortable: true
        },
        { name: 'team', align: 'center', label: 'Team', field: row => row.suitor },
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
      wanteds: [],
      unwanteds: [],
      bulletins: [],
      articles: [],
    }
  },

  computed: {
    loggedIn: function () {
      return this.$store.getters.loggedIn
    },

    user: function () {
      return this.$store.state.user
    },

    rightDrawerOpen: function () {
      return this.$store.getters.rightDrawer
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('http://innouts.test/api/')
      .then(response => {
        next(vm => {
          vm.setData(response)
          next()
        })
      })
      .catch(error => {
        console.log(error)
        next(false)
      })
  },

  beforeCreate: function () {
    this.$store.commit('setView', {
      view: 'hhh lpR fff'
    })
    if (this.$q.screen.gt.sm) {
      this.$store.commit('setRightDrawer', true)
    } else {
      this.$store.commit('setRightDrawer', false)
    }
  },

  created: function () {
    this.$store.commit('setLeftDrawer', false)
    if (this.$q.platform.is.mobile) {
      this.visibleColumns = ['name', 'from', 'to', 'date', 'fee']
      this.carouselHeigth = '200px'
    } else {
      this.$store.commit('setRightDrawer', true)
      this.carouselHeigth = '600px'
    }
  },

  methods: {
    setData: function (response) {
      this.transfers = response.data.transfers
      this.bulletins = response.data.bulletins
      this.articles = response.data.articles
      this.wanteds = response.data.wanteds
      this.unwanteds = response.data.unwanteds
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
  }
}
</script>
