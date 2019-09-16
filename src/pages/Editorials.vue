<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-grow col-sm-9 col-md-7 bg-primar text-white border-primary rounded-borders">
        <q-list v-if="articles.length" :dense="$q.screen.lt.md" bordered padding separato dark>
          <q-infinite-scroll @load="onLoad" :offset="200">
            <q-item clickable v-for="(article, index) in articles" :key="index" :to="'/articles/'+article.id" class="bg-primary">
              <q-item-section to thumbnail class="q-ml-non">
                <img :src="article.picture">
              </q-item-section>

              <q-item-section top>
                <q-item-label header class="text-h5" >{{article.title}}</q-item-label>
                <!-- <q-item-label lines="1" caption>Chelsea Consider Signing Goloving From Monaco less than 10 months after initial failing. It is believed the negotiations are already at an advanced stage</q-item-label> -->
              </q-item-section>

              <q-item-section side >
                <q-item-label caption>11:56</q-item-label>
                <q-item-label caption>share</q-item-label>
              </q-item-section>
            </q-item>
            <template v-slot:loading>
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
  },

  methods: {
    setData: function (res) {
      this.articles = res.data
    },

    onLoad (index, done) {
      setTimeout(() => {
        if (this.articles) {
          this.articles.push({}, {}, {}, {}, {}, {}, {})
          done()
        }
      }, 2500)
    },

  }
}
</script>

<style>
</style>
