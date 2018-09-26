<template>
  <div>
    <v-container v-for="(info, i) in info" :key="i">
      <v-layout row wrap class="pb-4 text-xs-left">
        <v-flex xs12>
          <div class="title">Device Setup: </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="text-xs-left">
        <v-flex xs6>
          <div class="">Device ID: </div>
        </v-flex>
        <v-flex xs6>
          <div class="">{{ info.id }}</div>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="text-xs-left">
        <v-flex xs6>
          <div class="">Field name: </div>
        </v-flex>
        <v-flex xs6>
          <div class="">{{ info.field_name }}</div>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="text-xs-left">
        <v-flex xs6>
          <div class="">Valve: </div>
        </v-flex>
        <v-flex xs6>
          <div class="">{{ info.valve }} Total</div>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="pb-4 pt-4 text-xs-left">
        <v-flex xs12>
          <div class="title">Farm Details: </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="text-xs-left">
        <v-flex xs6>
          <div class="">Total Farm Area: </div>
        </v-flex>
        <v-flex xs6>
          <div class="">{{ info.total_farm_area }} Acre's</div>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="text-xs-left">
        <v-flex xs6>
          <div class="">Cultivated area: </div>
        </v-flex>
        <v-flex xs6>
          <div class="">{{ info.cultivated_area }} Acre's</div>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="text-xs-left">
        <v-flex xs6>
          <div class="">Water source: </div>
        </v-flex>
        <v-flex xs6>
          <div v-for="(water, i) in info.water_source"  :key="i">
            <li>{{ water.source }}</li>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="text-xs-left">
        <v-flex xs6>
          <div class="">Pump: </div>
        </v-flex>
        <v-flex xs6>
          <div class="">{{ info.pump }} in Total</div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import axios from 'axios'
import localForage from 'localforage'

export default {
  data () {
    return {
      info: [
        {
          id: 'Qegsfcja123143jg',
          field_name: 'Johns Farms',
          valve: '45',
          total_farm_area: '31',
          cultivated_area: '33',
          pump: '28',
          water_source: [
            {
              source: 'goverment'
            },
            {
              source: 'reserve tank'
            },
            {
              source: 'river'
            }
          ]
        }
      ]
    }
  },
  methods: {
    getDataOnline () {
      axios({
        method: 'get',
        url: this.$hostname + 'info.php'
      }).then(response => {
        // this.info = response.data
        localForage.setItem('info', this.info)
      }).catch(error => {
        console.log(error)
        var obj = this
        localForage.getItem('user').then(function (value) {
          obj.profile = value[3]
        }).catch(function (err) {
          console.log(err)
        })
      })
    }
  },
  created () {
    if (navigator.onLine) {
      this.getDataOnline()
    } else {
      // this.getDataOffline()
    }
  }
}
</script>
