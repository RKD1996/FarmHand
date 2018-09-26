<template>
  <div>
    <v-container>
      <h3>Account Details: -</h3>
      <div class='text-xs-left' v-for='(pro, i) in profile' :key='i'>
      <v-layout row wrap class='mt-2'>
        <v-flex xs3 class='text-xs-left'>Name:</v-flex>
        <v-flex xs9 class='text-xs-left'>{{ pro.username }}</v-flex>
      </v-layout>
      <v-layout row wrap class='mt-2'>
        <v-flex xs3 class='text-xs-left'>Email:</v-flex>
        <v-flex xs9 class='text-xs-left'>{{ pro.email }}</v-flex>
      </v-layout>
      <v-layout row wrap class='mt-2'>
        <v-flex xs3 class='text-xs-left'>Cell No.:</v-flex>
        <v-flex xs9 class='text-xs-left'>{{ pro.mobile }}</v-flex>
      </v-layout>
      <v-layout row wrap class='mt-2'>
        <v-flex xs3 class='text-xs-left'>Address:</v-flex>
        <v-flex xs9 class='text-xs-left'>{{ pro.address }}</v-flex>
      </v-layout>
    </div>
    </v-container>
  </div>
</template>
<script>
import localForage from 'localforage'

export default {
  data () {
    return {
      profile: []
    }
  },
  methods: {
    getData () {
      var obj = this
      obj.profile = []
      localForage.getItem('user').then(function (value) {
        obj.profile.push(value)
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>
