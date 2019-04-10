<template>
  <div id="app">
     <router-view />
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
  overflow: hidden !important;
}
</style>
