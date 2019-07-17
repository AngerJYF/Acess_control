<!-- 登录 -->
<template>
  <div class="login"></div>
</template>
<script>
import { getParams } from "common/js/utils/utils";
import { apiGetCode, apiGetUserInfo, apiLogin } from "common/js/api";
export default {
  name: "login",
  data() {
    return {
      action: ""
    };
  },
  created() {
    /* function getParams(url, name) {
      url = url + "";
      let regstr = "/(\\?|\\&)" + name + "=([^\\&]+)/";
      let reg = eval(regstr); //eval可以将 regstr字符串转换为 正则表达式
      let result = url.match(reg); //匹配的结果是：result[0]=?sid=22 result[1]=sid result[2]=22。所以下面我们返回result[2]

      if (result && result[2]) {
        return result[2];
      } else {
        return "";
      }
    } */

    console.log("TCL: created -> type", "type");

    let type = getParams(window.location.href, "type");
    let token = getParams(window.location.href, "token");
    console.log("type", type);
    console.log("token", token);
    alert(0);

    // 2. type 为真,获取 code
    if (type) {
      this.getCodeAjax();
      return;
    }
    if (token) {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user_name");
      window.localStorage.removeItem("userId");
      window.localStorage.setItem("token", token);
      this.getUserInfoAjax(token);
      return;
    }
    // 1. type 和 token 为空
    this.loginAjax();
  },
  methods: {
    // 登录    空的登陆页(判断) 跳转 登陆页
    async loginAjax() {
      alert(2);
      let redirectUrl = window.location.origin + window.location.pathname;
      alert(redirectUrl);
      // const apiLogin = params => window.location.href = header.OAuthManger + '/authMgr/?redirectUrl=' + params + '?type=login';
      let res = await apiLogin(redirectUrl);
    },

    // 获取code
    async getCodeAjax() {
      let redirectUrl = window.location.origin + window.location.pathname;
      // const apiGetCode = params => window.location.href = header.OAuthManger + '/OAuthServer/getCode?redirectUrl=' + params;
      let res = await apiGetCode(redirectUrl);
    },

    // 登录信息
    async getUserInfoAjax(token) {
      // const apiGetUserInfo = params => postUserInfo(header.OAuthUser + '/user/getUserInfo', params);
      let res = await apiGetUserInfo({ token, type: "front" });
      alert(res.result);
      if (res.result) {
        window.localStorage.setItem("user_name", res.result.userInfo.name);
        window.localStorage.setItem("userId", res.result.userInfo.id);
        window.localStorage.setItem("account", res.result.userInfo.account);
        console.log(res);
        window.location.href = window.location.href.split("login")[0];
      } else {
        this.message.error("登录信息错误，请重新登录");
        this.authMgrAjax();
      }
    }

    // 获取code
    // async logoutAjax() {
    //   let redirectUrl = window.location.href.split("#/")[0];
    //   let res = await this.$api.logout(redirectUrl);
    // }
  }
};
</script>
<style scoped>
</style>

