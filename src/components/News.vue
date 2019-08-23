<template>
  <div class="row justify-center">
    <div class="col-grow col-sm-9 col-md-7 bg-primar text-white border-primary rounded-borders">
      <q-list v-if="articles.length" :dense="$q.screen.lt.md" bordered padding separato dark>
        <q-item clickable v-for="article in articles" :key="article.id" :to="'/articles/'+article.id" class="bg-primary">
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
      </q-list>
      <div v-else class="text-subtitle1 text-center text-black">
        Nothing to display at this time! You can contribute one if you wish!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News',

  props: {
    articles: Array
  },

  data () {
    return {}
  },

  // created: function () {
  //   this.$q.loading.show()
  //   this.$axios.get('http://innouts.test/api/windows')
  //     .then(response => {

  //     })
  //     .catch(error => {
  //       this.error = error
  //     })
  // },
}
</script>

<style>
</style>
