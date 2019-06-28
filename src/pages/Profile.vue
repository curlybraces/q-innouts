<template>
  <q-page>
    <div id="team-header" class="row relative-position justify-around bg-primary" :style="headerStyle">
      <div id="profile-pic" class="ph-thumbs bg-secondary">
        <q-img contain :src="'statics/images/anonymous-user.png'" alt="logo" class="fit" />
      </div>

      <div id="team-logo" class="ph-thumbs bg-secondary">
        <q-img contain :src="'statics/'+this.user.team.logo" :alt="this.user.team.name" class="fit" />
      </div>
    </div>

    <div class="row justify-center bg-secondary">
      <div class="col-sm-2 order-sm-first self-center bg-secondary offset-1">
        <q-select dense rounded standout v-model="window" :options="windows"
          option-value="id" option-label="name" :display-value="`Window: ${window ? window.name : '*none*'}`"
          dark bg-color="primary"
        />
      </div>
      <div class="col-sm-3 bg-secondary text-center">
        <p class="text-h5 text-capitalize">{{user.name}}</p>
        <q-separator color="primary"/>
        <p class="text-subtitle1">{{user.intro}}</p>
      </div>
      <div class="col-sm-3 bg-secondary">
        <div class="column">
          <div class="text-h6 text-center">Level: 6</div>
          <div class="text-center">
            <q-avatar v-for="el in 4" :key="el" color="red" size="1.5rem" text-color="white" icon="stars" />
          </div>
          <div>
            <q-linear-progress :value="4/5" color="primary" class="q-mt-sm" />
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="row justify-center q-my-sm">
      <div class="col-sm-2">
      </div>
    </div> -->

    <div class="row justify-center bg-primary">
      <div class="col-5  bg-primary">
        in
      </div>
      <div class="col-5 bg-primary">
        outs
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
    }
  },

  computed: {
    user: function () {
      return this.$store.state.user
    }
  },

  beforeRouteEnter (to, from, next) {
    // to.team = from.$store.state.user.team
    alert(from.$store.getters.loggedIn)
    // next()
  },

  created: function () {
    this.team = this.user.team
    this.$emit('sendView', ['hhh lpR fff', false, false])
    if (this.$q.screen.lt.md) {
      this.headerStyle.minHeight = '200px'
      this.headerStyle.display = 'flex'
    } else {
      this.headerStyle.minHeight = '375px'
    }
    this.headerStyle.backgroundImage = 'url(statics/' + this.team.stadium.picture + ')'
    this.headerStyle.backgroundPosition = this.team.stadium.position
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

</style>
