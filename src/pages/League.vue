<template>
  <q-page>
    <div class="row bg-secondary">
      <div class="col-grow col-4 col-sm-4 col-md-3 col-l offset-sm-1 self-center" :class="logoColClass">
        <div :style="logoWrapperStyle" class="q-mx-auto">
          <q-img :alt="league.name" contain :src="league.logo" class="q-mx-auto fit" />
        </div>
      </div>
      <div class="col-grow col-sm-6 col-md-4 col-lg-4 self-center rounded-borders bordered bg-secondary  q-pa-sm">
        <q-list dark :dense="$q.screen.lt.md" class="bg-primary rounded-borders bordered" >
          <q-item >
            <q-item-section >
              <q-item-label>League</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="newsTitle">{{league.name}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section >
              <q-item-label>Country</q-item-label>
            </q-item-section>
            <q-item-section >
              <q-item-label class="newsTitle">{{league.country}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section >
              <q-item-label>Formation</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="newsTitle">{{league.formed}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section >
              <q-item-label># of Teams</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="newsTitle">{{league.noOfTeams}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section >
              <q-item-label>👑Defending Champions</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="newsTitle ellipsis">
                <div class="team-thumbnail">
                  <q-img :src="league.holders.logo" contain :title="league.holders.name" class="mh-100"/>
                  <!-- &#9876; -->
                </div>
               </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div padding class="row justify-center q-gutter-y-md">
      <div class="col" style="max-widh: 1000px">
        <q-tabs
          v-model="tab" dense
          inline-label
          class="bg-primary text-white shadow-2"
        >
          <q-tab name="overview" label="Overview" />
          <q-tab name="table" label="Table" />
          <q-tab name="news" label="News" />
          <q-tab name="editorials" label="Editorials" />
        </q-tabs>
      </div>
    </div>
    <div class="row justify-center">
        <q-tab-panels v-model="tab" keep-alive  animated class="col col-lg-11 q-mx-aut">
          <q-tab-panel name="overview" :class="panelClass">
            <q-card class="text-subtitle1">
              <div class="row q-pa-sm bg-secondary">
                <div class="col-grow col-sm-6" :class="statsClass">
                  <q-list dark :dense="$q.screen.lt.md" padding class="rounded-borders bg-primary" bordered>
                    <q-item>
                      <q-item-section>
                        <q-item-label>Internationalization</q-item-label>
                        <!-- <q-item-label caption >percentage of international players</q-item-label> -->
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label >{{stats.inter}}%</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item >
                      <q-item-section>
                        <q-item-label>Average Player Rating</q-item-label>
                        <!-- <q-item-label caption >out of 10</q-item-label> -->
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label >{{stats.playersAvgRating}}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item >
                      <q-item-section>
                        <q-item-label>Average Player Value</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label >€{{stats.playersAvgValue}}m</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label >Average Player Age</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label >{{stats.playersAvgAge}}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section>
                        <q-item-label >Average Manager Rating</q-item-label>
                        <!-- <q-item-label caption >out of 10</q-item-label> -->
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label >{{stats.managersAvgRating}}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section>
                        <q-item-label >Major European Trophies Won</q-item-label>
                        <!-- <q-item-label caption >present teams</q-item-label> -->
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label >{{stats.intTrophies}}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section>
                        <q-item-label >Record Title Winners</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label class="team-thumbnail">
                          <q-img :src="stats.recordWinner.logo" contain :alt="stats.recordWinner.name" class="full-height" />
                            <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{stats.recordWinner.name}}
                            </q-tooltip>
                        </q-item-label>
                        <div class="q-mx-auto">{{stats.recordWinner.trophy_cabinet.ls}}</div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="col-grow col-sm-6 text-center self-center">
                  <!-- Teams⚔ -->
                  <ul id="league-teams" class="q-my-none" :class="panelClass">
                      <li v-for="team in league.teams" :key="team.id" class="league-team-thumbnail q-mx-auto q-mb-md">
                        <router-link :to="'/teams/' + team.slug" >
                          <q-img class="full-height" contain :alt="team.name" :src="team.logo" />
                            <q-tooltip :delay="300"  transition-show="scale" transition-hide="scale" >
                              {{team.name}}
                            </q-tooltip>
                        </router-link>
                      </li>
                  </ul>
                </div>
              </div>
            </q-card>
          </q-tab-panel>
          <q-tab-panel name="table" :class="panelClass">
              <q-table
                :data="league.standings"
                :columns="columns"
                :dense="$q.screen.lt.md"
                :rows-per-page-options="[10,20,0]"
                :pagination.sync="pagination"
                hide-bottom
                row-key="name"
                class="bg-secondary newsTitle"
              >
                <q-td slot="body-cell-state" slot-scope="value" :props="value">
                  <span v-if="league.CL_spots.includes(''+value.value)" title="Champions League spot"><q-icon name="ion-key" size="xs" color="green-10"/> </span>
                  <span v-if="league.CL_qualifiers.includes(''+value.value)" title="Champions League qualifiers"> <q-icon name="lock" size="xs" color="green-10"/> </span>
                  <span v-if="league.EL_spots.includes(''+value.value)" title="Europa League spot"> <q-icon name="ion-key" size="xs" color="green-5"/> </span>
                  <span v-if="league.EL_qualifiers.includes(''+value.value)" title="Europa League qualifiers"> <q-icon name="lock" size="xs" color="green-5"/> </span>
                  <span v-if="league.relegation_playoff.includes(''+value.value)" title="relegation play-off">☢</span>
                  <span v-if="league.relegation.includes(''+value.value)" title="relegation">☠</span>
                </q-td>
                <q-td slot="body-cell-change" slot-scope="value" :props="value">
                  <q-icon v-if="value.value.position < value.value.previous_position" name="arrow_drop_up" size="sm" class="text-positive" />
                  <span v-else-if="value.value.position === value.value.previous_position"></span>
                  <q-icon v-else name="arrow_drop_down" size="sm" class="text-negative" />
                </q-td>
                <q-td slot="body-cell-team" slot-scope="value" :props="value">
                  <router-link :to="'/teams/' + value.value.slug" >
                    <div class="team-thumbnail"> <q-img :src="value.value.logo" :alt="value.value.name" contain class="mh-100" /> </div>
                      <q-tooltip :delay="300" :offset="[0,3]"  transition-show="scale" transition-hide="scale" >
                        {{value.value.name}}
                      </q-tooltip>
                  </router-link>
                </q-td>
                <q-td slot="body-cell-form" class="text-caption" slot-scope="value" :props="value">
                  <div class="row no-wrap justify-center" style="height: 19px;">
                    <div v-for="(char, idx) in value.value" :key="idx" v-text="char"
                      class="text-white q-pa-x col-auto"
                      style="width: 19px;"
                      :class="{'bg-positive': char === 'W', 'bg-negative': char==='L', 'bg-grey': char==='D'}"
                    />
                  </div>
                </q-td>
              </q-table>
            <div class="text-caption q-my-md">Last update: {{league.standingsLastUpdated}}, UK time</div>
          </q-tab-panel>
          <q-tab-panel name="news" :class="panelClass">
            <div class="row justify-center">
              <div class="col-grow col-sm-9 col-md-7">
                <news :news="news" />
                <div class="text-caption text-center">News from ESPN</div>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="editorials" :class="panelClass">
            <div class="row justify-center">
              <div class="col-grow col-sm-9 col-md-7">
                <articles v-if="articles.length" :articles="articles" :chunk="7" :dense="true" />
                <div v-else class="text-subtitle1 text-center text-black">
                  Nothing to display at this time!
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
  </q-page>
</template>

<script>
import axios from 'axios'
const Articles = () => import('components/Articles.vue')
const News = () => import('components/News.vue')

const Parser = require('rss-parser')
const parser = new Parser()

export default {
  name: 'League',

  components: {
    Articles,
    News
  },

  data () {
    return {
      tab: 'overview',
      league: {
        holders: Object
      },
      stats: {
        inter: Number,
        recordWinner: {
          trophy_cabinet: Object
        }
      },
      news: [],
      panelClass: {},
      logoWrapperStyle: {},
      logoColClass: {},
      statsClass: {},
      articles: [],
      columns: [
        { name: 'state', required: true, align: 'left', field: row => row.position },
        { name: 'rank', required: true, align: 'left', field: row => row.position },
        { name: 'change', required: true, align: 'left', field: row => row },
        { name: 'team', required: true, label: 'Team', align: 'left', field: row => row.team },
        { name: 'played', align: 'center', label: 'Played', field: 'played', sortable: true },
        { name: 'won', align: 'center', label: 'Won', field: 'won', sortable: true },
        { name: 'lost', align: 'center', label: 'Lost', field: 'lost', sortable: true },
        { name: 'drawn', align: 'center', label: 'Drawn', field: row => row.played - (row.won - row.lost), sortable: true },
        { name: 'for', align: 'center', label: 'For', field: 'for', sortable: true },
        { name: 'against', align: 'center', label: 'Against', field: 'against', sortable: true },
        { name: 'difference', align: 'center', label: 'Goal Difference', field: row => row.for - row.against, sortable: true },
        { name: 'points', label: 'Points', field: 'points', sortable: true },
        { name: 'form', align: 'center', label: 'Form', field: 'form' },
      ],
      pagination: {
        sortBy: 'points',
        descending: true,
        rowsPerPage: 20,
      },
    }
  },

  computed: {
    teamNames () {
      let x = []
      if (this.league.teams) {
        this.league.teams.forEach(element => {
          x.push(element.name)
        })
      }
      return x
    }
  },

  meta () {
    return {
      title: this.league.name + ' - Innouts',

      meta: {
        description: { name: 'description', content: this.league.name + ' is the first tier of football in ' + this.league.country + '. Find the table, news, analysis and interesting stats right here!' },
        keywords: { name: 'keywords', content: [this.league.name, this.league.name + ' ' + this.league.country, this.league.name + ' teams', this.league.name + ' champions', this.league.name + ' table', this.league.name + ' news', this.league.name + ' analysis', this.league.name + ' stats'].concat(this.teamNames) },
      },
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('api/leagues/' + to.params.league)
      .then(response => {
        next(vm => {
          vm.setData(response)
        })
      })
      .catch(error => {
        this.$q.notify({ message: error.data.message })
        next(false)
      })
  },

  created: function () {
    this.$store.commit('setRightDrawer', false)

    if (this.$q.platform.is.mobile) {
      this.panelClass = {
        'q-pa-xs': true
      }
      this.logoWrapperStyle.width = '140px'
      this.logoWrapperStyle.height = '140px'
    } else {
      this.statsClass['q-pa-xs'] = true
      this.logoWrapperStyle.width = '280px'
      this.logoWrapperStyle.height = '280px'
    }
  },

  beforeRouteUpdate (to, from, next) {
    axios.get('api/leagues/' + to.params.league)
      .then(response => {
        this.setData(response)
        next()
      })
      .catch(error => {
        this.$q.notify({ message: error.data.message })
        next(false)
      })
  },

  methods: {
    setData (response) {
      this.league = response.data.league
      this.stats = response.data.stats
      this.articles = response.data.articles
      let CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
      parser.parseURL(CORS_PROXY + this.league.feed)
        .then(feed => {
          this.news = feed.items
        })
        .catch(error => {
          this.$q.notify({ message: error.data.message })
        })
      this.tab = 'overview'
    }
  }

}
</script>

<style>
</style>
