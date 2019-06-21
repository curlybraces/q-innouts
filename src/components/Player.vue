<template>
  <div class="row justify-center bordered">
    <div class="col-sm-4 col">  <!-- use 'row' class to define a container / parent -->
      <div class="col-grow col-sm-4 col-md-3 q-mx-auto">
        <div class="row">
          <div style="width: 200px;">
            <q-img alt="Quasar logo" :src="player.picture" class="q-mx-auto full-width" />
          </div>
        </div>
        <div class="row">
          <q-rating
            color="orange"
            class="q-mx-auto q-mt-sm"
            size="1.5rem"
            v-model="ratingModel"
            :max="5"
          />
        </div>
        <div class="row">
          <q-rating
            color="red"
            icon="favorite"
            class="q-mx-auto q-my-md"
            size="1.5rem"
            v-model="ratingModel"
            :max="5"
          />
        </div>
      </div>  <!-- children will default to 'col'  -->
    </div>
    <div class="col-sm-8 q-pa-md bg-secondary">
      <q-list :dense="$q.screen.lt.md"  class="rounded-borders bg-primary" bordere dark>
        <q-item>
          <q-item-section>
            <q-item-label>First Name</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label >{{player.firstName}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item >
          <q-item-section>
            <q-item-label>Last Name</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label >{{player.lastName}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item >
          <q-item-section>
            <q-item-label>Nationality</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label >{{player.nationality}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item >
          <q-item-section>
            <q-item-label>Birth</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label >{{player.birth}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item >
          <q-item-section>
            <q-item-label>Height</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label >{{player.height}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item >
          <q-item-section>
            <q-item-label>Weight</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label >{{player.weight}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item >
          <q-item-section>
            <q-item-label>Foot</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label >{{player.foot}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item >
          <q-item-section>
            <q-item-label>Position</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label >{{player.broadPosition}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Player',

  data: () => ({
    ratingModel: 1,
  }),

  props: {
    player: null,
  },

  watch: {
    // '$route' (to, from) {
    //   this.fetchData(to.params.id)
    // }
  },

  mounted: function () {
    // alert(QTable)
    // alert('ran')
  }

}
</script>

<style>
</style>
