<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/logo.png"
           alt="后台管理系统"
           class="logo-img">
      后台管理系统
    </div>
    <div class="menu">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/logo.png"
               alt="">
          <span> 斌斌</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>切换账号</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
          <!-- <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {},
  mounted () { }
}
</script>

<style lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  color: #fff;
  font-size: 25px;
  z-index: 1;
  .logo {
    display: flex;
    align-items: center;
    .logo-img {
      width: 30px;
      margin-right: 5px;
    }
  }
  .menu {
    img {
      width: 20px;
      margin-right: 5px;
    }
  }
}
</style>