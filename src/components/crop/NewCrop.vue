<template>
  <div>
    <v-alert v-model="alert" type="success" dismissible>
      Your Data has Successfully been Submitted
    </v-alert>
    <v-container>
      <v-layout ref="forms" row wrap justify-center justify-space-around>
        <v-flex xs12 sm2 id="cropname">
          <div class="text-xs-center">
            <v-menu offset-x>
              <div slot="activator"> Crop Name: {{cropName}}</div>
              <v-list>
                <v-list-tile v-for="(name, index) in names" :key="index" @click="selectCrop(name.cropName, index)">
                  <v-list-tile-title>{{ name.cropName }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
        </v-flex>
        <v-flex xs12 sm2 id="cropname" class="mt-1">
          <div class="text-xs-center">
            <v-menu offset-x>
              <div slot="activator" >Crop Type: {{cropTypeName}}</div>
              <v-list>
                <v-list-tile v-for="(type, index) in types" :key="index" @click="selectType(type.cropTypeName, type.cropTypeId)">
                  <v-list-tile-title>{{ type.cropTypeName }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
        </v-flex>
        <v-flex xs12 sm2 id="cropname" class="mt-1">
          <div class="text-xs-center">
            <v-menu offset-x>
              <div slot="activator" >Field No.: &nbsp {{no}}</div>
              <v-list>
                <v-list-tile v-for="(field, index) in fields" :key="index" @click="selectField(field.fieldName, field.fieldId)">
                  <v-list-tile-title>{{ field.fieldName }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </div>
        </v-flex>
        <v-flex xs12 sm2 id="cropname" class="mt-1">
          <div class="text-xs-center">
            <v-menu offset-x>
              <div slot="activator" >Start <font-awesome-icon icon="calendar-alt" id="icon"/> &nbsp {{date}}</div>
              <v-date-picker v-model="date" width="300" color="indigo accent-3" type="date"></v-date-picker>
            </v-menu>
          </div>
        </v-flex>
        <v-flex xs12 sm2 id="cropname" class="mt-1">
          <div class="text-xs-center">
            <v-menu offset-x>
              <div slot="activator" >End Autofill: &nbsp {{ endDate() }}</div>
            </v-menu>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn class="mt-5" color="info" type="submit" @click="sendData">Confirm</v-btn>
  </div>
</template>
<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import localForage from 'localforage'
var deviseid
var token
var email

export default {
  data () {
    return {
      /* names: [{title: 'kakudi'}, {title: 'Janhi'}, {title: 'Beigana'}, {title: 'Aaloo'}],
      types: [{title: 'gacha'}, {title: 'seeds'}],
      duration: [{ name: 'kakudi', type: 'gacha', days: 10 }, { name: 'kakudi', type: 'seeds', days: 20 }, { name: 'Janhi', type: 'gacha', days: 10 }, { name: 'Janhi', type: 'seeds', days: 20 }, { name: 'Beigana', type: 'gacha', days: 10 }, { name: 'Beigana', type: 'seeds', days: 20 }, { name: 'Aaloo', type: 'gacha', days: 10 }, { name: 'Aaloo', type: 'seeds', days: 20 }],
      fields: [{id: '1'}, {id: '2'}, {id: '3'}, {id: '3/4'}], */
      names: '',
      types: '',
      duration: '',
      fields: '',
      picker: null,
      cropName: '',
      cropTypeId: '',
      cropTypeName: '',
      cropId: '',
      fieldId: '',
      no: '',
      date: '',
      alert: false,
      someFormattedDate: '',
      i: '',
      crops: []
    }
  },
  components: {
    FontAwesomeIcon
  },
  methods: {
    selectCrop (event1, event2) {
      this.cropName = event1
      this.i = event2
    },
    selectType (event1, event2) {
      this.cropTypeName = event1
      this.cropTypeId = event2
    },
    selectField (event1, event2) {
      this.no = event1
      this.fieldId = event2
    },
    reset () {
      this.cropName = ''
      this.cropTypeName = ''
      this.no = ''
      this.date = ''
      this.someFormattedDate = ''
    },
    endDate () {
      var a = 0
      var dr = this.duration
      var cn = this.cropName
      var ct = this.cropTypeId
      var days = 0
      for (a = 0; a < dr.length; a++) {
        if (dr[a].cropName === cn && dr[a].croptypeId === ct) {
          days = dr[a].duration
          this.cropId = dr[a].cropId
          break
        }
      }
      var tt = this.date
      if (tt !== '') {
        var newdate = new Date(tt)
        newdate.setDate(newdate.getDate() + days)
        var dd = newdate.getDate()
        var mm = newdate.getMonth() + 1
        var y = newdate.getFullYear()

        this.someFormattedDate = y + '-' + mm + '-' + dd
        return this.someFormattedDate
      }
    },
    sendData () {
      axios({
        method: 'post',
        url: this.$hostname + '/fieldcrop',
        headers: {
          deviseid: deviseid,
          token: token,
          email: email
        },
        data: {
          'cropId': this.cropId,
          'fieldId': this.fieldId,
          'startDate': this.date,
          'endDate': this.someFormattedDate
        }
      }).then(response => {
        this.alert = true
        this.reset()
        // console.log(response.data.data)
        var obj = this
        localForage.getItem('CurrentCrop').then(function (value) {
          obj.crops = value
          obj.crops.push(response.data.data)
          localForage.setItem('CurrentCrop', obj.crops)
        }).catch(function (err) {
          console.log(err)
        })
      }).catch(error => { console.log(error) })
    },
    getData () {
      axios({
        method: 'get',
        url: this.$hostname + '/crops/all',
        headers: {
          deviseid: deviseid,
          token: token,
          email: email
        }
      }).then(res => {
        // console.log(res.data)
        this.names = res.data.names
        this.types = res.data.types
        this.duration = res.data.duration
        this.fields = res.data.field
      }).catch(error => { console.log(error) })
    }
  },
  created () {
    var obj = this
    localForage.getItem('user').then(function (value) {
      deviseid = value.devise_id
      token = value.token
      email = value.email
      obj.getData()
    }).catch(function (err) {
      console.log(err)
    })
  }
}
</script>
<style scoped>
#cropname{
  padding: 10px;
  border: 1px solid black;
  border-radius: 25px;
}
</style>
