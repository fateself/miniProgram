<!--消息管理-->
<template>
  <div class="message-manage">
    <div class="messgae-from">
      <div class="message-head">
        <!-- <span>|</span> -->
        <span>消息管理</span>
      </div>
      <el-form :model="messageForm"
               :inline="true"
               label-position="left">
        <el-row>
          <el-col :span="6">
            <el-form-item label="内  容">
              <el-input v-model="messageForm.content"
                        placeholder="审批人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="片区">
              <el-input v-model="messageForm.station"
                        placeholder="片区"></el-input>
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
            <el-button type="primary"
                       @click="addList">新增</el-button>
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
              <el-select v-model="messageForm.status"
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
              <el-date-picker v-model="messageForm.start"
                              type="datetime"
                              placeholder="选择日期时间">
              </el-date-picker>-
              <el-date-picker v-model="messageForm.end"
                              type="datetime"
                              placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="message-table">

      <div class="table-list">
        <el-table border
                  max-height="350"
                  :data="tableList"
                  style="width: 100%">
          <el-table-column align="center"
                           prop="content"
                           label="内容"
                           min-width="130">
          </el-table-column>
          <el-table-column align="center"
                           prop="image"
                           label="图片"
                           min-width="130">
            <template slot-scope="scope">
              <img :src="scope.row.image"
                   alt=""
                   style="height: 50px;width: 50px">
            </template>
          </el-table-column>
          <el-table-column align="center"
                           min-width="120"
                           prop="openid"
                           label="openid">
          </el-table-column>
          <el-table-column align="center"
                           min-width="120"
                           prop="nick"
                           label="微信名">
          </el-table-column>
          <el-table-column align="center"
                           min-width="120"
                           prop="station"
                           label="片区">
          </el-table-column>
          <el-table-column align="center"
                           min-width="120"
                           prop="openID"
                           label="定位">
          </el-table-column>
          <el-table-column align="center"
                           min-width="180"
                           prop="create_at"
                           label="发布时间">
          </el-table-column>
          <el-table-column align="center"
                           min-width="120"
                           prop="collect_num"
                           label="收藏数">
          </el-table-column>
          <el-table-column align="center"
                           prop="like_num"
                           label="点赞数">
          </el-table-column>
          <el-table-column align="center"
                           min-width="120"
                           prop="comment_num"
                           label="评论数">
          </el-table-column>
          <el-table-column align="center"
                           min-width="180"
                           prop="openID"
                           label="当前状态">
          </el-table-column>
          <el-table-column align="center"
                           min-width="130"
                           prop="openID"
                           label="操作">
            <template slot-scope="scope">
              <!--<el-button size="small"-->
              <!--type="text"-->
              <!--@click="lookFor">查看-->
              <!--</el-button>-->

              <el-button @click="editMessage(scope.row)"
                         size="small"
                         type="text">编辑
              </el-button>
              <el-button size="small"
                         type="text"
                         @click="reTop(scope.row)">置顶
              </el-button>
              <el-button @click="deleteList(scope.row)"
                         size="small"
                         type="text">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: right"
             class="paging">
          <pagination @pagechange="pagechange"
                      :totalAmount="totalNum">
          </pagination>
        </div>
      </div>
    </div>
    <message-manange-dialog v-on:displayCall="displayCallFalse"
                            v-on:callBack="getList"
                            :childData="childData">
    </message-manange-dialog>
  </div>
</template>

<style>
.message-head:nth-child(1) {
  font-size: 20px;
  margin-bottom: 20px;
  /* color: red; */
}
</style>

<script>
import { statusmaps } from '../assets/js/selectOptions'
import messageManangeDialog from '../components/messageManageDialog.vue'
import pagination from '../components/pagination.vue'
import baseUrl from '../assets/js/config'
export default {
  data () {
    return {
      statusmaps,
      totalNum: 0,
      childData: {
        title: '',
        mid: '',
        dialogVisible: false,
      },
      messageForm: {
        type: 1,
        content: '',
        station: '',
        status: 4,
        start: '',
        end: '',

      },
      tableList: [],
    }
  },
  components: { messageManangeDialog, pagination },
  methods: {
    getList (pageValue) {
      let postData = Object.assign({ token: localStorage.getItem('token') }, this.messageForm, { page: pageValue });
      let url = 'http://39.106.70.137:20010/index.php?m=admin&c=message&a=list&';
      url = url + this.$qs.stringify(postData);
      this.$axios.get(url).then(res => {
        if (res.data.return.code === 0) {
          this.tableList = res.data.data.list;
          this.totalNum = res.data.data.paging.total;
        } else {
          this.$message.error('查询失败')
        }
      }).catch(err => { })
    },

    addList () {
      this.childData.dialogVisible = true;
      this.childData.mid = '';
      this.childData.title = '新增';
    },



    lookFor () {
      this.childData.dialogVisible = true;
      this.childData.title = '查看';
    },

    reTop (row) {
      let postData = { mid: row.mid, status: 1, token: localStorage.getItem('token') };
      let url = 'https://caizhi101.com/index.php?m=admin&c=message&a=status';
      postData = this.$qs.stringify(postData);
      this.$axios.post(url, postData).then(res => {
        if (res.data.return.code === 0) {
          this.$message.success('置顶成功');
        } else {
          this.$message.error('操作失败')
        }
      })
    },
    deleteList (row) {
      let postData = { mid: row.mid, status: 3, token: localStorage.getItem('token') };
      let url = 'https://caizhi101.com/index.php?m=admin&c=message&a=status';
      postData = this.$qs.stringify(postData);
      this.$axios.post(url, postData).then(res => {
        if (res.data.return.code === 0) {
          this.$message.success('删除成功');
          this.getList();
        } else {
          this.$message.error('操作失败')
        }
      })
    },


    editMessage (row) {
      this.childData.dialogVisible = true;
      this.childData.title = '编辑';
      this.childData.mid = row.mid;
    },
    pagechange (val) {
      this.getList(val)
    },

    displayCallFalse () {
      this.childData.dialogVisible = false;
    }

  },
  mounted () {
    this.getList()
  }
}
</script>