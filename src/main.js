// Import Vue
import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import colors from 'vuetify/es5/util/colors'

import App from './App'
import router from './router'
import store from './store'

Vue.use(Vuetify, {theme: {
  primary: colors.red.darken3, 
  secondary: colors.red.lighten4,
  accent: colors.grey.darken4 
}})

Vue.config.productionTip = false

// Import App Custom Styles
//import AppStyles from './assets/sass/main.scss'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
