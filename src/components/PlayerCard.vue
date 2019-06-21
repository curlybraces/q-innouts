<template>
  <div class="player-card">
    <q-img :src="player.picture" :alt="player.nickname" class="img-thumbnail" />
    <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
      <router-link :to="'/players/' + player.id" class="no-decor" >
        {{player.nickname}}
        <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
            {{player.firstName}} {{player.lastName}}
        </q-tooltip>
      </router-link>
    </div>
    <div class="text-center bg-t-dark">
      <q-rating :style="{color: color}" icon="star" class="q-mx-auto q-my-none" size="1rem" :value="player.rating" :max="5" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerCard',

  props: {
    player: Object,
    color: String,
  },

  data () {
    return {}
  }
}
</script>

<style lang="stylus">

.player-card
  margin-bottom: 1rem;

  a
    text-decoration: none;
    color: #000;

  img
    display: block;
    width: 180px;
    height: 180px;
    margin: auto;

  .img-thumbnail
    padding: .25rem;
    background-color: #f5f8fa;
    border: 1px solid #dee2e6;
    border-radius: .25rem;

</style>
