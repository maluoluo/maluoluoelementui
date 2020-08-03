<template>
  <div class="navbar clearfix">
    <el-breadcrumb class="breadcrumb-container" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item,index) in levelList"
        :key="index"
        :to="item.path"
      >{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
 
<script>
export default {
  name: "Navbar",
  data() {
    return {
      levelList: [],
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },

  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb(route) {
      let matched = this.$route.matched.filter((item) => item.name);
      const first = matched[0];
      if (
        first &&
        first.name.trim().toLocaleLowerCase() !== "homepage".toLocaleLowerCase()
      ) {
        matched = [{ path: "/homepage", name: "首页" }].concat(matched);
      }
      this.levelList = matched;
    },
  },
};
</script>
<style>
.navbar {
  margin-top: 10px;
  padding-left: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(241, 236, 236);
}
</style>