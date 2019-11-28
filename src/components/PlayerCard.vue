<template>
  <div class="player-card">
    <q-img :src="player.picture" placeholder-src="statics/images/picSoon.jpg" :alt="player.nickname" class="img-thumbnail" />
    <div class="text-center bg-t-dark border-bottom border-dark ellipsis text-weight-bold">
      <router-link :to="'/players/' + player.id + '/' + player.slug" class="no-decor" >
        {{player.nickname}}
        <q-tooltip :delay="300" :offset="[0, 3]"   transition-show="scale" transition-hide="scale" >
            {{player.firstName}} {{player.lastName}}
        </q-tooltip>
      </router-link>
    </div>
    <div class="text-center bg-t-dark">
      <!-- <q-rating v-if="$q.screen.lt.md" :style="{color: color}" icon="star" class="q-mx-auto q-my-none" size="0.9rem" :value="player.rating" :max="5" @input="submitRating" /> -->
      <rating v-if="$q.screen.gt.sm" :rating="player.rating" @save="submitRating"  :color="color" size="0.9rem" class="q-mx-auto"/>
    </div>
  </div>
</template>

<script>
const Rating = () => import('components/Rating.vue')

export default {
  name: 'PlayerCard',

  components: {
    Rating
  },

  props: {
    player: Object,
    color: String,
    loggedIn: Boolean,
    user: null,
  },

  data () {
    return {}
  },

  // computed: {
  //   loggedIn: function () {
  //     return this.$store.getters.loggedIn
  //   },

  //   user: function () {
  //     return this.$store.state.user
  //   }
  // },

  methods: {
    submitRating: function (value) {
      if (this.loggedIn) {
        this.$axios({ url: 'api/players/' + this.player.id, data: { userId: this.user.id, value: value }, method: 'PUT' })
          .then(response => {
            this.player.rating = value
          })
          .catch(error => {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'fas fa-exclamation-triangle',
              message: error.response.data.error
            })
          })
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Please login or register to rate.'
        })
      }
    }
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
