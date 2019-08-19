<template>
  <q-page padding>
    <div class="text-h4">Title here</div>
    <div class="text-subtitle1">By BB</div>
    <div class="text-body1">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam neque dolor itaque eius nam molestiae odit obcaecati, reiciendis saepe quisquam corporis mollitia tempora quasi. Architecto accusantium illo hic corrupti odit.
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Article',

  created: function () {
    this.$store.commit('setRightDrawer', true)
  },
}
</script>

<style>
</style>
