<template>
  <q-page >
    <div id="team-header" class="bg-secondry q-pa-s text-white" :style="headerStyle">
      <div v-if="$q.screen.gt.sm">
        <div class="row justify-center">
          <div class="col relative-position">
            <div class="d-inline-block q-ml-sm">
              <div class="rope border-right border-left border-dark"></div>
              <div class="border-x border-y border-dark q-pa-xs bg-primary text-white text-caption">Seats {{team.stadium.capacity}}</div>
            </div>
          </div>
          <div class="col relative-position">
            <div class="d-inline-block absolute-center">
              <div class="rope border-right border-left border-dark"></div>
              <div class="border-x border-y border-dark q-pa-xs bg-primary ellipsis text-white text-caption" :title="team.stadium.name"> {{team.stadium.name}}</div>
            </div>
          </div>
          <div class="col relative-position">
            <div class="d-inline-block absolute-right q-mr-sm">
              <div class="rope border-right border-left border-dark"></div>
              <div class="border-x border-y border-dark q-pa-xs bg-primary text-white text-caption">Built {{team.stadium.built}}</div>
            </div>
          </div>
        </div>
        <div class="row q-pa-md q-mt-sm">
          <div class="col-4 col-grow col-sm-4 col-md-3 q-ml-auto">
            <div id="team-card" class="rounded-borders bg-t-darker">
              <div id="team-logo-wrapper">
                <q-img contain  :src="team.logo" alt="logo" class="fit" />
              </div>
              <p class="text-h5 text-uppercase q-mt-sm q-mb-none" :style="{backgroundColor: team.color}"> <span>{{team.name}} </span></p>
            </div>
          </div>
          <div class="col-grow col-sm-6 col-md-5 q-mr-auto">
            <div class="row">
              <div id="team-info" class="col-grow col-md-8 col-lg-6 rounded-borders bg-t-darker">
                <q-list dense dark class="text-subtitle1 text-capitalize">
                  <q-item>
                    <q-item-section>
                      <q-item-label>Founded</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label>{{team.founded}}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item >
                    <q-item-section>
                      <q-item-label>Internationalization</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label >
                        <span v-if="stats.inter <= 10" title="lovely!">&#128525;</span><span v-else-if="stats.inter <= 20" title="cool!">&#128522;</span><span v-else-if="stats.inter <= 30" title="impressive!">&#128526;</span>
                        <span v-else-if="stats.inter <= 40" title="boastful!">&#128527;</span><span v-else-if="stats.inter <= 50" title="meh!">&#129320;</span><span v-else-if="stats.inter <= 60" title="neutral!">&#128528;</span>
                        <span v-else-if="stats.inter <= 70" title="discontent!">&#128529;</span><span v-else-if="stats.inter <= 80" title="disturbed!">&#128530;</span><span v-else-if="stats.inter <= 90" title="angry!">&#128544;</span>
                        <span v-else-if="stats.inter <= 100" title="fuming!">&#128545;</span>
                        {{stats.inter}}%
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section>
                      <q-item-label >Average squad age</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label >{{stats.avgAge}}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section>
                      <q-item-label >Average squad score</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label >{{stats.avgRating}}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section>
                      <q-item-label >Total squad value</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label >€{{stats.totalValue}}m</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section>
                      <q-item-label >Major trophies won</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label >{{team.trophiesWon}}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <div v-if="team.trophiesWon" class="">
                          <table id="trophy-table" class="mx-sm-0">
                            <thead>
                              <tr id="trophy-cabinet">
                                <th v-if="team.trophyCabinet.cls" class="trophy ">
                                  <q-img class="full-height" title="Champions League" :src="'statics/images/trophies/champions-league.png'" alt="champions league trophy thumbnail"
                                    position="50% 100%" sizes="280px, 440px"
                                  />
                                  <q-badge align="bottom" :style="{backgroundColor: team.color}" text-color="blac" :label="team.trophyCabinet.cls+'x'" />
                                </th>
                                <th v-if="team.trophyCabinet.ls" class="trophy ">
                                  <q-img class="full-height" :title="team.league.name" :src="team.league.league_trophy_pic" :alt="team.league.name + ' trophy thumbnail'"/>
                                  <q-badge align="bottom" :style="{backgroundColor: team.color}" :label="team.trophyCabinet.ls+'x'" />
                                </th>
                                <th v-if="team.trophyCabinet.ffts" class="trophy ">
                                  <q-img class="full-height" :title="team.league.fftName" :src="team.league.fft_trophy_pic" :alt="team.league.fftName + ' trophy thumbnail'"/>
                                  <q-badge align="bottom" :style="{backgroundColor: team.color}" :label="team.trophyCabinet.ffts+'x'" />
                                </th>
                                <th v-if="team.trophyCabinet.els" class="trophy ">
                                  <q-img class="full-height" title="Europa League" :src="'statics/images/trophies/europa-league.png'" alt="europa league trophy thumbnail"/>
                                  <q-badge align="bottom" :style="{backgroundColor: team.color}" :label="team.trophyCabinet.els+'x'" />
                                </th>
                                <th v-if="team.trophyCabinet.cs" class="trophy ">
                                  <q-img class="full-height" :title="team.league.cupName" :src="team.league.cup_trophy_pic" :alt="team.league.cupName + ' trophy thumbnail'"/>
                                  <q-badge align="bottom" :style="{backgroundColor: team.color}" :label="team.trophyCabinet.cs+'x'" />
                                </th>
                              </tr>
                            </thead>
                          </table>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
          <div class="col-sm-3 q-mr-auto">
            <fans :team="team" :stats="stats" />
          </div>
        </div>
      </div>
      <div v-else class="col self-center">
        <div class="row justify-center">
          <q-card class="col-11 col-sm-8 bg-t-darker self-center">
            <div class="row">
              <div class="column col-grow col-4 col-sm-3 q-pt-sm relative-position">
                <q-img :src="team.logo" :alt="team.name" contain id="team-thumbnail-mobile" class="q-mx-auto q-mt-sm"/>
                <div class="text-center text-uppercase absolute-bottom" :style="{backgroundColor: team.color}" > {{team.name}} </div>
              </div>
              <div class="col-grow col-8">
                <q-list dense dark class="text-subtitle2 text-capitalize">
                  <q-item>
                    <q-item-section>
                      <q-item-label>Founded</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label>{{team.founded}}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item >
                    <q-item-section>
                      <q-item-label>Internationalization</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label >
                        <span v-if="stats.inter <= 10" title="lovely!">&#128525;</span><span v-else-if="stats.inter <= 20" title="cool!">&#128522;</span><span v-else-if="stats.inter <= 30" title="impressive!">&#128526;</span>
                        <span v-else-if="stats.inter <= 40" title="boastful!">&#128527;</span><span v-else-if="stats.inter <= 50" title="meh!">&#129320;</span><span v-else-if="stats.inter <= 60" title="neutral!">&#128528;</span>
                        <span v-else-if="stats.inter <= 70" title="discontent!">&#128529;</span><span v-else-if="stats.inter <= 80" title="disturbed!">&#128530;</span><span v-else-if="stats.inter <= 90" title="angry!">&#128544;</span>
                        <span v-else-if="stats.inter <= 100" title="fuming!">&#128545;</span>
                        {{stats.inter}}%
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section>
                      <q-item-label >Average squad age</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label >{{stats.avgAge}}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section>
                      <q-item-label >Average squad score</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label >{{stats.avgRating}}/10</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section>
                      <q-item-label >Total squad value</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label >€{{stats.totalValue}}m</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label >Major trophies won</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label >{{team.trophiesWon}}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>
    <q-tabs
    id="title"
      v-model="tab" dense inline-label
      class="bg-primary text-white shadow-2"
    >
      <q-tab name="home" label="Team" />
      <q-tab name="innouts" label="Innouts" />
      <q-tab name="stories" label="Stories" />
      <q-tab name="articles" label="Editorials" />
      <q-tab name="rumours" label="Rumours" />
      <q-tab v-if="user.team_id == team.id" name="business" label="sign/sell" />
    </q-tabs>

    <q-tab-panels keep-alive v-model="tab" animated @before-transition="panelChange"
     class="shadow- rounded-borders"
     >
      <q-tab-panel name="home">
        <div class="row justify-center q-mx-auto relative-position">
          <div v-if="$q.screen.gt.sm" id="team-field" class="col-md-10 col-lg-11 q-px-sm" :class="fieldClass" :style="fieldStyle">
            <!-- Goalkeepers -->
            <div class="row justify-center q-my-lg q-mx-none">
              <div v-for="player in gks" :key="player.id" class="col-lg-1 col-md-2 col-sm-2 q-px-sm">
                <player-card :player="player" :color="team.color" :loggedIn="loggedIn" :user="user" />
              </div>
            </div>
            <!-- Defenders -->
            <div class="row justify-center q-my-lg q-mx-none">
              <!-- RB -->
              <div class="col-lg-3 col-sm-4 order-lg-1 order-2">
                <div class="row justify-center">
                  <div v-for="player in rbs" :key="player.id" class="col-lg-4 col-sm-6 q-px-sm">
                    <player-card :player="player" :color="team.color" :loggedIn="loggedIn" :user="user" />
                  </div>
                </div>
              </div>
              <!-- CB -->
              <div class="col-12 col-lg-6 order-lg-2 order-1">
                <div class="row justify-center">
                  <div v-for="player in cbs" :key="player.id" class="col-sm-2 q-px-sm">
                    <player-card :player="player" :color="team.color" :loggedIn="loggedIn" :user="user" />
                  </div>
                </div>
              </div>
              <!-- LB -->
              <div class="col-lg-3 col-sm-4 order-sm-3 order-3">
                <div class="row justify-center">
                  <div v-for="player in lbs" :key="player.id" class="col-lg-4 col-sm-6 q-px-sm">
                    <player-card :player="player" :color="team.color" :loggedIn="loggedIn" :user="user" />
                  </div>
                </div>
              </div>
            </div>
            <!-- Defensive Midfielders -->
            <div class="row justify-center q-my-lg q-mx-none">
              <div v-for="player in dms" :key="player.id" class="col-lg-1 col-sm-2 q-px-sm">
                <player-card :player="player" :color="team.color" :loggedIn="loggedIn" :user="user" />
              </div>
            </div>
            <!-- Midfielders -->
            <div class="row justify-center q-my-lg q-mx-none">
              <!-- RM -->
              <div class="col-lg-3 col-sm-4 order-lg-1 order-2">
                <div class="row justify-center">
                  <div v-for="player in rms" :key="player.id" class="col-lg-4 col-sm-6 q-px-sm">
                    <player-card :player="player" :color="team.color" :loggedIn="loggedIn" :user="user" />
                  </div>
                </div>
              </div>
              <!-- CM -->
              <div class="col-12 col-lg-6 order-lg-2 order-1">
                <div class="row justify-center">
                  <div v-for="player in cms" :key="player.id" class="col-sm-2 q-px-sm">
                    <player-card :player="player" :color="team.color" :loggedIn="loggedIn" :user="user" />
                  </div>
                </div>
              </div>
              <!-- LM -->
              <div class="col-lg-3 col-sm-4 order-sm-3 order-3">
                <div class="row justify-center">
                  <div v-for="player in lms" :key="player.id" class="col-lg-4 col-sm-6 q-px-sm">
                    <player-card :player="player" :color="team.color" :loggedIn="loggedIn" :user="user" />
                  </div>
                </div>
              </div>
            </div>
            <!-- Attacking Midfielders -->
            <div class="row justify-center q-my-lg q-mx-none">
              <div v-for="player in ams" :key="player.id" class="col-lg-1 col-sm-2 q-px-sm">
                <player-card :player="player" :color="team.color" :loggedIn="loggedIn" :user="user" />
              </div>
            </div>
            <!-- first line attackers (LWF, SS, RWF) -->
            <div class="row justify-center q-my-lg q-mx-none">
              <!-- RWF -->
              <div class="col-lg-3 col-sm-4 order-lg-1 order-2">
                <div class="row justify-center">
                  <div v-for="player in rws" :key="player.id" class="col-lg-4 col-sm-6 q-px-sm">
                    <player-card :player="player" :color="team.color" :loggedIn="loggedIn" :user="user" />
                  </div>
                </div>
              </div>
              <!-- SS -->
              <div class="col-12 col-lg-6 order-lg-2 order-1">
                <div class="row justify-center">
                  <div v-for="player in sss" :key="player.id" class="col-sm-2 q-px-sm">
                    <player-card :player="player" :color="team.color" :loggedIn="loggedIn" :user="user" />
                  </div>
                </div>
              </div>
              <!-- LWF -->
              <div class="col-lg-3 col-sm-4 order-sm-3 order-3">
                <div class="row justify-center">
                  <div v-for="player in lws" :key="player.id" class="col-lg-4 col-sm-6 q-px-sm">
                    <player-card :player="player" :color="team.color" :loggedIn="loggedIn" :user="user" />
                  </div>
                </div>
              </div>
            </div>
            <!-- second line attackers (CF) -->
            <div class="row justify-center q-my-lg q-mx-none">
              <div v-for="player in cfs" :key="player.id" class="col-lg-1 col-sm-2 q-px-sm">
                <player-card :player="player" :color="team.color" :loggedIn="loggedIn" :user="user" />
              </div>
            </div>
          </div>
          <q-list v-else bordered padding link dense class="col bg-secondary" >
            <div v-for="(player) in team.players" :key="player.id">
              <q-item :to="'/players/'+player.id+'/'+player.slug" clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar rounded>
                    <q-img :src="player.picture" placeholder-src="statics/images/picSoon.jpg" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>{{player.firstName}} {{player.lastName}}</q-item-section>
                <q-item-section v-if="$q.screen.lt.md && $q.screen.gt.xs">
                  <q-rating
                    color="orange"
                    class=""
                    size="1.5rem"
                    :value="Math.round(player.rating)"
                    :max="10"
                    readonly
                  />
                </q-item-section>
                <q-item-section side>{{player.specificPosition}}</q-item-section>
              </q-item>
              <q-separator />
            </div>
          </q-list>
        </div>
        <!-- manager -->
        <div class="row q-my-sm">
          <div v-if="$q.screen.gt.sm" class="col-grow col-sm-4 col-md-2 col-lg-2 offset-sm-1">
            <q-card class="">
              <q-card-section class="bg-primary text-center text-secondary">
                Manager
              </q-card-section>
              <q-card-section class="q-mt-sm q-pa-sm">
                <div style="width: 160px; height: 160px" class="q-mx-auto" >
                  <q-img :src="team.manager.picture" placeholder-src="statics/images/picSoon.jpg" :alt="team.manager.nickname" class="img-thumbnail" />
                </div>
                <div class="text-center text-black border-bottom border-dark ellipsis text-weight-bold">
                  <router-link :to="'/managers/' + team.manager.slug" class="no-decor" >
                    {{team.manager.nickname}}
                    <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                        {{team.manager.firstName}} {{team.manager.lastName}}
                    </q-tooltip>
                  </router-link>
                </div>
                <div class="text-center bg-t-dark">
                  <rating :rating="team.manager.rating" @save="submitManagerRating"  :color="team.color" size="0.9rem" class="q-mx-auto"/>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <q-item v-else :to="'/managers/'+team.manager.slug" class="col bg-t-dar bordered rounded-borders">
            <q-item-section avatar>
              <q-avatar square>
                <q-img :src="team.manager.picture" placeholder-src="statics/images/picSoon.jpg" />
              </q-avatar>
            </q-item-section>
            <q-item-section>{{team.manager.firstName}} {{team.manager.lastName}}</q-item-section>
            <q-item-section side>Manager</q-item-section>
          </q-item>
        </div>
      </q-tab-panel>

      <q-tab-panel name="innouts">
        <innouts :team="team" />
      </q-tab-panel>

      <q-tab-panel name="rumours">
        <div class="row justify-center">
          <div class="col-grow col-lg-6 col-md-8 col-sm-10">
            <rumours v-if="team.rumours ? team.rumours.length : false" :rumours="team.rumours" :dense="true" btnSize="xs" />
            <div v-else class="text-subtitle1 text-center">No recent rumours!</div>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="stories">
        <div class="row justify-center">
          <div class="col-lg-6 col-md-8 col-sm-10">
            <articles v-if="team.stories ? team.stories.length : false" :articles="team.stories" :dense="true" links="stories" :showBody="true" />
            <div v-else class="text-subtitle1 text-center">Nothing to display at this time!</div>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="articles">
        <div class="row justify-center">
          <div class="col-lg-6 col-md-8 col-sm-10">
            <articles v-if="team.articles ? team.articles.length : false" :articles="team.articles" :dense="true" />
            <div v-else class="text-subtitle1 text-center">Nothing to display at this time!</div>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="business">
        <div class="row justify-center q-gutter-sm">
          <div class="col-sm-5 col-grow text-center">
            <sign-form :team="team" :user="user" :signList="signList" :signQuota="signQuota"  />
          </div>
          <div class="col-sm-5 col-grow">
           <sell-form :team="team" :user="user" :sellingList="sellList" :sellQuota="sellQuota" />
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import axios from 'axios'
const Innouts = () => import('components/Innouts.vue')
const Fans = () => import('components/Fans.vue')
const Articles = () => import('components/Articles.vue')
const PlayerCard = () => import('components/PlayerCard.vue')
const SellForm = () => import('components/SellForm.vue')
const SignForm = () => import('components/SignForm.vue')
const Rating = () => import('components/Rating.vue')
const Rumours = () => import('components/Rumours.vue')

const initialState = () => {
  return {
    team: {
      stadium: {
        capacity: Number,
      },
      league: {},
      manager: Object
    },
    stats: {},
    gks: [],
    cbs: [],
    lbs: [],
    rbs: [],
    dms: [],
    cms: [],
    lms: [],
    rms: [],
    ams: [],
    lws: [],
    rws: [],
    sss: [],
    cfs: [],
    tab: 'home',
    panel: 'home',
    headerStyle: {},
    fieldStyle: {},
    fieldClass: {},
    signQuota: null,
    sellQuota: null,
    signList: Function,
    sellList: Function
  }
}

export default {
  name: 'Team',

  components: {
    Innouts,
    Fans,
    Articles,
    PlayerCard,
    SellForm,
    SignForm,
    Rating,
    Rumours
  },

  data: () => {
    return initialState()
  },

  computed: {
    loggedIn: function () {
      return this.$store.getters.loggedIn
    },

    user: function () {
      return this.$store.state.user
    }
  },

  meta () {
    return {
      title: this.team.name + ' - Innouts',

      meta: {
        description: { name: 'description', content: this.team.name + ' is a football club from ' + this.team.league.country + ' playing in the ' + this.team.league.name + '. Check the squad, latest transfers, rumours and analysis here.' },
        keywords: { name: 'keywords', content: [this.team.name, this.team.name + ' football club', this.team.stadium.name, this.team.name + ' transfers', this.team.name + ' transfer rumours', this.team.name + ' analysis'] },
      },
    }
  },

  watch: {
    $route () {
      this.setDisplay()
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('api/teams/' + to.params.team)
      .then(response => {
        next(vm => {
          vm.setData(response)
          next()
        })
      })
      .catch(error => {
        from.error = error
        next(false)
      })
  },

  beforeRouteUpdate (to, from, next) {
    axios.get('api/teams/' + to.params.team)
      .then(response => {
        this.reset()
        this.setData(response)
        next()
      })
      .catch(error => {
        this.$q.notify({ message: error.data.message })
        next(false)
      })
  },

  beforeCreate: function () {
    this.$q.loading.show({
      delay: 400 // ms
    })
  },

  created: function () {
    this.$store.commit('setRightDrawer', false)
    this.$q.loading.hide()
    this.setDisplay()
  },

  methods: {

    panelChange: function (newVal, oldVal) {
      if (newVal === 'business' && this.signQuota === null) {
        axios.get('api/sign-sell/' + this.user.id)
          .then(response => {
            this.signQuota = response.data.signQuota
            this.sellQuota = response.data.sellQuota
            this.signList = response.data.wanteds
            this.sellList = response.data.unwanteds
          })
          .catch(error => {
            this.$q.notify({ message: error.data.message })
          })
      }
    },

    setData: function (response) {
      this.team = response.data.team.info
      this.stats = response.data.team.stats
      this.headerStyle.backgroundImage = 'url(' + this.team.stadium.picture + ')'
      this.headerStyle.backgroundPosition = this.team.stadium.position
      this.team.players.forEach(element => {
        switch (element.specificPosition) {
          case 'GK':
            this.gks.push(element)
            break
          case 'CB':
            this.cbs.push(element)
            break
          case 'LB':
            this.lbs.push(element)
            break
          case 'RB':
            this.rbs.push(element)
            break
          case 'DM':
            this.dms.push(element)
            break
          case 'RM':
            this.rms.push(element)
            break
          case 'LM':
            this.lms.push(element)
            break
          case 'CM':
            this.cms.push(element)
            break
          case 'AM':
            this.ams.push(element)
            break
          case 'RW':
            this.rws.push(element)
            break
          case 'LW':
            this.lws.push(element)
            break
          case 'SS':
            this.sss.push(element)
            break
          case 'CF':
            this.cfs.push(element)
            break
          case null:
            switch (element.broadPosition) {
              case 'Defender':
                this.cbs.push(element)
                break
              case 'Midfielder':
                this.cms.push(element)
                break
              case 'Attacker':
                this.sss.push(element)
                break
            }
            break
        }
      })
    },

    setDisplay () {
      if (this.$q.screen.lt.lg) {
        this.fieldClass['pitch'] = true
        // this.fieldStyle.backgroundColor = '#03691b'
        this.fieldStyle.border = '5px solid #1a4870'
        this.headerStyle.minHeight = '200px'
      } else if (this.$q.screen.lt.md) {
        this.headerStyle.display = 'flex'
      } else {
        this.headerStyle.minHeight = '375px'
        this.fieldStyle.backgroundImage = 'url(/statics/images/pitch.png)'
      }
    },

    reset () {
      Object.assign(this.$data, this.$options.data.apply(this))
    },

    submitRating: function (value) {
      if (this.loggedIn) {
        this.$axios({ url: 'api/players/' + this.player.id, data: { userId: this.user.id, value: value }, method: 'PUT' })
          .then(response => {
            this.player.rating = value
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
    },

    submitManagerRating: function (value) {
      if (this.loggedIn) {
        this.$axios({ url: 'api/managers/' + this.team.manager.id, data: { userId: this.user.id, value: value }, method: 'PUT' })
          .then(response => {
            this.team.manager.rating = value
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

  },

}
</script>

<style lang="stylus">

#team-card
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;

  #team-logo-wrapper
      height: 215px;

  h1
    font-size: 2em;
    background-color:  rgba(46, 108, 224, 0.4);

#team-info

  table
    color: white;

#team-field
  background-size: cover;

#team-thumbnail-mobile
  width: 100px
  height: 100px

$yd = 90vh / 130
// yards

$pitchColor = #008c0e
.pitch
  background-color: $pitchColor
  background-image: repeating-linear-gradient($pitchColor, $pitchColor 10 * $yd, lighten($pitchColor, 2%) 10 * $yd, lighten($pitchColor, 2%) 20 * $yd)
  // box-shadow: 0 0 4 * $yd 4 * $yd $pitchColor
  left: 0
  right: 0
  overflow: hidden
  // position: absolute
  top: 0
  // transform: translate(-50%, -50%)
  // transition: all 1s ease-in-out
  // width can be anywhere from 50 to 100 yards
  // length (height) can be anywhere from 100 to 130 yards
  &.max
    height: (130 * $yd)
    width: (100 * $yd)
  &.min
    height: (100 * $yd)
    width: (50 * $yd)

</style>
