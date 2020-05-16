<template>
  <q-page padding>
    <div class="row justify- q-gutter-y-m">
      <div class="col offset- bordered rounded-borders q-pa-xs" :class="storyClass">
        <div class="title text-center q-pt-sm q-pb-xs bg-primary text-secondary q-px-sm" :class="titleClass">
          <span class="newsTitle">{{story.title}}</span>
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
          :src="story.picture"
          :ratio="3/2"
          transition="slide-right"
        />
        <div id="body" v-html="story.body" class="text-body1 newsBody2 text-justify text-center q-mt-md q-py-sm q-px-xs"/>
        <div v-html="story.extended" class="text-body2 newsBody2 text-justify text-center q-mb-md q-mt-sm q-py-sm q-px-xs"/>
        <div class="row text-caption q-gutter-sm q-px-sm">
          <!-- Tags: -->
          <router-link :to="'/players/'+player.id+'/'+player.slug" class="no-decor text-primary  bg-secondary rounded-borders q-pa-xs" v-for="player in story.players" :key="player.id">
            {{player.nickname}}
          </router-link>
          <router-link :to="'/managers/'+manager.slug" class="no-decor text-primary  bg-secondary rounded-borders q-pa-xs" v-for="manager in story.managers" :key="manager.id">
            {{manager.nickname}}
          </router-link>
          <router-link :to="'/teams/'+team.slug" class="no-decor text-primary  bg-secondary rounded-borders q-pa-xs" v-for="team in story.teams" :key="team.id">
            {{team.name}}
          </router-link>
          <router-link :to="'/leagues/'+league.slug" class="no-decor text-primary  bg-secondary rounded-borders q-pa-xs" v-for="league in story.leagues" :key="league.id">
            {{league.name}}
          </router-link>
        </div>
        <social-sharing :url="'https://innouts.com'+$route.fullPath"
          :title="story.title"
          :description="story.body"
          :hashtags="tags"
          :quote="story.title"
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
      v-if="similarstories.length"
      :value="rightDrawerOpen"
      :mini="$q.screen.lt.md"
      content-class="bg-blue-grey-3"
      :breakpoint="500"
      side="right"
      elevated
    >
      <q-list padding link dense class="col" >
        <q-item-label header class="bg-primary">Also</q-item-label>
        <div v-for="(story) in similarstories" :key="story.id" class="newsTitle">
          <q-item :to="'/articles/'+story.id+'/'+story.slug"  clickable v-ripple>
            <q-item-section class="text-subtitle1 ellipsis d-block" no-wrap>{{story.title}}</q-item-section>
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
  name: 'story',

  data: () => {
    return {
      story: {},
      similarstories: [],
      storyClass: {},
      titleClass: {},
      tags: '',
      minRead: 0
    }
  },

  computed: {
    rightDrawerOpen: function () {
      return this.$store.getters.rightDrawer
    },

    storyCount () {
      return this.similarstories.length
    },

    date () {
      return this.story.created_at ? this.story.created_at.split(' ')[0] : '?'
    },

    authorName () {
      return this.story.author ? this.story.author.firstname + ' ' + this.story.author.lastname : 'Anonymous'
    }
  },

  watch: {
    $route () {
      axios.get('api/storys/' + this.$route.params.story)
        .then(response => {
          this.setData(response)
        })
        .catch(error => {
          this.$q.notify({ message: error.data.message })
        })
    },

    story () {
      this.minRead = this.readTime()
    },

    storyCount () {
      if (this.storyCount > 0 && this.$q.platform.is.desktop) {
        this.$store.commit('setRightDrawer', true)
      }
      if (this.storyCount > 0) {
        this.storyClass['col-md-7'] = false
        this.storyClass['col-md-9'] = true
      } else {
        this.storyClass['col-md-9'] = false
        this.storyClass['col-md-7'] = true
      }
    }
  },

  meta () {
    return {
      title: this.story.title + ' - Innouts',

      meta: {
        description: { name: 'description', content: this.story.body },
        keywords: { name: 'keywords', content: [this.story.title].concat(this.tags) },
      },
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('api/stories/' + to.params.story)
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

    if (this.storyCount > 0) {
      this.storyClass = {
        'col-md-9': true,
      }
    } else {
      this.storyClass['col-md-7'] = true
    }
    if (this.$q.platform.is.desktop) {
      this.storyClass['q-ml-xl'] = true
      this.storyClass['q-pa-md'] = true
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
      this.story = response.data.story
      this.similarstories = response.data.players_stories
      this.tags = ''
      this.story.teams.forEach(element => {
        this.tags = this.tags + element.name
        this.tags += ', '
      })
      this.story.players.forEach(element => {
        this.tags = this.tags + element.nickname
        this.tags += ', '
      })

      // combining uniqe storys from both arrays
      response.data.teams_stories.forEach(element => {
        let uniq = true
        for (let index = 0; index < response.data.players_stories.length; index++) {
          if (element.id === response.data.players_stories[index].id) {
            uniq = false
          }
        }
        if (uniq) {
          this.similarstories.push(element)
        }
      })
    },

    readTime () {
      let bodyWordCount = this.story.body.split(' ').length
      let extendedWordCount = this.story.extended.split(' ').length
      return Math.round((bodyWordCount + extendedWordCount) / 200 + 0.17)
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
