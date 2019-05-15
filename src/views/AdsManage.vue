<!--广告管理-->
<template>
  <div class="ads-manage">
    <el-form label-position="left"
             :inline="true"
             :model="adsForm">
      <el-row>
        <el-col :span="6">
          <el-form-item label="内容">
            <el-input v-model="adsForm.content"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="片区">
            <el-input v-model="adsForm.station"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button>重置</el-button>
          <el-button @click="getList">查询</el-button>
          <el-button type="primary"
                     @click="addList">新增</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-select v-model="adsForm.status"
                       placeholder="请选择">
              <el-option v-for="item in statusmaps"
                         :key="item.key"
                         :label="item.value"
                         :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发布时间">
            <el-date-picker v-model="timeLine"
                            type="datetimerange"
                            range-separator="-"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="ads-table">
      <el-table border
                style="width: 100%"
                max-height="400"
                :data="tableList">
        <el-table-column prop="content"
                         label="内容"></el-table-column>
        <el-table-column prop="name"
                         align="center"
                         label="图片"
                         width="120">
          <template slot-scope="scope">
            <img :src="scope.row.image"
                 alt
                 style="height: 50px;width: 50px">
          </template>
        </el-table-column>
        <el-table-column prop="link_url"
                         align="center"
                         label="链接"></el-table-column>
        <el-table-column prop="station"
                         align="center"
                         label="展示片区"></el-table-column>
        <el-table-column prop="address"
                         align="center"
                         label="发布时间"></el-table-column>
        <el-table-column prop="collect_num"
                         align="center"
                         label="收藏数"></el-table-column>
        <el-table-column prop="like_num"
                         align="center"
                         label="点赞数"></el-table-column>
        <el-table-column prop="comment_num"
                         align="center"
                         label="评论数"></el-table-column>
        <el-table-column prop="look_num"
                         align="center"
                         label="点击数"></el-table-column>
        <el-table-column prop="address"
                         align="center"
                         label="当前状态"></el-table-column>
        <el-table-column prop="address"
                         align="center"
                         label="展示"></el-table-column>
        <el-table-column align="center"
                         min-width="150"
                         prop="openID"
                         label="操作">
          <template slot-scope="scope">
            <el-button size="small"
                       type="text"
                       @click="toggleStatus(scope.row,'hide')">设为显示</el-button>
            <el-button @click="deleteList(scope.row)"
                       size="small"
                       type="text">删除</el-button>
            <el-button @click="editMessage(scope.row)"
                       size="small"
                       type="text">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right">
        <pagination @pagechange="pagechange"
                    :totalAmount="totalNum"></pagination>
      </div>
    </div>

    <AdsManageDialog :childData="childData"
                     v-on:displayCall="displayCall"
                     v-on:callBack="getList">
    </AdsManageDialog>
  </div>
</template>

<script>
import { statusmaps } from '../assets/js/selectOptions'
import baseUrl from "../assets/js/config";
import pagination from "../components/pagination.vue";
import AdsManageDialog from '../components/adsManageDialog.vue'

export default {
  data () {
    return {
      statusmaps,
      adsForm: {
        type: 2,
        content: "",
        station: "",
        status: '',
        start: "",
        end: "",
        page: 0
      },
      timeLine: '',
      tableList: [],
      totalNum: 0,
      childData: {
        dialogVisible: false
      }
    };
  },
  components: { pagination, AdsManageDialog },
  methods: {
    getList (pageValue) {
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
        .catch(err => { });
    },
    pagechange (val) {
      this.getList(val);
    },
    deleteList (row) {
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
    },
    toggleStatus (row, status) {
      let data = {
        mid: row.mid,
        status: 2,//设置隐藏
        token: localStorage.getItem("token")
      }
      if (status == 'show') data.status = 0//设置显示
      let url = baseUrl + "/index.php?m=admin&c=message&a=status"
      data = this.$qs.stringify(data)
      this.$axios.post(url, data).then(res => {
        if (res.data.return.code === 0) {
          if (status == 'show') this.$message.success("设为显示成功");
          else this.$message.success("设为隐藏成功");
          this.getList();
        } else {
          this.$message.error("操作失败");
        }
      });
    },

    addList () {
      this.childData.dialogVisible = true;
      this.childData.mid = ''
      this.childData.title = '新增';
    },

    editMessage (row) {
      this.childData.dialogVisible = true;
      this.childData.title = '编辑';
      this.childData.mid = row.mid;
    },
    displayCall () {
      this.childData.dialogVisible = false;
    }





  },
  mounted () {
    this.getList();
  }
};
</script>