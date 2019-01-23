<template>
    <div class="Main">
        <el-container>
            <el-header>
                <Header/>
            </el-header>
            <el-container>
                <el-aside width="200px" style="background-color:#285D8F;height:600px">
                    <el-menu
                            :default-active="$route.path"
                            class="el-menu-vertical-demo"
                            background-color="#285D8F"
                            text-color="#fff"
                            router
                            active-text-color="#ffd04b">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>后台</span>
                            </template>
                            <el-menu-item index="/MessageManage">消息管理</el-menu-item>
                            <el-menu-item index="/VipManage">会员管理</el-menu-item>
                            <el-menu-item index="/AdsManage">广告管理</el-menu-item>
                            <el-menu-item index="/sendMessage">发布消息</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import Header from '../components/Header.vue'
    export default {
        name:'Main',
        data(){
            return {

            }
        },
        components:{Header},
    }
</script>
<style lang="less">
    .Main{

    }
</style>