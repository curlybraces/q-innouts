<template>
  <q-page>
    <div class="row bg-secondary">
      <div class="col-6 col-sm-5 col-md-3 offset-sm-1">
        <div style="width: 280px; height: 280px;">
          <q-img alt="Quasar logo" :src="league.logo" class="q-mx-aut fit" />
        </div>
      </div>
      <div class="col-grow col-md-auto self-end">
        <h4 class="text-center q-my-md text-uppercase">{{league.name}}</h4>
      </div>
    </div>
    <div padding class="row justify-center q-gutter-y-md">
      <div class="col" style="max-widh: 1000px">
        <q-tabs
          v-model="tab" dense
          inline-label
          class="bg-primary text-white shadow-2"
        >
          <q-tab name="mails" icon="description" label="Overview" />
          <!-- <q-tab name="alarms" icon="table_chart" label="Table" />
          <q-tab name="news" icon="info" label="News" /> -->
        </q-tabs>
      </div>
    </div>
    <div class="row justify-center">
      <!-- <div class="col"> -->
          <q-tab-panels v-model="tab" animated class="col col-lg-11 q-mx-aut">
            <q-tab-panel name="mails" :class="panelClass">
              <q-card class="text-subtitle1">
                <div class="row bg-primary justify-center text-white">
                  <div class="col-grow col-sm-6 text-center q-pa-s">
                    <q-list :dense="$q.screen.lt.md" dark >
                      <q-item>
                        <q-item-section>
                          <q-item-label>Country</q-item-label>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label >{{league.country}}</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-item-label>Formation</q-item-label>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label >{{league.formed}}</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-item-label># of Teams</q-item-label>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label >{{league.noOfTeams}}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                  <div class="col-grow col-sm-6 text-center self-center">
                    <div id="defending-champs" class="q-mx-auto">
                      <q-img :src="league.holders.logo" :alt="league.holders.name" class="full-height" />
                    </div>
                    <h5 class="text-center q-my-none">
                      <span>
                        &#9876;
                        <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          Defending Champions
                        </q-tooltip>
                      </span>
                    </h5>
                    <!-- <p class="text-center">Defending Champions</p> -->
                  </div>
                </div>
                <div class="row q-pa-sm bg-secondary">
                  <div class="col-grow col-sm-6 q-pa-sm">
                    <q-list dark :dense="$q.screen.lt.md" padding class="rounded-borders bg-primary" bordered>
                      <q-item>
                        <q-item-section>
                          <q-item-label>Internationalization</q-item-label>
                          <q-item-label caption >percentage of international players</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-item-label >{{stats.inter}}%</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item >
                        <q-item-section>
                          <q-item-label>Average Player Rating</q-item-label>
                          <q-item-label caption >out of 10</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-item-label >{{stats.playersAvgRating}}</q-item-label>
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
                          <q-item-label caption >out of 10</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-item-label >{{stats.managersAvgRating}}</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item>
                        <q-item-section>
                          <q-item-label >Major European Trophies Won</q-item-label>
                          <q-item-label caption >by present teams</q-item-label>
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
                            <q-img :src="stats.recordWinner.logo" :alt="stats.recordWinner.name" class="full-height" />
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
                       <li v-for="team in league.teams" :key="team.id" class="picture-wrapper">
                         <router-link :to="'/teams/' + team.id" >
                            <img class="full-height" alt="Quasar logo" :src="team.logo">
                              <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                                {{team.name}}
                              </q-tooltip>
                         </router-link>
                       </li>
                    </ul>
                  </div>
                </div>
              </q-card>
            </q-tab-panel>

            <!-- <q-tab-panel name="alarms">
              <div class="text-h6">Alarms</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>

            <q-tab-panel name="news">
              <news />
            </q-tab-panel> -->
          </q-tab-panels>
        </div>
    <!-- </div> -->
  </q-page>
</template>

<script>
import axios from 'axios'
// const News = () => import('components/News.vue')

export default {
  name: 'League',

  components: {
    // News,
  },

  data () {
    return {
      tab: 'mails',
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
      panelClass: {}
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
        description: { name: 'description', content: this.league.name + ' is the first tier of football in ' + this.league.country + '. See interesting stats right here!' },
        keywords: { name: 'keywords', content: [this.league.name, this.league.name + ' ' + this.league.country, this.league.name + ' teams', this.league.name + ' champions'].concat(this.teamNames) },
      },
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('api/leagues/' + to.params.league)
      .then(response => {
        next(vm => {
          vm.league = response.data.league
          vm.stats = response.data.stats
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
      this.panelClass = {
        'q-pa-xs': true
      }
    }
  },

  beforeRouteUpdate (to, from, next) {
    axios.get('api/leagues/' + to.params.league)
      .then(response => {
        this.league = response.data.league
        this.stats = response.data.stats
        next()
      })
      .catch(error => {
        console.log(error)
        next(false)
      })
  },

}
</script>

<style>
</style>
