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
            <el-date-picker v-model="vipForm.registerTime" type="datetimerange" range-separator="-"></el-date-picker>
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
            <el-date-picker v-model="vipForm.loginTime" type="datetimerange" range-separator="-"></el-date-picker>
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
        <el-table border style="width: 100%" :data="tableList">
          <el-table-column prop="date" label="序号"></el-table-column>
          <el-table-column prop="openid" label="openid"></el-table-column>
          <el-table-column prop="nick" label="微信名"></el-table-column>
          <el-table-column prop="create_at" label="注册时间"></el-table-column>
          <el-table-column prop="login_at" label="最近登录时间"></el-table-column>
          <el-table-column prop="address" label="最近登录位置"></el-table-column>
          <el-table-column prop="comment_num" label="评论数"></el-table-column>
          <el-table-column prop="message_num" label="发布数"></el-table-column>
          <el-table-column prop="ad_num" label="点击广告数"></el-table-column>
          <!-- <el-table-column align="center" min-width="130" prop="openID" label="操作">
            <template slot-scope="scope">
              <el-button size="small"
              type="text"
              @click="lookFor">查看
              </el-button>

              <el-button @click="editMessage(scope.row)" size="small" type="text">编辑</el-button>
              <el-button size="small" type="text" @click="reTop(scope.row)">置顶</el-button>
              <el-button @click="deleteList(scope.row)" size="small" type="text">删除</el-button>
            </template>
          </el-table-column>-->
        </el-table>
        <div style="text-align: right">
          <pagination @pagechange="pagechange" :totalAmount="totalNum"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseUrl from "../assets/js/config";
import pagination from "../components/pagination.vue";
export default {
  data() {
    return {
      vipForm: {
        nick: "",
        status: 0,
        start: "",
        end: "",
        page: "",
        registerTime: "",
        Ads: "",
        loginTime: ""
      },
      tableList: [],
      totalNum: 0
    };
  },
  components:{pagination},
  methods: {
    getList(pageValue) {
      let postData = Object.assign(
        { token: localStorage.getItem("token") },
        this.vipForm,
        { page: pageValue }
      );
      let url = baseUrl + "/index.php?m=admin&c=user&a=list&";
      url = url + this.$qs.stringify(postData);
      this.$axios
        .get(url)
        .then(res => {
          if (res.data.return.code === 0) {
            console.log(res);
            this.tableList = res.data.data.list;
            this.totalNum = res.data.data.paging.total;
          } else {
            this.$message.error("查询失败");
          }
        })
        .catch(err => {});
    },
    pagechange(val) {
      this.getList(val);
    }
  },
  mounted() {
    this.getList();
  }
};
</script>