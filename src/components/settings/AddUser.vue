<template>
  <div>
    <br>
    <div v-show="userInfo">
    <h2>Users Added Before</h2><br>
    <v-container>
      <v-layout row>
        <v-flex xs12 v-show="editUserData">
          <v-expansion-panel popout>
            <v-expansion-panel-content
              v-for="(user,i) in usersInfo.data"
              :key="i"
            >
              <div slot="header"><b>{{user.username}}</b></div>
              <v-card>
                <v-card-text>
                  {{user.email}}<br>
                  {{user.mobile}}<br>
                  {{user.address}}<br>
                  <v-btn @click="editUser(i)">Edit</v-btn>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <v-flex x12 v-show="editUserData == false">
          <v-text-field v-model="name" label="Name" required></v-text-field>
          <v-text-field v-model="email" label="E-mail" required></v-text-field>
          <v-text-field v-model="mobile" label="Cell No." required></v-text-field>
          <v-text-field v-model="address" label="Address" required></v-text-field>
          <v-btn @click="submitUserData">Confirm</v-btn><v-btn @click="cancel">Cancel</v-btn>
        </v-flex>
    </v-layout>
    </v-container>
    <hr>
  </div>
    <v-btn color="grey" style="border-radius: 20px;" v-show="addUser" @click="open">Add New User</v-btn>
    <v-container v-show="active">
      <v-container>
        <v-alert v-model="alert" type="success" dismissible>
          Your Request has Successfully been Submitted
        </v-alert>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Name"
          required
          ></v-text-field>
          <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          ></v-text-field>
          <v-text-field
          v-model="mobile"
          :rules="cellRules"
          label="Cell No."
          required
          ></v-text-field>
          <v-text-field
          v-model="address"
          :rules="addRules"
          label="Address"
          required
          ></v-text-field>
          <v-btn
          :disabled="!valid"
          @click="send"
          >
          Confirm
        </v-btn>
        <v-btn @click="cancel">Cancel</v-btn>
      </v-form>
    </v-container>
  </v-container>
</div>
</template>
<script>
import axios from 'axios'
import localForage from 'localforage'

export default {
  data: () => ({
    addUser: true,
    usersInfo: [],
    editUserData: true,
    userInfo: false,
    active: false,
    alert: false,
    valid: false,
    uid: '',
    name: '',
    nameRules: [
      v => !!v || 'Name is required'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    mobile: '',
    cellRules: [
      v => !!v || 'Cell Number Required',
      v => !isNaN(v) || 'Please Enter a Valid Cell Number'
    ],
    address: '',
    addRules: [
      v => !!v || 'Please Fill an Address'
    ]
  }),
  methods: {
    cancel () {
      this.editUserData = true
      this.addUser = true
      this.active = false
    },
    submitUserData () {
      var obj = this
      localForage.getItem('user').then(function (value) {
        axios({
          method: 'post',
          url: obj.$hostname + '/users/update_user',
          headers: {
            deviseid: value.devise_id,
            token: value.token,
            email: value.email
          },
          data: {
            'id': obj.uid,
            'username': obj.name,
            'email': obj.email,
            'mobile': obj.mobile,
            'address': obj.address
          }
        }).then(response => {
          console.log(response)
          obj.alert = true
          obj.$refs.form.reset()
          obj.pageOnLoad()
          obj.editUserData = true
        }).catch(error => { console.log(error) })
      }).catch(function (err) {
        console.log(err)
      })
    },
    editUser (i) {
      this.addUser = false
      this.active = false
      this.editUserData = false
      this.uid = this.usersInfo.data[i].id
      this.email = this.usersInfo.data[i].email
      this.name = this.usersInfo.data[i].username
      this.address = this.usersInfo.data[i].address
      this.mobile = this.usersInfo.data[i].mobile
    },
    getUserInfo () {
      // console.log(this.usersInfo.data)
      this.userInfo = this.usersInfo.success
    },
    open () {
      this.$refs.form.reset()
      this.active = true
    },
    send () {
      var obj = this
      localForage.getItem('user').then(function (value) {
        axios({
          method: 'post',
          url: obj.$hostname + '/users/add_user',
          headers: {
            deviseid: value.devise_id,
            token: value.token,
            email: value.email
          },
          data: {
            'username': obj.name,
            'email': obj.email,
            'mobile': obj.mobile,
            'address': obj.address
          }
        }).then(response => {
          console.log(response)
          obj.alert = true
          obj.$refs.form.reset()
          obj.pageOnLoad()
        }).catch(error => { console.log(error) })
      }).catch(function (err) {
        console.log(err)
      })
    },
    pageOnLoad () {
      var obj = this
      localForage.getItem('user').then(function (value) {
        axios({
          method: 'get',
          url: obj.$hostname + '/users/all_users',
          headers: {
            deviseid: value.devise_id,
            token: value.token,
            email: value.email
          }
        }).then(response => {
          obj.usersInfo = response.data
          obj.getUserInfo()
        }).catch(error => { console.log(error) })
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  created () {
    this.pageOnLoad()
  }
}
</script>
