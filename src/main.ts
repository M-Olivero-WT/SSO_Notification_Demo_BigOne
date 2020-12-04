import './scss/app.scss';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import { FIRE } from './_helpers/CONST_REFS';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

let app: any;

FIRE.auth().onAuthStateChanged((user) => {
  console.log(
    `This is the User -> ${JSON.stringify(
      user?.displayName ? user.displayName : user?.email
    )}`
  );
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
