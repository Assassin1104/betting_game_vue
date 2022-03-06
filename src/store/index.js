import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import LiveStatStore from './modules/liveStat';
import NotificationStore from './modules/notifications';
import UserStore from './modules/users';

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    sidebarShow: 'responsive',
    sidebarMinimize: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    toggleSidebarDesktop (state) {
        const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
        state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile (state) {
        const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
        state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set (state, [variable, value]) {
        state[variable] = value
    },
  },
  actions: {},
  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
  },
  modules: {
    liveStat: LiveStatStore,
    notifications: NotificationStore,
    users: UserStore
  },
  plugins: []
})