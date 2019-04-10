import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main.vue'
import MessageManage from './views/MessageManage.vue'
import VipManage from './views/VipManage.vue'
import AdsManage from './views/AdsManage.vue'
import sendMessage from './views/sendMessage.vue'

Vue.use(Router)

export default new Router({
    routes: [

        {
            path:'/',
            redirect: 'Login'
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },

        {
            path: '/Main',
            name: 'Main',
            component: Main,
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: '/MessageManage',
                    name: 'MessageManage',
                    component: MessageManage,
                    meta: {
                        requireAuth: true
                    },
                },
                {
                    path: '/VipManage',   //会员管理
                    name: 'VipManage',
                    component: VipManage,
                    meta: {
                        requireAuth: true
                    },
                },
                {
                    path: '/AdsManage',    //广告管理
                    name: 'AdsManage',
                    component: AdsManage,
                    meta: {
                        requireAuth: true
                    },
                },
                {
                    path: '/sendMessage',    //发布消息
                    name: 'sendMessage',
                    component:sendMessage,
                    meta: {
                        requireAuth: false
                    },
                 }
    ], redirect: '/MessageManage'
},

]
})
