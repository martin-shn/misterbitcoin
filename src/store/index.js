import Vue from 'vue';
import Vuex from 'vuex';
import contactModule from '@/store/modules/contact.module';
import userService from '@/services/user.service';
import bitcoinService from '@/services/bitcoin.service';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    bitcoinRate: null,
    user: null
  },
  getters: {
    loggedInUser(state) {
      return state.user;
    },
    bitcoinRate(state){
      return state.bitcoinRate
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.loggedInUser;
    },
    setBitcoinRate(state, { rate }) {
      state.bitcoinRate = rate;
    }
  },
  actions: {
    async loadLoggedInUser(context) {
      const loggedInUser = await userService.getLoggedInUser();
      context.commit({ type: 'setUser', loggedInUser });
    },
    async login(context, { cred }) {
      const loggedInUser = await userService.login(cred);
      context.commit({ type: 'setUser', loggedInUser });
    },
    async logout(context) {
      await userService.logout();
      context.commit({ type: 'setUser', loggedInUser: null });
    },
    async loadBitcoinRate({ commit }) {
      const rate = await bitcoinService.getBitcoinRate();
      commit({ type: 'setBitcoinRate', rate });
    }
  },
  modules: {
    contactModule
  }
});
