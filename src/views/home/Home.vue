<template>
  <div class="home">
    <el-container class="container">
      <!-- 头部区域 -->
      <el-header>
        <div class="header">
          <img src="~assets/logo.png" alt="" />
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <!-- 侧边导航栏区域 -->
        <el-aside :width="iscollapse ? '64px' : '200px'">
          <div class="toggle" @click="toggleClick">|||</div>
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409bff"
            unique-opened
            :collapse="iscollapse"
            :collapse-transition="false"
            router
            :default-active="activepath"
          >
            <!-- 一级菜单 -->
            <el-submenu :index="item.id + ''" v-for="(item,index) in menuList" :key="item.id">
              <template slot="title">
                <i :class="iconsList[index]"></i>
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item @click="saveNavState('/home/' + subItem.path)" :index="'/home/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
                <template slot="title">
                  <i class="el-icon-ship"></i>
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 主要内容区域 -->
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getLeftMenu } from "network/home.js";
export default {
  data() {
      return{
          menuList:[],
          iconsList:{
              '0':'el-icon-s-check',
              '1':'el-icon-grape',
              '2':'el-icon-cherry',
              '3':'el-icon-watermelon',
              '4':'el-icon-pear'
          },
          iscollapse:false,
          activepath:''
      }
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
    //获取左侧菜单
    getLeftMenu1() {
      getLeftMenu().then((res) => {
          console.log(res)
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
        this.menuList = res.data
      });
    },
    // 左侧菜单栏的展开、折叠
    toggleClick(){
        this.iscollapse = !this.iscollapse
    },
    saveNavState(active){
        this.activepath = active
        window.sessionStorage.setItem('path',active)
    }
  },
  created() {
      this.activepath = window.sessionStorage.getItem('path')
      this.getLeftMenu1()
  },
};
</script>

<style lang='less' scoped>
.home,
.container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
}

.el-aside {
  background-color: #333744;
  .el-menu{
      border-right:none
  }
}

.el-main {
  background-color: #eaedf1;
}

.header img {
  width: 40px;
  height: 40px;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header {
  display: flex;
  align-items: center;
}

.header span {
  color: #fff;
  font-size: 18px;
}

.toggle{
    background-color: #4a5064;
    text-align: center;
    line-height: 24px;
    color: #fff;
}
</style>