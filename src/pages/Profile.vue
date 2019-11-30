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

    <div class="row justify-around bg-primary q-py-md">
      <q-card dark flat bordered class="col-grow col-md-3 order-sm-first self-center bg-primary">
        <q-list dense dar >
          <q-item>
            <q-item-section avatar>
              <span class="emoji">&#128100;</span>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-capitalize" > {{user.name}} </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <span class="emoji">&#128467;</span>
            </q-item-section>
            <q-item-section>
              <q-item-label >
                Joined {{info.joined}}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <span class="emoji">&#128157;</span>
            </q-item-section>
            <q-item-section>
              <q-item-label >{{user.team.name}} fan since {{info.since}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <span class="emoji">&#128064;</span>
            </q-item-section>
            <q-item-section>
              <q-item-label >Seen {{user.lastSeen}} </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
      <div class="col-12 col-md-3 bg-secondar text-center q-pt-sm">
        <div v-if="user.intro">
          <p class="emoji text-capitalize q-mb-sm"><span>&#128220;</span></p>
          <q-separator color="secondary w-50 q-mx-auto"/>
          <p class="text-subtitle1 q-pa-sm text-secondary newsTitle">{{user.intro}}</p>
        </div>
      </div>
      <div class="col-grow col-md-3">
        <q-card flat class="column q-pa-m q-mx-auto bg-primary">
          <q-card-section class="text-h6 text-center bg-secondary rounded-borders bordered q-pa-sm">
            <span title="Achievements: fans will receive an extra in and out cards for each medal!" style='font-size:1.7rem;'>&#127942;</span>
          </q-card-section>
          <div class="q-pa-md">
            <div class="q-mb-sm q-gutter-x-xs text-center">
              <div v-if="user.level>1">
                <span v-for="el in Math.floor(user.level)" :key="el" color="red" size="2rem" class="emoji" title="1 medal = 1 in + 1 out cards">
                  &#127894;
                </span>
              </div>
              <div v-if="user.level<1" class="emoji" title="Rookie: level under 1"> &#129318;&#127996;</div>
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <div class="row justify-center q-my-lg">
      <div class="col-sm-2">
        <q-select dense rounded standout v-model="window" :options="windows"
          option-value="id" options-dense option-label="name" :display-value="`Window: ${window ? window.name : '*none*'}`"
          options-cover options-selected-class="text-accent" input-class="text-primary" class="text-primary"
        />
      </div>
    </div>

    <div class="row justify-center q-mb-lg" :class="fanTransfersRowClass">
      <div class="col-12 col-md-5">
        <q-table
          class="my-sticky-header-table"
          title="Ins"
          :data="wanteds"
          :columns="wantedColumns"
          row-key="id"
          rows-per-page-label="Players per page"
          :rows-per-page-options="[5,10,0]"
          color="primary"
          table-header-class="bg-green-2"
        >
          <template v-slot:top>
            <div class="q-table__control">
              <div class="q-table__title"><span class="emoji">&#128525;</span> In</div>
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
        </q-table>
      </div>
      <div class="col-grow col-md-5">
        <q-table
          class="my-sticky-header-table"
          title="Outs"
          :data="unwanteds"
          :columns="unwantedColumns"
          row-key="id"
          rows-per-page-label="Players per page"
          :rows-per-page-options="[5,10,0]"
          color="primary"
          table-header-class="bg-red-2"
        >
          <template v-slot:top>
            <div class="q-table__control">
              <div class="q-table__title"><span class="emoji">&#128548;</span> Out</div>
            </div>
          </template>
          <q-td slot="body-cell-name" slot-scope="value" :props="value">
            <router-link :to="'/players/' + value.value.id + '/' + value.value.slug" class="no-decor" >
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
        { name: 'team', align: 'center', label: 'Team', field: row => row.team },
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
      fanTransfersRowClass: {}
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
    axios.get('api/users/' + to.params.user)
      .then(response => {
        // this.$q.notify({ message: error.data.message })('here')
        next(vm => {
          // this.$q.notify({ message: error.data.message })('here1')
          vm.setData(response)
          next()
        })
      })
      .catch(error => {
        this.$q.notify({ message: error.data.message })
        next(false)
      })
    // next() // curse on you :)
  },

  beforeRouteUpdate (to, from, next) {
    axios.get('api/users/' + to.params.user)
      .then(response => {
        // this.reset()
        this.setData(response)
        this.window = null
        this.window = this.windows[0]
        next()
      })
      .catch(error => {
        this.$q.notify({ message: error.data.message })
        next(false)
      })
  },

  created: function () {
    this.$store.commit('setRightDrawer', false)

    this.$axios.get('api/windows')
      .then(response => {
        this.windows = response.data.visibleWindows
        this.windows.unshift(response.data.activeWindow)
        this.window = response.data.activeWindow
      })
      .catch(error => {
        this.$q.notify({ message: error.data.message })
      })
  },

  watch: {
    window: function () {
      this.$axios({ url: 'api/business', data: { userID: this.user.id, windowID: this.window.id }, method: 'POST' })
        .then(response => {
          this.wanteds = response.data.wanteds
          this.unwanteds = response.data.unwanteds
        })
        .catch(error => {
          this.$q.notify({ message: error.data.message })
        })
    }
  },

  methods: {
    setData: function (response) {
      this.user = response.data.data
      this.headerStyle.backgroundImage = 'url(' + this.user.team.stadium.picture + ')'
      this.headerStyle.backgroundPosition = this.user.team.stadium.position
      if (this.$q.screen.lt.md) {
        this.headerStyle.minHeight = '200px'
        this.headerStyle.display = 'flex'
        this.fanTransfersRowClass['q-gutter-y-sm'] = true
      } else {
        this.headerStyle.minHeight = '375px'
        this.fanTransfersRowClass['q-gutter-md'] = true
      }
      this.info.joined = date.formatDate(this.user.created_at.replace(/\s/, 'T') + 'Z', 'MMM, YYYY')
      this.info.since = date.formatDate(this.user.fanSince.replace(/\s/, 'T') + 'Z', 'MMM, YYYY')
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
