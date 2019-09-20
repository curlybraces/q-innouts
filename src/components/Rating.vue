<template>
  <div class="row justify-center" :class="{'q-gutter-none': !gutters}">
    <div class="rate q-mr-sm" :style="ratingStyle" :class="{'is-disabled': archived}">
      <!-- <div v-for="rating in ratings" :key="rating">
        <q-icon :name="rating%2!==0 ? 'star' : 'star-half'" />
      </div> -->
      <label class="star-rating__star" v-for="rating in ratings" :class="{'is-selected': ((value >= rating) && value != null), 'is-disabled': archived, 'half': rating%2!==0}"
          :style="{color: ((value >= rating) && value != null) ? starColor : 'black'}"  @mouseover="star_over(rating)" @mouseout="star_out" :key="rating">

          <input class="star-rating star-rating__checkbox" type="radio" :value="rating" @click="set(rating)"  v-model="value" :disabled="archived" >
      </label>
    </div>
    <!-- <div v-if="info && votes" id="ratingInfo" class="text-center d-inline-block bg-primary rounded text-light my-auto">
      {{votes}}
    </div> -->
    <div id="archived" v-if="archived" class="d-inline-block rounded" title="Archived"><q-icon name="archive"/></div>
   </div>
</template>

<script>
export default {
  name: 'Rating',

  data () {
    return {
      temp_value: null,
      ratings: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      value: null,
      starColor: null,
      ratingStyle: {}
    }
  },

  props: {
    rating: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: 'gold'
    },
    // votes: Number,
    archived: {
      type: Boolean,
      default: false
    },
    info: {
      type: Boolean,
      default: true
    },
    gutters: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '1rem'
    }
  },

  watch: {
    'rating' () {
      console.log('inside watch')
      console.log('rating is ' + this.rating)
      console.log('value is ' + this.value)
      this.value = this.rating
      this.temp_value = Math.round(this.rating * 1) / 1
    }
  },

  created () {
    // console.log('created')
    // this.disabled = this.archived
    // this.$emit('created event')
    this.value = this.rating
  },

  mounted () {
    // console.log('mounted')
    this.value = Math.round(this.rating * 1) / 1
    this.starColor = this.color
    this.ratingStyle = {
      fontSize: this.size
    }
    // this.disabled = this.archived
  },

  // updated: function () {
  //   console.log('updated')
  //   this.value = Math.round(this.rating * 1) / 1
  // },

  methods: {
    /*
    * Behaviour of the stars on mouseover.
    */
    star_over: function (index) {
      // var self = this
      if (!this.archived) {
        this.temp_value = this.value
        return (this.value = index)
      }
    },

    /*
    * Behaviour of the stars on mouseout.
    */
    star_out: function () {
      // var self = this
      if (!this.archived) {
        return (this.value = this.temp_value)
      }
    },

    /*
    * Set the rating of the score
    */
    set: function (newVal) {
      // console.log(value)
      // this.temp_value = newVal
      this.$emit('save', newVal)
    }
  }
}
</script>

<style lang="stylus">
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css)

table .rate
  min-width: 82px
  position: relative

#ratingInfo
  // position: relative
  // top: -44%
  min-width: 17px
  font-size: 0.6rem
  // padding: 0.125rem

#archived
  // position: relative
  // top: -44%
  min-width: 17px
  font-size: 1rem
  padding: 0.125rem

.star-rating__star.is-selected
  color: #73b100

  &:not(.half)
    text-shadow: 0.05em 0.05em #001f41
    -moz-text-shadow: 0.05em 0.05em #001f41
    -webkit-text-shadow: 0.05em 0.05em #001f41

.star-rating__star.is-disabled

// if the start lable is not disabled
.star-rating__star:hover:not(.is-disabled)
  cursor: pointer

// make the whole rate div unclickable if disabled = true
.rate.is-disabled
  pointer-events: none

.rate
  // min-width: 82px
  vertical-align: middle
  display: inline-block
  border: 0
/* Hide radio */
.rate label input
  display: none

/* Order correctly by floating highest to the right */
.rate > label, .rate > span
  float: right
  margin: 0

/* The star of the show */
.rate > label:before
  display: inline-block
  // font-size: 1.3rem
  // width: 0.5rem
  //  padding: 0 0.5rem
  margin: 1px
  // cursor: pointer
  font-family: FontAwesome
  content: "\f005 " /* full star */

/* Zero stars rating */
.rate > span > label:last-child:before
  /* content: "\f006 " /* empty star outline */

/* Half star trick */
.rate > .half:before
  content: "\f089 " /* half star no outline */
  position: absolute
  padding-right: 0
  // width: 0.5rem

.rate > label:not(.is-disabled):hover:not(.half)
  transform: scale(1.5)

// .rating--editable .q-icon
//   cursor: pointer

// .rating__icon--active
//   opacity: 1

</style>
