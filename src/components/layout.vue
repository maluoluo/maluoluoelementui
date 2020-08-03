<template>
  <div class="app">
    <el-container>
      <!-- <el-aside
        class="app-side app-side-left"
        :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'"
      >
        <div class="app-side-logo"></div>
        <div class="app-side-content">
          <el-menu
            router
            class="el-menu-vertical-demo"
            @open="handleOpen"
            :collapse="isCollapse"
          >
            <template v-for="route in routes">
              <template v-if="route.children && route.children.length">
                <el-menu-item
                  v-for="item in route.children"
                  :key="route.path + '/' + item.path"
                  :index="item.path"
                >
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{ item.name }}</span>
                </el-menu-item>
              </template>
            </template>
          </el-menu>
        </div>
      </el-aside>-->
      <el-aside
        class="app-side app-side-left"
        :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'"
      >
        <Sidebar :collapse="isCollapse" :routes="$router.options.routes[1].children" />
      </el-aside>
      <el-container>
        <el-header class="app-header">
          <div class="app-side-fold" @click.prevent="toggleSideBar">
            <i v-show="!isCollapse" class="el-icon-s-fold"></i>
            <i v-show="isCollapse" class="el-icon-s-unfold"></i>
          </div>
          <!-- <el-menu
            default-active="/"
            router
            class="el-menu-demo tab-page"
            mode="horizontal"
            @select="handleSelect"
            active-text-color="#409EFF"
          >
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/Echarts">图标</el-menu-item>
            <el-menu-item index="/article">文章</el-menu-item>
          </el-menu>-->
          <main-tags></main-tags>

          <div class="app-header-userinfo">
            <el-dropdown trigger="hover" :hide-on-click="false">
              <span class="el-dropdown-link">
                {{ username }}
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
        <el-main class="app-body">
          <template>
            <router-view />
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MainTags from "@/components/Tags";
import Sidebar from "@/components/Sidebar";
import Breadcrumb from "@/components/Breadcrumb";
export default {
  name: "Container",
  components: {
    Sidebar,
    MainTags,
    Breadcrumb,
  },
  data() {
    return {
      username: "",
      isCollapse: false,
    };
  },
  computed: {
    // 获取route路由
    routes() {
      return this.$router.options.routes;
    },
  },
  methods: {
    toggleSideBar() {
      this.isCollapse = !this.isCollapse;
    },
    logout() {
      this.$confirm("确认退出?", "提示", {})
        .then(() => {
          sessionStorage.removeItem("user");
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {
    let user = sessionStorage.getItem("user");
    if (user) {
      this.username = user;
    }
  },
};
</script>
<style lang="scss">
.app {
  $solidBorder: 1px solid #eee;
  $sideCollapsedWidth: 66px;
  $sideExpandedWidth: 230px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 1em;
  width: 100%;
  height: 100%;
  min-width: 900px;
  border: $solidBorder;
  display: flex;
  display: -webkit-flex;
  flex-flow: row nowrap;
  &-side {
    width: 230px;
    height: 100%;
    &-left {
      background-color: rgb(238, 241, 246);
    }
    &-logo {
      background: #00a4ff;
      height: 60px;
      text-align: center;
    }
    &-fold {
      padding-right: 15px;
      font-size: 24px;
    }
    &-collapsed {
      width: 66px !important;
      .app-side-logo {
        width: 66px;
      }
    }
    &-expanded {
      width: 230px !important;
    }
  }
  &-header {
    width: 100%;
    height: 60px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    border-bottom: $solidBorder;
    &-userinfo {
      position: absolute;
      right: 0;
      margin-right: 25px;
      display: flex;
      flex-flow: row nowrap;
      height: 60px;
      justify-content: flex-start;
      align-items: center;
    }
  }
  &-body {
    font-size: 1em;
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow-y: scroll;
  }
  &-footer {
    width: 100%;
    height: 60px;
  }
}
</style>
