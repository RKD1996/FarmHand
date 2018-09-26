import Vue from 'vue'
import Router from 'vue-router'
import Farm from '@/components/Farm'
import Home from '@/components/HomePage'
import Water from '@/components/water/Water'
import Grid from '@/components/grid/Grid'
import Pump from '@/components/pump/Pump.vue'
import Crop from '@/components/crop/Crop.vue'
import Settings from '@/components/settings/Settings.vue'
import Contact from '@/components/contact/Contact.vue'
import Profile from '@/components/Profile.vue'

import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Farm', component: Farm },
    { path: '/home', name: 'Home', component: Home },
    { path: '/water', name: 'Water', component: Water },
    { path: '/grid', name: 'Grid', component: Grid },
    { path: '/pump', name: 'Pump', component: Pump },
    { path: '/crop', name: 'Crop', component: Crop },
    { path: '/settings', name: 'Settings', component: Settings },
    { path: '/contact', name: 'Contact', component: Contact },
    { path: '/profile', name: 'Profile', component: Profile },

    { path: '/test', name: 'Test', component: Test }

  ]
})
