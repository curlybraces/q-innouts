<template>
  <div class="row justify-center" :class="{'q-gutter-none': !gutters}">
    <div class="rate q-mr-sm" :class="{'is-disabled': this.disabled}">
      <label class="star-rating__star" v-for="rating in ratings" :class="{'is-selected': ((value >= rating) && value != null), 'is-disabled': disabled, 'half': rating%2!==0}"
          :style="{color: ((value >= rating) && value != null) ? starColor : 'black'}" @click="set(rating)" @mouseover="star_over(rating)" @mouseout="star_out" :key="rating">

          <input class="star-rating star-rating__checkbox" type="radio" :value="rating"  v-model="value" :disabled="this.disabled" >
      </label>
    </div>
    <div v-if="info && entity.votes" id="ratingInfo" class="text-center d-inline-block bg-innouts rounded text-light my-auto">
      {{ entity.votes}}
      </div>
      <div id="archived" v-if="this.archived" class="d-inline-block rounded" title="Archived"><i class="fas fa-archive"></i></div>
   </div>
</template>

<script>
export default {
  data () {
    return {
      temp_value: null,
      ratings: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      value: null,
      disabled: null,
      starColor: null
    }
  },

  props: {
    entity: Object,
    role: String,
    color: String,
    archived: Boolean,
    info: Boolean,
    gutters: {
      type: Boolean,
      default: false,
    },
  },

  created () {
    this.disabled = this.archived
  },

  mounted () {
    this.value = Math.round(this.entity.rating * 1) / 1
    this.starColor = this.color
    this.disabled = this.archived
  },

  methods: {
    /*
         * Behaviour of the stars on mouseover.
         */
    star_over: function (index) {
      // var self = this

      if (!this.disabled) {
        this.temp_value = this.value
        return (this.value = index)
      }
    },

    /*
         * Behaviour of the stars on mouseout.
         */
    star_out: function () {
      // var self = this

      if (!this.disabled) {
        return (this.value = this.temp_value)
      }
    },

    /*
         * Set the rating of the score
         */
    set: function (value) {
      // var self = this

      if (!this.disabled) {
        // Make some call to a Laravel API using Vue.Resource
        if (this.role === 'player') {
          this.$axios
            .put('/players/'.concat(this.entity.id), {
              rateValue: value
            })
            .then(response => {
              if (response.data.message.includes('registering')) {
                alert('Rating received! ' + response.data.message)
              }
            })
            .catch(function (error) {
              console.log(error)
            })

          this.disabled = true
          this.temp_value = value
        }

        if (this.role === 'manager') {
          this.$axios
            .put('/managers/'.concat(this.entity.slug), {
              rateValue: value
            })
            .then(response => {
              if (response.data.message.includes('registering')) {
                alert('Rating received! ' + response.data.message)
              }
            })
            .catch(function (error) {
              console.log(error)
            })

          this.disabled = true
          this.temp_value = value
        }

        if (this.role === 'transfer') {
          this.$axios
            .put('/transfers/'.concat(this.entity.id), {
              rateValue: value
            })
            .then(response => {
              if (response.data.message.includes('registering')) {
                alert('Rating received! ' + response.data.message)
              }
            })
            .catch(function (error) {
              console.log(error)
            })

          this.disabled = true
          this.temp_value = value
        }
      }
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
  font-size: 0.9rem
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
  display: inline-block
  border: 0
/* Hide radio */
.rate label input
  display: none

/* Order correctly by floating highest to the right */
.rate > label,
.rate > span
  float: right
  margin: 0

/* The star of the show */
.rate > label:before
  display: inline-block
  font-size: 1.1rem
  // width: 0.5rem
  //  padding: 0 0.5rem
  margin: 0
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

</style>
