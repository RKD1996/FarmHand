<template>
  <div><br>
  <v-expansion-panel focusable>
    <v-expansion-panel-content v-for="(crop, i) in crops" :key="i">
      <div slot="header" class="text-xs-center">
        <v-layout row wrap justify-space-around>
          <v-flex xs2>
            {{crop.cropName}}
          </v-flex>
          <v-flex xs2>
            {{crop.croptypeName}}
          </v-flex>
          <v-flex xs2>
            Field : {{crop.fieldId}}
          </v-flex>
          <v-flex xs2>
            {{crop.startDate}}
          </v-flex>
          <v-flex xs2>
            {{crop.endDate}}
          </v-flex>
        </v-layout>
      </div>
      <v-card class="text-xs-center">
        <v-layout row>
          <v-flex>
            Feedback for Irrigation
          </v-flex>
        </v-layout>
        <v-layout>
        <v-card-text>
          <v-slider
            v-model="crop.feedback"
            :tick-labels="ticksLabels"
            :max="8"
            step="1"
            ticks="always"
            tick-size="2"
          ></v-slider>
        </v-card-text>
        </v-layout>
        <v-layout>
          <v-flex> Irrigation in % {{ticksLabels[crop.feedback]}} </v-flex>
        </v-layout>
        <v-layout>
          <v-flex><v-btn class='submitField' small @click="pushFeedback(i,ticksLabels[crop.feedback])">Confirm</v-btn> </v-flex>
        </v-layout>
        </v-card>
        <v-card>
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
          <v-card-media>
            <GChart type="ColumnChart"
            :data="chartData"
            :options="chartOptions"/>
          </v-card-media>
        </v-card>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</div>
</template>

<script>
import axios from 'axios'
import { GChart } from 'vue-google-charts'
import localForage from 'localforage'
var deviseid
var token
var email
export default {
  name: 'History',
  components: {
    GChart
  },
  data () {
    return {
      chartData: [],
      chartOptions: {},
      crops: '',
      items: [
        { title: 'Today' },
        { title: 'Week' },
        { title: 'Month' },
        { title: 'Crop Cycle' }
      ],
      ticksLabels: ['-20', '-15', '-10', '-5', '0', '+5', '+10', '+15', '+20']
    }
  },
  methods: {
    pushFeedback (i, cropfeedback) {
      var fc = this.crops[i].fieldCropId
      var obj = this
      var date = Date()
      axios({
        method: 'post',
        url: obj.$hostname + '/feedback',
        headers: {
          deviseid: deviseid,
          token: token,
          email: email
        },
        data: {
          'percentChange': cropfeedback,
          'timeStamp': date,
          'fieldCropId': fc
        }
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    chart (event) {
      if (event === 'Today') {
        this.chartData = [
          ['Hour', 'Planned', 'Delivered'],
          ['07:00', 10, 20],
          ['12:00', 15, 25],
          ['17:00', 10, 10]
        ]
        this.chartOptions = {
          title: 'Today',
          legend: { position: 'bottom' }
        }
      } else if (event === 'Week') {
        this.chartData = [
          ['Days', 'Planned', 'Delivered'],
          ['M', 35, 55],
          ['T', 40, 60],
          ['W', 35, 35],
          ['T', 30, 25],
          ['F', 40, 35],
          ['S', 35, 30],
          ['S', 40, 45]
        ]
        this.chartOptions = {
          title: 'Last 7 Days',
          legend: { position: 'bottom' }
        }
      } else if (event === 'Month') {
        this.chartData = [
          ['Days', 'Planned', 'Delivered'],
          ['1 -5', 150, 250],
          ['6-11', 200, 300],
          ['12-17', 150, 150],
          ['18-23', 150, 125],
          ['24-30', 200, 180]
        ]
        this.chartOptions = {
          title: 'Last 30 Days',
          legend: { position: 'bottom' }
        }
      } else if (event === 'Crop Cycle') {
        this.chartData = [
          ['Hour', 'Planned', 'Delivered'],
          ['1 -5', 150, 250],
          ['6-11', 200, 300],
          ['12-17', 150, 150],
          ['18-23', 150, 125],
          ['24-30', 200, 180]
        ]
        this.chartOptions = {
          title: 'Crop Cycle',
          legend: { position: 'bottom' }
        }
      }
    },
    onPageLoad () {
      var obj = this
      localForage.getItem('user').then(function (value) {
        deviseid = value.devise_id
        token = value.token
        email = value.email
        axios({
          method: 'get',
          url: obj.$hostname + '/feedback/all',
          headers: {
            deviseid: deviseid,
            token: token,
            email: email
          }
        }).then(response => {
          obj.crops = response.data.data
          var i
          var j
          // console.log(obj.crops)
          var cLength = obj.crops.length
          var tLength = obj.ticksLabels.length
          for (i = 0; i < cLength; i++) {
            for (j = 0; j < tLength; j++) {
              if (parseInt(obj.crops[i].percentChange) === parseInt(obj.ticksLabels[j])) {
                obj.crops[i].feedback = j
                // console.log(obj.crops[i])
              }
            }
          }
        }).catch(error => {
          console.log(error)
        })
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  created () {
    this.onPageLoad()
  },
  mounted () {
    this.chart('Today')
  }
}
</script>
<style>
.submitField {
    border-radius: 15px;
    border: 2px solid #8c95a3;
}
</style>
