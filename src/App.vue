<template>
  <v-app>
    <v-content>
      <nav-bar v-show='show'></nav-bar><br><br><br>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import navbar from '@/components/useful/NavBar.vue'
import localForage from 'localforage'

export default {
  name: 'App',
  components: {
    'nav-bar': navbar
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    update () {
      var obj = this
      localForage.getItem('user').then(function (value) {
        if (value.token) {
          obj.show = true
        } else { obj.show = false }
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  mounted () {
    this.update()
  }
}
</script>
<style>
body {
  margin: 0;
}
main {
  text-align: center;
  margin-top: 5px;
}
</style>
