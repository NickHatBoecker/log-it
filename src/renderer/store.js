import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        logs: [],
        settings: {
            'highlightColor': true,
        },
    },

    mutations: {
        // See main.js
        initialiseStore () {
            this.commit('loadLogs')
            this.commit('loadSettings')
        },

        loadLogs (state) {
            state.logs = JSON.parse(localStorage.getItem('logs'))
        },

        loadSettings (state) {
            if (localStorage.getItem('settings')) {
                state.settings = JSON.parse(localStorage.getItem('settings'))
            }
        },

        removeLog (state, index) {
            Vue.delete(state.logs, index)
        },

        setSettings (state, settings) {
            Vue.set(state, 'settings', settings)
        },
    },

    getters: {
        logs: state => state.logs,
        settings: state => state.settings,
    },
})
