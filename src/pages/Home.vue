<template>
  <q-page>
    <div v-if="user.team_id">
      <div id="team-header" class="row relative-position justify-around bg-accet" :style="headerStyle">
        <div id="profile-pic" class="ph-thumbs bg-secondary">
          <q-img contain :src="user.picture" alt="logo" class="fit" />
        </div>

        <div id="team-logo" class="ph-thumbs bg-secondary">
          <q-img contain :src="user.team.logo" :alt="user.team.name" class="fit" />
        </div>
      </div>

      <div class="row justify-around bg-primary q-py-sm">
        <q-card flat dark class="col-grow col-md-3 order-sm-first text-center q-mt-md bg-primary">
          <q-card-section class="text-h5 text-capitalize q-pa-sm bg-secondary"><span>&#128221;</span></q-card-section>
          <q-separator v-if="$q.platform.is.desktop" color="secondary"/>
          <p class="text-subtitle1 q-pa-sm">
            {{user.intro}}
            <span v-if="!user.intro">click to write!</span>
            <q-popup-edit buttons :value="user.intro" @save="saveIntro" @cancel="cancelIntro" >
              <q-input maxlength="150" type="textarea" v-model="user.intro" dense autofocus counter @keyup.enter.stop />
            </q-popup-edit>
          </p>
        </q-card>
        <div class="col-12 col-md-3 bg-secondar q-pt-s self-center">
          <q-card flat dark squre class="text-subtitle1 q-mt-md bg-primary">
            <q-list class="bordered rounded-borders">
              <q-item>
                <q-item-section side>In cards</q-item-section>
                <q-item-section>{{user.signCards}}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section side>Left</q-item-section>
                <q-item-section>
                  <div v-if="user.signRemaining">
                    <span v-for="card in user.signRemaining" :key="card" class="emoi">&#128525;</span>
                  </div>
                  <span v-else title="0">&#129318;&#127996;</span>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section side>Out cards</q-item-section>
                <q-item-section>{{user.sellCards}}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section side>Left</q-item-section>
                <q-item-section>
                  <div v-if="user.sellRemaining">
                    <span v-for="card in user.sellRemaining" :key="card" class="emoi">&#128548;</span>
                  </div>
                  <span v-else title="0">&#129318;&#127996;</span>
                </q-item-section>
              </q-item>
            </q-list>
            <div class="text-caption text-center q-py-sm">Want more still? <router-link to="/purchase-cards" class="text-info"> Here.</router-link></div>
          </q-card>
        </div>
        <div class="col-grow col-md-3">
          <q-card flat dark class="column q-pa-m w-7 q-mx-auto q-mt-md bg-primary">
              <q-card-section class="text-h6 text-center bg-secondary bordered q-pa-sm rounded-borders">
                <span title="Achievements: you will receive an extra in and out cards for each medal!" style='font-size:1.7rem;'>&#127942;</span>
              </q-card-section>
              <q-card-section class="q-pa-md">
                <div class="q-mb-sm q-pt-sm q-gutter-x-xs text-center">
                  <div v-if="user.level>1">
                    <span v-for="el in Math.floor(user.level)" :key="el" color="red" size="2rem" class="emoji" title="1 medal = 1 in + 1 out cards">
                      &#127894;
                    </span>
                  </div>
                  <div v-if="user.level<1" class="emoji" title="Rookie: level under 1">&#129313;</div>
                </div>
                <div class="q-mt-md text-center">
                  Till next level ({{Math.floor(user.level)+1}})
                  <q-linear-progress :value="user.level-Math.floor(user.level)/1" color="positive" class="q-mt-sm" />
                </div>
              </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row justify-center q-my-lg">
        <div class="col-sm-2">
          <q-select dense rounded standout v-model="window" :options="windows"
            option-value="id" option-label="name" :display-value="`Window: ${window ? window.name : '*none*'}`"
            bg-color="" options-cover options-dense
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
            row-key="name"
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
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="player" :props="props">
                  <router-link :to="'/players/' + props.row.player.id + '/' + props.row.player.slug" class="no-decor" >
                    {{props.row.player.nickname}}
                  </router-link>
                </q-td>
                <q-td key="team" :props="props">
                  <router-link v-if="props.row.team.league_id" :to="'/teams/' + props.row.team.slug" >
                    <div class="team-thumbnail q-mx-auto"> <q-img :src="props.row.team.logo" :alt="props.row.team.name" contain class="mh-100" /> </div>
                      <q-tooltip :delay="300" :offset="[0,3]"  transition-show="scale" transition-hide="scale" >
                        {{props.row.team.name}}
                      </q-tooltip>
                  </router-link>
                  <div v-else class="team-thumbnail q-mx-auto"><q-img :title="props.row.team.name" contain  :src="props.row.team.logo" :alt="props.row.team.name" class="team-thumbnail self-cente" /> </div>
                </q-td>
                <q-td key="cards" :props="props">
                  {{ props.row.priority }}
                  <q-popup-edit :value="props.row.priority" :disable="window.wishArchived" :validate="validateSign"  @save="saveCards($event, props.row.id, 'ins')" @input="cancelCards($event, props.row.__index, 'ins')"   title="Update cards" buttons persisten>
                    <q-input type="number" v-model="props.row.priority" :hint="'Total of ' + user.signCards + ' cards'" :rules="[ val => validateSign(val) || 'Wrong number of cards' ]" dense autofocus counter />
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
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="player" :props="props">
                  <router-link :to="'/players/' + props.row.player.id + '/' + props.row.player.slug" class="no-decor" >
                    {{props.row.player.nickname}}
                  </router-link>
                </q-td>
                <q-td key="position" :props="props">
                  {{props.row.player.broadPosition}}
                </q-td>
                <q-td key="cards" :props="props">
                  {{ props.row.priority }}
                  <q-popup-edit :value="props.row.priority" :disable="window.wishArchived" :validate="validateSell"  @save="saveCards($event, props.row.id, 'outs')" @input="cancelCards($event, props.row.__index, 'outs')"   title="Update cards" buttons persisten>
                    <q-input type="number" v-model="props.row.priority" hint="between 0 and 4" :rules="[ val => validateSell(val) || 'Wrong number of cards' ]" dense autofocus counter />
                  </q-popup-edit>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
    <div v-else class="text-h5 text-center q-mt-xl">
      Your home page will only be ready when you are supporting a team!
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'Home',

  data () {
    return {
      window: {},
      windows: [],
      headerStyle: {},
      team: {},
      wantedColumns: [
        { name: 'player', required: true, label: 'Player', align: 'left', field: row => row.player, sortable: true },
        { name: 'team', align: 'center', label: 'Team', field: row => row.team },
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
      date: new Date(),
      fanTransfersRowClass: {}
    }
  },

  computed: {
    user: function () {
      return this.$store.state.user
    }
  },

  // preFetch ({ store, redirect }) {
  //   if (!store.getters.user.team_id) {
  //     redirect('/settings')
  //   }
  // },

  meta () {
    return {
      title: 'Home - Innouts',
    }
  },

  beforeUpdate () {
    if (!this.user.team_id) {
      this.$router.push({ name: 'settings' })
    }
  },

  mounted: function () {
    this.$store.commit('setRightDrawer', false)
    if (this.$q.screen.lt.md) {
      this.headerStyle.minHeight = '200px'
      this.headerStyle.display = 'flex'
      this.fanTransfersRowClass['q-gutter-y-sm'] = true
    } else {
      this.headerStyle.minHeight = '375px'
      this.fanTransfersRowClass['q-gutter-md'] = true
    }
    this.$store.dispatch('getUser', this.$q.cookies.get('token'))
    this.$axios.get('api/windows')
      .then(response => {
        this.windows = response.data.visibleWindows
        if (this.windows[0].name !== response.data.activeWindow.name) {
          this.windows.unshift(response.data.activeWindow)
        }
        this.window = response.data.activeWindow
      })
      .catch(error => {
        // fix: this
        this.error = error
      })
  },

  updated: function () {
    this.team = this.user.team
    this.headerStyle.backgroundImage = 'url(' + this.user.team.stadium.picture + ')'
    this.headerStyle.backgroundPosition = this.team.stadium.position
  },

  watch: {
    window: function () {
      this.$axios({ url: 'api/business', data: { userID: this.user.id, windowID: this.window.id }, method: 'POST' })
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
      this.$axios({ url: 'api/users/' + this.user.id, data: { newIntro: value }, method: 'PUT' })
        .then(response => {
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Saved!'
          })
        })
        .catch(err => this.$q.notify({ message: err.data.message }))
    },

    cancelIntro: function (value, initialValue) {
      this.user.intro = initialValue
    },

    saveCards: function (event, id, insOuts) {
      if (insOuts === 'ins') {
        if (this.sumCards('ins') <= this.user.signCards) {
          this.$axios({ url: 'api/wanteds/' + id, data: { userID: this.user.id, newPriority: event }, method: 'PUT' })
            .then(response => {
              this.$q.notify({
                color: 'positive',
                textColor: 'white',
                icon: 'fas fa-check-circle',
                message: 'Changes saved!'
              })
              this.$store.dispatch('getUser', this.$q.cookies.get('token'))
            })
            .catch(err => this.$q.notify({ message: err.data.message }))
        } else {
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'More than a total of ' + this.user.signCards + ' cards used!'
          })
        }
      } else {
        if (this.sumCards('outs') <= this.user.sellCards) {
          this.$axios({ url: 'api/unwanteds/' + id, data: { userID: this.user.id, newPriority: event }, method: 'PUT' })
            .then(response => {
              this.$q.notify({
                color: 'positive',
                textColor: 'white',
                icon: 'fas fa-check-circle',
                message: 'Changes saved!'
              })
              this.$store.dispatch('getUser', this.$q.cookies.get('token'))
            })
            .catch(err => this.$q.notify({ message: err.data.message }))
        } else {
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'fas fa-exclamation-triangle',
            message: 'More than a total of ' + this.user.sellCards + ' cards used!'
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

    validateSign (val) {
      let sum = this.sumCards('ins')
      return val >= 0 && sum <= this.user.signCards
    },

    validateSell (val) {
      let sum = this.sumCards('outs')
      return val >= 0 && sum <= this.user.sellCards
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
