import Vue from 'vue'
import Vuex from 'vuex'

import events from "@/store/event.dialog.module";
import errors from "@/store/error.dialog.module";
import auth from "@/store/auth.module";

import orgs from "@/store/org.module";
import teams from "@/store/team.module";
import heroes from "@/store/hero.module";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message:null,
    password:null
  },
  getters: {
  },
  mutations: {
    setMessage(state, message){
      state.message = message
    },
    setPassword(state, passord){
      state.password = passord
    }
  },
  actions: {

  },
  modules: {
    orgs, teams, heroes,
    events, errors,
    auth
  }
})
