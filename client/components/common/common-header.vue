<template>
  <div class="main__header">
    <ul>
      <li v-for="(item, index) in menu" :class="{'active' : active === (item.link || item.redirect)}" @click="handleCick(item)" :key="index">{{item.label}}</li>
    </ul>
  </div>
</template>

<script>
/**
 * 注意：所有使用该组件的入口文件都要添加vuex支持
 */
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      menu: [
        {
          label: '首页',
          link: '/home'
        },
        {
          label: '产品',
          link: '/product'
        },
        {
          label: '发现',
          link: '/find'
        },
        {
          label: '关于我们',
          redirect: '/about'
        },
        {
          label: '联系我们',
          redirect: '/join'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      active: 'sysMenuActive'
    })
  },
  methods: {
    handleCick (item) {
      if (item.link) {
        if (this.$router) {
          this.$store.commit('SYS__ACTIVE_MENU', item.link)
          this.$router.push(item.link)
        } else {
          let refer = item.link.substr(1)
          window.location = window.location.origin + (refer ? '?refer=' + refer : '')
        }
      } else {
        window.location = window.location.origin + item.redirect + '.html'
      }
    }
  },
  watch: {
    $route (to, from) {
      console.log(to, from)
    }
  }
}
</script>

<style lang="scss">
.main__header{
  & > ul {
    display: flex;
    overflow: hidden;
    list-style: none;
    background: #ff3366;
    & > li {
      line-height: 60px;
      height: 60px;
      font-size: 16px;
      padding: 12px;
      border-bottom: 2px solid #ff3366;
      &:hover {
        cursor: pointer;
        border-bottom-color: #fff;
      }
      &.active {
        color: #fff;
      }
    }
  }
}
</style>
