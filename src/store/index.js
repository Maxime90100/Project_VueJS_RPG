import Vue from 'vue'
import Vuex from 'vuex'

import {createHero, getAllHeroes, getHeroById, updateHero} from "@/services/hero.service";
import {addHeroesToTeam, createTeam, getAllTeams, getTeamById, removeHeroesFromTeam} from "@/services/team.service";
import {addTeamToOrg, createOrg, getAllOrgs, getOrgById, removeTeamFromOrg} from "@/services/org.service";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message:null,
    heroes: [],
    currentHero:null,
    teams: [],
    currentTeam:null,
    orgs: [],
    currentOrg:null,
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
    },
    setHeroes(state, heroes) {
      state.heroes.splice(0)
      heroes.forEach(h => state.heroes.push(h))
    },
    setCurrentHero(state, hero) {
      state.currentHero = hero
    },
    setTeams(state, teams) {
      state.teams.splice(0)
      teams.forEach(t => state.teams.push(t))
    },
    setCurrentTeam(state, team){
      state.currentTeam = team
    },
    setOrgs(state, orgs) {
      state.orgs.splice(0)
      orgs.forEach(o => state.orgs.push(o))
    },
    setCurrentOrg(state, org) {
      state.currentOrg = org
    }
  },
  actions: {
    // HERO
    async getHeroesFromAPI({commit}) {
      let result = null
      try {
        result = await getAllHeroes()
        if (result.error === 0) commit('setHeroes',result.data)
        else console.log(result.data)
      }
      catch(err) {console.error("[getHeroesFromAPI]:"+err)}
    },
    async createHero({commit},data){
      await createHero(data.publicName, data.realName, data.powers)
          .then(data=>{commit('setMessage',data)})
    },
    async updateHero({commit},data){
      await updateHero(data._id,data.publicName,data.realName,data.powers,data.secret)
          .then(data=>{commit('setMessage',data)})
    },
    async getHeroById({commit},data){
      await getHeroById(data.idHero,data.secret)
          .then(data=>{
            if(typeof data === 'object'){
              commit('setCurrentHero',data)
              commit('setMessage','Current Hero has been defined !')
            } else commit('setMessage',data)
          })
    },

    // TEAM
    async getTeamsFromAPI({commit}) {
      let result = null
      try {
        result = await getAllTeams()
        if (result.error === 0) commit('setTeams',result.data)
        else console.log(result.data)
      }
      catch(err) {console.error("[getTeamsFromAPI]:"+err)}
    },
    async createTeam({commit},data){
      await createTeam(data.name)
          .then(data=>{commit('setMessage',data)})
    },
    async addHeroesToTeam({commit},data){
      let idHeroes = []
      data.idHeroes.forEach(hero=>{idHeroes.push(hero.idHero)})
      await addHeroesToTeam(idHeroes,data.idTeam)
          .then(data=>{commit('setMessage',data)})
    },
    async removeHeroesFromTeam({commit},data){
      let idHeroes = []
      data.idHeroes.forEach(hero=>{idHeroes.push(hero.idHero)})
      await removeHeroesFromTeam(idHeroes,data.idTeam)
          .then(data=>{commit('setMessage',data)})
    },
    async getTeamById({commit},data){
      await getTeamById(data.idTeam)
          .then(data=>{
            if(typeof data === 'object'){
              commit('setCurrentTeam',data)
              commit('setMessage','Current Team has been defined !')
            }
            else commit('setMessage',data)
          })
    },

    // ORG
    async getOrgsFromAPI({commit}) {
      let result = null
      try {
        result = await getAllOrgs()
        if (result.error === 0) commit('setOrgs',result.data)
        else console.log(result.data)
      }
      catch(err) {console.error("[getOrgsFromAPI]:"+err)}
    },
    async createOrg({commit},data){
      await createOrg(data.name,data.secret)
          .then(data=>{commit('setMessage',data)})
    },
    async addTeamToOrg({commit},data){
      await addTeamToOrg(data.idTeam,data.secret)
          .then(data=>{commit('setMessage',data)})
    },
    async removeTeamFromOrg({commit},data){
      await removeTeamFromOrg(data.idTeam,data.secret)
          .then(data=>{commit('setMessage',data)})
    },
    async getOrgById({commit,state},data){
      if(!state.password) return commit('setMessage','You must authenticate !')
      await getOrgById(data.idOrg,state.password)
          .then(data=>{
            if(typeof data === 'object'){
              commit('setCurrentOrg',data)
              commit('setMessage','Current Org has been defined !')
            }
            else commit('setMessage',data)
          })
    }
  },
  modules: {
  }
})
