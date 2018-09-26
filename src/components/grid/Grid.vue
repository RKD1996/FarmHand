<template>
  <div>
    <div class="container">
      <phase-indicator></phase-indicator>
      <div class="text-xs-right">
          <v-menu offset-y>
          <v-btn slot="activator" color="primary" dark>Time Scale</v-btn>
          <v-list>
            <v-list-tile v-for="(item, index) in items" :key="index" @click="chart(item.title)">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
      <div>
        <!--<GChart type="LineChart" :data="chartData" :options="chartOptions"/>-->
        <line-chart :data="chartData1" legend="top"
        :options="chartOptions1" :label="value"
        xtitle="Time" ytitle="kWh"></line-chart>
        <timeline :data="chartData2"
        xtitle="Time" ytitle="Phase"></timeline>
      </div>
    </div>
  </div>
</template>

<script>
// import { GChart } from 'vue-google-charts'
import ECPIndicator from '../useful/ElectricityPhaseIndicator'

export default {

  components: {
    // GChart,
    'phase-indicator': ECPIndicator
  },
  data () {
    return {
      showChart1: true,
      showChart2: false,
      showChart3: false,
      items: [
        { title: 'Today' },
        { title: 'Week' },
        { title: 'Month' }
      ],
      chartData1: [],
      chartOptions1: {},
      value: '',
      chartData2: []
    }
  },
  methods: {
    chart (event) {
      var d = new Date().getDate()
      var m = new Date().getMonth()
      var y = new Date().getFullYear()
      var d30 = d
      var dd
      var ddd
      // var obj = this
      if (event === 'Today') {
        this.chartData1 = [
          ['00:00', 0],
          ['00:04', 0],
          ['00:08', 800],
          ['00:12', 700],
          ['00:16', 1300],
          ['00:20', 1000],
          ['00:00', 800]
        ]
        this.chartOptions1 = {
          title: 'Today',
          legend: { position: 'bottom' }
        }
        this.value = 'Today'
        this.chartData2 = [
          [ 'Phase 1', new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 4, 0, 0) ],
          [ 'Phase 1', new Date(0, 0, 0, 4, 30, 0), new Date(0, 0, 0, 5, 30, 0) ],
          [ 'Phase 1', new Date(0, 0, 0, 6, 0, 0), new Date(0, 0, 0, 7, 30, 0) ],
          [ 'Phase 1', new Date(0, 0, 0, 8, 0, 0), new Date(0, 0, 0, 9, 30, 0) ],
          [ 'Phase 1', new Date(0, 0, 0, 12, 0, 0), new Date(0, 0, 0, 13, 30, 0) ],
          [ 'Phase 1', new Date(0, 0, 0, 14, 0, 0), new Date(0, 0, 0, 18, 30, 0) ],
          [ 'Phase 1', new Date(0, 0, 0, 20, 0, 0), new Date(0, 0, 0, 23, 30, 0) ],
          [ 'Phase 2', new Date(0, 0, 0, 1, 0, 0), new Date(0, 0, 0, 3, 0, 0) ],
          [ 'Phase 2', new Date(0, 0, 0, 4, 30, 0), new Date(0, 0, 0, 5, 30, 0) ],
          [ 'Phase 2', new Date(0, 0, 0, 8, 0, 0), new Date(0, 0, 0, 8, 30, 0) ],
          [ 'Phase 2', new Date(0, 0, 0, 9, 0, 0), new Date(0, 0, 0, 9, 30, 0) ],
          [ 'Phase 2', new Date(0, 0, 0, 10, 0, 0), new Date(0, 0, 0, 13, 30, 0) ],
          [ 'Phase 2', new Date(0, 0, 0, 14, 0, 0), new Date(0, 0, 0, 18, 30, 0) ],
          [ 'Phase 2', new Date(0, 0, 0, 20, 0, 0), new Date(0, 0, 0, 23, 30, 0) ],
          [ 'Phase 3', new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 4, 0, 0) ],
          [ 'Phase 3', new Date(0, 0, 0, 4, 30, 0), new Date(0, 0, 0, 5, 30, 0) ],
          [ 'Phase 3', new Date(0, 0, 0, 6, 0, 0), new Date(0, 0, 0, 7, 30, 0) ],
          [ 'Phase 3', new Date(0, 0, 0, 8, 0, 0), new Date(0, 0, 0, 9, 30, 0) ],
          [ 'Phase 3', new Date(0, 0, 0, 12, 0, 0), new Date(0, 0, 0, 13, 30, 0) ],
          [ 'Phase 3', new Date(0, 0, 0, 14, 0, 0), new Date(0, 0, 0, 18, 30, 0) ],
          [ 'Phase 3', new Date(0, 0, 0, 20, 0, 0), new Date(0, 0, 0, 23, 30, 0) ]
        ]
      } else if (event === 'Week') {
        this.chartData1 = [
          ['M', 0],
          ['T', 0],
          ['W', 800],
          ['T', 700],
          ['F', 1300],
          ['S', 1000],
          ['S', 800]
        ]
        this.chartOptions1 = {
          title: 'Last 7 Days',
          legend: { position: 'bottom' }
        }
        this.value = 'Last 7 Days'
        d = d30 - 7
        dd = d
        ddd = d
        this.chartData2 = [
          [ 'Phase 1', new Date(y, m, d, 0, 0, 0), new Date(y, m, d, 22, 0, 0) ],
          [ 'Phase 1', new Date(y, m, ++d, 0, 0, 0), new Date(y, m, d, 20, 0, 0) ],
          [ 'Phase 1', new Date(y, m, ++d, 0, 0, 0), new Date(y, m, d, 18, 0, 0) ],
          [ 'Phase 1', new Date(y, m, ++d, 0, 0, 0), new Date(y, m, d, 20, 0, 0) ],
          [ 'Phase 1', new Date(y, m, ++d, 0, 0, 0), new Date(y, m, d, 20, 0, 0) ],
          [ 'Phase 1', new Date(y, m, ++d, 0, 0, 0), new Date(y, m, d, 18, 0, 0) ],
          [ 'Phase 1', new Date(y, m, ++d, 0, 0, 0), new Date(y, m, d, 18, 0, 0) ],
          [ 'Phase 2', new Date(y, m, dd, 0, 0, 0), new Date(y, m, dd, 22, 0, 0) ],
          [ 'Phase 2', new Date(y, m, ++dd, 0, 0, 0), new Date(y, m, dd, 22, 0, 0) ],
          [ 'Phase 2', new Date(y, m, ++dd, 0, 0, 0), new Date(y, m, dd, 23, 0, 0) ],
          [ 'Phase 2', new Date(y, m, ++dd, 0, 0, 0), new Date(y, m, dd, 22, 0, 0) ],
          [ 'Phase 2', new Date(y, m, ++dd, 0, 0, 0), new Date(y, m, dd, 20, 0, 0) ],
          [ 'Phase 2', new Date(y, m, ++dd, 0, 0, 0), new Date(y, m, dd, 18, 0, 0) ],
          [ 'Phase 2', new Date(y, m, ++dd, 0, 0, 0), new Date(y, m, dd, 19, 0, 0) ],
          [ 'Phase 3', new Date(y, m, ddd, 0, 0, 0), new Date(y, m, ddd, 20, 0, 0) ],
          [ 'Phase 3', new Date(y, m, ++ddd, 0, 0, 0), new Date(y, m, ddd, 21, 0, 0) ],
          [ 'Phase 3', new Date(y, m, ++ddd, 0, 0, 0), new Date(y, m, ddd, 22, 0, 0) ],
          [ 'Phase 3', new Date(y, m, ++ddd, 0, 0, 0), new Date(y, m, ddd, 23, 0, 0) ],
          [ 'Phase 3', new Date(y, m, ++ddd, 0, 0, 0), new Date(y, m, ddd, 22, 0, 0) ],
          [ 'Phase 3', new Date(y, m, ++ddd, 0, 0, 0), new Date(y, m, ddd, 20, 0, 0) ],
          [ 'Phase 3', new Date(y, m, ++ddd, 0, 0, 0), new Date(y, m, ddd, 20, 0, 0) ]
        ]
      } else if (event === 'Month') {
        this.chartData1 = [
          ['Day 1', 0],
          ['Day 5', 0],
          ['Day 10', 800],
          ['Day 15', 700],
          ['Day 20', 1300],
          ['Day 25', 1000],
          ['Day 30', 800]
        ]
        this.chartOptions1 = {
          title: 'Last 30 Days',
          legend: { position: 'bottom' }
        }
        this.value = 'Last 30 Days'
        d = d - 30
        dd = d
        ddd = d
        this.chartData2 = [
          [ 'Phase 1', new Date(y, m, d, 0, 0, 0), new Date(y, m, d, 22, 0, 0) ],
          [ 'Phase 1', new Date(y, m, ++d, 0, 0, 0), new Date(y, m, d, 20, 0, 0) ],
          [ 'Phase 1', new Date(y, m, ++d, 0, 0, 0), new Date(y, m, d, 18, 0, 0) ],
          [ 'Phase 1', new Date(y, m, ++d, 0, 0, 0), new Date(y, m, d, 20, 0, 0) ],
          [ 'Phase 1', new Date(y, m, ++d, 0, 0, 0), new Date(y, m, d, 20, 0, 0) ],
          [ 'Phase 1', new Date(y, m, ++d, 0, 0, 0), new Date(y, m, d, 18, 0, 0) ],
          [ 'Phase 1', new Date(y, m, ++d, 0, 0, 0), new Date(y, m, d, 18, 0, 0) ],
          [ 'Phase 2', new Date(y, m, dd, 0, 0, 0), new Date(y, m, dd, 22, 0, 0) ],
          [ 'Phase 2', new Date(y, m, ++dd, 0, 0, 0), new Date(y, m, dd, 22, 0, 0) ],
          [ 'Phase 2', new Date(y, m, ++dd, 0, 0, 0), new Date(y, m, dd, 23, 0, 0) ],
          [ 'Phase 2', new Date(y, m, ++dd, 0, 0, 0), new Date(y, m, dd, 22, 0, 0) ],
          [ 'Phase 2', new Date(y, m, ++dd, 0, 0, 0), new Date(y, m, dd, 20, 0, 0) ],
          [ 'Phase 2', new Date(y, m, ++dd, 0, 0, 0), new Date(y, m, dd, 18, 0, 0) ],
          [ 'Phase 2', new Date(y, m, ++dd, 0, 0, 0), new Date(y, m, dd, 19, 0, 0) ],
          [ 'Phase 3', new Date(y, m, ddd, 0, 0, 0), new Date(y, m, ddd, 20, 0, 0) ],
          [ 'Phase 3', new Date(y, m, ++ddd, 0, 0, 0), new Date(y, m, ddd, 21, 0, 0) ],
          [ 'Phase 3', new Date(y, m, ++ddd, 0, 0, 0), new Date(y, m, ddd, 22, 0, 0) ],
          [ 'Phase 3', new Date(y, m, ++ddd, 0, 0, 0), new Date(y, m, ddd, 23, 0, 0) ],
          [ 'Phase 3', new Date(y, m, ++ddd, 0, 0, 0), new Date(y, m, ddd, 22, 0, 0) ],
          [ 'Phase 3', new Date(y, m, ++ddd, 0, 0, 0), new Date(y, m, ddd, 20, 0, 0) ],
          [ 'Phase 3', new Date(y, m, ++ddd, 0, 0, 0), new Date(y, m, ddd, 20, 0, 0) ]
        ]
      }
    }
  },
  mounted () {
    this.chart('Today')
  }
}
</script>
