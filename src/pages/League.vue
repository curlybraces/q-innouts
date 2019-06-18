<template>
  <q-page>
    <div class="row bg-secondary">
      <div class="col-12 col-sm-5 col-md-3 offset-sm-1">
        <q-img alt="Quasar logo" :src="league.logo" class="q-mx-aut" />
      </div>
      <div class="col-grow col-md-auto self-end">
        <h4 class="text-center q-my-md">{{league.name}}</h4>
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
                    <table  flat dens separator="none" class="table text-white no-border">
                      <tbody>
                        <tr>
                          <td class="">Country</td>
                          <td class="">{{league.country}}</td>
                        </tr>
                        <tr>
                          <td class="">Formation</td>
                          <td class="">{{league.formed}}</td>
                        </tr>
                        <tr>
                          <td class=""># of Teams</td>
                          <td class="">{{league.noOfTeams}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-grow col-sm-6 text-center self-center">
                    <div class="team-thumbnail q-mx-auto">
                      <q-img :src="'statics/' + stats.recordWinner.logo" :alt="stats.recordWinner.name" class="full-height" />
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
                <div class="row q-pa-sm">
                  <div class="col-grow col-sm-6 q-pa-sm">
                    <q-list padding class="bg-secondary rounded-borders" bordered>
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
                          <q-item-label caption >By present teams</q-item-label>
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
                        </q-item-section>
                      </q-item>
                    </q-list>
                    <!-- <table square flat bordered separator="none" class="table bordered border-primary rounded-borders bg-secondary">
                      <tbody>
                        <tr>
                          <td class="text-left">Internationalization</td>
                          <td class="text-right">{{stats.inter}}</td>
                        </tr>
                        <tr>
                          <td class="text-left">Average Player Rating</td>
                          <td class="text-right">{{stats.playersAvgRating}}</td>
                        </tr>
                        <tr>
                          <td class="text-left">Average Player Age</td>
                          <td class="text-right">{{stats.playersAvgAge}}</td>
                        </tr>
                        <tr>
                          <td class="text-left">Average Manager Rating</td>
                          <td class="text-right">{{stats.managersAvgRating}}</td>
                        </tr>
                        <tr>
                          <td class="text-left">Major European Trophies Won</td>
                          <td class="text-right">{{stats.intTrophies}}</td>
                        </tr>
                        <tr>
                          <td class="text-left">Record Title Winners</td>
                          <td class="text-right team-thumbnail">
                            <q-img :src="'statics/' + stats.recordWinner.logo" :alt="stats.recordWinner.name" class="full-height" />
                              <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                                {{stats.recordWinner.name}}
                              </q-tooltip>
                          </td>
                        </tr>
                      </tbody>
                    </table> -->
                  </div>
                  <div class="col-grow col-sm-6 text-center">
                    <!-- <h5 class="text-center">Teams</h5> -->

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
          // vm.setData(response.data)
          vm.league = response.data.league
          vm.stats = response.data.stats
          vm.league.teams.forEach(element => {
            if (element.id === vm.stats.recordWinner) {
              vm.stats.recordWinner = element
            }
          })
          // vm.activePlayer = vm.player
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
