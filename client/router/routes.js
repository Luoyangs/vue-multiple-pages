export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "index-home" */'../components/index/index-home.vue')
  },
  {
    path: '/find',
    component: () => import(/* webpackChunkName: "index-find" */'../components/index/index-find.vue')
  }
]
