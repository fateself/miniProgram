<template>
  <div>
    <div class="message-manange-dailog">
      <el-dialog :title="childData.title"
                 :visible.sync="childData.dialogVisible"
                 width="80%">
        <el-form ref="messageForm"
                 :rules="rules"
                 :model="messageForm"
                 label-width="80px">
          <el-form-item label="展示片区" prop="station">
            <el-input v-model="messageForm.station"></el-input>
          </el-form-item>
          <el-form-item label="链接" prop="link">
            <el-input v-model="messageForm.link"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input type="textarea" v-model="messageForm.content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="cancel">取消</el-button>
            <el-button v-if="childData.mid"
                       type="primary"
                       @click="saveForm('messageForm')">发 布</el-button>
            <el-button v-else
                       type="primary"
                       @click="submitForAdd('messageForm')">发add 布</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import baseUrl from '../assets/js/config'
export default {
  props: ['childData'],
  data () {
    return {
        messageForm: {
        mid: '',
        station: '',
        link: '',
        type: 2,
        content: '',
        image: '',
        latitude:'',
        longitude:'',
      },
        rules: {
            station: [
                { required: true, message: '请输入片区', trigger: 'blur' },
            ],
            link: [
                { required: true, message: '请输入链接', trigger: 'blur' }
            ]
        }
    }
  },
  watch: {
    'childData.dialogVisible' (val) {
      if (val) {
        if (this.childData.mid) {

          this.showEditForm();

        } else {
            for (var k in this.messageForm) {
                this.messageForm[k] = ''
            }
        }
      }
    }
  },
  methods: {
    // 新增
    submitForAdd (formName) {
        this.$refs[formName].validate((valid) => {
            if(valid){
                let postData = Object.assign(
                    {          token: localStorage.getItem('token'),
                        operate: 1
                    }, this.messageForm)
                postData = this.$qs.stringify(postData);
                let url = baseUrl + '/index.php?m=admin&c=message&a=add';
                this.$axios.post(url, postData).then(res => {
                    if (res.data.return.code === 0) {
                        this.$message.success('新增成功');
                        this.cancel();
                        this.$emit('callBack');
                    } else {
                        this.$message.error('操作失败')
                    }
                })
            }else {

                return false ;
            }

        })
    },


    //编辑的时候  获取的信息  m=admin&c=message&a=info
    showEditForm () {
      let postData = { mid: this.childData.mid ,operate:2};
      let url = baseUrl + '/index.php?m=admin&c=message&a=info&';
      url = url + this.$qs.stringify(postData);
      this.$axios.get(url).then(res => {
        if (res.data.return.code === 0) {
            console.log(res.data);
            this.messageForm = res.data.data;
            this.messageForm.link = res.data.data.link_url;
        } else {
          this.$message.error('操作失败')
        }
      }).catch(err => {

      })
    },

    //编辑完  保存
    saveForm (formName) {

        this.$refs[formName].validate((valid) => {

            if(valid){
                let postData = Object.assign({ operate: 2, token: localStorage.getItem('token') }, this.messageForm);
                let url = baseUrl + '/index.php?m=admin&c=message&a=status';
                postData = this.$qs.stringify(postData);
                this.$axios.post(url, postData).then(res => {
                    if (res.data.return.code === 0) {
                        this.$message.success('编辑成功!');
                        this.$emit('callBack')
                        this.cancel();
                    } else {
                        this.$message.success('操作失败!')
                    }
                }).catch(err => {
                })
            }else {
                return false;
            }


        })




    },

    cancel () {
      this.$emit('displayCall')
      this.childData.mid = '';
      for (var k in this.messageForm) {
        this.messageForm[k] = '';
      }
    }
  }
}
</script>

<style>
</style>