<template>
  <div class="main-container">
    <common-header/>
    <ul class="nav-bottom">
      <router-link tag="li" to="/home">Home</router-link>
      <router-link tag="li" to="/find">Find</router-link>
    </ul>
    <common-footer/>
  </div>
</template>

<script>
export default {
  components: {
    commonHeader: () => import(/* webpackChunkName: "common-header" */'../../components/common/common-header.vue'),
    commonFooter: () => import(/* webpackChunkName: "common-footer" */'../../components/common/common-footer.vue')
  }
}
</script>

<style lang="scss">
.main-container{
  margin: 0;
  padding: 0;
}
</style>

