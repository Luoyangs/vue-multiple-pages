import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.query && to.query.refer) {
    store.commit('SYS__ACTIVE_MENU', `/${to.query.refer}`)
    next(`/${to.query.refer}`)
  }
  next()
})

export default router
