<template>
  <q-page>
    <div class="row bg-secondary">
      <div class="col-6 col-sm-5 col-md-3 offset-sm-1">
        <q-img alt="Quasar logo" :src="league.logo" class="q-mx-aut" />
      </div>
      <div class="col-grow col-md-auto self-end">
        <h4 class="text-center q-my-md text-uppercase">{{league.name}}</h4>
        <!-- <div class="order-first">h</div> -->
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
          <q-tab name="alarms" icon="table_chart" label="Table" />
          <q-tab name="news" icon="info" label="News" />
        </q-tabs>
      </div>
    </div>
    <div class="row justify-center">
      <!-- <div class="col"> -->
          <q-tab-panels v-model="tab" animated class="col col-lg-11 q-mx-aut">
            <q-tab-panel name="mails">
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
                      <q-img :src="'statics/' + league.holders.logo" :alt="league.holders.name" class="full-height" />
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
                    <q-list :dense="$q.screen.lt.md" padding class="rounded-borders" bordered>
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
                            <q-img :src="'statics/' + stats.recordWinner.logo" :alt="stats.recordWinner.name" class="full-height" />
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
                    <ul id="league-teams" class="q-pa-md q-my-none">
                       <li v-for="team in league.teams" :key="team.id" class="picture-wrapper">
                         <router-link :to="'/teams/' + team.id" >
                            <img class="full-height" alt="Quasar logo" :src="'statics/' + team.logo">
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

            <q-tab-panel name="alarms">
              <div class="text-h6">Alarms</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>

            <q-tab-panel name="news">
              <news />
            </q-tab-panel>
          </q-tab-panels>
        </div>
    <!-- </div> -->
  </q-page>
</template>

<script>
import axios from 'axios'
const News = () => import('components/News.vue')
// import { date } from 'quasar'

export default {
  name: 'League',

  components: {
    News,
  },

  data () {
    return {
      tab: 'mails',
      league: null,
      stats: null,
      news: []
    }
  },

  beforeRouteEnter (to, from, next) {
    // if (from.name === 'player') {
    //   next()
    // } else {
    axios.get('http://innouts.test/api/leagues/' + to.params.league)
      .then(response => {
        next(vm => {
          vm.league = response.data.league
          vm.stats = response.data.stats
        })
      })
      .catch(error => {
        from.error = error
        next(false)
      })
    // }
  },

  created: function () {
    this.$emit('sendView', ['hhh lpR fff', false, false])
    // this.league.formed = new Date(this.league.formed)
    // alert(this.$q.platform.is.mobile)
  },

}
</script>

<style>
</style>
