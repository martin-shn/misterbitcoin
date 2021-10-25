import Vue from 'vue'
import Vuex from 'vuex'
import contactModule from '@/store/modules/contact.module'
import userService from '@/services/user.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null
  },
  getters:{
    loggedInUser(state){
      return state.user
    }
  },
  mutations: {
    setUser(state, payload){
      state.user = payload.loggedInUser
    }
  },
  actions: {
    async getLoggedInUser(context){
      const loggedInUser = await userService.getLoggedInUser()
      context.commit({type:'setUser', loggedInUser})
    },
    async login(context, {cred}){
      const loggedInUser = await userService.login(cred);
      context.commit({type:'setUser', loggedInUser})
    },
    async logout(context){
      await userService.logout();
      context.commit({type:'setUser', loggedInUser:null})
    },
  },
  modules: {
    contactModule
  }
})
