<template>
  <q-layout :view="view" >
    <q-dialog v-model="shouldConfirm" persistent position="bottom" v-close-popup>
      <q-card>
        <q-card-section class="row items-center q-py-sm">
          <span style='font-size:25px;'>&#127850;</span>
          <span class="q-ml-sm">We bake cookies in your browser for a better experience. Happy with it?</span>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn @click="acceptCookies" size="sm" label="Fine" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-header reveal elevated class="gloss q-pa-xs">
      <desktop-header v-if="$q.platform.is.desktop" :leagues="leagues" :teams="teams" />
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
        <q-item clickable tag="a" to="/editorials">
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
          <q-item v-for="league in leagues" :key="league.id" clickable dense v-close-popup :to="'/leagues/'+league.slug" active-class="text-accent">
            <q-item-section avatar>
              <q-avatar :icon="'img:'+league.logo" color="secondary" size="2.1rem" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{league.name}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense to="/leagues/others">
            <q-item-section avatar>
              <q-avatar icon="star" color="secondary" size="2.1rem" text-color="whte" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Others</q-item-label>
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
          <q-item v-for="team in teams" :key="team.id" clickable dense v-close-popup :to="'/teams/'+team.slug" active-class="text-accent">
            <q-item-section avatar>
              <q-avatar :icon="'img:'+team.logo" color="secondary" size="2.1rem" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{team.name}}</q-item-label>
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
hey
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <div class="row justify-around q-py-lg text-center q-gutter-y-sm">
        <div class="col-12 q-gutter-x-md text-caption">
          <router-link to="/about" class="no-deco text-grey">About</router-link>
          <router-link to="/guide" class="no-deco text-grey">Guide</router-link>
          <router-link to="/privacy-policy" class="no-deco text-grey">Privacy Policy</router-link>
          <router-link to="/terms" class="no-deco text-grey">Terms of Service</router-link>
        </div>
        <div class="col-grow">
          <a @click="openURL('https://instagram.com/_innouts.com_')" class="no-decor link q-mx-sm">
            <q-icon   name="ion-logo-instagram" size="1.2rem" color="grey"/>
          </a>
          <!-- <a @click="openURL('https://twitter.com/_innouts.com_')" class="no-decor link">
            <q-icon  name="ion-logo-twitter" size="1.2rem" color="grey"/>
          </a> -->
        </div>
        <div class="col-12 text-caption text-grey q-mt-lg">Copyright &copy; 2018-2019 Innouts</div>
      </div>
    </q-footer>

  </q-layout>
</template>

<script>
import DesktopHeader from 'components/Header.vue'
const MobileHeader = () => import('components/MobileHeader.vue')
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',

  components: {
    DesktopHeader,
    MobileHeader
  },

  data: () => {
    return {
      shouldConfirm: Boolean,
      leagues: [],
      teams: []
    }
  },

  computed: {
    view: function () {
      return this.$store.getters.view
    },

    leftDrawerOpen: function () {
      return this.$store.getters.leftDrawer
    },

    rightDrawerOpen: function () {
      return this.$store.getters.rightDrawer
    },

    shouldConfirm () {
      return !this.$store.getters.cookieConsent
    }
  },

  created () {
    this.$axios.get('api/leagues-teams')
      .then(response => {
        this.leagues = response.data.leagues
        this.teams = response.data.teams
      })
      .catch(error => {
        console.log(error)
      })
  },

  methods: {
    openURL,

    // setView: function (view) {
    //   this.view = view[0]
    //   this.leftDrawerOpen = view[1]
    //   this.rightDrawerOpen = view[2]
    // },

    acceptCookies () {
      // console.log('accept method')
      this.$store.dispatch('acceptCookies')
    }

  },

}
</script>

<style>
</style>
