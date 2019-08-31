import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        logs: [],
    },

    mutations: {
        // See main.js
        initialiseStore (state) {
            this.commit('loadLogs')
        },

        loadLogs (state) {
            state.logs = JSON.parse(localStorage.getItem('logs'))
        },

        removeLog (state, index) {
            Vue.delete(state.logs, index)
        },
    },

    getters: {
        logs: state => state.logs,
    },
})
