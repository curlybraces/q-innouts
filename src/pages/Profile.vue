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

    <div class="row justify-around bg-primary q-gutter-x-md q-py-sm bordered">
      <q-card class="col-grow col-md-3 order-sm-first self-center bg-primar bordered rounded-borders">
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
                Joined Mar, 2019
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon color="" name="schedule" />
            </q-item-section>
            <q-item-section>
              <q-item-label >Juve fan since yesterday</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon color="" name="remove_red_eye" />
            </q-item-section>
            <q-item-section>
              <q-item-label >Seen </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
      <div class="col-grow col-md-3 bg-secondar text-center q-pt-s self-center">
        <p class="text-h5 text-capitalize q-mb-sm"><span>&#9997;</span></p>
        <q-separator color="secondary"/>
        <p class="text-subtitle1 q-pa-sm text-secondary">{{user.intro}}</p>
      </div>
      <div class="col-grow col-md-3  self-center">
        <q-card class="column q-pa-m bg-secondary bordered self-cente">
          <div class="">
            <div class="text-h6 text-center bg-primary q-pa-sm">
              <span style='font-size:2rem;'>&#127941;</span>
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
          row-key="id"
          rows-per-page-label="Transfers per page"
          :rows-per-page-options="[5,10,15]"
          :loading="loading"
          color="primary"
          table-header-class="bg-green-2"
        />
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
          :loading="loading"
          color="primary"
          table-header-class="bg-red-2"
        />
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'Profile',

  data () {
    return {
      window: Object,
      windows: Array,
      headerStyle: {},
      team: Object,
      wantedColumns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player,
          sortable: true
        },
        { name: 'team', align: 'center', label: 'Team', field: row => row.targetTeam },
        { name: 'cards', align: 'center', label: 'Cards', field: row => row.date, sortable: true },
      ],
      unwantedColumns: [
        {
          name: 'name',
          required: true,
          label: 'Player',
          align: 'left',
          field: row => row.player,
          sortable: true
        },
        { name: 'position', align: 'center', label: 'Position', field: row => row.player.broadPosition },
        { name: 'cards', align: 'center', label: 'Cards', field: row => row.date, sortable: true },
      ]
    }
  },

  computed: {
    user: function () {
      return this.$store.state.user
    }
  },

  beforeRouteEnter (to, from, next) {
    // to.team = from.$store.state.user.team
    // alert(from.$store.getters.loggedIn)
    // next(vm => {
    //   vm.headerStyle.backgroundImage = 'url(statics/' + this.$store.state.user.team.stadium.picture + ')'
    //   vm.headerStyle.backgroundPosition = vm.team.stadium.position
    // })
    next()
  },

  created: function () {
    this.$store.commit('setRightDrawer', false)
    this.team = this.user.team
    this.headerStyle.backgroundImage = 'url(statics/' + this.user.team.stadium.picture + ')'
    this.headerStyle.backgroundPosition = this.team.stadium.position
    if (this.$q.screen.lt.md) {
      this.headerStyle.minHeight = '200px'
      this.headerStyle.display = 'flex'
    } else {
      this.headerStyle.minHeight = '375px'
      // this.headerStyle.backgroundImage = 'url(statics/' + this.user.team.stadium.picture + ')'
      // this.headerStyle.backgroundPosition = this.team.stadium.position
    }
    // alert('he')

    this.$axios.get('http://innouts.test/api/windows')
      .then(response => {
        this.windows = response.data.data
        this.window = this.windows[0]
        // this.windowChange()
        // this.loading = false
        // this.$q.loading.hide()
      })
      .catch(error => {
        this.error = error
      })
  },
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
    // overflow: hidden;
    width: 55px;
    height: 55px;
    // position:absolute;
    // bottom: -5%;
    // border-radius: 10%;
    // border: solid black;

    // img
    //   display: block;
    //   margin: auto;
    //   position: absolute;
    //   top: 0;
    //   bottom: 0;
    //   left: 0;
    //   right: 0;

  #profile-pic
    left: 30%;

  #team-logo
    right: 30%;

</style>
