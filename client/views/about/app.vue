<template>
  <div class="main-container">
    <common-header/>
    <about-list/>
  </div>
</template>

<script>
export default {
  components: {
    commonHeader: () => import(/* webpackChunkName: "common2-header" */'../../components/common/common-header.vue'),
    aboutList: () => import(/* webpackChunkName: "about-list" */'../../components/about/about-list.vue')
  },
  mounted () {
    this.$store.commit('SYS__ACTIVE_MENU', '/about')
  }
}
</script>
