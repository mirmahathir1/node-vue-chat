import Vue from 'vue'
import App from './App.vue'

import store from "./store/store";

import VueRouter from "vue-router";
import {routes} from "./routes";
import VueSocketIO from 'vue-socket.io'
Vue.use(VueRouter);
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
}));
const router = new VueRouter({
  mode: 'history',
  routes
});
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
