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
      :width="200"
      behavior="mobile"
      elevated
      overlay
      @hide="$store.commit('setLeftDrawer', false)"
      @show="$store.commit('setLeftDrawer', true)"
      bordered
      content-class="bg-secondary"
    >
      <q-list>
        <q-item clickable tag="a" to="/editorials">
          <q-item-section>
            <q-item-label>Editorials</q-item-label>
          </q-item-section>
        </q-item>        <q-item clickable tag="b" to="/transfers">
          <q-item-section>
            <q-item-label>Transfers</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/rumours">
          <q-item-section>
            <q-item-label>Rumours</q-item-label>
          </q-item-section>
        </q-item>
      <q-expansion-item
        group="somegroup"
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
              <q-item-label class="ellipsis" :title="league.name">{{league.name}}</q-item-label>
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
        label="Teams"
        header-class="text-primary"
      >
        <q-list class="bg-secondary">
          <q-item v-for="team in teams" :key="team.id" clickable dense v-close-popup :to="'/teams/'+team.slug" active-class="text-accent">
            <q-item-section avatar>
              <q-avatar :icon="'img:'+team.logo" color="secondary" size="2.1rem" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="ellipsis" :title="team.name">{{team.name}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
        <q-item clickable tag="a" to="/rankings">
          <q-item-section>
            <q-item-label>Rankings</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-ajax-bar size="2px" color="warning" />

    <q-drawer side="right" :value="rightDrawerOpen" no-swipe-open content-class="bg-grey-2" elevated />

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <div class="row justify-around q-py-md text-center q-gutter-y-sm">
        <div class="col-12 q-gutter-x-md text-caption">
          <router-link to="/about" class="no-deco text-grey">About</router-link>
          <router-link to="/guide" class="no-deco text-grey">Guide</router-link>
          <router-link to="/privacy-policy" class="no-deco text-grey">Privacy Policy</router-link>
          <router-link to="/terms" class="no-deco text-grey">Terms of Service</router-link>
        </div>
        <div class="col-grow">
          <a @click="openURL('https://instagram.com/__innouts.com__')" class="no-decor link q-mx-sm">
            <q-icon   name="ion-logo-instagram" size="1.2rem" color="grey"/>
          </a>
          <a @click="openURL('https://twitter.com/__innouts__')" class="no-decor link">
            <q-icon  name="ion-logo-twitter" size="1.2rem" color="grey"/>
          </a>
        </div>
        <div class="col-12 text-caption text-grey q-mt-md">
          <p class="q-px-sm">&#10077; {{qotd.body}} &#10078; </p>
          <div class="q-mt-xs">&mdash; {{qotd.from}}, {{qotd.quoteeInfo}} </div>
        </div>
        <div class="col-12 text-caption text-grey q-mt-md">Copyright &copy; 2018-2019 Innouts</div>
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
      leagues: [],
      teams: [],
      qotd: {},
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
    // this.$q.addressbarColor.set()
    this.$axios.get('api/leagues-teams')
      .then(response => {
        this.leagues = response.data.leagues
        this.teams = response.data.teams
      })
      .catch(error => {
        this.$q.notify({ message: error.data.message })
      })
    this.$axios.get('api/qotd')
      .then(response => {
        this.qotd = response.data
      })
      .catch(error => {
        this.$q.notify({ message: error.data.message })
      })
  },

  methods: {
    openURL,

    acceptCookies () {
      this.$store.dispatch('acceptCookies')
    }

  },

}
</script>

<style>
</style>
