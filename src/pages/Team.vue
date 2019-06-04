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
      v-model="tab" dense
      inline-label
      class="bg-primary text-white shadow-2"
    >
      <q-tab name="home" icon="group_work" label="Team" />
      <q-tab name="innouts" icon="swap_horiz" label="Innouts" />
      <q-tab name="chat" icon="chat" label="Chat" />
      <q-tab name="news" icon="info" label="News" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated class="shadow-2 rounded-borders">
      <q-tab-panel name="home">
        <div class="text-h6">Mails</div>
        <div class="row justify-center q-mx-auto">
          <div id="team-field" class="col-md-11 q-px-sm">
            <div class="row justify-center q-my-lg q-mx-none">
              hey
            </div>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="innouts">
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
      tab: 'home',
      panel: 'home',
      headerStyle: {
        // backgroundImage: null,
        // backgroundPosition: this.team.stadium.position
      }
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
        })
      })
      .catch(error => {
        from.error = error
        next(false)
      })
  },

  created: function () {
    this.$emit('sendView', ['hhh lpR fff', false, false])
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

</style>
