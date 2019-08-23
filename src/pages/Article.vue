<template>
  <q-page padding>
    <div class="row justify-cente q-gutter-y-m">
      <div class="col-md-8 col">
        <div class="text-h5 text-capitalize text-center">{{article.title}}</div>
        <div class="text-subtitle2 text-righ">BB</div>
        <q-img
          :src="article.picture"
          :ratio="16/9"
          transition="slide-right"
        />
        <div v-html="article.body" class="text-body1 text-justify text-center q-my-md"/>
        <div class="row text-subtitle1 q-gutter-x-md">
          <!-- Tags: -->
          <router-link :to="'/teams/'+team.id" class="no-decor text-black  bg-secondary rounded-borders q-pa-sm" v-for="team in article.teams" :key="team.id">
            {{team.name}}
          </router-link>
          <router-link :to="'/players/'+player.id" class="no-decor text-white  bg-primary rounded-borders q-pa-sm" v-for="player in article.players" :key="player.id">
            {{player.nickname}}
          </router-link>
        </div>
      </div>
    </div>
    <q-drawer
      :value="rightDrawerOpen"
      :mini="$q.screen.lt.md"
      content-class="bg-secondary"
      :breakpoint="600"
      side="right"
      elevated
    >
      <q-list padding link dense class="col bg-secondary" >
        <q-item-label header>Also</q-item-label>
      </q-list>
    </q-drawer>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Article',

  data: () => {
    return {
      article: null,
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('http://innouts.test/api/articles/' + to.params.article)
      .then(response => {
        // alert('response')
        next(vm => {
          // alert('next')
          vm.setData(response)
          // vm.article = response.data.data
          next()
          // vm.companions = vm.player.teammates
        })
      })
      .catch(error => {
        from.error = error
        next(false)
      })
  },

  beforeCreate: function () {
    this.$store.commit('setView', {
      view: 'hhh lpR fff'
    })
    if (this.$q.screen.gt.sm) {
      this.$store.commit('setRightDrawer', true)
    } else {
      this.$store.commit('setRightDrawer', false)
    }
  },

  created: function () {
    this.$store.commit('setLeftDrawer', false)
    if (this.$q.platform.is.desktop) {
      this.$store.commit('setRightDrawer', true)
    }
  },

  methods: {
    setData: function (response) {
      this.article = response.data
    }
  }
}
</script>

<style>
</style>
