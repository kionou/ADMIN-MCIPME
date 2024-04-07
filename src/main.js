import { createApp } from 'vue'

import App from './App.vue'
import router from "./router";
import store from "./store"
import './assets/page-profile.css'
import './assets/demo.css'
import './assets/core.css'
import VueApexCharts from "vue3-apexcharts";
import vClickOutside from "click-outside-vue3";
import { registerScrollSpy } from 'vue3-scroll-spy';
import {createBootstrap} from 'bootstrap-vue-next'
import 'maz-ui/styles'
import MazBtn from 'maz-ui/components/MazBtn'
import MazInput from 'maz-ui/components/MazInput'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import MazSelect from 'maz-ui/components/MazSelect'
import MazAvatar from 'maz-ui/components/MazAvatar'
import MazTextarea from 'maz-ui/components/MazTextarea'
import MazSwitch from 'maz-ui/components/MazSwitch'
 import MazDropdown from 'maz-ui/components/MazDropdown'
 import MazInputPrice from 'maz-ui/components/MazInputPrice'
 import MazInputTags from 'maz-ui/components/MazInputTags'
 import MazCheckbox from 'maz-ui/components/MazCheckbox'
 import MazAccordion from 'maz-ui/components/MazAccordion'
 import MazInputCode from 'maz-ui/components/MazInputCode'


// Add the necessary CSS

import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import i18n from "./i18n"
import BootstrapVueNext from 'bootstrap-vue-next'
import "@/assets/scss/app.scss";
import "@/assets/main.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap/dist/js/bootstrap.js';




// PINIA
import pinia from '@/state/pinia'
import 'sweetalert2/dist/sweetalert2.min.css';
const app = createApp(App)

app.component('MazBtn', MazBtn)
app.component('MazInput', MazInput)
app.component('MazPhoneNumberInput', MazPhoneNumberInput)
app.component('MazSelect', MazSelect)
app.component('MazAvatar', MazAvatar)
app.component('MazTextarea', MazTextarea)
app.component('MazSwitch', MazSwitch)
app.component('MazDropdown', MazDropdown)
app.component('MazInputPrice', MazInputPrice)
app.component('MazInputTags', MazInputTags)
app.component('MazCheckbox', MazCheckbox)
app.component('MazAccordion', MazAccordion)
app.component('MazInputCode', MazInputCode)



  
   store.dispatch('auth/loadMyAuthenticatedUser').then(() => {
    app.use(pinia)
  app.use(router)
  app.use(store);

  app.use(createBootstrap())
  app.use(VueApexCharts)
  app.use(vClickOutside)
  app.use(i18n)
  app.use(registerScrollSpy)
  app.mount('#app')
    
     });