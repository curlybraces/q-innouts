<template>
  <div class="row justify-center">
    <div class="col-grow col-sm-10 col-md-8 bg-primary text-white border-primary rounded-borders">
      <q-list :dense="$q.screen.lt.md" bordered padding separato dark>
        <q-item clickable to="/">
          <q-item-section to thumbnail class="q-ml-non">
            <img src="https://cdn.footballghana.com/2018/07/5b5b25b6c1dc9.jpg">
          </q-item-section>

          <q-item-section top>
            <q-item-label header class="text-h" >Chelsea Considering Goloving</q-item-label>
            <!-- <q-item-label lines="1" caption>Chelsea Consider Signing Goloving From Monaco less than 10 months after initial failing. It is believed the negotiations are already at an advanced stage</q-item-label> -->
          </q-item-section>

          <q-item-section side >
            <q-item-label caption>11:56</q-item-label>
            <q-item-label caption>share</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/">
          <q-item-section to thumbnail class="q-ml-non">
            <img src="https://cdn.quasar.dev/img/mountains.jpg">
          </q-item-section>

          <q-item-section top>
            <q-item-label header class="text-h6" >Single line item</q-item-label>
          </q-item-section>

          <q-item-section side >
            <q-item-label caption>11:56</q-item-label>
            <!-- <q-item-label caption></q-item-label> -->
          </q-item-section>
        </q-item>

        <q-item clickable to="/">
          <q-item-section to thumbnail class="q-ml-non">
            <img src="https://cdn.quasar.dev/img/mountains.jpg">
          </q-item-section>

          <q-item-section top>
            <q-item-label header class="text-h6" >Single line item</q-item-label>
          </q-item-section>

          <q-item-section side >
            <q-item-label caption>11:56</q-item-label>
            <q-item-label caption>share</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News',

  props: {
    news: Array
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
