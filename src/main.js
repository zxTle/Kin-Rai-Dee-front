import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import VueAxios from 'vue-axios'
import axios from 'axios'
import { getAuth } from 'firebase/auth'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

let app;

getAuth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});

