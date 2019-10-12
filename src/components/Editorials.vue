<template>
  <div>
    <q-list v-if="articles.length" :dense="$q.screen.lt.md" bordered padding separato dark>
      <q-infinite-scroll @load="onLoad" :offset="200">
        <q-item clickable v-for="(article, index) in articleBag" :key="index" :to="'/articles/'+article.slug" class="bg-primary">
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

// import { date } from 'quasar'

export default {
  name: 'Articles',

  props: {
    articles: Array,
    chunk: {
      type: Number,
      default: 4
    },
    dense: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      articleChunks: [],
      articleBag: [],
      remains: true,
      ArticleHeaderClass: {
        'text-h6': true
      },
    }
  },

  created () {
    this.articleChunks = chunk(this.articles, this.chunk)
    this.articleBag = this.articleChunks[0]

    if (this.dense) {
      this.ArticleHeaderClass = {
        'text-subtitle1': true
      }
    } else {

    }
  },

  methods: {
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

<style>
</style>
