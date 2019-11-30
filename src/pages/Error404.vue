<template>
  <div class="fixed-center text-center">
    <!-- <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p> -->
    <p id="title">ಠ_ಠ</p>
    <p class="text-faded text-h6">You are lost!<strong></strong></p>
    <q-btn
      color="primary"
      style="width:200px;"
      @click="$router.push('/')"
    >Go back</q-btn>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>

<style lang="stylus">

#title
  font-size 80px

</style>
