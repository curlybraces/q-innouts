<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'HomePage',

  created: function () {
    this.$store.commit('setLeftDrawer', false)
    if (this.$q.platform.is.desktop) {
      this.$store.commit('setRightDrawer', true)
    }
  },
}
</script>
