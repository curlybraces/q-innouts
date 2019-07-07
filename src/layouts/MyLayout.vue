<template>
  <q-layout :view="view" >
    <q-header reveal elevated class="glossy q-pa-xs">
      <desktop-header v-if="$q.platform.is.desktop" />
      <mobile-header v-else />
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
      </q-list>
    </q-drawer>

    <q-ajax-bar size="4px" color="warning" />

    <q-drawer side="right" v-model="rightDrawerOpen" content-class="bg-grey-2" elevated>
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
import DesktopHeader from 'components/Header.vue'
import MobileHeader from 'components/MobileHeader.vue'
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',

  components: {
    DesktopHeader,
    MobileHeader
  },

  data () {
    return {
      // leftDrawerOpen: this.$q.platform.is.desktop,
      // rightDrawerOpen: this.$q.platform.is.desktop,
      // leftDrawerOpen: true
      view: 'hHh lpr fff',
    }
  },

  computed: {
    leftDrawerOpen: function () {
      return this.$store.getters.leftDrawer
    },

    rightDrawerOpen: function () {
      return this.$store.getters.rightDrawer
    }
  },

  // computed: {
  //   view: function () {
  //     return this.$store.getters.view
  //   },
  // }

  methods: {
    openURL,

    setView: function (view) {
      this.view = view[0]
      this.leftDrawerOpen = view[1]
      this.rightDrawerOpen = view[2]
    },

  },

}
</script>

<style>
</style>
