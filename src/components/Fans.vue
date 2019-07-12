<template>
  <div>
    <div id="fans" class="q-mb-lg q-mb-md-none rounded-borders bg-t-darker">

      <div id="fans-line" class="row heading m-auto text-h6">
          <div class="col text-center  text-md-left">Fanbase</div>
          <div class="col text-center ">{{stats.fansTotal}}</div>
      </div>

      <hr id="fan-border">

      <div class="text-center text-md-left">
        <q-btn-group push>
          <q-btn size="sm" push @click="first = !first" :style="{backgroundColor: team.color}" label="Country" icon="timeline" />
          <q-btn size="sm" push :style="{backgroundColor: team.color}" label="Gender" icon="visibility" />
          <q-btn size="sm" push :style="{backgroundColor: team.color}" label="Age" icon="update" />
        </q-btn-group>

        <div v-if="first">
          <!-- <div id="donutchart-country" class="chart m-auto" ></div> -->
          <GChart
            type="ColumnChart"
            :data="chartData"
            :options="chartOptions"
          />
        </div>
            <!-- <q-expansion-item
              group="somegroup"
              icon="explore"
              label="First"
              default-opened
              header-class="text-primary"
            >
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                  commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                  eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item group="somegroup" icon="perm_identity" label="Second" header-class="text-teal">
              <q-card>
                <q-card-section>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                  commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                  eveniet doloribus ullam aliquid.
                </q-card-section>
              </q-card>
            </q-expansion-item> -->
        <!-- <a class="btn btn-sm  fans-btns mx-1" :style="{backgroundColor: team.color}" data-toggle="collapse" href="#country" role="button" aria-expanded="false" aria-controls="country">
          Country
        </a>
        <a class="btn btn-sm  fans-btns mr-1" :style="{backgroundColor: team.color}" data-toggle="collapse" href="#gender" role="button" aria-expanded="false" aria-controls="gender">
          Gender
        </a>
        <a class="btn btn-sm  fans-btns" :style="{backgroundColor: team.color}" data-toggle="collapse" href="#age" role="button" aria-expanded="false" aria-controls="age">
          Age
        </a> -->
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
    stats: Object,
  },

  data () {
    return {
      first: false,
      fansCountry: [],
      fansGender: [],
      fansAge: [],
      chartData: [
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
      ],
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }
      }
    }
  },

  // mounted: function () {
  //   // let fansArray = JSON.parse(this.stats.fansByCountry)
  //   const fansArray = this.stats.fansByCountry
  //   let fiveCountrySum = Object.values(fansArray).reduce((a, b) => a + b, 0)

  //   this.fansCountry = Object.entries(fansArray)

  //   if (fiveCountrySum < this.stats.fansTotal) {
  //     this.fansCountry.push(['other', this.fansTotal - fiveCountrySum])
  //   }

  //   this.fansCountry.splice(0, 0, ['country', 'fans'])

  //   this.fansGender = Object.entries(this.stats.fansByGender)
  //   this.fansGender.splice(0, 0, ['gender', 'fans'])
  //   this.fansAge = Object.entries(this.stats.fansByAge)
  //   this.fansAge[0] = ['age', 'fans']
  //   let self = this
  //   google.charts.load('current', { packages: ['corechart'] })
  //   google.charts.setOnLoadCallback(drawChart1)
  //   function drawChart1 () {
  //     var data = google.visualization.arrayToDataTable(self.fansCountry)

  //     var options = {
  //       // chartArea: {left: '10%', top: 7, width: '50%', height: '75%'},
  //       is3D: true,
  //       legend: { position: 'right', textStyle: { color: 'white' } },
  //       backgroundColor: 'transparent',
  //       pieHole: 0.6
  //     }

  //     var chart = new google.visualization.PieChart(
  //       document.getElementById('donutchart-country')
  //     )
  //     chart.draw(data, options)
  //   }
  //   google.charts.setOnLoadCallback(drawChart2)
  //   function drawChart2 () {
  //     var data = google.visualization.arrayToDataTable(self.fansGender)

  //     var options = {
  //       // chartArea: { left: 20, top: 7, width: '50%', height: '75%' },
  //       legend: { position: 'right', textStyle: { color: 'white' } },
  //       fontSize: 12,
  //       fontColor: 'white',
  //       backgroundColor: 'transparent',
  //       pieHole: 0.5
  //     }

  //     var chart = new google.visualization.PieChart(
  //       document.getElementById('donutchart-gender')
  //     )
  //     chart.draw(data, options)
  //   }
  //   google.charts.setOnLoadCallback(drawChart3)
  //   function drawChart3 () {
  //     var data = google.visualization.arrayToDataTable(self.fansAge)

  //     var options = {
  //       // chartArea: { left: 20, top: 7, width: "50%", height: "75%" },
  //       legend: { position: 'right', textStyle: { color: 'white' } },
  //       fontSize: 12,
  //       fontColor: 'white',
  //       backgroundColor: 'transparent',
  //       pieHole: 0.5
  //     }

  //     var chart = new google.visualization.PieChart(
  //       document.getElementById('donutchart-age')
  //     )
  //     chart.draw(data, options)
  //   }
  // }
}
</script>

<style lang="stylus">

#fan-border
  border: 2px solid #f1f1f1;

</style>
