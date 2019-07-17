<template>
  <div class="login" @click="pagrJump">单击登录</div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    pagrJump() {
      this.$router.push({ path: "/Packages1" });
    }
  }
};
</script>

<style scoped>
.login {
  cursor: pointer;
}
</style>
