<!--会员管理-->
<template>
    <div class="vip-manage">
        <el-form label-position="left" :inline="true" :model="vipForm">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="微信名">
                        <el-input v-model="vipForm.nick"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="注册时间">
                        <el-date-picker
                                v-model="vipForm.registerTime"
                                type="datetimerange"
                                range-separator="-">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="点击广告">
                        <el-input v-model="vipForm.Ads"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="登录时间">
                        <el-date-picker
                                v-model="vipForm.loginTime"
                                type="datetimerange"
                                range-separator="-">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <!--<el-col :span="8">-->
                    <!--<el-button>重置</el-button>-->
                    <!--<el-button>查询</el-button>-->
                <!--</el-col>-->
            </el-row>
        </el-form>
        <div class="list-part">
            <div class="list-title">
                <h5>列表共XX条记录</h5>
                <el-table
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="序号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="opemid"
                            width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="微信名">
                </el-table-column>
                    <el-table-column
                            prop="address"
                            label="注册时间">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="最近登录时间">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="最近登录位置">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="评论数">
                    </el-table-column><el-table-column
                        prop="address"
                        label="发布数">
                </el-table-column><el-table-column
                        prop="address"
                        label="点击广告数">
                </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                vipForm:{
                    nick:'',
                    registerTime:'',
                    Ads:'',
                    loginTime:'',
                }
            }
        }
    }
</script>