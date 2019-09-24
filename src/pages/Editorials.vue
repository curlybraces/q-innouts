<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-grow col-sm-9 col-md-7 bg-primar text-white border-primary rounded-borders">
        <q-list v-if="articles.length" :dense="$q.screen.lt.md" bordered padding separato dark>
          <q-infinite-scroll @load="onLoad" :offset="200">
            <q-item clickable v-for="(article, index) in articleBag" :key="index" :to="'/articles/'+article.id" class="bg-primary">
              <q-item-section thumbnail class="q-ml-non">
                <img :src="article.picture">
              </q-item-section>

              <q-item-section to>
                <q-item-label header class="newsTitle" :class="ArticleHeaderClass" >{{article.title}}</q-item-label>
                <!-- <q-item-label lines="1" caption>Chelsea Consider Signing Goloving From Monaco less than 10 months after initial failing. It is believed the negotiations are already at an advanced stage</q-item-label> -->
              </q-item-section>

              <q-item-section v-if="article.time<1" side >
                <q-badge color="red" label="today" align="top" floating/>
              </q-item-section>

              <q-item-section v-else-if="article.time<4" side >
                <q-badge color="secondary" text-color="primary" label="new" align="top" floating/>
              </q-item-section>
            </q-item>
            <template v-if="remains" v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>
        </q-list>
        <div v-else class="text-subtitle1 text-center text-black">
          Nothing to display at this time! You can contribute one if you wish!
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import { date } from 'quasar'

const chunk = function (array, size) {
  if (!array.length) {
    return []
  }
  const head = array.slice(0, size)
  const tail = array.slice(size)

  return [head, ...chunk(tail, size)]
}

export default {
  name: 'Editorials',

  data: () => {
    return {
      articles: Array,
      articleChunks: Array,
      articleBag: Array,
      ArticleHeaderClass: {
        'text-h6': true
      },
      remains: true,
      date: new Date()
    }
  },

  meta () {
    return {
      title: 'Editorials - Innouts',

      meta: {
        description: { name: 'description', content: 'Latest football analysis of top five European leagues.' },
        keywords: { name: 'keywords', content: ['football analysis', 'football news', 'football talk', 'premier league analysis', 'football world', 'European football'] },
      },
    }
  },

  beforeRouteEnter (to, from, next) {
    axios.get('http://innouts.test/api/articles')
      .then(response => {
        next(vm => {
          vm.setData(response)
          next()
        })
      })
      .catch(error => {
        console.log(error)
        next(false)
      })
  },

  created: function () {
    this.$store.commit('setRightDrawer', false)
    if (this.$q.screen.lt.md) {
      this.ArticleHeaderClass = {
        'text-subtitle1': true
      }
    }
  },

  methods: {
    setData: function (res) {
      this.articles = res.data
      this.articles.forEach(element => {
        let diff = date.getDateDiff(this.date, element.created_at, 'days')
        element.time = diff
      })
      this.articleChunks = chunk(this.articles, 2)
      this.articleBag = this.articleChunks[0]
    },

    onLoad (index, done) {
      setTimeout(() => {
        if (this.articleChunks[index]) {
          // this.articles[index].forEach(element => {
          //   this.articleBag.push(element)
          // })
          this.articleBag.push(...this.articleChunks[index])
          done()
        }
        if (this.articleBag.length === this.articles.length) {
          this.remains = false
        }
      }, 2500)
    },

  }
}
</script>

<style>
</style>
