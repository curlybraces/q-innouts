<template>
  <q-page>
    <div id="team-header" class="row relative-position justify-around bg-accet" :style="headerStyle">
      <div id="profile-pic" class="ph-thumbs bg-secondary">
        <q-img contain :src="user.picture" alt="logo" class="fit" />
      </div>

      <div id="team-logo" class="ph-thumbs bg-secondary">
        <q-img contain :src="user.team.logo" :alt="user.team.name" class="fit" />
      </div>
    </div>

    <div class="row justify-around bg-primary q-gutter-x-md q-py-sm bordered">
      <q-card class="col-grow col-md-3 order-sm-first self-center bg-secondary bordered rounded-borders">
        <q-list dense dar >
          <q-item>
            <q-item-section avatar>
              <q-icon color="" name="perm_identity" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-capitalize" > {{user.name}} </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon color="" name="calendar_today" />
            </q-item-section>
            <q-item-section>
              <q-item-label >
                Joined {{info.joined}}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon color="" name="schedule" />
            </q-item-section>
            <q-item-section>
              <q-item-label >{{user.team.name}} fan since {{info.since}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon color="" name="remove_red_eye" />
            </q-item-section>
            <q-item-section>
              <q-item-label >Seen {{info.seen}} </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
      <div class="col-12 col-md-3 bg-secondar text-center q-pt-sm self-center">
        <div v-if="user.intro">
          <p class="text-h5 text-capitalize q-mb-sm"><span>&#128220;</span></p>
          <q-separator v-if="$q.platform.is.desktop" color="secondary"/>
          <p class="text-subtitle1 q-pa-sm text-secondary">{{user.intro}}</p>
        </div>
      </div>
      <div class="col-grow col-md-3  self-center">
        <q-card class="column q-pa-m bg-secondary bordered w-75 q-mx-auto">
          <div class="">
            <div class="text-h6 text-center bg-primary q-pa-sm">
              <span style='font-size:1.7rem;'>&#127941;</span>
            </div>
            <div class="q-pa-md">
              <div class="text-center q-mb-sm q-gutter-x-xs">
                <q-avatar v-for="el in 4" :key="el" color="primary" size="1.5rem" text-color="white" icon="stars" />
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <div class="row justify-center q-my-lg">
      <div class="col-sm-2">
        <q-select dense rounded standout v-model="window" :options="windows"
          option-value="id" option-label="name" :display-value="`Window: ${window ? window.name : '*none*'}`"
          dark bg-color="primary"
        />
      </div>
    </div>

    <div class="row justify-center q-mb-lg q-gutter-md">
      <div class="col-12 col-md-5">
        <q-table
          class="my-sticky-header-table"
          title="Ins"
          :data="wanteds"
          :columns="wantedColumns"
          hide-bottom
          row-key="id"
          rows-per-page-label="Transfers per page"
          :rows-per-page-options="[5,10,15]"
          color="primary"
          table-header-class="bg-green-2"
        >
          <q-td slot="body-cell-name" slot-scope="value" :props="value">
            <router-link :to="'/players/' + value.value.id" class="no-decor" >
              {{value.value.nickname}}
            </router-link>
          </q-td>
          <q-td slot="body-cell-team" slot-scope="value" :props="value">
            <router-link :to="'/teams/' + value.value.id" >
              <div id="" class="q-mx-auto team-thumbnail">
                <q-img :src="value.value.logo" :alt="value.value.name" class="full-height self-center" />
                  <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                    {{value.value.name}}
                  </q-tooltip>
              </div>
            </router-link>
          </q-td>
        </q-table>
      </div>
      <div class="col-grow col-md-5">
        <q-table
          class="my-sticky-header-table"
          title="Outs"
          :data="unwanteds"
          :columns="unwantedColumns"
          hide-bottom
          row-key="id"
          rows-per-page-label="Transfers per page"
          :rows-per-page-options="[5,10,15]"
          color="primary"
          table-header-class="bg-red-2"
        >
          <q-td slot="body-cell-name" slot-scope="value" :props="value">
            <router-link :to="'/players/' + value.value.id" class="no-decor" >
              {{value.value.nickname}}
            </router-link>
          </q-td>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import { date } from 'quasar'

export default {
  name: 'Profile',

  data () {
    return {
      user: {
        team: {}
      },
      window: Object,
      windows: [],
      headerStyle: {},
      wantedColumns: [
        { name: 'name', required: true, label: 'Player', align: 'left', field: row => row.player, sortable: true },
        { name: 'team', align: 'center', label: 'Team', field: row => row.targetTeam },
        { name: 'cards', align: 'center', label: 'Cards', field: row => row.priority, sortable: true },
      ],
      unwantedColumns: [
        { name: 'name', required: true, label: 'Player', align: 'left', field: row => row.player, sortable: true },
        { name: 'position', align: 'center', label: 'Position', field: row => row.player.broadPosition },
        { name: 'cards', align: 'center', label: 'Cards', field: row => row.priority, sortable: true },
      ],
      wanteds: [],
      unwanteds: [],
      info: {},
      date: new Date()
    }
  },

  meta () {
    return {
      title: this.user.name + ' - Innouts',

      meta: {
        description: { name: 'description', content: this.user.name + ' is an active ' + this.user.team.name + ' fan. See their Innouts activity right here!' },
        keywords: { name: 'keywords', content: [this.user.name, this.user.name + ' ' + this.user.team.name, this.user.name + ' football', this.user.name + ' Innouts'] },
      },
    }
  },

  beforeRouteEnter (to, from, next) {
    // console.log('beforeRouteEnter')
    axios.get('http://innouts.test/api/users/' + to.params.user)
      .then(response => {
        // console.log('here')
        next(vm => {
          // console.log('here1')
          vm.setData(response)
          next()
        })
      })
      .catch(error => {
        console.log(error)
        next(false)
      })
    // next() // curse on you :)
  },

  beforeRouteUpdate (to, from, next) {
    axios.get('http://innouts.test/api/users/' + to.params.user)
      .then(response => {
        // this.reset()
        this.setData(response)
        this.window = null
        this.window = this.windows[0]
        next()
      })
      .catch(error => {
        console.log(error)
        next(false)
      })
  },

  created: function () {
    this.$store.commit('setRightDrawer', false)

    this.$axios.get('http://innouts.test/api/windows')
      .then(response => {
        this.windows = response.data.visibleWindows
        this.windows.unshift(response.data.activeWindow)
        this.window = response.data.activeWindow
      })
      .catch(error => {
        this.error = error
      })
    // console.log('end of created hook')
  },

  watch: {
    window: function () {
      this.$axios({ url: 'http://innouts.test/api/business', data: { userID: this.user.id, windowID: this.window.id }, method: 'POST' })
        .then(response => {
          this.wanteds = response.data.wanteds
          this.unwanteds = response.data.unwanteds
        })
        .catch(error => {
          this.error = error
        })
    }
  },

  methods: {
    setData: function (response) {
      this.user = response.data.data
      this.headerStyle.backgroundImage = 'url(statics/' + this.user.team.stadium.picture + ')'
      this.headerStyle.backgroundPosition = this.user.team.stadium.position
      if (this.$q.screen.lt.md) {
        this.headerStyle.minHeight = '200px'
        this.headerStyle.display = 'flex'
      } else {
        this.headerStyle.minHeight = '375px'
      }
      this.info.joined = date.formatDate(this.user.created_at, 'MMM, YYYY')
      this.info.since = date.formatDate(this.user.fanSince, 'MMM, YYYY')
      let diff = date.getDateDiff(this.date, this.user.lastSeen, 'days')
      this.info.seen = diff < 1 ? 'today' : diff + ' day(s) ago'
    }
  }
}
</script>

<style lang="stylus">

#profile-pic
  left: 35%;

#team-logo
  right: 35%;

.ph-thumbs
  overflow: hidden;
  width: 100px;
  height: 100px;
  position:absolute;
  bottom: -5%;
  border-radius: 10%;
  border: solid black;

  img
    display: block;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

@media screen and (max-width: 700px)
  .ph-thumbs
    width: 55px;
    height: 55px;

  #profile-pic
    left: 30%;

  #team-logo
    right: 30%;

</style>
