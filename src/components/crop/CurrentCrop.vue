<template>
  <div>
    <v-expansion-panel popout>
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
          </v-layout>
        </div>
        <v-card class="text-xs-center">
          <v-card-text>
            Expected Yield on {{crop.endDate}} --- -- ---- {{crop.crop.yieldType}}<br>
            Market Price ( $ {{crop.price}} per kilo)
            <div style="border: 1px solid #212121; border-radius: 25px;">
              <v-layout row wrap v-for="
              (note, j) in crop.additionalcomment"  :key="j">
                <v-flex xs4 style="padding: 25px;">
                  <div>{{note.date}}</div>
                </v-flex>
                <v-flex xs7 style="padding: 25px;">
                  <div>{{note.comment}}</div>
                </v-flex>
                <v-flex xs1>
                  <font-awesome-icon icon="times" @click="remove(j, i)" />
                </v-flex>
              </v-layout>
              <v-layout row wrap v-for="(t, i) in ts"  :key="t.i">
                <v-flex xs3 style="padding: 25px;">
                  <v-menu offset-y>
                    <div slot="activator" style="padding: 5px; border: 1px solid black; border-radius: 25px;">Select a Date <font-awesome-icon icon="calendar-alt" id="icon"/> &nbsp {{date}}</div>
                    <v-date-picker v-model="date" color="indigo accent-3" type="date"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs9 style="padding: 5px;">
                  <v-text-field placeholder="Enter a Comment" required v-model="texts"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 class="mx-auto">
                  <v-btn color="grey darken-1" class="mb-2 white--text" @click="addMore(i)">Confirm</v-btn>
                </v-flex>
              </v-layout>
            </div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>
<script>
import axios from 'axios'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import localForage from 'localforage'
var deviseid
var token
var email

export default {
  data () {
    return {
      crops: [],
      date: '',
      texts: '',
      ts: 1,
      storedata: [][{date: '', comment: ''}]
    }
  },
  components: {
    FontAwesomeIcon
  },
  methods: {
    remove (j, i) {
      this.crops[i].additionalcomment.splice(j, 1)
      localForage.setItem('CurrentCrop', this.crops)
    },
    onPageLoad () {
      var obj = this
      localForage.getItem('user').then(function (value) {
        deviseid = value.devise_id
        token = value.token
        email = value.email
      }).catch(function (err) {
        console.log(err)
      })
      localForage.getItem('CurrentCrop').then(function (value) {
        obj.crops = value
      }).catch(function (err) {
        console.log(err)
      })
    },
    addMore (i) {
      this.crops[i].additionalcomment.push({ date: this.date, comment: this.texts })
      localForage.setItem('CurrentCrop', this.crops)
      axios({
        method: 'post',
        url: this.$hostname + '/users/add_comment',
        headers: {
          deviseid: deviseid,
          token: token,
          email: email
        },
        data: {
          'fieldCropId': this.crops[i].fieldCropId,
          'date': this.date,
          'comment': this.texts
        }
      }).then(response => {
        this.date = ''
        this.texts = ''
        localForage.setItem('CurrentCrop', this.crops)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.onPageLoad()
  }
}
</script>
