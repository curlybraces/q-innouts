<template>
  <q-layout :view="view" >
    <q-header reveal elevated class="glossy q-pa-xs">
      <div class="row no-wrap shadow-1">
        <q-toolbar class="q-gutter-x-sm">
          <q-btn
            flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu"
            class="q-mr-sm"
          >
            <q-icon name="menu" />
          </q-btn>

        <q-avatar clickable link to="/">
          <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
        </q-avatar>

          <q-toolbar-title>
            Innouts
          </q-toolbar-title>

          <q-btn class="glossy" color="blue-grey-14" label="News" />

          <q-btn-dropdown no-caps label="Transfers">
            <q-list dark dense class="bg-primary">
              <q-item clickable v-close-popup to="transfers">
                <q-item-section>
                  <q-item-label>Done</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup to="rumours">
                <q-item-section>
                  <q-item-label>Rumours</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <q-btn-dropdown no-caps label="Leagues" menu-self="top middle" menu-anchor="bottom middle">
            <q-list dark class="bg-primary">
              <q-item clickable dense v-close-popup to="/leagues/1" >
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/league_logos/premier-league.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Premier League</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable dense v-close-popup to="/leagues/2" >
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/league_logos/la-liga.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>La Liga</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable dense v-close-popup to="/leagues/3" >
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/league_logos/serie-a.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Serie A</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable dense v-close-popup to="/leagues/4" >
                <q-item-section avatar>
                  <q-avatar icon="img:statics/images/league_logos/bundesliga.png" color="secondary" size="2.1rem" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Bundesliga</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <q-btn-dropdown
            dark dense size="md" no-caps label="Teams" type="a"
            class="q-mx-s" menu-self="top middle" menu-ancho="bottom middle"
          >
            <div class="row bg-primary no-wrap q-pa-md">
              <div class="column">
                <q-list class="bg-secondary">
                  <q-item clickable dense v-close-popup to="/leagues/1" >
                    <q-item-section avatar>
                      <q-avatar icon="img:statics/images/club_logos/real-madrid.png" color="secondary" size="2.1rem" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Real Madrid</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable dense v-close-popup to="/leagues/2" >
                    <q-item-section avatar>
                      <q-avatar icon="img:statics/images/club_logos/barcelona.png" color="secondary" size="2.1rem" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Barcelona</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable dense v-close-popup to="/leagues/3" >
                    <q-item-section avatar>
                      <q-avatar icon="img:statics/images/club_logos/manchester-united.png" color="secondary" size="2.1rem" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Man. United</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable dense v-close-popup to="/leagues/4" >
                    <q-item-section avatar>
                      <q-avatar icon="img:statics/images/club_logos/chelsea.png" color="secondary" size="2.1rem" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Chelsea</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <q-separator vertical inset class="q-mx-sm" />

              <div class="column items-center">
                <q-list class="bg-secondary">
                  <q-item clickable dense v-close-popup to="/leagues/1" >
                    <q-item-section avatar>
                      <q-avatar icon="img:statics/images/club_logos/premier-league.png" color="secondary" size="2.1rem" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Liverpool</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable dense v-close-popup to="/leagues/2" >
                    <q-item-section avatar>
                      <q-avatar icon="img:statics/images/club_logos/la-liga.png" color="secondary" size="2.1rem" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Bayern</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable dense v-close-popup to="/leagues/3" >
                    <q-item-section avatar>
                      <q-avatar icon="img:statics/images/club_logos/serie-a.png" color="secondary" size="2.1rem" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Juventus</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable dense v-close-popup to="/leagues/4" >
                    <q-item-section avatar>
                      <q-avatar icon="img:statics/images/club_logos/bundesliga.png" color="secondary" size="2.1rem" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Bundesliga</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <q-separator vertical inset class="q-mx-sm" />

              <div class="column items-center">
                <q-list class="bg-secondary">
                  <q-item clickable dense v-close-popup to="/leagues/1" >
                    <q-item-section avatar>
                      <q-avatar icon="img:statics/images/club_logos/premier-league.png" color="secondary" size="2.1rem" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Premier League</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable dense v-close-popup to="/leagues/2" >
                    <q-item-section avatar>
                      <q-avatar icon="img:statics/images/club_logos/la-liga.png" color="secondary" size="2.1rem" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>PSG</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable dense v-close-popup to="/leagues/3" >
                    <q-item-section avatar>
                      <q-avatar icon="img:statics/images/club_logos/serie-a.png" color="secondary" size="2.1rem" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Dortmund</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable dense v-close-popup to="/leagues/4" >
                    <q-item-section avatar>
                      <q-avatar icon="img:statics/images/league_logos/bundesliga.png" color="secondary" size="2.1rem" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Napoli</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

            </div>
          </q-btn-dropdown>

          <!-- <q-btn-dropdown
            split color="secondar" push dense size="md" glossy no-caps label="La Liga"
            icon="img:statics/images/country_flags/spain.png"
             class="q-mx-sm"
          >
            <q-list dense>
              <q-item clickable v-close-popup >
                <q-item-section avatar>
                  <q-avatar icon="folder" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Photos</q-item-label>
                  <q-item-label caption>February 22, 2016</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup >
                <q-item-section avatar>
                  <q-avatar icon="assignment" color="secondary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Vacation</q-item-label>
                  <q-item-label caption>February 22, 2016</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown> -->

          <q-btn-dropdown no-caps label="Rankings">
            <q-list dark dense class="bg-primary">
              <q-item clickable v-close-popup to="Rankings">
                <q-item-section>
                  <q-item-label>Teams</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup to="rumours">
                <q-item-section>
                  <q-item-label>Players</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup to="rumours">
                <q-item-section>
                  <q-item-label>Managers</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <!-- <div>Quasar v{{ $q.version }}</div> -->
        </q-toolbar>

        <q-toolbar class="col-4 text-white">
          <q-space />
          <q-btn-dropdown icon="more_vert" class="gloss" rounded dense
          >
            <div v-if="user" class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
                <q-toggle v-model="mobileData" label="Use Mobile Data" />
                <q-toggle v-model="bluetooth" label="Bluetooth" />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="sm"
                  v-close-popup
                />
              </div>
            </div>

            <div v-else class="row no-wrap q-pa-sm">
              <div class="column">
                <q-form
                  @submit="onSubmit"
                  @reset="onReset"
                  class="q-gutter-md"
                >
                  <q-input
                    filled
                    v-model="name"
                    label="Your name *"
                    hint="Name and surname"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                  />

                  <q-input
                    filled
                    type="number"
                    v-model="age"
                    label="Your age *"
                    lazy-rules
                    :rules="[
                      val => val !== null && val !== '' || 'Please type your age',
                      val => val > 0 && val < 100 || 'Please type a real age'
                    ]"
                  />

                  <q-toggle v-model="accept" label="Remember me?" class="q-mt-sm" />

                  <div>
                    <q-btn label="Submit" type="submit" color="primary" size="sm"/>
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" size="sm" />
                  </div>
                </q-form>
                <q-separator/>
              </div>
            </div>
            <div class="row no-wrap q-pa-sm">
              <q-btn-group push>
                <q-btn size="sm" push @click="first = !first" label="Register" to="register" />
                <q-btn size="sm" push label="Forgot Password?" />
              </q-btn-group>
            </div>
          </q-btn-dropdown>
        </q-toolbar>
      </div>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" to="/players/1">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Player</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="b" to="/transfers">
          <q-item-section avatar>
            <q-icon name="compare_arrows" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Transfers</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/teams/1">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Team</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://twitter.com/quasarframework">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-ajax-bar size="4px" color="warning" />

    <q-drawer side="right" v-model="leftDrawerOpen" content-class="bg-grey-2" elevated>
      babe
    </q-drawer>

    <q-page-container>
      <router-view @sendView="setView" />
    </q-page-container>

    <q-footer>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          Footer
          <span slot="subtitle">Subtile</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import axios from 'axios'

export default {
  name: 'MyLayout',

  components: {
    // CustomFooter,
  },

  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      rightDrawerOpen: this.$q.platform.is.desktop,
      // leftDrawerOpen: true
      view: 'hHh lpr fff',
      leagues: Array,
      user: null,
    }
  },
  methods: {
    openURL,

    setView: function (view) {
      this.view = view[0]
      this.leftDrawerOpen = view[1]
      this.rightDrawerOpen = view[2]
      // alert('j')
    },

  },

  created: function () {
    axios.get('http://innouts.test/api/leagues')
      .then(response => {
        this.leagues = response.data.data
        // this.$q.loading.hide()
      })
      .catch(error => {
        this.error = error
      })
  },
}
</script>

<style>
</style>
