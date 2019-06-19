<template>
  <q-page >
    <div id="team-header" class="bg-secondry q-pa-s text-white" :style="headerStyle">
      <div v-if="$q.screen.gt.md" class="row justify-center">
        <div class="col relative-position">
          <div class="d-inline-block q-ml-sm">
            <div class="rope border-right border-left border-dark"></div>
            <div class="border-x border-y border-dark q-pa-xs bg-grass text-white text-caption">Seats {{team.stadium.capacity}}</div>
          </div>
        </div>
        <div class="col relative-position">
          <div class="d-inline-block absolute-center">
            <div class="rope border-right border-left border-dark"></div>
            <div class="border-x border-y border-dark q-pa-xs bg-grass text-white text-caption"> {{team.stadium.name}}</div>
          </div>
        </div>
        <div class="col relative-position">
          <div class="d-inline-block absolute-right q-mr-sm">
            <div class="rope border-right border-left border-dark"></div>
            <div class="border-x border-y border-dark q-pa-xs bg-grass text-white text-caption">Built {{team.stadium.built}}</div>
          </div>
        </div>
      </div>
      <div class="row q-pa-md q-mt-sm">
        <div class="col-12 col-grow col-sm-4 col-md-3 q-ml-auto">
          <div id="team-card" class="rounded-borders bg-t-darker">
            <div id="team-logo-wrapper">
              <q-img contain  :src="'statics/'+team.logo" alt="logo" class="fit" />
            </div>
            <p class="text-h5 text-uppercase q-mt-sm q-mb-none" :style="{backgroundColor: team.color}"> <span>{{team.name}} </span></p>
          </div>
        </div>
        <div class="col-grow col-sm-6 col-md-5 q-mr-auto">
          <div class="row">
            <div id="team-info" class="col-grow col-md-8 col-lg-6 rounded-borders bg-t-darker">
              <q-list dense dark class="">
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
                    <q-item-label >30%</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label >Average squad age</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label >20</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label >Average squad score</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label >5.5/10</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label >Major trophies won</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label >12</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>

          <div v-if="team.trophiesWon" class="row">
            <div id="trophiesCol" class="col-grow col-lg-6 col-md-8 rounded-borders bg-t-darker">
              <table id="trophy-table" class="table table-sm table-borderless mx-auto mx-sm-0 q-mb-sm">
                <thead>
                  <tr id="trophy-cabinet">
                    <th v-if="team.trophyCabinet.cls" class="trophy ">
                      <q-img class="full-height" title="Champions League" :src="'statics/images/trophies/champions-league.png'" alt="champions league trophy thumbnail"
                        position="50% 100%" sizes="280px, 440px"
                      />
                      <q-badge align="bottom" :style="{backgroundColor: team.color}" text-color="blac" :label="team.trophyCabinet.cls+'x'" />
                    </th>
                    <th v-if="team.trophyCabinet.ls" class="trophy ">
                      <q-img class="full-height" :title="team.league.name" :src="'statics/' + team.league.leagueTrophyPic" :alt="team.league.name + 'trophy thumbnail'"/>
                      <q-badge align="bottom" :style="{backgroundColor: team.color}" :label="team.trophyCabinet.ls+'x'" />
                    </th>
                    <th v-if="team.trophyCabinet.ffts" class="trophy ">
                      <q-img class="full-height" :title="team.league.fftName" :src="'statics/' + team.league.fftTrophyPic" :alt="team.league.fftName + 'trophy thumbnail'"/>
                      <q-badge align="bottom" :style="{backgroundColor: team.color}" :label="team.trophyCabinet.ffts+'x'" />
                    </th>
                    <th v-if="team.trophyCabinet.els" class="trophy ">
                      <q-img class="full-height" title="Europa League" :src="'statics/images/trophies/europa-league.png'" alt="europa league trophy thumbnail"/>
                      <q-badge align="bottom" :style="{backgroundColor: team.color}" :label="team.trophyCabinet.els+'x'" />
                    </th>
                    <th v-if="team.trophyCabinet.cs" class="trophy ">
                      <q-img class="full-height" :title="team.league.cupName" :src="'statics/' + team.league.cupTrophyPic" :alt="team.league.cupName + 'trophy thumbnail'"/>
                      <q-badge align="bottom" :style="{backgroundColor: team.color}" :label="team.trophyCabinet.cs+'x'" />
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
        <div v-if="$q.screen.gt.md" class="col-sm-3 q-mr-auto">
          <fans :team="team" />
        </div>
      </div>
    </div>
    <q-tabs
      v-model="tab" dense inline-label @input="tabChange"
      class="bg-primary text-white shadow-2"
    >
      <q-tab name="home" icon="group_work" label="Team" />
      <q-tab name="innouts" icon="swap_horiz" label="Innouts" />
      <q-tab name="chat" icon="chat" label="Chat" />
      <q-tab name="news" icon="info" label="News" />
    </q-tabs>

    <q-tab-panels keep-alive v-model="tab" swipeable animated @before-transition="panelChange"
     class="shadow-2 rounded-borders"
     >
      <q-tab-panel name="home">
        <div class="row justify-center q-mx-auto">
          <div id="team-field" class="col-md-11 q-px-sm" :style="fieldStyle">
            <!-- Goalkeepers -->
            <div class="row justify-center q-my-lg q-mx-none">
              <div v-for="player in gks" :key="player.id" class="col-lg-1 col-sm-2 q-px-sm">
                <div class="player-card">
                  <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                  <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                    <a href="">
                      <!-- <b title="{{ $player->fullName()}}">{{ $player->nickname}}</b> -->
                      {{player.nickname}}
                      <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{player.firstName}} {{player.lastName}}
                      </q-tooltip>
                    </a>
                  </div>
                  <div class="text-center bg-t-dark">
                    <q-rating :style="{color: team.color}" icon="star" class="q-mx-auto q-my-none" size="1rem" :value="player.rating" :max="5" />
                  </div>
                </div>
              </div>
            </div>
            <!-- Defenders -->
            <div class="row justify-center q-my-lg q-mx-none">
              <!-- RB -->
              <div class="col-lg-3 col-sm-4 order-lg-1 order-2">
                <div class="row justify-center">
                  <div v-for="player in rbs" :key="player.id" class="col-lg-4 col-sm-6 q-px-sm">
                    <div class="player-card">
                      <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                      <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" :value="player.rating" :max="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- CB -->
              <div class="col-lg-6 order-lg-2 order-1">
                <div class="row justify-center">
                  <div v-for="player in cbs" :key="player.id" class="col-sm-2 q-px-sm">
                    <div class="player-card">
                      <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                      <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" :value="player.rating" :max="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- LB -->
              <div class="col-lg-3 col-sm-4 order-sm-3 order-3">
                <div class="row justify-center">
                  <div v-for="player in lbs" :key="player.id" class="col-lg-4 col-sm-6 q-px-sm">
                    <div class="player-card">
                      <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                      <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" :value="player.rating" :max="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Defensive Midfielders -->
            <div class="row justify-center q-my-lg q-mx-none">
              <div v-for="player in dms" :key="player.id" class="col-lg-1 col-sm-2 q-px-sm">
                <div class="player-card">
                  <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                  <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                    <a href="">
                      <!-- <b title="{{ $player->fullName()}}">{{ $player->nickname}}</b> -->
                      {{player.nickname}}
                      <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{player.firstName}} {{player.lastName}}
                      </q-tooltip>
                    </a>
                  </div>
                  <div class="text-center bg-t-dark">
                    <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" :value="player.rating" :max="5" />
                  </div>
                </div>
              </div>
            </div>
            <!-- Midfielders -->
            <div class="row justify-center q-my-lg q-mx-none">
              <!-- RM -->
              <div class="col-lg-3 col-sm-4 order-lg-1 order-2">
                <div class="row justify-center">
                  <div v-for="player in rms" :key="player.id" class="col-lg-4 col-sm-6 q-px-sm">
                    <div class="player-card">
                      <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                      <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" :value="player.rating" :max="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- CM -->
              <div class="col-lg-6 order-lg-2 order-1">
                <div class="row justify-center">
                  <div v-for="player in cms" :key="player.id" class="col-sm-2 q-px-sm">
                    <div class="player-card">
                      <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                      <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" :value="player.rating" :max="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- LM -->
              <div class="col-lg-3 col-sm-4 order-sm-3 order-3">
                <div class="row justify-center">
                  <div v-for="player in lms" :key="player.id" class="col-lg-4 col-sm-6 q-px-sm">
                    <div class="player-card">
                      <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                      <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" :value="player.rating" :max="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Attacking Midfielders -->
            <div class="row justify-center q-my-lg q-mx-none">
              <div v-for="player in ams" :key="player.id" class="col-lg-1 col-sm-2 q-px-sm">
                <div class="player-card">
                  <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                  <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                    <a href="">
                      <!-- <b title="{{ $player->fullName()}}">{{ $player->nickname}}</b> -->
                      {{player.nickname}}
                      <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{player.firstName}} {{player.lastName}}
                      </q-tooltip>
                    </a>
                  </div>
                  <div class="text-center bg-t-dark">
                    <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" :value="player.rating" :max="5" />
                  </div>
                </div>
              </div>
            </div>
            <!-- first line attackers (LWF, SS, RWF) -->
            <div class="row justify-center q-my-lg q-mx-none">
              <!-- RWF -->
              <div class="col-lg-3 col-sm-4 order-lg-1 order-2">
                <div class="row justify-center">
                  <div v-for="player in rws" :key="player.id" class="col-lg-4 col-sm-6 q-px-sm">
                    <div class="player-card">
                      <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                      <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" :value="player.rating" :max="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- SS -->
              <div class="col-lg-6 order-lg-2 order-1">
                <div class="row justify-center">
                  <div v-for="player in sss" :key="player.id" class="col-sm-2 q-px-sm">
                    <div class="player-card">
                      <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                      <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" :value="player.rating" :max="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- LWF -->
              <div class="col-lg-3 col-sm-4 order-sm-3 order-3">
                <div class="row justify-center">
                  <div v-for="player in lws" :key="player.id" class="col-lg-4 col-sm-6 q-px-sm">
                    <div class="player-card">
                      <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                      <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" :value="player.rating" :max="5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- second line attackers (CF) -->
            <div class="row justify-center q-my-lg q-mx-none">
              <div v-for="player in cfs" :key="player.id" class="col-lg-1 col-sm-2 q-px-sm">
                <div class="player-card">
                  <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                  <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
                    <a href="">
                      <!-- <b title="{{ $player->fullName()}}">{{ $player->nickname}}</b> -->
                      {{player.nickname}}
                      <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{player.firstName}} {{player.lastName}}
                      </q-tooltip>
                    </a>
                  </div>
                  <div class="text-center bg-t-dark">
                    <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" :value="player.rating" :max="5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- manager -->
        <div class="row q-my-sm">
          <div class="col-grow col-sm-4 col-md-3 col-lg-2 offset-sm-1">
            <q-card dark class="">
              <q-card-section class="bg-primary text-center">
                Manager
              </q-card-section>
              <q-card-section class="q-mt-sm">
                <div>
                  <q-img :src="'statics/' + team.manager.picture" alt="" class="img-thumbnail" />
                    <div class="text-center text-black border-bottom border-dark ellipsis text-weight-bold">
                      {{team.manager.displayName}}
                      <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{team.manager.firstName}} {{team.manager.lastName}}
                      </q-tooltip>
                    </div>
                    <div class="text-center bg-t-dark">
                      <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="team.manager.rating" :max="5" />
                    </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="innouts">
        <innouts :team="team" />
      </q-tab-panel>

      <q-tab-panel name="chat">
        <chat />
      </q-tab-panel>

      <q-tab-panel name="news">
        <news :news="news" />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import axios from 'axios'
const Innouts = () => import('components/Innouts.vue')
const Chat = () => import('components/Chat.vue')
const Fans = () => import('components/Fans.vue')
const News = () => import('components/News.vue')

export default {
  name: 'Team',

  components: {
    Innouts,
    Chat,
    Fans,
    News,
  },

  data () {
    return {
      team: null,
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
      news: [],
      tab: 'home',
      panel: 'home',
      headerStyle: {},
      fieldStyle: {},
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('http://innouts.test/api/teams/' + to.params.team)
      .then(response => {
        next(vm => {
          vm.team = response.data.data
          vm.headerStyle.backgroundImage = 'url(statics/' + vm.team.stadium.picture + ')'
          vm.headerStyle.backgroundPosition = vm.team.stadium.position
          vm.team.players.forEach(element => {
            // alert(element)
            switch (element.specificPosition) {
              case 'GK':
                vm.gks.push(element)
                break
              case 'CB':
                vm.cbs.push(element)
                break
              case 'LB':
                vm.lbs.push(element)
                break
              case 'RB':
                vm.rbs.push(element)
                break
              case 'DM':
                vm.dms.push(element)
                break
              case 'RM':
                vm.rms.push(element)
                break
              case 'LM':
                vm.lms.push(element)
                break
              case 'CM':
                vm.cms.push(element)
                break
              case 'AM':
                vm.ams.push(element)
                break
              case 'RW':
                vm.rws.push(element)
                break
              case 'LW':
                vm.lws.push(element)
                break
              case 'SS':
                vm.sss.push(element)
                break
              case 'CF':
                vm.cfs.push(element)
                break
            }
          })
        })
      })
      .catch(error => {
        from.error = error
        next(false)
      })
  },

  beforeCreate: function () {
    this.$q.loading.show({
      delay: 400 // ms
    })
  },

  created: function () {
    this.$emit('sendView', ['hhh lpR fff', false, false])
    this.$q.loading.hide()
    if (this.$q.screen.lt.md) {
      this.fieldStyle.backgroundColor = '#21BA45'
    } else {
      this.fieldStyle.backgroundImage = 'url(/statics/images/pitch.png)'
    }
  },

  methods: {
    tabChange: function (value) {
      // alert('hey')
    },

    panelChange: function (newVal, oldVal) {
      // if (newVal === 'innouts' && this.windows.length === 0) {
      // fetch the news and fill the array
      // }
    },

  },

  watch: {

  }
}
</script>

<style lang="stylus">

#team-card
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
  // margin: 0;

  #team-logo-wrapper
      height: 215px;
      // max-width: 60%;
      // margin: auto;

  h1
    font-size: 2em;
    background-color:  rgba(46, 108, 224, 0.4);

#team-info

  table
    color: white;

    th, td
      // padding: 0.2rem;

.player-card
  margin-bottom: 1rem;

  a
    text-decoration: none;
    color: #000;

  img
    display: block;
    width: 180px;
    height: 180px;
    margin: auto;

  .img-thumbnail
    padding: .25rem;
    background-color: #f5f8fa;
    border: 1px solid #dee2e6;
    border-radius: .25rem;

#team-field
  // background-image: url(/statics/images/pitch.png);
  background-size: cover;

#trophy-table
  width: auto;

  th
    max-width: 3rem;

.trophy img
  // display: block;
  // max-width: 100%;
  // max-height: 100%;
  // margin: auto;

</style>
