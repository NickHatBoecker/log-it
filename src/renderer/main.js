import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'

import store from './store.js'
import vuetify from './plugins/vuetify.js'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    store,
    beforeCreate () {
        this.$store.commit('initialiseStore')
    },
    vuetify,
    components: { App },
    router,
    template: '<App/>',
}).$mount('#app')
