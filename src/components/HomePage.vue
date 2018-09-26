<template>
  <div>
  <v-container>
    <phase-indicator></phase-indicator>
    <v-layout class="text-xs-left">
      <v-flex>
        <v-flex>Notification</v-flex>
        <v-flex>Today {{todaysTime()}}</v-flex>
      </v-flex>
    </v-layout>
    <br><br>
    <v-layout class="text-xs-left">
      <v-flex xs3>Savings</v-flex>
      <v-flex xs9>I have saved {{waterPercentage()}} of water :)</v-flex>
      <v-flex><v-btn>Share</v-btn></v-flex>
    </v-layout>
    <hr>
    <v-layout v-for="(notification, index) in allNotification" :key="index.id">
      <v-flex class="text-xs-left">
    	   {{ notification.matter }}
      </v-flex>
      <v-flex class="text-xs-right">
    	   <font-awesome-icon icon="times" v-on:click="remove(index)" />
      </v-flex>
    </v-layout>
    <hr>
    <v-layout class="text-xs-left">
      <v-flex xs12>Alert</v-flex>
    </v-layout>
    <v-layout class="text-xs-left" v-for="alert in allAlert" :key="alert.id">
      <v-flex xs1>
          <font-awesome-icon icon="exclamation-circle" />
      </v-flex>
      <v-flex>PLEASE CHECK !<br>
          {{ alert.matter }}
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import navbar from '@/components/useful/NavBar.vue'
import checkUser from '../mixins/checkUserMixin'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import ECPIndicator from './useful/ElectricityPhaseIndicator'
import localForage from 'localforage'

export default {
  name: 'HomePage',
  components: {
    FontAwesomeIcon,
    'phase-indicator': ECPIndicator,
    'nav-bar': navbar
  },
  data () {
    return {
      allNotification: [],
      allAlert: [],
      crop: [],
      cropCurrent: [],
      cropHistory: []
    }
  },
  methods: {
    todaysTime () {
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      var time = new Date()
      var thisMonth = months[time.getMonth()]
      var month = '' + (time.getMonth() + 1)
      var day = '' + time.getDate()
      var year = time.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return thisMonth + ' ' + [day, month, year].join('-')
    },
    getNotification () {
      axios({
        method: 'get',
        url: '',
        params: { }
      }).then(response => {
        this.allNotification = [{'id': 1, 'time': '7:30 pm', 'matter': 'Irrigation period has ended', 'duration': '1hr', 'crop-name': 'crop-name', 'field': 'field'},
          {'id': 2, 'time': '8:30 pm', 'matter': 'Water delivered', 'duration': '10min', 'crop-name': 'crop-name', 'field': 'field'}]
        this.getOfflineNotification()
      }).catch(error => {
        console.log(error)
        var obj = this
        localForage.getItem('notification').then(function (value) {
          obj.allNotification = value
        }).catch(function (err) {
          console.log(err)
        })
      })
    },
    getOfflineNotification () {
      localForage.setItem('notification', this.allNotification)
    },
    getAlert () {
      axios({
        method: 'get',
        url: '',
        params: { }
      }).then(response => {
        this.allAlert = [{'id': 1, 'time': '7:30 pm', 'matter': 'Irrigation period has ended', 'duration': '1hr', 'crop-name': 'crop-name', 'field': 'field'},
          {'id': 2, 'time': '8:30 pm', 'matter': 'Water delivered', 'duration': '10min', 'crop-name': 'crop-name', 'field': 'field'}]
        this.getOfflineAlert()
      }).catch(error => {
        console.log(error)
        var obj = this
        localForage.getItem('alert').then(function (value) {
          obj.allAlert = value
        }).catch(function (err) {
          console.log(err)
        })
      })
    },
    getOfflineAlert () {
      localForage.setItem('alert', this.allAlert)
    },
    waterPercentage () {
      return '35%'
    },
    remove (index) {
      this.allNotification.splice(index, 1)
    }
  },
  mixins: [checkUser],
  created () {
    this.token()
    this.getAlert()
    this.getNotification()
    var obj = this
    localForage.getItem('user').then(function (value) {
      axios({
        method: 'get',
        url: obj.$hostname + '/fieldcrop',
        headers: {
          deviseid: value.devise_id,
          token: value.token,
          email: value.email
        }
      }).then(response => {
        obj.crop = response.data.data
        var i = 0
        for (i = 0; i < obj.crop.length; i++) {
          if (obj.crop[i].statusCode === 1) {
            obj.cropCurrent.push(obj.crop[i])
          } else if (obj.crop[i].statusCode === 0) {
            obj.cropHistory.push(obj.crop[i])
          }
        }
        localForage.setItem('CurrentCrop', obj.cropCurrent)
        localForage.setItem('CropHistory', obj.cropHistory)
      }).catch(error => {
        console.log(error)
      })
    }).catch(function (err) {
      console.log(err)
    })
  }
}
</script>
