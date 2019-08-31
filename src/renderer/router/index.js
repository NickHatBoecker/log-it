import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: require('@/views/Table').default,
        },
        {
            path: '/log/:logId',
            name: 'view_log',
            component: require('@/views/ViewLog').default,
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
})
