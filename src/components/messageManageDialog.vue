<template>
  <div class="message-manange-dailog">
    <el-dialog :title="childData.title"
               :visible.sync="childData.dialogVisible"
               width="80%">
      <el-form :model="fromData"
               label-position="left"
               label-width="100px">
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
              <el-input v-model="fromData.link"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="片区">
              <el-input v-model="fromData.station"></el-input>
            </el-form-item>
            <!--<el-form-item label="类型">-->
            <!--<el-select v-model="fromData.type" style="width: 415px">-->
            <!--<el-option-->
            <!--v-for="item in typeMaps"-->
            <!--:key="item.key"-->
            <!--:label="item.value"-->
            <!--:value="item.key">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="经度">
              <el-input v-model="fromData.latitude"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纬度">
              <el-input v-model="fromData.longitude"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="图片地址">
              <el-input v-model="fromData.image"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="childData.mid"
                   type="primary"
                   @click="saveForm">确 定</el-button>
        <el-button v-else
                   type="primary"
                   @click="submitForAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
//    import {typeMaps} from '../assets/js/selectOptions'
import baseUrl from '../assets/js/config'
export default {
  data () {
    return {
      fromData: {
        mid: '',
        content: '',
        link: '',
        type: 1,
        station: '',
        image: '',
        latitude: '',
        longitude: '',
      }
    }
  },
  props: ['childData'],
  watch: {
    'childData.dialogVisible' (val) {
      if (val) {
        if (this.childData.mid) {
          console.log('编辑----' + this.childData.mid)

          this.showEditForm();
        } else {
          console.log('我是新增')
          this.fromData = {
            mid: '',
            content: '',
            link: '',
            type: 1,
            station: '',
            image: '',
            latitude: '',
            longitude: '',
          }
        }
      }
    },
  },
  methods: {
    // 新增
    submitForAdd () {
      let postData = Object.assign(
        {          token: localStorage.getItem('token'),
          operate: 1
        }, this.fromData)
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
    },


    //编辑的时候  获取的信息
    showEditForm () {
      let postData = { mid: this.childData.mid };
      let url = baseUrl + '/index.php?m=admin&c=message&a=info&';
      url = url + this.$qs.stringify(postData);
      this.$axios.get(url).then(res => {
        if (res.data.return.code === 0) {
          this.fromData = res.data.data;
        } else {
          this.$message.error('操作失败')
        }
      }).catch(err => {

      })
    },

    //编辑完  保存
    saveForm () {
      let postData = Object.assign({ operate: 2, token: localStorage.getItem('token') }, this.fromData);
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
    },

    cancel () {
      this.$emit('displayCall')
      this.childData.mid = '';
      for (var k in this.fromData) {
        this.fromData[k] = ''
      }
    }
  }
}
</script>