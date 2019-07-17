<template>
  <div>
    <h2 @click="pageJump">页面2</h2>
  </div>
</template>

<script>
export default {
  name: "Page2",
  methods: {
    pageJump() {
      this.$router.push({ path: "/Packages3" });
    }
  }
};
</script>

<style scoped>
</style>
