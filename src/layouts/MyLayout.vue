<template>
  <q-layout :view="view" >
    <q-header reveal elevated class="glossy q-pa-xs">
      <div class="row no-wrap shadow-1">
        <q-toolbar>
          <q-btn
            flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu"
            class="q-mr-md"
          >
            <q-icon name="menu" />
          </q-btn>

        <q-avatar clickable link to="/">
          <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
        </q-avatar>

          <q-toolbar-title>
            Innouts
          </q-toolbar-title>

          <q-btn-dropdown
            split color="green" push dense size="md" glossy no-caps
            icon="img:https://cdn.quasar.dev/logo/svg/quasar-logo.svg"
            class="q-mx-sm"
            to="/leagues/1"
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
          </q-btn-dropdown>

          <q-btn-dropdown
            split color="green" push dense size="md" glossy no-caps
            icon="img:https://cdn.quasar.dev/logo/svg/quasar-logo.svg"
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
          </q-btn-dropdown>

          <q-btn-dropdown
            split color="green" push dense size="md" glossy no-caps
            icon="img:https://cdn.quasar.dev/logo/svg/quasar-logo.svg"
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
          </q-btn-dropdown>
          <!-- <div>Quasar v{{ $q.version }}</div> -->
        </q-toolbar>

        <q-toolbar class="col-4 text-white">
          <q-space />
          <q-btn flat to="/rumours" round dense icon="bluetooth" class="q-mr-sm" />
          <q-btn flat round dense icon="more_vert" />
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
        <q-item clickable tag="b" to="test">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
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
      view: 'hHh lpr fff'
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

  }
}
</script>

<style>
</style>
