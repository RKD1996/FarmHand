<template>
  <div class='responsive'>
    <vo-basic :data="chartData" ></vo-basic>
  </div>
</template>

<script>
import { VoBasic } from 'vue-orgchart'
import axios from 'axios'
import localForage from 'localforage'
var deviseid
var token
var email
export default {
  components: { VoBasic },
  data () {
    return {
      pumps: [],
      chartData: {}
    }
  },
  methods: {
    toObject (arr) {
      var rv = {}
      for (var i = 0; i < arr.length; ++i) {
        rv[i] = arr[i]
      }
      return rv
    },
    orgChart (data) {
      // this.chartData = this.toObject(data)
      for (var i = 0; i < data.length; i++) {
      }
      this.chartData = {
        name: 'Farmer',
        children: [
          {
            name: 'P1',
            children: [{name: 'V3', children: [{ name: 'F4' }]}]
          },
          {
            name: 'P2',
            children: [{name: 'V2', children: [{ name: 'F3' }]},
              {name: 'V1', children: [{ name: 'SV1.2', children: [{ name: 'F2' }] }, { name: 'SV1.1', children: [{ name: 'F1' }] }]}]
          }
        ]
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
          url: obj.$hostname + '/fieldactuator/all',
          headers: {
            deviseid: deviseid,
            token: token,
            email: email
          }
        }).then(response => {
          console.log(response)
          obj.pumps = response.data.fieldactuator
          localForage.setItem('pumps', obj.pumps)
          obj.orgChart(obj.pumps)
        }).catch(error => { console.log(error) })
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  created () {
    this.onPageLoad()
  }
}
</script>

<style>
.responsive {
    width: auto;
    height: auto;
}
</style>
