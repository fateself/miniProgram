import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import MessageManage from './views/MessageManage.vue'
import VipManage from './views/VipManage.vue'
import AdsManage from './views/AdsManage.vue'
import sendMessage from './views/sendMessage.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/Main',
            name: 'main',
            component: Main,
            children: [
                {
                    path: '/MessageManage',
                    name: 'MessageManage',
                    component: MessageManage,
                },
                {
                    path: '/VipManage',   //会员管理
                    name: 'VipManage',
                    component: VipManage,
                },
                {
                    path: '/AdsManage',    //广告管理
                    name: 'AdsManage',
                    component: AdsManage,
                },

                {
                    path: '/sendMessage',    //发布消息
                    name: 'sendMessage',
                    component:sendMessage,
                 }
    ], redirect: '/MessageManage'
},

]
})
