<template>
  <q-page padding>
    <div class="row justify- q-gutter-y-m">
      <div class="col offset- bordered rounded-borders q-pa-xs" :class="articleClass">
        <div class="title text-center q-pt-sm q-pb-xs bg-primary text-secondary q-px-sm" :class="titleClass">
          <span class="newsTitle">{{article.title}}</span>
          <div class="row q-mt-md text-caption text-left">
            <div class="text-left col text-capitalize ellipsis"> &#9997;&#127996;{{authorName}}

            </div>
            <div class="text-center col" title="approximate read time"> &#128347;{{minRead}} min read

            </div>
            <div class="text-right col inline">
              &#128467;{{ date }}
            </div>
          </div>
        </div>
        <q-img
          :src="article.picture"
          :ratio="3/2"
          transition="slide-right"
        />
        <div id="body" v-html="article.body" class="text-body1 newsBody2 text-justify text-center q-my-md q-py-sm q-px-xs"/>
        <div class="row text-caption q-gutter-sm q-px-sm">
          <!-- Tags: -->
          <router-link :to="'/players/'+player.id+'/'+player.slug" class="no-decor text-primary  bg-secondary rounded-borders q-pa-xs" v-for="player in article.players" :key="player.id">
            {{player.nickname}}
          </router-link>
          <router-link :to="'/managers/'+manager.slug" class="no-decor text-primary  bg-secondary rounded-borders q-pa-xs" v-for="manager in article.managers" :key="manager.id">
            {{manager.nickname}}
          </router-link>
          <router-link :to="'/teams/'+team.slug" class="no-decor text-primary  bg-secondary rounded-borders q-pa-xs" v-for="team in article.teams" :key="team.id">
            {{team.name}}
          </router-link>
          <router-link :to="'/leagues/'+league.slug" class="no-decor text-primary  bg-secondary rounded-borders q-pa-xs" v-for="league in article.leagues" :key="league.id">
            {{league.name}}
          </router-link>
        </div>
        <social-sharing :url="'https://innouts.com'+$route.fullPath"
          :title="article.title"
          :description="article.body"
          :hashtags="tags"
          :quote="article.title"
          twitter-user="__innouts__"
          class="q-mt-md q-gutter-sm q-px-sm"
          inline-template>
          <div class="q-gutter-sm">
            <q-fab color="primary" push icon="share" direction="right">
              <network network="twitter" class="q-mr-xs">
                <q-btn round color="blue" icon="ion-logo-twitter" size="xs"/>
              </network>
              <network network="facebook" class="q-mr-xs">
                <q-btn round color="blue-14" icon="ion-logo-facebook" size="xs"/>
              </network>
              <network network="reddit" class="q-mr-xs">
                <q-btn round color="orange" icon="ion-logo-reddit" size="xs"/>
              </network>
              <network network="vk" class="q-mr-xs">
                <q-btn round color="blue-6" icon="ion-logo-vk" size="xs"/>
              </network>
              <network network="email" class="q-mr-xs">
                <q-btn round color="black" icon="ion-mail" size="xs"/>
              </network>
              <network network="whatsapp" class="q-mr-xs">
                <q-btn round color="green-8" icon="ion-logo-whatsapp" size="xs"/>
              </network>
            </q-fab>
          </div>
        </social-sharing>
      </div>
    </div>
    <q-drawer
      v-if="similarArticles.length"
      :value="rightDrawerOpen"
      :mini="$q.screen.lt.md"
      content-class="bg-blue-grey-3"
      :breakpoint="500"
      side="right"
      elevated
    >
      <q-list padding link dense class="col" >
        <q-item-label header class="bg-primary">Also</q-item-label>
        <div v-for="(article) in similarArticles" :key="article.id" class="newsTitle">
          <q-item :to="'/articles/'+article.id+'/'+article.slug"  clickable v-ripple>
            <q-item-section class="text-subtitle1 ellipsis d-block" no-wrap>{{article.title}}</q-item-section>
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
      similarArticles: [],
      articleClass: {},
      titleClass: {},
      tags: '',
      minRead: 0
    }
  },

  computed: {
    rightDrawerOpen: function () {
      return this.$store.getters.rightDrawer
    },

    articleCount () {
      return this.similarArticles.length
    },

    date () {
      return this.article.created_at ? this.article.created_at.split(' ')[0] : '?'
    },

    authorName () {
      return this.article.author ? this.article.author.firstname + ' ' + this.article.author.lastname : 'Anonymous'
    }
  },

  watch: {
    $route () {
      axios.get('api/articles/' + this.$route.params.article)
        .then(response => {
          this.setData(response)
        })
        .catch(error => {
          this.$q.notify({ message: error.data.message })
        })
    },

    article () {
      this.minRead = this.readTime()
    },

    articleCount () {
      if (this.articleCount > 0 && this.$q.platform.is.desktop) {
        this.$store.commit('setRightDrawer', true)
      }
      if (this.articleCount > 0) {
        this.articleClass['col-md-7'] = false
        this.articleClass['col-md-9'] = true
      } else {
        this.articleClass['col-md-9'] = false
        this.articleClass['col-md-7'] = true
      }
    }
  },

  meta () {
    return {
      title: this.article.title + ' - Innouts',

      meta: {
        description: { name: 'description', content: this.article.body },
        keywords: { name: 'keywords', content: [this.tags] },
      },
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('api/articles/' + to.params.article)
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
  },

  created: function () {
    this.$store.commit('setRightDrawer', false)

    if (this.articleCount > 0) {
      this.articleClass = {
        'col-md-9': true,
      }
    } else {
      this.articleClass['col-md-7'] = true
    }
    if (this.$q.platform.is.desktop) {
      this.articleClass['q-ml-xl'] = true
      this.articleClass['q-pa-md'] = true
      this.titleClass = {
        'text-h5': true
      }
    } else {
      this.titleClass = {
        'text-h6': true
      }
    }
  },

  methods: {
    setData: function (response) {
      this.article = response.data.article
      this.similarArticles = response.data.players_articles
      this.tags = ''
      this.article.teams.forEach(element => {
        this.tags = this.tags + element.name
        this.tags += ', '
      })
      this.article.players.forEach(element => {
        this.tags = this.tags + element.nickname
        this.tags += ', '
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
    },

    readTime () {
      let wordCount = this.article.body.split(' ').length
      // let mins = wordCount / 200
      // let secs = Math.round((mins % 1) * 0.60 * 100) / 100 + 0.10
      return Math.round(wordCount / 200)
    }
  }
}
</script>

<style lang="stylus">

.q-btn--fab
  width: 15px
  height: 15px
  font-size: 15px

.q-btn--fab .q-icon
  font-size: 15px

.q-btn--round
  min-height: 2rem
  min-width: 2rem

#body::first-letter
  font-size: 150%
  color: $primary
  margin-left: 1rem

</style>
