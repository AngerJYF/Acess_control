<template>
  <div>
    <h2 @click="pageJump">页面1</h2>
  </div>
</template>

<script>
export default {
  name: "Page1",
  methods: {
    pageJump() {
      this.$router.push({ path: "/Packages2" });
    }
  }
};
</script>

<style scoped>
</style>
