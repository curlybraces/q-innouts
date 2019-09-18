<template>
  <q-page padding>
    <div class="row justify- q-gutter-y-m">
      <div class="col-md-8 col offset- q-pa-md bordered rounded-borders" :class="articleClass">
        <div class="text-h5 text-capitalize text-center q-py-md bg-primary text-secondary q-px-md">
          {{article.title}}
          <div class="text-subtitle2 text-righ">BB</div>
        </div>
        <q-img
          :src="article.picture"
          :ratio="16/9"
          transition="slide-right"
        />
        <div v-html="article.body" class="text-body1 text-justify text-center q-my-md"/>
        <div class="row text-subtitle1 q-gutter-x-md">
          <!-- Tags: -->
          <router-link :to="'/teams/'+team.id" class="no-decor text-primary  bg-secondary rounded-borders q-pa-sm" v-for="team in article.teams" :key="team.id">
            {{team.name}}
          </router-link>
          <router-link :to="'/players/'+player.id" class="no-decor text-primary  bg-secondary rounded-borders q-pa-sm" v-for="player in article.players" :key="player.id">
            {{player.nickname}}
          </router-link>
        </div>
        <social-sharing :url="'https://innouts.com/'+$route.fullPath"
          :title="article.title"
          :description="article.body"
          :hashtags="tags"
          twitter-user="innouts"
          class="q-mt-md q-gutter-sm"
          inline-template>
          <div>
            <q-fab color="primary" push icon="share" direction="right">
              <q-fab-action color="primary" @click="onClick" icon="mail" />
              <q-fab-action color="accent" @click="onClick" icon="alarm" />
            </q-fab>
            <q-icon name="share" color="" size="1.1rem" class="q-mt-none" />
            <network network="twitter">
              <q-icon name="ion-logo-twitter" color="blue" size="1.1rem" />
            </network>
            <network network="facebook">
              <q-icon name="ion-logo-facebook"  color="blue-14" size="1.1rem"/>
            </network>
            <network network="reddit">
              <q-icon name="ion-logo-reddit" color="orange" size="1.1rem"/>
            </network>
            <network network="vk">
              <q-icon name="ion-logo-vk" color="blue-6" size="1.1rem"/>
            </network>
            <network network="email">
                <q-icon name="ion-mail" color="black" size="1.1rem"/>
            </network>
            <network network="whatsapp">
              <q-icon name="ion-logo-whatsapp" color="green-8" size="1.1rem"/>
            </network>
          </div>
        </social-sharing>
      </div>
    </div>
    <q-drawer
      :value="rightDrawerOpen"
      :mini="$q.screen.lt.md"
      content-class="bg-secondary"
      :breakpoint="600"
      :width="350"
      side="right"
      elevated
    >
      <q-list v-if="similarArticles.length" padding link dense class="col bg-secondary" >
        <q-item-label header>Also</q-item-label>
        <div v-for="(article) in similarArticles" :key="article.id">
          <q-item :to="'/articles/'+article.id"  clickable v-ripple>
            <q-item-section class="text-subtitle1 ellipsis d-block" no-wrap>{{article.title}}</q-item-section>
            <!-- <q-item-section side >
              <q-item-label caption>Today</q-item-label>
            </q-item-section> -->
          </q-item>
          <q-separator />
        </div>
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
      article: {},
      // teamsArticles: [],
      // playersArticles: [],
      similarArticles: [],
      articleClass: {},
      tags: []
    }
  },

  computed: {
    rightDrawerOpen: function () {
      return this.$store.getters.rightDrawer
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('http://innouts.test/api/articles/' + to.params.article)
      .then(response => {
        next(vm => {
          vm.setData(response)
          next()
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
      this.articleClass = {
        'q-ml-xl': true
      }
    }
  },

  watch: {
    $route () {
      axios.get('http://innouts.test/api/articles/' + this.$route.params.article)
        .then(response => {
          this.setData(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  methods: {
    setData: function (response) {
      this.article = response.data.article
      this.similarArticles = response.data.players_articles
      this.article.team.forEach(element => {
        this.tags.push(element.name)
      })
      this.article.players.forEach(element => {
        this.tags.push(element.nickname)
      })

      // combining uniqe articles from both arrays
      response.data.teams_articles.forEach(element => {
        let uniq = true
        for (let index = 0; index < response.data.players_articles.length; index++) {
          if (element.id === response.data.players_articles[index].id) {
            uniq = false
          }
        }
        if (uniq) {
          this.similarArticles.push(element)
        }
      })
      // this.similarArticles = Array.from(new Set(this.similarArticles.concat(response.data.teams_articles)))
      // this.similarArticles = this.similarArticles.concat(response.data.teams_articles.filter(seccondArrayItem => {
      //   this.similarArticles.forEach!this.similarArticles.includes(seccondArrayItem)
      //   }))
      // this.teamsArticles = response.data.teams_articles
      // this.playersArticles = response.data.players_articles
    }
  }
}
</script>

<style>
</style>
