import Vue from 'vue'
import Router from 'vue-router'


import home from "@/views/home/Home"
import Trade from "@/views/Trade/Trade"
import WhitePaper from "@/views/WhitePaper/WhitePaper"


Vue.use(Router)

const routes = [
  { path: '', redirect: "/home" },
  { path: '/home', component: home, meta: { title: 'Home' } },
  { path: '/trade', component: Trade, meta: { title: 'Trade' } },
  { path: '/whitePaper', component: WhitePaper, meta: { title: 'WhitePaper' } },
]

const router = new Router({
  routes,
})

export default router
