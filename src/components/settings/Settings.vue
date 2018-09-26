<template>
  <div>
    <v-layout row class="mt-2" height="30" justify-center wrap fill-height>
      <v-flex xs4 id="mininav">
        <a id="navkey" :class="setTextColor1" @click="changeTextColor('gi')">General info</a>
      </v-flex>
      <v-flex xs4 id="mininav">
        <a id="navkey" :class="setTextColor2" @click="changeTextColor('fs')">Farm Setup</a>
      </v-flex>
      <v-flex xs4 id="mininav">
        <a id="navkey" :class="setTextColor3" @click="changeTextColor('au')">Add User</a>
      </v-flex>
    </v-layout>
    
    <general-info v-show="show === 'info'"></general-info>
    <add-user v-show="show === 'user'"></add-user>
    <farm-setup v-show="show === 'setup'"></farm-setup>
  </div>
</template>
<script>
  import NewCrop from '@/components/settings/GeneralInfo.vue'
  import CurrentCrop from '@/components/settings/AddUser.vue'
  import FarmSetup from '@/components/settings/FarmUser.vue'

  export default {
    name: 'Contact',
    data () {
      return {
        setTextColor1: 'white--text',
        setTextColor2: 'white--text',
        setTextColor3: 'white--text',
        show: ''
      }
    },
    components: {
      'general-info': NewCrop,
      'add-user': CurrentCrop,
      'farm-setup': FarmSetup
    },
    methods: {
      changeTextColor (event) {
        if (event === 'gi') {
          this.setTextColor1 = 'white--text'
          this.setTextColor2 = 'black--text'
          this.setTextColor3 = 'black--text'
          this.show = 'info'
        }
        if (event === 'fs') {
          this.setTextColor1 = 'black--text'
          this.setTextColor2 = 'white--text'
          this.setTextColor3 = 'black--text'
          this.show = 'setup'
        }
        if (event === 'au') {
          this.setTextColor1 = 'black--text'
          this.setTextColor2 = 'black--text'
          this.setTextColor3 = 'white--text'
          this.show = 'user'
        }
      }
    },
    mounted () {
      this.setTextColor1 = 'white--text'
      this.setTextColor2 = 'black--text'
      this.setTextColor3 = 'black--text'
      this.show = 'info'
    }
  }
</script>
<style scoped>
#mininav{
  background-color: grey;
  height: 30px;
  padding: 5px;
}
#navkay{
  cursor: pointer;
}
</style>
