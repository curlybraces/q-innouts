<template>
  <q-page padding>
    <q-splitter
      v-model="splitterModel"
    >

      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          active-bg-color="secondary"
          class="bg-primary text-accent"

        >
          <q-tab name="teams" icon="mail" label="Teams" />
          <q-tab name="players" icon="alarm" label="Players" />
          <q-tab name="managers" icon="movie" label="Managers" />
          <q-tab name="fans" icon="movie" label="Fans" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="teams">
            <div class="row">
              <div class="col">
                <q-list bordered padding link dense class="col bg-secondary" >
                  <div v-for="(team) in bestTeams.topSquads" :key="team.id">
                    <q-item :to="'/players/'+team.id" >
                      <q-item-section avatar>
                        <q-avatar rounded>
                          <img :src="'statics/'+team.logo">
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>{{team.name}}</q-item-section>
                      <!-- <q-item-section side>{{team}}</q-item-section> -->
                    </q-item>
                    <q-separator />
                  </div>
                </q-list>
              </div>
              <div class="col"></div>
              <div class="col"></div>
              <div class="col"></div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="players">
            <div class="text-h4 q-mb-md">players</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>

          <q-tab-panel name="managers">
            <div class="text-h4 q-mb-md">managers</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>
          <q-tab-panel name="fans">
            <div class="text-h4 q-mb-md">Fans</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Rankings',

  data () {
    return {
      bestTeams: {},
      tab: 'teams',
      splitterModel: 10
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('http://innouts.test/api/rankings/teams')
      .then(response => {
        next(vm => {
          vm.bestTeams = response.data
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
  },
}
</script>

<style>
</style>
