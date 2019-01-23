<!--消息管理-->
<template>
    <div class="message-manage">
        <div class="messgae-from">
            <el-form :model="messageForm" :inline="true" label-position="left">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="内容">
                            <el-input v-model="messageForm.content" placeholder="审批人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="片区">
                            <el-select v-model="messageForm.station" placeholder="请选择">
                                <el-option></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="定位">
                            <el-input placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-button>重置</el-button>
                        <el-button>查询</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="微信名">
                            <el-input placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="状态">
                            <el-select v-model="messageForm.status" placeholder="请选择">
                                <el-option
                                        v-for="item in statusmaps"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="发布时间">
                            <el-date-picker
                                    v-model="messageForm.start"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>-
                            <el-date-picker
                                    v-model="messageForm.end"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="message-table">
            <div class="add-button">
                <el-button type="primary" @click="addList">新增</el-button>
            </div>
            <div class="table-list">
                <el-table
                        border
                        :data="tableList"
                        style="width: 100%">
                    <el-table-column
                            prop="content"
                            label="内容"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="image"
                            label="图片"
                            width="180">
                        <template slot-scope="scope">
                            <img :src="scope.row.image" alt="" style="height: 50px;width: 50px">
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="openid"
                            label="openid">
                    </el-table-column>
                    <el-table-column
                            prop="nick"
                            label="微信名">
                    </el-table-column>
                    <el-table-column
                            prop="station"
                            label="片区">
                    </el-table-column>
                    <el-table-column
                            prop="openID"
                            label="定位">
                    </el-table-column>
                    <el-table-column
                            prop="openID"
                            label="发布时间">
                    </el-table-column>
                    <el-table-column
                            prop="collect_num"
                            label="收藏数">
                    </el-table-column>
                    <el-table-column
                            prop="like_num"
                            label="点赞数">
                    </el-table-column>
                    <el-table-column
                            prop="comment_num"
                            label="评论数">
                    </el-table-column>
                    <el-table-column
                            prop="openID"
                            label="当前状态">
                    </el-table-column>
                    <el-table-column
                            width="140"
                            prop="openID"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button size="small"
                                       type="text"
                                       @click="lookFor">查看
                            </el-button>
                            <el-button
                                    @click="editMessage(scope.row)"
                                    size="small"
                                    type="text">编辑
                            </el-button>
                            <el-button
                                    size="small"
                                    type="text">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination :totalAmount="totalNum"></pagination>
            </div>
        </div>
        <message-manange-dialog :childData="childData" v-on:pagechange="pageChange"></message-manange-dialog>
    </div>
</template>
<script>
    import {statusmaps} from '../assets/js/selectOptions'
    import messageManangeDialog from '../components/messageManageDialog.vue'
    import  pagination from '../components/pagination.vue'
    export default{
        data(){
            return {
                statusmaps,
                totalNum:0,
                childData:{
                    title:'',
                    dialogVisible:false,
                },
                messageForm:{
                    type: 1,
                    content:'',
                    station:'',
                    status:'',
                    start:'',
                    end:'',
                    page:1
                },
                tableList:[],
            }
        },
        components:{messageManangeDialog,pagination},
        methods:{
            getList(){
                let postData = Object.assign({},this.messageForm);
                let url = 'https://caizhi101.com/index.php?m=admin&c=message&a=list&';
                url = url + this.$qs.stringify(postData)
                this.$axios.get(url).then(res=>{
                    this.tableList = res.data.data.list;
                    this.totalNum = res.data.data.paging.total
                }).catch(err=>{})
            },

            addList(){
                this.childData.dialogVisible = true ;
                this.childData.title = '新增' ;
            },


            lookFor(){
                this.childData.dialogVisible = true ;
                this.childData.title = '查看' ;
            },
            editMessage(row){
                this.childData.dialogVisible = true ;
                this.childData.title = '编辑' ;
                this.childData.mid = row.mid ;
            },
            pageChange(val){

            }
        },
        mounted(){
            this.getList()
        }
    }
</script>