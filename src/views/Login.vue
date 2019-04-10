
<template>
      <div class="Login" :style="LoginStyle">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="login-from" >
              <el-form-item label="用户名" prop="nick">
                  <el-input v-model="ruleForm.nick"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="passwd">
                  <el-input
                            @keyup.enter.native="submitForm('ruleForm')"
                            type="password"
                            v-model="ruleForm.passwd">
                  </el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">登 录</el-button>
              </el-form-item>
          </el-form>
      </div>
</template>

<style lang="less">
.Login{
    position: relative;
    .login-from{
        position: absolute;
        top: 150px;
        right: 250px;
    }
}
</style>

<script>

    export default{
        data(){
            return {
                LoginStyle:{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: "100%",
                    height: "100%",
                    backgroundImage: "url(" + require("../assets/demo.jpg") + ")",
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat"
                },
                ruleForm:{
                    nick:'',
                    passwd:'',
                },
                rules: {
                    nick: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    passwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            };
        },

        methods:{

            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let postData ={nick:this.ruleForm.nick, passwd:this.$md5(this.ruleForm.passwd)};
                        let url = 'https://caizhi101.com/index.php?m=admin&c=login&a=login&';
                        url = url + this.$qs.stringify(postData);
                        this.$axios.get(url).then(res=>{
                            localStorage.setItem('token',res.data.data.token);
                            this.$router.push({name: 'Main'});
                        }).catch(err=>{})
                    } else {
                        return false;
                    }
                });

            }
        }


    }

</script>