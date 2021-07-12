<template>
  <div class="login">
    <div class="box">
      <div class="img">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <el-form
        :model="login"
        :rules="rules"
        ref="login"
        label-width="80px"
        class="login_form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="login.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="login.password"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm('login')"
            >提交</el-button
          >
          <el-button @click="resetForm('login')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginFn } from "network/login.js";
export default {
  data() {
    return {
      login: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 11,
            message: "长度在 5 到 11 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //点击登录按钮
    submitForm(loginRef) {
      this.$refs[loginRef].validate((valid) => {
        if (!valid) return;
        loginFn(this.login).then((res) => {
            console.log(res)
          if(res.meta.status === 200){
              this.$message.success('登录成功')
          }else{
              this.$message.error('登录失败');
          }
          //1、将登录成功的token保存在客户端的sessionStorage中
            //1.1项目中除了登录之外的其他API接口，都必须在登录之后才能调用
            //1.2token只在当前打开的浏览器窗口有效，所以保存在sessionStorge中
            window.sessionStorage.setItem('token',res.data.token)
          //2、通过编程式导航跳转到后台主页，地址是/home  
          this.$router.push('/home')
        });
      });
    },
    //   点击重置按钮
    resetForm(login) {
      this.$refs[login].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-color: #2b4b6b;
}
.box {
  position: absolute;
  width: 450px;
  height: 300px;
  left: 50%;
  top: 50%;
  padding: 0 20px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 5px;
}

.img {
  width: 120px;
  height: 120px;
  border: 1px solid black;
  border-radius: 50%;
  padding: 5px;
  margin: -60px auto 0;
  overflow: hidden;
  background-color: #fff;
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
}
.login_form {
  margin-top: 20px;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>