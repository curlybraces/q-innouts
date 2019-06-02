<template>
  <q-page padding>
    <div class="row no-wap">
      <div class="col-sm-3 offset-sm-1">
        <img alt="Quasar logo" :src="league.logo">
      </div>
      <div class="col-auto self-end">
        <h4 class="bg-primar">{{league.name}}</h4>
        <!-- <div class="order-first">h</div> -->
      </div>
    </div>
    <div class="row justify-center q-gutter-y-md">
      <div class="col q-gutter-y-md" style="max-widh: 1000px">
        <q-tabs
          v-model="tab" dense
          inline-label
          class="bg-primary text-white shadow-2"
        >
          <q-tab name="mails" icon="mail" label="Mails" />
          <q-tab name="alarms" icon="alarm" label="Alarms" />
          <q-tab name="movies" icon="movie" label="Movies" />
        </q-tabs>
      </div>
    </div>
    <div class="row justify-center">
      <!-- <div class="col"> -->
          <q-tab-panels v-model="tab" animated class="col q-mx-aut">
            <q-tab-panel name="mails">
              <!-- <div class="text-h6">Mails</div> -->
              <q-card>
                <div class="row q-my-md bg-primary justify-center text-white">
                  <div class="col text-center q-pa-sm">
                    <q-markup-table  flat dense separator="none" class="bg-primary text-white no-border">
                      <tbody>
                        <tr>
                          <td class="">Country</td>
                          <td class="">{{league.country}}</td>
                        </tr>
                        <tr>
                          <td class="">Formation</td>
                          <td class="">{{league.formed}}</td>
                        </tr>
                        <tr>
                          <td class=""># of Teams</td>
                          <td class="">{{league.noOfTeams}}</td>
                        </tr>
                      </tbody>
                    </q-markup-table>
                  </div>
                  <div class="col text-center self-center">
                    Holders
                  </div>
                </div>
                <div class="row q-ma-md">
                  <div class="col-sm-6 q-pa-sm">
                    <q-markup-table square flat bordered separator="none" class="rounded-borders bg-secondary">
                      <tbody>
                        <tr>
                          <td class="text-left">Internationalization</td>
                          <td class="text-right">159</td>
                        </tr>
                        <tr>
                          <td class="text-left">Average Player Rating</td>
                          <td class="text-right">237</td>
                        </tr>
                        <tr>
                          <td class="text-left">Average Player Age</td>
                          <td class="text-right">237</td>
                        </tr>
                        <tr>
                          <td class="text-left">Average Manager Rating</td>
                          <td class="text-right">237</td>
                        </tr>
                        <tr>
                          <td class="text-left">Major European Trophies Won</td>
                          <td class="text-right">237</td>
                        </tr>
                        <tr>
                          <td class="text-left">Record Title Winners</td>
                          <td class="text-right">237</td>
                        </tr>
                      </tbody>
                    </q-markup-table>
                  </div>
                  <div class="col-sm-6 text-center">
                    <!-- <h5 class="text-center">Teams</h5> -->
                    <h5 class="text-center q-my-xs"><span>⚔</span></h5>
                    <!-- Teams⚔ -->
                    <ul id="league-teams">
                       <li v-for="team in league.teams" :key="team.id" class="picture-wrapper">
                          <img class="full-height" alt="Quasar logo" :src="team.logo">
                       </li>
                    </ul>
                  </div>
                </div>
              </q-card>
              <!-- Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. -->
            </q-tab-panel>

            <q-tab-panel name="alarms">
              <div class="text-h6">Alarms</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>

            <q-tab-panel name="movies">
              <div class="text-h6">Movies</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </div>
    <!-- </div> -->
  </q-page>
</template>

<script>
import axios from 'axios'
// import { date } from 'quasar'

export default {
  name: 'League',
  data () {
    return {
      tab: 'mails',
      league: null,
    }
  },

  beforeRouteEnter (to, from, next) {
    // if (from.name === 'player') {
    //   next()
    // } else {
    axios.get('http://innouts.test/api/leagues/' + to.params.league)
      .then(response => {
        next(vm => {
          // vm.setData(response.data)
          vm.league = response.data.data
          // vm.activePlayer = vm.player
        })
      })
      .catch(error => {
        from.error = error
        next(false)
      })
    // }
  },

  created: function () {
    this.$emit('sendView', ['hhh lpR fff', false, false])
    // this.league.formed = new Date(this.league.formed)
    // alert(this.$q.platform.is.mobile)
  },

}
</script>

<style>
</style>
