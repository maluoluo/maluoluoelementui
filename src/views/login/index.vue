<template>
  <div class="login-container">
    <el-form
      :model="myForm"
      :rules="myRule"
      status-icon
      ref="myForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-page"
    >
      <h3 class="title">登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="myForm.username" auto-complete="off" placeholder="用户名">
          <template slot="prepend">
            <span class="fa fa-user fa-lg" style="width: 13px"></span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :type="pwdType" v-model="myForm.password" auto-complete="off" placeholder="密码">
          <template slot="prepend">
            <span class="fa fa-lock fa-lg" style="width: 13px"></span>
          </template>
          <template slot="suffix">
            <span class="password-eye" @click="showPassword" :class="eyeType" style="width: 13px"></span>
          </template>
        </el-input>
      </el-form-item>
      <el-checkbox v-model="rememberme" class="rememberme">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logining: false,
      myForm: {
        username: "",
        password: "",
      },
      myRule: {
        username: [
          {
            required: true,
            message: "please enter your account",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "enter your password", trigger: "blur" },
        ],
      },
      rememberme: false,
      pwdType: "password",
      eyeType: "fa fa-eye-slash fa-lg",
    };
  },
  methods: {
    showPassword() {
      if (this.pwdType === "password") {
        this.pwdType = "";
        this.eyeType = "fa fa-eye fa-lg";
      } else {
        this.pwdType = "password";
        this.eyeType = "fa fa-eye-slash fa-lg";
      }
    },
    handleSubmit() {
      this.$refs.myForm.validate((valid) => {
        if (valid) {
          this.logining = true;
          if (
            this.myForm.username === "admin" &&
            this.myForm.password === "123456"
          ) {
            this.logining = false;
            sessionStorage.setItem("user", this.myForm.username);
            this.$router.push({ path: "/homepage" });
          } else {
            this.logining = false;
            this.$alert("账号或密码错误", "温馨提示", {
              confirmButtonText: "确定",
            });
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  background: url("./../../assets/1.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .password-eye {
    position: absolute;
    right: 20px;
    top: 11px;
    cursor: pointer;
  }
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>
