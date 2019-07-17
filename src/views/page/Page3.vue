<template>
  <div>
    <h2 @click="pageJump">页面3</h2>
  </div>
</template>

<script>
export default {
  name: "Page3",
  methods: {
    pageJump() {
      this.$router.push({ path: "/Packages1" });
    }
  }
};
</script>

<style scoped>
</style>
