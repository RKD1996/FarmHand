<template>
  <v-expansion-panel focusable>
    <v-expansion-panel-content v-for="(crop, i) in crops" :key="i">
      <div slot="header" class="text-xs-center">
        <v-layout row wrap justify-space-around>
          <v-flex xs2>
            {{crop.crop.cropName}}
          </v-flex>
          <v-flex xs2>
            {{crop.crop.croptype.cropTypeName}}
          </v-flex>
          <v-flex xs2>
            Field : {{crop.field.fieldId}}
          </v-flex>
          <v-flex xs2>
            {{crop.startDate}}
          </v-flex>
          <v-flex xs2>
            {{crop.endDate}}
          </v-flex>
          <v-flex xs2>
            <span v-if="showData(crop.actualYield)">{{crop.actualYield}} {{crop.crop.yieldType}}</span>
            <span v-else>
              <div class="text-xs-center">
                <v-dialog v-model="dialog" width="300">
                  <v-btn slot="activator" fab small><v-icon>edit</v-icon></v-btn>
                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>Enter Yield</v-card-title>
                    <v-card-text>
                      <v-text-field outline label='Enter Yield' v-model='yield' required type='number'></v-text-field>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" flat @click="submitYield(crop.fieldCropId,i)">Submit</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </span>
          </v-flex>
        </v-layout>
      </div>
      <v-card>
        <v-card-media>
          <GChart type="ColumnChart" :data="chartData" :options="chartOptions"/>
        </v-card-media>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import axios from 'axios'
import { GChart } from 'vue-google-charts'
import localForage from 'localforage'

export default {
  name: 'History',
  components: {
    GChart
  },
  data () {
    return {
      chartData: [],
      chartOptions: {},
      crops: [],
      dialog: false,
      yield: ''
    }
  },
  methods: {
    submitYield (id, i) {
      // console.log(id)
      // console.log(this.yield)
      this.crops[i].actualYield = parseInt(this.yield)
      this.date = ''
      this.texts = ''
      var obj = this
      localForage.setItem('CropHistory', this.crops)
      localForage.getItem('user').then(function (value) {
        axios({
          method: 'post',
          url: obj.$hostname + '/fieldcrop/update_yield',
          headers: {
            deviseid: value.devise_id,
            token: value.token,
            email: value.email
          },
          data: {
            'id': id,
            'actualYield': parseInt(obj.yield)
          }
        }).then(response => {
          obj.dialog = false
          obj.yield = ''
        }).catch(error => {
          console.log(error)
        })
      }).catch(function (err) {
        console.log(err)
      })
    },
    showData (event) {
      if (event === null) {
        return false
      } else {
        return true
      }
    },
    onPageLoad () {
      /* axios({
        method: 'get',
        url: this.$hostname + 'crop.php'
      }).then(response => {
        this.crops = response.data
        this.chartData = [
          ['Farm', 'Kg/Acer', { role: 'style' }],
          ['My Farm', 1700, 'Green'],
          ['T.N average', 1400, 'Red'],
          ['Global average', 1800, 'Yellow']
        ]
        this.chartOptions = {
          legend: { position: 'bottom' }
        }
      }).catch(error => {
        console.log(error.response)
        this.crops = [{'crop_name': 'Papaya', 'crop_type': 'Sapling', 'field': '1', 'startDate': '14-04-2018', 'endDate': '14-05-2018', 'price': 'Rs. 40', 'yield': '25', 'tn_average': '20', 'global_average': '30', 'feedback': '4'}, {'crop_name': 'Basil', 'crop_type': 'Seed', 'field': '2', 'startDate': '14-04-2018', 'endDate': '14-05-2018', 'price': 'Rs. 50', 'yield': '30', 'tn_average': '35', 'global_average': '30', 'feedback': '5'}, {'crop_name': 'Lettuce', 'crop_type': 'Sapling', 'field': '3', 'startDate': '14-04-2018', 'endDate': '14-05-2018', 'price': 'Rs. 60', 'yield': '30', 'tn_average': '25', 'global_average': '25', 'feedback': '2'}]
      })
      console.log('ok')
      */
      var obj = this
      localForage.getItem('CropHistory').then(function (value) {
        obj.crops = value
      }).catch(function (err) {
        console.log(err)
      })
      this.chartData = [
        ['Farm', 'Kg/Acer', { role: 'style' }],
        ['My Farm', 1700, 'Green'],
        ['T.N average', 1400, 'Red'],
        ['Global average', 1800, 'Yellow']
      ]
      this.chartOptions = {
        legend: { position: 'bottom' }
      }
    }
  },
  created () {
    this.onPageLoad()
  }
}
</script>
