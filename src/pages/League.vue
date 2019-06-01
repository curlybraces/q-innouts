<template>
  <q-page padding>
    <div class="row no-wrap">
      <div class="col-sm-3 offset-sm-2">
        <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
      </div>
      <div class="col-sm-9 align-self-end">
        <h4 class="align-self-end">Premier League</h4>
      </div>
    </div>
    <div class="row justify-center q-gutter-y-md">
      <div class="col q-gutter-y-md" style="max-width: 1000px">
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
          <q-tab-panels v-model="tab" animated class="q-mx-auto">
            <q-tab-panel name="mails">
              <!-- <div class="text-h6">Mails</div> -->
              <q-card>
                <div class="row q-my-md bg-primary justify-center text-white">
                  <div class="col text-center">
                    <q-markup-table  flat dense separator="none" class="bg-primary text-white no-border">
                      <tbody>
                        <tr>
                          <td class="">Country</td>
                          <td class="">159</td>
                        </tr>
                        <tr>
                          <td class="">Formation</td>
                          <td class="">237</td>
                        </tr>
                        <tr>
                          <td class=""># of Teams</td>
                          <td class="">237</td>
                        </tr>
                      </tbody>
                    </q-markup-table>
                  </div>
                  <div class="col text-center self-center">
                    Holders
                  </div>
                </div>
                <div class="row">
                  <div class="col q-ma-md">
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
                  <div class="col text-center">
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
    // alert(this.$q.platform.is.mobile)
  },

}
</script>

<style>
</style>
