<template>
  <v-container>
    <p class="text-xs-center pt-5 mt-3 subheading">
      <v-flex xs10 offset-xs1 sm6 offset-sm3>This is a Testing File</v-flex>
    </p>
    <br>
    <div class="text-xs-center pt-5 mt-3 title">
    Welcome
    </div>
    <v-flex xs5 sm2 class="mx-auto">
      <hr class="mt-2 black" style="height:1px;border:none;">
    </v-flex>
    <br>
    <v-layout row>
      <v-flex class="text-xs-center">
        <br>
        <v-btn @click="details" fab depressed large outline>Detail</v-btn>
        <v-btn @click="logout" fab depressed large outline>Logout</v-btn><br>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  components: {
  },
  data () {
    return {
      progress: false
    }
  },
  methods: {
    details () {
      console.log(localStorage)
      console.log(sessionStorage)
      var time1 = new Date(localStorage.getItem('time'))
      var time2 = new Date()
      var diff = (time2.getTime() - time1.getTime()) / 1000
      diff /= 60
      diff = Math.abs(Math.round(diff))
      console.log('Time Difference :: ' + diff)
    },
    logout () {
      localStorage.clear()
      sessionStorage.clear()
      console.log(localStorage)
      console.log(sessionStorage)
    }
  }
}
</script>
