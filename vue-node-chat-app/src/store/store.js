import Vue from 'vue';
import Vuex from 'vuex';
import username from './modules/username';
import roomName from "./modules/roomName";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    username,
    roomName
  }
});


