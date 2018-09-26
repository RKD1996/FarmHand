// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Fontawesome from '@fortawesome/fontawesome'
import FontawesomeFreeSolid from '@fortawesome/fontawesome-free-solid'
import VueFontawesome from '@fortawesome/vue-fontawesome'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VTextField,
  VDialog,
  VCard,
  VProgressCircular,
  VAlert,
  VSwitch,
  VExpansionPanel,
  VBottomNav,
  VMenu,
  VDatePicker,
  VCheckbox,
  VForm,
  VTextarea,
  VSlider,
  VDivider
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueGoogleCharts from 'vue-google-charts'
import VueChartkick from 'vue-chartkick'
import localForage from 'localforage'
import 'vue-orgchart/dist/style.min.css'
Vue.use(localForage)
Vue.use(VueChartkick)
Vue.use(VueGoogleCharts)
Vue.use(Fontawesome)
Vue.use(FontawesomeFreeSolid)
Vue.use(VueFontawesome)
Vue.use(VueAxios, axios)

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VTextField,
    VDialog,
    VCard,
    VProgressCircular,
    VAlert,
    VSwitch,
    VExpansionPanel,
    VBottomNav,
    VMenu,
    VDatePicker,
    VCheckbox,
    VForm,
    VTextarea,
    VSlider,
    VDivider
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = true
Vue.prototype.$hostname =
  /* Production URL */
  // (Vue.config.productionTip) ? 'http://ec2-13-232-200-43.ap-south-1.compute.amazonaws.com:3000' : 'http://192.168.43.41:3000'
  /* Development URL */
  (Vue.config.productionTip) ? 'http://ec2-18-191-105-113.us-east-2.compute.amazonaws.com:3000' : 'http://192.168.43.41:3000'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
