<!--广告管理-->
<template>
  <div class="ads-manage">
    <el-form label-position="left" :inline="true" :model="adsForm">
      <el-row>
        <el-col :span="6">
          <el-form-item label="内容">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="片区">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button>重置</el-button>
          <el-button>查询</el-button>
          <el-button type="primary" @click="addList">新增</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发布时间">
            <el-date-picker type="datetimerange" range-separator="-"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="ads-table">
      <el-table border style="width: 100%" :data="tableList">
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="name" align="center" label="图片" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.image" alt style="height: 50px;width: 50px">
          </template>
        </el-table-column>
        <el-table-column prop="link_url" align="center" label="链接"></el-table-column>
        <el-table-column prop="station" align="center" label="展示片区"></el-table-column>
        <el-table-column prop="address" align="center" label="发布时间"></el-table-column>
        <el-table-column prop="collect_num" align="center" label="收藏数"></el-table-column>
        <el-table-column prop="like_num" align="center" label="点赞数"></el-table-column>
        <el-table-column prop="comment_num" align="center" label="评论数"></el-table-column>
        <el-table-column prop="look_num" align="center" label="点击数"></el-table-column>
        <el-table-column prop="address" align="center" label="当前状态"></el-table-column>
        <el-table-column prop="address" align="center" label="展示"></el-table-column>
        <el-table-column align="center" min-width="150" prop="openID" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="reTop(scope.row)">设为显示</el-button>
            <el-button @click="deleteList(scope.row)" size="small" type="text">删除</el-button>
            <el-button @click="editMessage(scope.row)" size="small" type="text">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right">
        <pagination @pagechange="pagechange" :totalAmount="totalNum"></pagination>
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
      adsForm: {
        type: 2,
        content: "",
        station: "",
        status: 0,
        start: "",
        end: "",
        page: 0
      },
      tableList: [],
      totalNum: 0
    };
  },
  components: { pagination },
  methods: {
    getList(pageValue) {
      let postData = Object.assign(
        { token: localStorage.getItem("token") },
        this.adsForm,
        { page: pageValue }
      );
      let url = baseUrl + "/index.php?m=admin&c=message&a=list&";
      url = url + this.$qs.stringify(postData);
      this.$axios
        .get(url)
        .then(res => {
          if (res.data.return.code === 0) {
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
    },
    deleteList(row) {
      let postData = {
        mid: row.mid,
        status: 3,
        token: localStorage.getItem("token")
      };
      let url = baseUrl + "/index.php?m=admin&c=message&a=status";
      postData = this.$qs.stringify(postData);
      this.$axios.post(url, postData).then(res => {
        if (res.data.return.code === 0) {
          this.$message.success("删除成功");
          this.getList();
        } else {
          this.$message.error("操作失败");
        }
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>