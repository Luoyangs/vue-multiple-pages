<template>
  <div class="main-container">
    <common-header/>
    this is join
  </div>
</template>

<script>
export default {
  components: {
    commonHeader: () => import(/* webpackChunkName: "common-header" */'../../components/common/common-header.vue')
  },
  mounted () {
    this.$store.commit('SYS__ACTIVE_MENU', '/join')
  }
}
</script>
