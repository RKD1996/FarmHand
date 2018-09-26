<template>
  <div>
    <v-container>

      <v-alert v-model="alert" type="success" dismissible>
        Your Data has Successfully been Submitted
      </v-alert>

      <h2>Report Error</h2>
      <v-form ref="form" v-model="valid" lazy-validation>
      <v-layout row wrap>
          <v-flex xs12 md6>
            <div align="left" v-for="(repo, i) in error_report"  :key="i">
              <v-layout row wrap>
                <v-flex xs1>
                  <v-checkbox type="checkbox" v-model="value" :value="repo.commonerrorId"></v-checkbox>
                </v-flex>
                <v-flex xs11 class="mt-3 pt-1">
                  <div>{{ repo.errortext }}</div>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
          <v-flex xs12 md6>
            <v-textarea
                 name="input-10"
                 label="Comments"
                 color="blue"
                 outline
                 v-model="comment"
               ></v-textarea>
          </v-flex>
      </v-layout>
      <div>
        <v-btn @click="send">Submit</v-btn>
      </div>
    </v-form>
    <br>
    <hr>
    <h2>Previous Error Status</h2>
    <ul v-for="(error, i) in farmererrors"  :key="i" align="left" >
        <li>{{error.errortext}}</li>
    </ul>

    <hr>
    </v-container>
  </div>
</template>
<script>
  import axios from 'axios'
  import localForage from 'localforage'
  var deviseid
  var token
  var email
  export default {
    name: 'Contact',
    data () {
      return {
        value: [],
        alert: false,
        comment: '',
        error_report: [],
        valid: false,
        farmererror: [],
        farmererrors: []
      }
    },
    methods: {
      send () {
        var obj = this
        axios({
          method: 'post',
          url: obj.$hostname + '/error/errorraise',
          headers: {
            deviseid: deviseid,
            token: token,
            email: email
          },
          data: {
            error: this.value,
            comment: this.comment
          }
        }).then(response => {
          console.log(response)
          if (response.data.success) {
            obj.alert = true
          }
          obj.$refs.form.reset()
          obj.value = []
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
            url: obj.$hostname + '/error/commonerror',
            headers: {
              deviseid: deviseid,
              token: token,
              email: email
            }
          }).then(response => {
            obj.error_report = response.data.commonerror
          }).catch(error => {
            console.log(error)
          })
          axios({
            method: 'get',
            url: obj.$hostname + '/error/farmererror',
            headers: {
              deviseid: deviseid,
              token: token,
              email: email
            }
          }).then(response => {
            obj.farmererror = response.data.farmererror
            var i
            for (i = 0; i < obj.farmererror.length; i++) {
              if (obj.farmererror[i].errortext === null) {
                obj.farmererrors.push({'id': i, 'errortext': obj.farmererror[i].commonerror.errortext, 'status': obj.farmererror[i].status})
              } else {
                obj.farmererrors.push({'id': i, 'errortext': obj.farmererror[i].errortext, 'status': obj.farmererror[i].status})
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
    }
  }
</script>
<style scoped>

</style>
