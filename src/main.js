// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import StoreData from "./store/store";
import {initialize} from './helpers/general'

let Bootstrap = require('bootstrap')
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'

// Sweet Alert
import Swal from 'sweetalert2'

window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

window.Toast = Toast;

Vue.use(Vuex)

const store = new Vuex.Store(StoreData)

window.axios = require('axios');

Vue.config.productionTip = false

initialize(store, router);
import './helpers/mixin'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
