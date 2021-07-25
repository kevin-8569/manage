<template>
  <div>
    <!-- 面包屑顶部栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 输入框区域 -->
      <div>
        <el-input
          placeholder="请输入内容"
          v-model="queryInfo.query"
          class="input-with-add"
          clearable
          @clear="getUsersInfo1(queryInfo)"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getUsersInfo1(queryInfo)"
          ></el-button>
        </el-input>
        <el-button type="primary" @click="addusers">添加用户</el-button>
      </div>
      <!-- 用户列表表格区域 -->
      <el-table :data="userlist" style="width: 100%" stripe border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser(scope.row)"
            ></el-button>
            <el-tooltip
              content="分配角色"
              placement="top"
              effect="light"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button
            ></el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pagesize"
          :current-page="queryInfo.pagenum"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- //弹出对话框 -->
      <el-dialog title="添加用户" @close="addDialogClosed" :visible.sync="dialogVisible" width="50%" center>
        <el-form :model="addForm" ref="addFormRef" label-width="70px">
          <el-form-item  label="用户名">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item  label="密码">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item  label="邮箱">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item  label="手机">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDialogConfirm"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getUsersInfo, putUsersInfo,addUser,deleteUsers } from "network/users.js";
export default {
  data() {
    return {
      //获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 2,
      },
      //用户列表信息
      userlist: [],
      total: 0,
      //弹出表单的数据
      addForm:{
        username:'',
        password:'',
        email:'',
        mobile:'',
      },
      // 是否弹出对话框
      dialogVisible: false,
    };
  },
  created() {
    this.getUsersInfo1(this.queryInfo);
  },
  methods: {
    // 获取用户列表数据
    getUsersInfo1(config) {
      getUsersInfo(config).then((res) => {
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error("用户列表获取错误");
        }
        this.userlist = res.data.users;
        this.total = res.data.total;
      });
    },
    //put状态给数据库
    putUsersInfo1(info) {
      putUsersInfo(info).then((res) => {
        console.log(res);
        if (res.meta.status !== 200) {
          info.mg_state = !info.mg_state;
          return this.$message.error("更新用户信息失败");
        }
        this.$message.success("更新用户信息成功");
      });
    },
    //确认添加用户
    async addUser1(params){
      // addUser(params).then(res => {
      //   console.log(res)
      //   if(res.meta.status !== 201) return this.$message.error('添加用户失败')
      //   this.$message.success('添加用户成功')
      //   this.dialogVisible = false
      //   //重新获取用户列表数据
      //   this.getUsersInfo1(this.queryInfo)
      // })
      this.dialogVisible = false
      const {data,meta} = await addUser(params)
      console.log(data,meta)
      if(meta.status !== 201) return this.$message.error('添加用户失败')
      this.$message.success('添加用户成功')
      //重新获取用户列表数据
      this.getUsersInfo1(this.queryInfo)
    },
    //删除用户操作
     async deleteUser(row) {
        const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)        
        if(confirmResult !== 'confirm') return this.$message.info('已取消删除')
        const {data,meta} = await deleteUsers(row.id)
        if(meta.status !== 200){
          return this.$message.info('删除失败')
        }
        this.$message.success('删除成功')
        this.getUsersInfo1(this.queryInfo)
    },
    // 监听每页条数
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getUsersInfo1(this.queryInfo);
    },
    // 监听当前页数
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getUsersInfo1(this.queryInfo);
    },
    // 监听用户状态
    userStateChange(userinfo) {
      console.log(userinfo.mg_state);
      this.putUsersInfo1(`${userinfo.id}/state/${userinfo.mg_state}`);
    },
    //添加用户按钮
    addusers() {
      this.dialogVisible = true;
    },
    //关闭弹出框的事件
    addDialogClosed(){
      this.$refs.addFormRef.resetFields();
    },
    //点击弹出框的确认按钮
    addDialogConfirm(){
      this.addUser1(this.addForm)
    }
  },
};
</script>

<style lang="less" scoped>
.el-card {
  margin-top: 15px;
}

.input-with-add {
  width: 400px;
  margin-right: 20px;
}

.el-table {
  margin: 20px 0;
}
.pages {
  position: relative;
  height: 30px;
}

.el-pagination {
  position: absolute;
  right: 0;
  /deep/ .selected {
    color: #155bd4;
    font-weight: 700;
  }
}

</style>