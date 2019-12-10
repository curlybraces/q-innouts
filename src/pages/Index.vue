<template>
  <q-page padding class="bg-secondar">
    <div class="q-gutter-y-lg">
      <q-carousel
        arrows
        animated
        infinite
        :autoplay="10000"
        v-model="slide"
        :height="carouselHeight"
      >
        <q-carousel-slide v-for="(bulletin, idx) in bulletins" :key="bulletin.id" :name="idx" :img-src="bulletin.picture">
          <div class="absolute-bottom custom-caption">
            <div class="newsTitle text-capitalize q-mb-sm" :class="bulletTitleClass" >{{bulletin.title}}</div>
            <div class="newsBody" :class="bulletBodyClass" v-html="bulletin.body"></div>
          </div>
        </q-carousel-slide>
      </q-carousel>

      <div v-if="$q.screen.lt.md" class="row">
        <div class="col-grow">
          <q-list padding link bordere dense class="col bg-secondary" >
            <q-item-label header> <span class="q-icon on-left" style='font-size:20px;'>&#128240;</span> Latest Editorials</q-item-label>
            <div v-for="(article) in articles" :key="article.id">
              <q-item :to="'/articles/'+article.id+'/'+article.slug" class="newsTitle"  clickable v-ripple dense>
                <q-item-section class="text-subtitle1 ellipsis d-block" no-wrap>
                  {{article.title}}
                  <q-tooltip :delay="550" :offset="[0,20]" anchor="top middle"   transition-show="scale" transition-hide="scale" >
                    {{article.title}}
                  </q-tooltip>
                </q-item-section>
              </q-item>
              <q-separator />
            </div>
          </q-list>
        </div>
        <div class="col col-grow">
          <q-list padding link bordere dense class="col bg-secondary" >
            <q-item-label header> <span class="q-icon on-left" style='font-size:20px;'>&#128066;&#127996;</span> Latest Rumours</q-item-label>
            <div v-for="(rumour) in rumours" :key="rumour.id">
              <q-item to="/rumours" class="newsBody1"  clickable v-ripple dense>
                <q-item-section class="text-subtitle1 newsBody1 text-uppercase ellipsis d-block" no-wrap>
                  {{rumour.title}}
                  <q-tooltip :delay="550" :offset="[0,20]" anchor="top middle"   transition-show="scale" transition-hide="scale" >
                    {{rumour.title}}
                  </q-tooltip>
                </q-item-section>
              </q-item>
              <q-separator />
            </div>
          </q-list>
        </div>
      </div>

      <q-table
        class="my-sticky-header-table bg-secondary"
        title="Biggest Transfers of Last Window"
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
                    <router-link :to="'/players/' + col.value.id + '/' + col.value.slug " class="no-decor">
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
                color="primary"
                size="1.5rem"
                icon="thumb_up"
                :id="value.value.id"
                :value="value.value.rating"
                :max="5"
                @input="submitRating($event, value.value.id, value.value.__index)"
              />
            </div>
            <div class="col-sm-2 col-grow text-overline">
              {{value.value.votes}}
            </div>
          </div>
        </q-td>

      </q-table>
      <div class="text-h6 bg-primary q-pa-sm text-secondary rounded-borders">🚩<span class="q-mx-xs">Fan Zone</span></div>
      <div class="row q-mt-sm" :class="fanTransfersRowClass">
        <div class="col-grow col-md">
          <div>
            <q-table
              class="my-sticky-header-table bg-secondary"
              title="Players in Demand"
              :data="wanteds"
              :columns="wantedColumns"
              :pagination.sync="myPagination"
              row-key="id"
              hide-bottom
              color="primary"
              table-header-class="bg-green-2"
            >
              <template v-slot:top>
                <div class="q-table__control">
                  <div class="q-table__title"><span class="emoji">&#128293;</span> Players in Demand</div>
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
                <div v-else class="team-thumbnail q-mx-auto"><q-img :title="value.value.name" contain  :src="value.value.logo" :alt="value.value.name" class="team-thumbnail self-cente" /> </div>
              </q-td>
              <q-td slot="body-cell-suitor" slot-scope="value" :props="value">
                <router-link v-if="value.value.league_id" :to="'/teams/' + value.value.slug" >
                  <div class="team-thumbnail q-mx-auto"> <q-img :src="value.value.logo" :alt="value.value.name" contain class="mh-100" /> </div>
                    <q-tooltip :delay="300" :offset="[0,3]"  transition-show="scale" transition-hide="scale" >
                      {{value.value.name}}
                    </q-tooltip>
                </router-link>
                <div v-else class="team-thumbnail q-mx-auto"><q-img :title="value.value.name" contain  :src="value.value.logo" :alt="value.value.name" class="team-thumbnail self-cente" /> </div>
              </q-td>
              <q-td slot="body-cell-cards" slot-scope="value" :props="value">
                <q-linear-progress :value="value.value" class="q-mt-md"
                color="positive" track-color="" :title="value.value*100+'%'"
                />
              </q-td>
            </q-table>
          </div>
        </div>
        <div class="col-grow col-md">
          <div>
            <q-table
              class="my-sticky-header-table bg-secondary"
              title="Players for Sale"
              :data="unwanteds"
              :columns="unwantedColumns"
              :pagination.sync="myPagination"
              row-key="id"
              hide-bottom
              rows-per-page-label="Transfers per page"
              :rows-per-page-options="[10]"
              color="primary"
              table-header-class="bg-red-2"
            >
              <template v-slot:top>
                <div class="q-table__control">
                  <div class="q-table__title"><span class="emoji">&#128148;</span> Players for Sale</div>
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
                <div v-else class="team-thumbnail q-mx-auto"><q-img :title="value.value.name" contain  :src="value.value.logo" :alt="value.value.name" class="team-thumbnail self-cente" /> </div>
              </q-td>
              <q-td slot="body-cell-cards" slot-scope="value" :props="value">
                <q-linear-progress :value="value.value" class="q-mt-md"
                color="negative" track-color="" :title="value.value*100+'%'"
                />
              </q-td>
            </q-table>
          </div>
        </div>
      </div>
    </div>
    <q-drawer
      :value="rightDrawerOpen"
      content-class="bg-blue-grey-3"
      :breakpoint="600"
      :width="$q.screen.lt.lg ? 300 : 400"
      side="right"
      elevated
      no-swipe-open
    >
      <q-list padding link dense class="col q-py-none" >
        <q-item-label header class="bg-primary text-uppercase"><span class="q-icon on-left emoji" >&#128240;</span> Latest Editorials</q-item-label>
        <div v-for="(article) in articles" :key="article.id" class="newsTitle">
          <q-item :to="'/articles/'+article.id+'/'+article.slug"  clickable v-ripple dens >
            <q-item-section class="text-subtitle1 ellipsis d-block text-uppercase" no-wrap>
              {{article.title}}
              <q-tooltip :delay="550" :offset="[0,20]" anchor="top middle"   transition-show="scale" transition-hide="scale" >
                {{article.title}}
              </q-tooltip>
            </q-item-section>
          </q-item>
          <q-separator />
        </div>
      </q-list>
      <q-list padding link class="col q-py-none" >
        <q-item-label header class="bg-primary text-uppercase"><span class="q-icon on-left emoji" >&#128066;&#127996;</span> Latest Rumours</q-item-label>
        <div v-for="(rumour) in rumours" :key="rumour.id" class="newsBody1">
          <q-item to="/rumours"  clickable v-ripple dense>
            <q-item-section class="text-subtitle1 text-uppercase ellipsis d-block" no-wrap>
              {{rumour.title}}
            </q-item-section>
          </q-item>
          <q-separator />
        </div>
      </q-list>
    </q-drawer>
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
      slide: 0,
      date: new Date(),
      carouselHeight: '500px',
      bulletTitleClass: {},
      bulletBodyClass: {},
      columns: [
        { name: 'name', required: true, label: 'Player', align: 'left', field: row => row.player, style: 'max-width: 100px', classes: 'bg-grey-2 ellipsis', sortable: true },
        { name: 'from', align: 'center', label: 'From', field: row => row.from },
        { name: 'to', align: 'center', label: 'To', field: row => row.to },
        { name: 'date', align: 'center', label: 'Date', field: row => row.date, sortable: true },
        { name: 'fee', align: 'center', label: 'Fee (€m)', field: row => row.fee, sortable: true },
        { name: 'rating', align: 'center', label: 'Rating', field: row => row },
      ],
      visibleColumns: ['name', 'from', 'to', 'date', 'fee', 'rating'],
      transfers: [],
      myPagination: {
        rowsPerPage: 10
      },
      wantedColumns: [
        { name: 'name', required: true, label: 'Player', align: 'left', field: row => row.player, sortable: true },
        { name: 'team', align: 'center', label: 'Team', field: row => row.team },
        { name: 'suitor', align: 'center', label: 'Suitor', field: row => row.suitor },
        { name: 'cards', align: 'center', label: 'Cards Assigned', field: row => row.cardRatio, sortable: true },
        { name: 'total', align: 'center', label: 'Total', field: row => row.cardTotal, sortable: true },
      ],
      unwantedColumns: [
        { name: 'name', required: true, label: 'Player', align: 'left', field: row => row.player, sortable: true },
        { name: 'team', align: 'center', label: 'Team', field: row => row.team },
        { name: 'position', align: 'center', label: 'Position', field: row => row.player.broadPosition },
        { name: 'cards', align: 'center', label: 'Cards Assigned', field: row => row.cardRatio, sortable: true },
        { name: 'total', align: 'center', label: 'Total', field: row => row.cardTotal, sortable: true },
      ],
      wanteds: [],
      unwanteds: [],
      bulletins: [],
      articles: [],
      rumours: [],
      fanTransfersRowClass: {}
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
    },
  },

  meta () {
    return {
      title: 'Innouts | Football Hub for Active Fans',

      meta: {
        description: { name: 'description', content: 'Innouts is a football hub for the active fans! Latest news, transfers and rumours from Europe\'s top five leagues are covered.' },
        keywords: { name: 'keywords', content: ['Innouts', 'football analysis', 'football Innouts', 'football transfers', 'football rumours', 'football rankings', 'best football players', 'best football managers'] },
      },
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('api/')
      .then(response => {
        next(vm => {
          vm.setData(response)
          next()
        })
      })
      .catch(error => {
        this.$q.notify({ message: error.data.message })(error)
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
    if (this.$q.screen.lt.sm) {
      this.visibleColumns = ['name', 'from', 'to', 'date', 'fee']
      this.carouselHeight = '250px'
      this.bulletTitleClass = {
        'text-h6': true
      }
      this.bulletBodyClass = {
        'text-subtitle2': true
      }
      this.fanTransfersRowClass = {
        'q-gutter-y-md': true
      }
    } else {
      // this.$store.commit('setRightDrawer', true)
      this.carouselHeight = '700px'
      this.bulletTitleClass = {
        'text-h4': true
      }
      this.bulletBodyClass = {
        'text-subtitle1': true
      }
      this.fanTransfersRowClass = {
        'q-gutter-sm': true
      }
    }
  },

  methods: {
    setData: function (response) {
      this.transfers = response.data.transfers
      this.bulletins = response.data.bulletins
      this.articles = response.data.articles
      this.rumours = response.data.rumours
      this.wanteds = response.data.wanteds
      this.unwanteds = response.data.unwanteds
    },

    submitRating: function (value, id, index) {
      if (this.loggedIn) {
        this.$axios({ url: 'api/transfers/' + id, data: { userId: this.user.id, value: value }, method: 'PUT' })
          .then(response => {
            this.transfers[index].rating = value
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
    }
  }
}
</script>
<style lang="stylus">
</style>
