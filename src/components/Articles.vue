<template>
  <div>
    <q-list v-if="articles.length" :dense="$q.screen.lt.md" bordered padding separato dark>
      <q-infinite-scroll @load="onLoad" :offset="200">
        <div v-for="(article, index) in articleBag" :key="index">
        <q-item v-if="article.slug" clickable  :to="'/' + links + '/'+article.id+'/'+article.slug" class="bg-primary" :dense="dense">
          <q-item-section thumbnail class="q-ml-non">
            <img :src="article.picture" :alt="article.title">
          </q-item-section>

          <q-item-section>
            <q-item-label header class="newsTitle" :class="ArticleHeaderClass" >{{article.title}}</q-item-label>
            <q-item-label v-if="showBody && $q.screen.gt.sm" class="newsBody1 text-caption" v-html="article.body" />
          </q-item-section>

          <q-item-section side>
            <div class="text-right">
              <!-- <q-item-label v-if="taggedTeams && article.teams.length && $q.screen.gt.sm" caption lines="3">  {{article.teams[0].name}} </q-item-label> -->
              <q-item-label caption>
                <span v-if="article.time<1">Today</span>
                <span v-else-if="article.time<4">Recent</span>
                <span v-else>{{article.created_at.split(' ')[0]}}</span>
              </q-item-label>
            </div>
          </q-item-section>
        </q-item>
        <q-item v-else class="bg-primary" :dense="dense">
          <q-item-section thumbnail class="q-ml-non">
            <img :src="article.picture" :alt="article.title">
          </q-item-section>

          <q-item-section>
            <q-item-label header v-if="$q.screen.gt.sm" class="newsTitle" :class="ArticleHeaderClass" >{{article.title}}</q-item-label>
            <q-item-label v-if="showBody" class="newsBody1 text-caption" v-html="article.body" />
          </q-item-section>

          <q-item-section side>
            <div class="text-right">
              <q-item-label caption>
                <span v-if="article.time<1">Today</span>
                <span v-else-if="article.time<4">Recent</span>
                <span v-else>{{article.created_at.split(' ')[0]}}</span>
              </q-item-label>
            </div>
          </q-item-section>
        </q-item>
        </div>
        <template v-if="remains" v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </q-list>
  </div>
</template>

<script>
const chunk = function (array, size) {
  if (!array.length) {
    return []
  }
  const head = array.slice(0, size)
  const tail = array.slice(size)

  return [head, ...chunk(tail, size)]
}

import { date } from 'quasar'

export default {
  // name: 'ComponentName',

  props: {
    articles: Array,
    chunk: {
      type: Number,
      default: 4
    },
    dense: {
      type: Boolean,
      default: false
    },
    taggedTeams: {
      type: Boolean,
      default: false
    },
    links: {
      type: String,
      default: 'articles'
    },
    showBody: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      timedArticles: [],
      articleChunks: [],
      articleBag: [],
      date: new Date(),
      remains: true,
      ArticleHeaderClass: {
        'text-h6': true
      },
    }
  },

  created () {
    this.setData()
    if (this.dense) {
      this.ArticleHeaderClass = {
        'text-subtitle1': true
      }
    } else {

    }
  },

  watch: {
    articles () {
      this.setData()
    }
  },

  methods: {
    setData () {
      this.timedArticles = this.articles
      this.timedArticles.forEach(element => {
        let diff = date.getDateDiff(this.date, element.created_at, 'days')
        element.time = diff
      })
      this.articleChunks = chunk(this.timedArticles, this.chunk)
      this.articleBag = this.articleChunks[0]
    },
    onLoad (index, done) {
      setTimeout(() => {
        if (this.articleChunks[index]) {
          this.articleBag.push(...this.articleChunks[index])
          done()
        }
        if (this.articleBag.length === this.articles.length) {
          this.remains = false
        }
      }, 2500)
    },
  },
}
</script>

<style lang="stylus">
</style>
