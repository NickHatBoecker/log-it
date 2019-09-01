import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        logs: [],
        settings: {
            'highlightColor': true,
            'showFullLogPath': false,
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

store.subscribe((mutation, state) => {
    if (mutation.type === 'initialiseStore' || mutation.type.includes('load')) {
        return
    }

    localStorage.setItem('logs', JSON.stringify(state.logs))
    localStorage.setItem('settings', JSON.stringify(state.settings))
})

export default store
