<template>
    <div class="message-manange-dailog">
        <el-dialog
                :title="childData.title"
                :visible.sync="childData.dialogVisible"
                width="70%">
            <el-form :model="fromData">
                <el-row :gutter="12">
                    <el-col :span="12">
                        <el-form-item label="消息编号">
                            <el-input v-model="fromData.mid"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="内容">
                            <el-input v-model="fromData.content"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="12">
                    <el-col :span="12">
                        <el-form-item label="链接">
                            <el-input v-model="fromData.link_url"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类型">
                            <el-select v-model="fromData.type">
                                <el-option
                                        v-for="item in typeMaps"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="12">
                    <el-col :span="12">
                        <el-form-item label="片区">
                            <el-input v-model="fromData.station"></el-input>
                        </el-form-item>
                     </el-col>
                    <el-col :span="12">
                        <el-form-item label="经度">
                            <el-input v-model="fromData.latitude"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="12">
                    <el-col :span="12">
                        <el-form-item label="纬度">
                            <el-input v-model="fromData.longitude"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="图片地址">
                            <el-input v-model="fromData.image"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
             <el-button @click="cancel">取 消</el-button>
             <el-button v-if="childData.mid" type="primary" @click="saveForm">确 定</el-button>
             <el-button v-else type="primary" @click="submitForAdd">确add 定</el-button>
           </span>
        </el-dialog>
    </div>
</template>
<script>
    import {typeMaps} from '../assets/js/selectOptions'
    export default {
        data(){
            return {
                typeMaps,
                fromData: {
                    mid: '',
                    content: '',
                    link_url: '',
                    type: '',
                    station: '',
                    image: '',
                    latitude: '',
                    longitude: '',
                }
            }
        },
        props: ['childData'],
        watch: {
            'childData.dialogVisible'(val){
                if(val){
                    if(this.childData.mid){
                        this.showEditForm();
                    }else {
                        console.log('我是新增');
                    }

                }
            },
        },
        methods: {

//
            submitForAdd(){
                let postData = this.$qs.stringify(this.fromData);
                let url='https://caizhi101.com/index.php?m=admin&c=message&a=add&';
                url = url + postData;
                console.log(url);
                this.$axios.post(url).then(res=>{
                    console.log(res);
                })
            },


            //编辑的时候  获取的信息
            showEditForm(){
                let postData = {mid:this.childData.mid};
                let url = 'https://caizhi101.com/index.php?m=admin&c=message&a=info&';
                url = url + this.$qs.stringify(postData);
                console.log(url);
                this.$axios.get(url).then(res=>{
                    this.fromData = res.data.data ;

                }).catch(err=>{})
            },

            //编辑完  保存
            saveForm(){
                let postData = {mid:this.fromData.mid,status:''};
                let url = 'https://caizhi101.com/index.php?m=admin&c=message&a=status&';
                url = url + this.$qs.stringify(postData);
                this.$axios.post(url).then(res=>{
                    console.log(res);
                    this.cancel() ;
                }).catch(err=>{})
            },

            cancel(){
            this.childData.dialogVisible = false;
                this.childData.mid = '' ;
            for(var k in this.fromData){
                this.fromData[k] = ''
            }
}
        }
    }
</script>