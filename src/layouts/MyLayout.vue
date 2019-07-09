<template>
  <q-layout :view="view" >
    <q-header reveal elevated class="glossy q-pa-xs">
      <desktop-header v-if="$q.platform.is.desktop" />
      <mobile-header v-else />
    </q-header>

    <q-drawer
      :value="leftDrawerOpen"
      :breakpoint="250"
      :width="220"
      elevated
      overlay
      bordered
      content-class="bg-secondary"
    >
      <q-list>
        <q-item clickable tag="a" to="/">
          <q-item-section avatar>
            <q-icon name="announcement" />
          </q-item-section>
          <q-item-section>
            <q-item-label>News</q-item-label>
          </q-item-section>
        </q-item>        <q-item clickable tag="b" to="/transfers">
          <q-item-section avatar>
            <q-icon name="compare_arrows" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Transfers</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/rumours">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Rumours</q-item-label>
          </q-item-section>
        </q-item>
      <q-expansion-item
        group="somegroup"
        icon="group_work"
        label="Leagues"
        default-opene
        header-class="text-primary"
      >
        <q-list >
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
          <q-item clickable dense v-close-popup to="/leagues/5" >
            <q-item-section avatar>
              <q-avatar icon="img:statics/images/league_logos/ligue-1.png" color="secondary" size="2.1rem" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Ligue 1</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <q-expansion-item
        group="somegroup"
        icon="explore"
        label="Teams"
        header-class="text-primary"
      >
        <q-list class="bg-secondary">
          <q-item clickable dense v-close-popup to="/teams/22" >
            <q-item-section avatar>
              <q-avatar icon="img:statics/images/club_logos/real-madrid.png" color="secondary" size="2.1rem" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Real Madrid</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable dense v-close-popup to="/teams/21" >
            <q-item-section avatar>
              <q-avatar icon="img:statics/images/club_logos/barcelona.png" color="secondary" size="2.1rem" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Barcelona</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable dense v-close-popup to="/teams/14" >
            <q-item-section avatar>
              <q-avatar icon="img:statics/images/club_logos/manchester-united.png" color="secondary" size="2.1rem" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Man. United</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable dense v-close-popup to="/teams/62" >
            <q-item-section avatar>
              <q-avatar icon="img:statics/images/club_logos/bayern-munchen.png" color="secondary" size="2.1rem" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Bayern</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable dense v-close-popup to="/teams/6" >
            <q-item-section avatar>
              <q-avatar icon="img:statics/images/club_logos/chelsea.png" color="secondary" size="2.1rem" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Chelsea</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable dense v-close-popup to="/teams/12" >
            <q-item-section avatar>
              <q-avatar icon="img:statics/images/club_logos/liverpool.png" color="secondary" size="2.1rem" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Liverpool</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable dense v-close-popup to="/teams/41" >
            <q-item-section avatar>
              <q-avatar icon="img:statics/images/club_logos/juventus.png" color="secondary" size="2.1rem" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Juventus</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable dense v-close-popup to="/teams/13" >
            <q-item-section avatar>
              <q-avatar icon="img:statics/images/club_logos/manchester-city.png" color="secondary" size="2.1rem" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Man. City</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
        <q-item clickable tag="a" to="/rankings">
          <q-item-section avatar>
            <q-icon name="assessment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Rankings</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-ajax-bar size="4px" color="warning" />

    <q-drawer side="right" :value="rightDrawerOpen" content-class="bg-grey-2" elevated>
      babe
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
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
import DesktopHeader from 'components/Header.vue'
import MobileHeader from 'components/MobileHeader.vue'
// import { openURL } from 'quasar'

export default {
  name: 'MyLayout',

  components: {
    DesktopHeader,
    MobileHeader
  },

  // data: () => {
  //   return {
  //   }
  // },

  computed: {
    view: function () {
      return this.$store.getters.view
    },

    leftDrawerOpen: function () {
      return this.$store.getters.leftDrawer
    },

    rightDrawerOpen: function () {
      return this.$store.getters.rightDrawer
    }
  },

  methods: {
    // openURL,

    // setView: function (view) {
    //   this.view = view[0]
    //   this.leftDrawerOpen = view[1]
    //   this.rightDrawerOpen = view[2]
    // },

  },

}
</script>

<style>
</style>
