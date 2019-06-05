<template>
  <q-page >
    <div id="team-header" class="bg-secondry q-pa-sm" :style="headerStyle">
      <div class="row justify-center">
        <div class="col-sm-3">
          <div id="team-card" class="rounded-borders">
            <div id="team-logo-wrapper">
              <img :src="'statics/'+team.logo" alt="logo" class="full-height m-auto">
            </div>
            <h4 class="text-uppercase q-mt-sm q-mb-none" :style="{backgroundColor: team.color}"> <span>{{team.name}} </span></h4>
            <!-- <p><button id="url-button" class="border-0 w-100 text-light p-1"> <i class="fas fa-globe"></i> <a href="http://" target="_blank"></a></button></p> -->
          </div>
        </div>
        <div class="col-sm-3">
          <q-markup-table flat dense id="team-info" separator="none">
            <tbody>
              <tr>
                <td class="text-left">Founded</td>
                <td class="text-right">{{team.founded}}</td>
              </tr>
              <tr>
                <td class="text-left">Internationalization</td>
                <td class="text-right">34</td>
              </tr>
              <tr>
                <td class="text-left">Average Squad Age</td>
                <td class="text-right">27</td>
              </tr>
              <tr>
                <td class="text-left">Averge Squad Score</td>
                <td class="text-right">7</td>
              </tr>
              <tr>
                <td class="text-left">Major Trophies Won</td>
                <td class="text-right">10</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
        <div class="col-sm-3">third</div>
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

    <q-tab-panels v-model="tab" swipeable animated @before-transition="panelChange"
     class="shadow-2 rounded-borders"
     >
      <q-tab-panel name="home">
        <div class="row justify-center q-mx-auto">
          <div id="team-field" class="col-md-11 q-px-sm">
            <!-- Goalkeepers -->
            <div class="row justify-center q-my-lg q-mx-none">
              <div v-for="player in gks" :key="player.id" class="col-lg-1 col-sm-2 q-px-sm">
                <div class="player-card">
                  <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
                  <div class="text-center bg-t-dark border-bottom border-dark text-truncate text-weight-bold">
                    <a href="">
                      <!-- <b title="{{ $player->fullName()}}">{{ $player->nickname}}</b> -->
                      {{player.nickname}}
                      <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{player.firstName}} {{player.lastName}}
                      </q-tooltip>
                    </a>
                  </div>
                  <div class="text-center bg-t-dark">
                    <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
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
                      <div class="text-center bg-t-dark border-bottom border-dark text-truncate text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
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
                      <div class="text-center bg-t-dark border-bottom border-dark text-truncate text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
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
                      <div class="text-center bg-t-dark border-bottom border-dark text-truncate text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
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
                  <div class="text-center bg-t-dark border-bottom border-dark text-truncate text-weight-bold">
                    <a href="">
                      <!-- <b title="{{ $player->fullName()}}">{{ $player->nickname}}</b> -->
                      {{player.nickname}}
                      <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{player.firstName}} {{player.lastName}}
                      </q-tooltip>
                    </a>
                  </div>
                  <div class="text-center bg-t-dark">
                    <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
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
                      <div class="text-center bg-t-dark border-bottom border-dark text-truncate text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
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
                      <div class="text-center bg-t-dark border-bottom border-dark text-truncate text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
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
                      <div class="text-center bg-t-dark border-bottom border-dark text-truncate text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
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
                  <div class="text-center bg-t-dark border-bottom border-dark text-truncate text-weight-bold">
                    <a href="">
                      <!-- <b title="{{ $player->fullName()}}">{{ $player->nickname}}</b> -->
                      {{player.nickname}}
                      <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{player.firstName}} {{player.lastName}}
                      </q-tooltip>
                    </a>
                  </div>
                  <div class="text-center bg-t-dark">
                    <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
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
                      <div class="text-center bg-t-dark border-bottom border-dark text-truncate text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
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
                      <div class="text-center bg-t-dark border-bottom border-dark text-truncate text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
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
                      <div class="text-center bg-t-dark border-bottom border-dark text-truncate text-weight-bold">
                        <a href="">
                          {{player.nickname}}
                          <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                              {{player.firstName}} {{player.lastName}}
                          </q-tooltip>
                        </a>
                      </div>
                      <div class="text-center bg-t-dark">
                        <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
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
                  <div class="text-center bg-t-dark border-bottom border-dark text-truncate text-weight-bold">
                    <a href="">
                      <!-- <b title="{{ $player->fullName()}}">{{ $player->nickname}}</b> -->
                      {{player.nickname}}
                      <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                          {{player.firstName}} {{player.lastName}}
                      </q-tooltip>
                    </a>
                  </div>
                  <div class="text-center bg-t-dark">
                    <q-rating color="blue" icon="star" class="q-mx-auto q-my-none" size="1rem" v-model="player.rating" :max="5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- manager -->
        <div class="row q-my-sm">
          <div class="col-sm-4 col-md-3 col-lg-2 offset-sm-1">
            <q-card dark class="">
              <q-card-section class="bg-primary text-center">
                Manager
              </q-card-section>
              <q-card-section class="q-mt-sm">
                <div>
                  <q-img :src="'statics/' + team.manager.picture" alt="" class="img-thumbnail" />
                    <div class="text-center text-black border-bottom border-dark text-truncate text-weight-bold">
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
        <div class="row justify-center">
          <div class="col-sm-11">
            <div class="row justify-center q-pa-md">
              <div class="col-sm-2">
                <q-select dense rounded standout v-model="window" :options="windows"
                      option-value="id" option-label="name" :display-value="`Window: ${window ? window.name : '*none*'}`"
                      dark bg-color="primary"
                />
              </div>
            </div>
            <h6 class="text-center q-my-md">Official Transfers</h6>
            <div class="row">
              <div class="col">
                <div class="q-pa-md">
                  <q-table
                    class="my-sticky-header-table"
                    title="Ins"
                    :data="transfers"
                    :columns="transferInColumns"
                    row-key="id"
                    rows-per-page-label="Transfers per page"
                    :pagination.sync="myPagination"
                    :rows-per-page-options="[10,15,20,0]"
                    :loading="loading"
                    color="primary"
                    table-header-class="bg-primary text-white"
                  />
                </div>
              </div>
              <div class="col">
                <div class="q-pa-md">
                  <q-table
                    class="my-sticky-header-table"
                    title="Outs"
                    :data="transfers"
                    :columns="transferOutColumns"
                    row-key="id"
                    rows-per-page-label="Transfers per page"
                    :pagination.sync="myPagination"
                    :rows-per-page-options="[10,15,20,0]"
                    :loading="loading"
                    color="primary"
                    table-header-class="bg-primary text-white"
                  />
                </div>
              </div>
            </div>
            <hr>
            <h6 class="text-center q-my-md">Fans' Transfers!</h6>
            <div class="row">
              <div class="col">
                <div class="q-pa-md">
                  <q-table
                    class="my-sticky-header-table"
                    title="Ins"
                    :data="transfers"
                    :columns="wantedColumns"
                    row-key="id"
                    rows-per-page-label="Transfers per page"
                    :pagination.sync="myPagination"
                    :rows-per-page-options="[10,15,20,0]"
                    :loading="loading"
                    color="primary"
                    table-header-class="bg-primary text-white"
                  />
                </div>
              </div>
              <div class="col">
                <div class="q-pa-md">
                  <q-table
                    class="my-sticky-header-table"
                    title="Outs"
                    :data="transfers"
                    :columns="unwantedColumns"
                    row-key="id"
                    rows-per-page-label="Transfers per page"
                    :pagination.sync="myPagination"
                    :rows-per-page-options="[10,15,20,0]"
                    :loading="loading"
                    color="primary"
                    table-header-class="bg-primary text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="chat">
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel name="news">
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Team',

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
      tab: 'home',
      panel: 'home',
      headerStyle: {
        // backgroundImage: null,
        // backgroundPosition: this.team.stadium.position
      },
      transferInColumns: [
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
        { name: 'date', align: 'center', label: 'Date', field: row => row.date, sortable: true },
        { name: 'fee', align: 'center', label: 'Fee (m£)', field: row => row.fee, sortable: true },
        { name: 'rating', align: 'center', label: 'Rating', field: row => row.rating, sortable: true },
      ],
      transferOutColumns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player.nickname,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'to', align: 'center', label: 'To', field: row => row.to },
        { name: 'date', align: 'center', label: 'Date', field: row => row.date, sortable: true },
        { name: 'fee', align: 'center', label: 'Fee (m£)', field: row => row.fee, sortable: true },
        { name: 'rating', align: 'center', label: 'Rating', field: row => row.rating, sortable: true },
      ],
      wantedColumns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player.nickname,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'team', align: 'center', label: 'Team', field: row => row.team.name },
        { name: 'cards', align: 'center', label: 'Cards', field: row => row.date, sortable: true },
      ],
      unwantedColumns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player.nickname,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'position', align: 'center', label: 'Position', field: row => row.broadPosition },
        { name: 'cards', align: 'center', label: 'Cards', field: row => row.date, sortable: true },
      ],
      windows: [],
      window: null,
    }
  },

  // computed: {
  //   headerStyle: function () {
  //     return {
  //       backgroundImage: this.team.stadium.picture,
  //       backgroundPosition: this.team.stadium.position
  //     }
  //   }
  // },

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
  },

  methods: {
    tabChange: function (value) {
      // alert('hey')
    },
    panelChange: function (newVal, oldVal) {
      if (newVal === 'innouts' && this.windows.length === 0) {
        this.$q.loading.show()
        axios.get('http://innouts.test/api/windows')
          .then(response => {
            this.windows = response.data.data
            this.window = this.windows[0]
            this.transfers = this.window.transfers
            this.loading = false
            this.$q.loading.hide()
          })
          .catch(error => {
            this.error = error
          })
      }
    }
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

#team-header
  min-height: 385px;
  background-size: cover;
  // background-image: url("statics/images/stadia/stamford-bridge.jpg")
  // color: white;

#team-card
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
  margin: 0;
  background-color: rgba(0, 31, 65, 0.55);

  #team-logo-wrapper
      height: 215px;
      max-width: 60%;
      margin: auto;

  h1
    font-size: 2em;
    background-color:  rgba(46, 108, 224, 0.4);

#team-info

  table
    color: white;
    background-color: rgba(0, 31, 63, 0.3);
    width: 60%;

    th, td
      padding: 0.2rem;

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
  background-image: url(/statics/images/pitch.png);
  background-size: cover;

</style>
