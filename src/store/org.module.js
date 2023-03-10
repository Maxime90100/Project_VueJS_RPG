import Vue from 'vue'
import Vuex from 'vuex'
import {addTeamToOrg, createOrg, getAllOrgs, getOrgById, removeTeamFromOrg} from "@/services/org.service";

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        orgs: [],
        currentOrg:null,
    },
    mutations: {
        setOrgs(state, orgs) {
            state.orgs.splice(0)
            orgs.forEach(o => state.orgs.push(o))
        },
        setCurrentOrg(state, org) {
            state.currentOrg = org
        }
    },
    actions:{
        async getOrgsFromAPI({commit}) {
            await getAllOrgs()
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else commit('setOrgs',res.data)
                })
        },
        async createOrg({commit},data){
            await createOrg(data.name,data.secret)
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else commit('setMessage',res.data,{root:true})
                })
        },
        async addTeamToOrg({commit},data){
            await addTeamToOrg(data.idTeam,data.secret)
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else commit('setMessage',res.data,{root:true})
                })
        },
        async removeTeamFromOrg({commit},data){
            await removeTeamFromOrg(data.idTeam,data.secret)
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else commit('setMessage',res.data,{root:true})
                })
        },
        async getOrgById({commit,rootState},data){
            if(!rootState.password) return commit('errors/pushError','You must authenticate !',{root:true})
            await getOrgById(data.idOrg,rootState.password)
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else{
                        commit('setCurrentOrg',res.data)
                        commit('setMessage','Current Org has been defined !',{root:true})
                    }
                })
        }
    }
}
