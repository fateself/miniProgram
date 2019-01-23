<!--分页器-->
<template>
  <div class="pagination text-right">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      background
      layout="total, prev, pager, next"
      :total="totalAmount">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name: 'pagination',
      data(){
          return {
            currentPage: 1
          }
      },
    props:['pageSize','totalAmount','paginationName'],
    methods:{
      handleCurrentChange(val){
        this.currentPage = val;
        this.$emit('pagechange',val);
      }
    }
  }
</script>
