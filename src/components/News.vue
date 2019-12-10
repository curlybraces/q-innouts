<template>
  <q-list :dense="$q.screen.lt.md" bordered padding separator dark>
      <q-item clickable v-for="(article, index) in news" :key="index" @click="openURL(article.link)" :dense="$q.screen.lt.md">
        <q-item-section class="q-ml-non bordered">
          <q-item-label header class="newsTitle text-h6 bg-primary"> {{article.title}} </q-item-label>
          <q-item-label class="text-caption newsBody3 bordere q-pa-sm text-black of-hidden" v-html="article.contentSnippet" >{{article.contentSnippet}}</q-item-label>
        </q-item-section>
      </q-item>
  </q-list>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'News',

  props: {
    news: Array
  },

  methods: {
    openURL
  }
}
</script>

<style>
</style>
