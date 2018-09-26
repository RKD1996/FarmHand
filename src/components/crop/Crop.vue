<template>
  <div>
    <v-layout row class="mt-2" height="30" justify-center wrap fill-height>
      <v-flex xs4 id="mininav">
        <a id="navkey" :class="setTextColor1" @click="changeTextColor('nc')">New Crop</a>
      </v-flex>
      <v-flex xs4 id="mininav">
        <a id="navkey" :class="setTextColor2" @click="changeTextColor('cc')">Current Crop</a>
      </v-flex>
      <v-flex xs4 id="mininav">
        <a id="navkey" :class="setTextColor3" @click="changeTextColor('hs')">History</a>
      </v-flex>
    </v-layout>
    <br>
    <new-crop v-show="show === 'new'"></new-crop>
    <current-crop v-show="show === 'current'"></current-crop>
    <history v-show="show === 'history'"></history>
  </div>
</template>
<script>
import NewCrop from '@/components/crop/NewCrop.vue'
import CurrentCrop from '@/components/crop/CurrentCrop.vue'
import History from '@/components/crop/History.vue'

export default {
  name: 'Crop',
  data () {
    return {
      setTextColor1: 'white--text',
      setTextColor2: 'white--text',
      setTextColor3: 'white--text',
      show: ''
    }
  },
  components: {
    'new-crop': NewCrop,
    'current-crop': CurrentCrop,
    'history': History
  },
  methods: {
    changeTextColor (event) {
      if (event === 'nc') {
        this.setTextColor1 = 'white--text'
        this.setTextColor2 = 'black--text'
        this.setTextColor3 = 'black--text'
        this.show = 'new'
      }
      if (event === 'cc') {
        this.setTextColor1 = 'black--text'
        this.setTextColor2 = 'white--text'
        this.setTextColor3 = 'black--text'
        this.show = 'current'
      }
      if (event === 'hs') {
        this.setTextColor1 = 'black--text'
        this.setTextColor2 = 'black--text'
        this.setTextColor3 = 'white--text'
        this.show = 'history'
      }
    }
  },
  mounted () {
    this.setTextColor1 = 'white--text'
    this.setTextColor2 = 'black--text'
    this.setTextColor3 = 'black--text'
    this.show = 'new'
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
