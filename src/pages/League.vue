<template>
  <q-page padding>
    <div class="row no-wrap">
      <div class="col-sm-3 offset-sm-2">
        <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
      </div>
      <div class="col-sm-9 align-self-end">
        <h4 class="align-self-end">Premier League</h4>
      </div>
    </div>
    <div class="row">
      tabs here
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',

  created: function () {
    this.$emit('sendView', ['hhh lpR fff', false, false])
    // alert(this.$q.platform.is.mobile)
  },
}
</script>

<style>
</style>
