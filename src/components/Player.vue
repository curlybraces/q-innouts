<template>
  <div>
    <q-card inline>
      <div class="row">  <!-- use 'row' class to define a container / parent -->
        <div class="col-sm-4 q-mx-auto">
          <div class="row">
            <div style="width: 300px;">
              <img alt="Quasar logo" :src="player.picture" class="q-mx-auto full-width" >
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
        <div class="col-sm-8">
          <q-markup-table separator="none">
            <tbody>
              <tr>
                <td class="text-left">First Name</td>
                <td class="text-right">{{player.firstName}}</td>
              </tr>
              <tr>
                <td class="text-left">Last Name</td>
                <td class="text-right">{{player.lastName}}</td>
              </tr>
              <tr>
                <td class="text-left">Nationality</td>
                <td class="text-right">{{player.nationality}}</td>
              </tr>
              <tr>
                <td class="text-left">Birth</td>
                <td class="text-right">{{player.birth}}</td>
              </tr>
              <tr>
                <td class="text-left">Height</td>
                <td class="text-right">{{player.height}}</td>
              </tr>
              <tr>
                <td class="text-left">Weight</td>
                <td class="text-right">{{player.weight}}</td>
              </tr>
              <tr>
                <td class="text-left">Foot</td>
                <td class="text-right">{{player.foot}}</td>
              </tr>
              <tr>
                <td class="text-left">Position</td>
                <td class="text-right">{{player.broadPosition}}</td>
              </tr>
            </tbody>
          </q-markup-table>
            <!-- <q-table
              :pagination.sync="pagination"
               title="ID Card"
               :data="tableData"
               :columns="columns"
               separator="none"
               row-key="name"
               hide-header
               hide-bottom
               rows-per-page='10'
            /> -->
        </div>
      </div>
      <!-- <q-card-media>
        <img src="~assets/quasar-logo-full.svg">
      </q-card-media>
      <q-card-title>
        Cafe Basilico
        <q-rating slot="subtitle" v-model="stars" :max="5" />
        <div slot="right" class="row items-center">
          <q-icon name="place" /> 250 ft
        </div>
      </q-card-title>
      <q-card-main>
        <p>$・Italian, Cafe</p>
        <p class="text-faded">Small plates, salads & sandwiches in an intimate setting.</p>
      </q-card-main>
      <q-card-separator />
      <q-card-actions>
        <q-btn flat round dense icon="event" />
        <q-btn flat label="5:30PM" />
        <q-btn flat label="7:30PM" />
        <q-btn flat label="9:00PM" />
        <q-btn flat color="primary" label="Reserve" />
      </q-card-actions> -->
    </q-card>
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
