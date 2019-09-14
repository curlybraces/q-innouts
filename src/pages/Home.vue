<template>
  <q-page>
    <div id="team-header" class="row relative-position justify-around bg-accet" :style="headerStyle">
      <div id="profile-pic" class="ph-thumbs bg-secondary">
        <q-img contain :src="'statics/images/anonymous-user.png'" alt="logo" class="fit" />
      </div>

      <div id="team-logo" class="ph-thumbs bg-secondary">
        <q-img contain :src="'statics/'+this.user.team.logo" :alt="this.user.team.name" class="fit" />
      </div>
    </div>

    <div class="row justify-around bg-primary q-gutter-x-md q-py-sm bordere">
      <div class="col-grow col-md-3 order-sm-first text-center bordere rounded-borders">
        <p class="text-h5 text-capitalize q-mb-sm"><span>&#9997;</span></p>
        <q-separator v-if="$q.platform.is.desktop" color="secondary"/>
        <p class="text-subtitle1 q-pa-sm text-secondary">
          {{user.intro}}
          <q-popup-edit buttons :value="user.intro" @save="saveIntro" @cancel="cancelIntro" >
            <q-input maxlength="100" type="textarea" v-model="user.intro" dense autofocus counter @keyup.enter.stop />
          </q-popup-edit>
        </p>
      </div>
      <div class="col-grow col-md-3 bg-secondar text-center q-pt-s self-center">
      </div>
      <div class="col-grow col-md-3  self-center">
        <q-card class="column q-pa-m bg-secondary bordered self-cente w-75 q-mx-auto">
          <div class="">
            <div class="text-h6 text-center bg-primary q-pa-sm">
              <span style='font-size:1.7rem;'>&#127941;</span>
            </div>
            <div class="q-pa-md">
              <div class="text-center q-mb-sm q-gutter-x-xs">
                <q-avatar v-for="el in 4" :key="el" color="red" size="1.5rem" text-color="white" icon="stars" />
              </div>
              <div class="q-mt-md">
                Till next level
                <q-linear-progress :value="4/5" color="primary" class="q-mt-sm" />
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
          row-key="name"
          rows-per-page-label="Transfers per page"
          :rows-per-page-options="[5,10,15]"
          color="primary"
          table-header-class="bg-green-2"
          hide-bottom
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="player" :props="props">
                <router-link :to="'/players/' + props.row.player.id" class="no-decor" >
                  {{props.row.player.nickname}}
                </router-link>
              </q-td>
              <q-td key="team" :props="props">
                <router-link :to="'/teams/' + props.row.targetTeam.id" >
                  <div id="" class="q-mx-auto team-thumbnail">
                    <q-img :src="'statics/' + props.row.targetTeam.logo" :alt="props.row.targetTeam.name" class="full-height self-center" />
                      <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
                        {{props.row.targetTeam.name}}
                      </q-tooltip>
                  </div>
                </router-link>
              </q-td>
              <q-td key="cards" :props="props">
                {{ props.row.priority }}
                <q-popup-edit :value="props.row.priority" :disable="window.wishArchived" :validate="validate"  @save="saveCards($event, props.row.id, 'ins')" @input="cancelCards($event, props.row.__index, 'ins')"   title="Update cards" buttons persisten>
                  <q-input type="number" v-model="props.row.priority" hint="between 0 and 4" :rules="[ val => val <= 4 && val >= 0 || 'Wrong number of cards' ]" dense autofocus counter />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <div class="col-grow col-md-5">
        <q-table
          class="my-sticky-header-table"
          title="Outs"
          :data="unwanteds"
          :columns="unwantedColumns"
          row-key="id"
          rows-per-page-label="Transfers per page"
          :rows-per-page-options="[5,10,15]"
          color="primary"
          table-header-class="bg-red-2"
          hide-bottom
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="player" :props="props">
                <router-link :to="'/players/' + props.row.player.id" class="no-decor" >
                  {{props.row.player.nickname}}
                </router-link>
              </q-td>
              <q-td key="position" :props="props">
                {{props.row.player.broadPosition}}
              </q-td>
              <q-td key="cards" :props="props">
                {{ props.row.priority }}
                <q-popup-edit :value="props.row.priority" :disable="window.wishArchived" :validate="validate"  @save="saveCards($event, props.row.id, 'outs')" @input="cancelCards($event, props.row.__index, 'outs')"   title="Update cards" buttons persisten>
                  <q-input type="number" v-model="props.row.priority" hint="between 0 and 4" :rules="[ val => val <= 4 && val >= 0 || 'Wrong number of cards' ]" dense autofocus counter />
                </q-popup-edit>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'Home',

  data () {
    return {
      window: Object,
      windows: Array,
      headerStyle: {},
      team: Object,
      wantedColumns: [
        { name: 'player', required: true, label: 'Player', align: 'left', field: row => row.player, sortable: true },
        { name: 'team', align: 'center', label: 'Team', field: row => row.targetTeam },
        { name: 'cards', align: 'center', label: 'Cards', field: row => row.priority, sortable: true },
      ],
      unwantedColumns: [
        { name: 'player', required: true, label: 'Player', align: 'left', field: row => row.player, sortable: true },
        { name: 'position', align: 'center', label: 'Position', field: row => row.player.broadPosition },
        { name: 'cards', align: 'center', label: 'Cards', field: row => row.priority, sortable: true },
      ],
      wanteds: [],
      unwanteds: [],
      info: {},
      date: new Date()
    }
  },

  computed: {
    user: function () {
      return this.$store.state.user
    }
  },

  created: function () {
    // alert('created')
    this.$store.commit('setRightDrawer', false)
    this.team = this.user.team
    this.headerStyle.backgroundImage = 'url(statics/' + this.user.team.stadium.picture + ')'
    this.headerStyle.backgroundPosition = this.team.stadium.position
    if (this.$q.screen.lt.md) {
      this.headerStyle.minHeight = '200px'
      this.headerStyle.display = 'flex'
    } else {
      this.headerStyle.minHeight = '375px'
    }

    this.$axios.get('http://innouts.test/api/windows')
      .then(response => {
        this.windows = response.data.visibleWindows
        this.windows.unshift(response.data.activeWindow)
        this.window = response.data.activeWindow
      })
      .catch(error => {
        this.error = error
      })
    this.info.joined = date.formatDate(this.user.created_at, 'MMM, YYYY')
    this.info.since = date.formatDate(this.user.fanSince, 'MMM, YYYY')
    let diff = date.getDateDiff(this.date, this.user.lastSeen, 'days')
    this.info.seen = diff < 1 ? 'today' : diff + ' day(s) ago'
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
      this.user = response.data
    },

    saveIntro: function (value, initialValue) {
      this.$axios({ url: 'http://innouts.test/api/users/' + this.user.id, data: { newIntro: value }, method: 'PUT' })
        .then(response => {
          console.log(response.data)
        })
        .catch(err => console.log(err))
    },

    cancelIntro: function (value, initialValue) {
      this.user.intro = initialValue
    },

    saveCards: function (event, id, insOuts) {
      if (insOuts === 'ins') {
        if (this.sumCards('ins') <= 4) {
          this.$axios({ url: 'http://innouts.test/api/wanteds/' + id, data: { userID: this.user.id, newPriority: event }, method: 'PUT' })
            .then(response => {
              console.log(response.data)
            })
            .catch(err => console.log(err))
        } else {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'More than a total of 4 cards used!'
          })
        }
      } else {
        if (this.sumCards('outs') <= 4) {
          this.$axios({ url: 'http://innouts.test/api/unwanteds/' + id, data: { userID: this.user.id, newPriority: event }, method: 'PUT' })
            .then(response => {
              console.log(response.data)
            })
            .catch(err => console.log(err))
        } else {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'More than a total of 4 cards used!'
          })
        }
      }
    },

    cancelCards: function (initVal, idx, insOuts) {
      if (insOuts === 'ins') {
        this.wanteds[idx].priority = initVal
      } else {
        this.unwanteds[idx].priority = initVal
      }
    },

    sumCards: function (insOuts) {
      if (insOuts === 'ins') {
        let sum = 0
        this.wanteds.forEach(el => {
          sum += parseInt(el.priority)
        })
        return sum
      } else {
        let sum = 0
        this.unwanteds.forEach(el => {
          sum += parseInt(el.priority)
        })
        return sum
      }
    },

    validate: (val) => {
      return val >= 0 && val <= 4
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
