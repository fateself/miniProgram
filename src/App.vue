<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
    <!-- <router-view /> -->
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
export default {
  components: {
    Header
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
