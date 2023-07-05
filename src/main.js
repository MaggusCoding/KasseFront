import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ValidationOptions } from 'vee-validate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import VueApexCharts from 'vue3-apexcharts'
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt)
createApp(App).use(VueApexCharts).use(store).use(ValidationOptions).use(router).use(store).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
