<template>
  <div>
    <please-wait :progress="progress"></please-wait>
    <v-container>
      <div class="text-xs-right">
        <phase-indicator></phase-indicator>
      </div>
      <div class="mt-3">Pump Mode</div>
      <div>
        <v-layout row class="mt-3">
          <v-flex xs6 class="text-xs-right" style="padding: 25px;">
            <div>Automatic:</div>
          </v-flex>
          <v-flex xs6 offset-xs1>
            <v-switch v-model="switch1" @click.native="pumpMode(1)" color="green" :disabled="validated1 == 1"></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row class="mt-3">
          <v-flex xs6 class="text-xs-right" style="padding: 25px;">
            <div>Manual:</div>
          </v-flex>
          <v-flex xs6 offset-xs1>
            <v-switch v-model="switch2" @click.native="pumpMode(0)" color="green" :disabled="validated2 == 1"></v-switch>
          </v-flex>
        </v-layout>
      </div>
      <hr>
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="420">
          <v-card>
            <v-card-title class="headline">Are you sure to controll manually?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click.native="noClick">No</v-btn>
              <v-btn color="green darken-1" flat @click.native="yesClick">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      <v-layout row justify-center>
        <v-dialog v-model="dialog1" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">3 phase not avaliable for the pump to start</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click.native="dialog1 = false">close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      <v-layout class="mt-3" row wrap v-show="pumpdata" justify-center>
        <v-expansion-panel>
          <v-expansion-panel-content v-for="(pump, i) in pumps" :key="i" expand-icon="none">
            <v-layout row slot="header" height="50%">
              <v-flex xs11>Pump {{i=i+1}}</v-flex>
              <v-flex xs1 >{{pumpStatus(i-1)}}</v-flex>
            </v-layout>
            <hr>
            <v-container>
              <v-card>
                <div v-for="(valve, j) in pump" :key="j">

                  <v-layout row wrap>
                    <v-flex xs2 style="padding-top: 25px;">{{valve.actuatorName}}</v-flex>
                    <v-flex xs2 style="padding-top: 25px;"><b>{{valve.fieldName}}</b></v-flex>
                    <v-flex xs3 style="padding-top: 25px;">{{valve.cropName}}</v-flex>
                    <v-flex xs3 style="padding-top: 25px;">30 min</v-flex>
                    <v-flex xs2  left>
                      <v-switch v-model="valve.status" @click.native = "clickToEnable1(i-1, j)"></v-switch>
                    </v-flex>
                  </v-layout>
                </div>
              </v-card>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-layout>
      <v-dialog v-model="endTime" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Set Time Interval for {{actuatorName}} {{fieldName}} {{cropName}} irrigation
        </v-card-title>

        <v-card-text class="text-xs-center">
          <v-btn round color="primary" @click = "irrigation(10)" dark>10</v-btn>
          <v-btn round color="primary" @click = "irrigation(20)" dark>20</v-btn>
          <v-btn round color="primary" @click = "irrigation(30)" dark>30</v-btn>
          <v-btn round color="primary" @click = "irrigation(60)" dark>60</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    </v-container>
  </div>
</template>
<script>
import ECPIndicator from '@/components/useful/ElectricityPhaseIndicator'
import axios from 'axios'
import PleaseWait from '../useful/PleaseWait.vue'
import localForage from 'localforage'
var deviseid
var token
var email
export default {
  name: 'Pump',
  data () {
    return {
      progress: true,
      actuatorName: '',
      fieldName: '',
      cropName: '',
      endTime: false,
      pumps: [],
      switch1: false,
      switch2: false,
      pumpdata: false,
      mode: [],
      dialog: false,
      dialog1: false,
      validated1: false,
      validated2: false
    }
  },
  components: {
    'phase-indicator': ECPIndicator,
    'please-wait': PleaseWait
  },
  methods: {
    pumpStatus (i) {
      var j
      var c = 0
      for (j = 0; j < this.pumps[i].length; j++) {
        if (this.pumps[i][j].status) {
          c = 1
        }
      }
      if (c === 1) {
        return 'ON'
      } else {
        return 'OFF'
      }
    },
    pumpMode (i) {
      if (this.switch1) {
        this.pumpdata = false
        this.switch2 = false
        this.$data.showMessage1 = !this.$data.showMessage1
        this.validated2 = 1
      } else {
        this.validated2 = 0
      }
      if (this.switch2) {
        this.switch1 = false
        this.$data.showMessage2 = !this.$data.showMessage2
        this.validated1 = 1
        this.dialog = true
      } else {
        this.validated1 = 0
        this.pumpdata = false
        axios({
          method: 'post',
          url: this.$hostname + '/fieldactuator/updateAllActuatorStatus',
          headers: {
            deviseid: deviseid,
            token: token,
            email: email
          },
          data: {
            status: 0
          }
        }).then(response => {
          this.onPageLoad()
        }).catch(error => { console.log(error) })
      }
      if (this.switch1 === false && this.switch2 === false) {
        i = 2
      }
      if (this.phaseStatus[0].status === 'true' && this.phaseStatus[1].status === 'true' && this.phaseStatus[2].status === 'true') {
        axios({
          method: 'post',
          url: this.$hostname + '/modeupdate',
          headers: {
            deviseid: deviseid,
            token: token,
            email: email
          },
          data: {
            'control': i
          }
        }).then(response => {
        }).catch(error => { console.log(error) })
      }
    },
    noClick () {
      this.dialog = false
      this.switch2 = false
      this.pumpdata = false
      this.validated1 = 0
      axios({
        method: 'post',
        url: this.$hostname + '/modeupdate',
        headers: {
          deviseid: deviseid,
          token: token,
          email: email
        },
        data: {
          'control': 2
        }
      }).then(response => {
      }).catch(error => { console.log(error) })
    },
    yesClick () {
      if (this.phaseStatus[0].status === 'true' && this.phaseStatus[1].status === 'true' && this.phaseStatus[2].status === 'true') {
        this.dialog = false
        this.pumpdata = true
        axios({
          method: 'post',
          url: this.$hostname + '/modeupdate',
          headers: {
            deviseid: deviseid,
            token: token,
            email: email
          },
          data: {
            'control': 0
          }
        }).then(response => {
        }).catch(error => { console.log(error) })
      }
    },
    irrigation (time) {
      this.endTime = false
    },
    clickToEnable1 (i, j) {
      var status
      if (this.pumps[i][j].status) {
        status = 1
        this.actuatorName = this.pumps[i][j].actuatorName
        this.fieldName = this.pumps[i][j].fieldName
        this.cropName = this.pumps[i][j].cropName
        this.endTime = true
      } else {
        status = 0
      }
      axios({
        method: 'post',
        url: this.$hostname + '/fieldactuator/updateActuatorStatus',
        headers: {
          deviseid: deviseid,
          token: token,
          email: email
        },
        data: {
          actuator: this.pumps[i][j].actuatorId,
          status: status
        }
      }).then(response => {
        this.onPageLoad()
      }).catch(error => { console.log(error) })
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
        }).catch(error => { console.log(error) })
        axios({
          method: 'get',
          url: obj.$hostname + '/modestatus',
          headers: {
            deviseid: deviseid,
            token: token,
            email: email
          }
        }).then(response => {
          obj.mode = response.data.data[0].control
          if (obj.mode === 0) {
            obj.switch2 = true
            obj.pumpdata = true
            obj.validated1 = true
          } else if (obj.mode === 1) {
            obj.switch1 = true
            obj.validated2 = true
          }
        }).catch(error => { console.log(error) })
      }).catch(function (err) {
        console.log(err)
      })
    },
    getStatus () {
      this.phaseStatus = JSON.parse(localStorage.getItem('phasedetail'))
      if (this.phaseStatus[0].status === 'true' && this.phaseStatus[1].status === 'true' && this.phaseStatus[2].status === 'true') {
      } else {
        this.validated1 = 1
        this.validated2 = 1
        this.dialog1 = true
        this.switch2 = false
        this.switch1 = false
        this.dialog = false
      }
    },
    phaseInfo () {
      this.getStatus()
      this.progress = false
    }
  },
  created () {
    this.onPageLoad()
  },
  mounted () {
    setInterval(this.phaseInfo, 6000)
  }
}
</script>
<style scoped>

</style>
