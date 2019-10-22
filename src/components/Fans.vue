<template>
  <div>
    <div id="fans" class="q-mb-lg rounded-borders bg-t-darker">

      <div id="fans-line" class="row heading m-auto text-h6">
          <div class="col text-center">Fanbase</div>
          <div class="col text-center ">{{stats.fansTotal}}</div>
      </div>

      <hr id="fan-border">

      <div class="text-center">
        <q-btn-group :style="{backgroundColor: team.color}" push class="">
          <q-btn class="fanBtns" size="sm" push @click="country" :disable="!stats.fansTotal" label="Country" />
          <q-btn class="fanBtns" size="sm" push @click="gender" :disable="!stats.fansTotal" label="Gender" />
          <q-btn class="fanBtns" size="sm" push @click="age" :disable="!stats.fansTotal" label="Age" />
        </q-btn-group>

        <transition name="fade">
          <div v-show="first || second || third" style="max-height: 190px">
            <GChart
              type="PieChart"
              :data="chartData"
              :options="chartOptions"
            />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
  name: 'FansStats',

  components: {
    GChart,
  },

  props: {
    team: Object,
    stats: {},
  },

  data () {
    return {
      first: false,
      second: false,
      third: false,
      fansCountry: [],
      fansGender: [],
      fansAge: [],
      chartData: [],
      chartOptions: {
        backgroundColor: 'transparent',
        pieHole: 0.2,
        is3D: true,
        fontColor: 'white',
        legend: { textStyle: { color: 'white' } },
        fontSize: 12,
      }
    }
  },

  watch: {
    stats: function () {
      this.first = false
      this.second = false
      this.third = false
      if (this.stats.fansTotal) {
        this.setData()
      } else {
        this.fansCountry = []
        this.fansGender = []
        this.fansAge = []
      }
    }
  },

  mounted: function () {
    if (this.stats.fansTotal) {
      this.setData()
    }
  },

  methods: {
    country: function () {
      this.second = false
      this.third = false
      this.chartData = this.fansCountry
      this.first = !this.first
    },

    gender: function () {
      this.first = false
      this.third = false
      this.chartData = this.fansGender
      this.second = !this.second
    },

    age: function () {
      this.first = false
      this.second = false
      this.chartData = this.fansAge
      this.third = !this.third
    },

    setData: function () {
      const fansArray = JSON.parse(this.stats.fansByCountry)
      let fiveCountrySum = Object.values(fansArray).reduce((a, b) => a + b, 0)
      this.fansCountry = Object.entries(fansArray)

      if (fiveCountrySum < this.stats.fansTotal) {
        this.fansCountry.push(['other', this.fansTotal - fiveCountrySum])
      }
      this.fansCountry.splice(0, 0, ['country', 'fans'])
      this.fansGender = Object.entries(JSON.parse(this.stats.fansByGender))
      this.fansGender.splice(0, 0, ['gender', 'fans'])
      this.fansAge = Object.entries(JSON.parse(this.stats.fansByAge))
      // this.fansAge.splice(0, 0, ['age', 'fans']) this is problematic!
      this.fansAge[0] = ['age', 'fans']
    }

  }
}
</script>

<style lang="stylus">

#fan-border
  border: 2px solid #f1f1f1;

.fade-enter-active, .fade-leave-active
  transition: opacity 0.7s;

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity: 0;

</style>
