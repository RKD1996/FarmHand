<template>
  <div>
    <v-layout row class="mx-auto">
      <v-flex xs4>
        <v-menu offset-y>
          <div slot="activator"><font-awesome-icon class="mt-3 menuicon" icon="bars"/></div>
          <v-list>
            <v-list-tile v-for="(menu, index) in menus" :key="index" @click="select(menu.title)">
              <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
      <v-flex xs4 id="flex" class="text-xs-center">
        <img class="mx-auto" src="@/assets/logo2.png" alt="logo" id="logo" @click="home">
      </v-flex>
      <v-flex xs4>
        <div class="text-xs-center mt-2" id="contact"><span @click="contact" id="iconcon" :class="color"><u>Contact</u></span>
          <font-awesome-icon class="ml-2 pt-2" :color="icolor" icon="cog" id="iconset" @click="setting"/>
        </div>
      </v-flex>
    </v-layout><br><br>
    <v-bottom-nav id="nav" class="mt-1" :value="true" :active.sync="e1" absolute  height="100px">
      <v-btn flat color="black" @click="clickPump">
        <span color="white">Pump</span><br>
        <img src="@/assets/icons8-pump-filled-50.png" alt="pump logo" width="36px">
      </v-btn>
      <v-btn flat color="black" @click="clickWater">
        <span>Water</span><br>
        <font-awesome-icon icon="tint" id="icon"/>
      </v-btn>
      <v-btn flat color="black" @click="clickCrop">
        <span>Crop</span><br>
        <font-awesome-icon icon="seedling" id="icon"/>
      </v-btn>
      <v-btn flat color="black" @click="clickGrid">
        <span>Grid</span><br>
        <font-awesome-icon icon="chart-bar" id="icon"/>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>
<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import checkUser from '@/mixins/checkUserMixin'
import localForage from 'localforage'
import axios from 'axios'

export default {
  data () {
    return {
      e1: 'recent',
      color: 'black--text',
      icolor: 'black',
      menus: [
        {
          title: 'Profile'
        },
        {
          title: 'Logout'
        }
      ]
    }
  },
  components: {
    FontAwesomeIcon
  },
  methods: {
    clickPump () {
      this.$router.push('/pump')
      this.color = 'black--text'
      this.icolor = 'black'
    },
    clickWater () {
      this.$router.push('/water')
      this.color = 'black--text'
      this.icolor = 'black'
    },
    clickCrop () {
      this.$router.push('/crop')
      this.color = 'black--text'
      this.icolor = 'black'
    },
    clickGrid () {
      this.$router.push('/grid')
      this.color = 'black--text'
      this.icolor = 'black'
    },
    contact () {
      this.$router.push('/contact')
      if (this.color === 'black--text') {
        this.color = 'blue--text'
        this.icolor = 'black'
      } else {
        this.color = 'black--text'
      }
    },
    setting () {
      this.$router.push('/settings')
      if (this.icolor === 'black') {
        this.icolor = 'blue'
        this.color = 'black--text'
      } else {
        console.log('black')
        this.icolor = 'black'
      }
    },
    home () {
      this.$router.push('/home')
      this.color = 'black--text'
      this.icolor = 'black'
    },
    select (event) {
      this.icolor = 'black'
      this.color = 'black--text'

      if (event === 'Logout') {
        var obj = this
        localForage.getItem('user').then(function (value) {
          axios({
            method: 'get',
            url: obj.$hostname + '/users/logout',
            headers: {
              deviseid: value.devise_id,
              token: value.token,
              email: value.email
            }
          }).then(response => {
            console.log(response.data)
          }).catch(error => {
            console.log(error)
          })
        }).catch(function (err) {
          console.log(err)
        })
        localForage.clear()
        this.$router.go('/')
      }
      if (event === 'Profile') {
        this.$router.push('/profile')
      }
    }
  },
  mixins: [checkUser],

  created () {
    this.token()
  }
}
</script>
<style scoped>
#icon{
  height: 35px;
  width: 35px;
}
#nav{
  top: 60px;
  background: linear-gradient(0.25turn, #90CAF9, #1565C0);
}
#contact{
  font-size: 18px;
}
#iconset{
  height: 25px;
  width: 25px;
  cursor: pointer;
}
#logo{
  height: 50px;
  width: 50px;
  cursor: pointer;
}
#iconcon{
  cursor: pointer;
}
.menuicon{
  font-size: 18px;
}
</style>
