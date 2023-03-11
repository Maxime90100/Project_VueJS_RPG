import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        password: null,
    },
    mutations: {
        setPassword(state,pwd) {
            state.password = pwd
        }
    }
}
