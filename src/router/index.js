import Vue from 'vue'
import VueRouter from 'vue-router'
// 1.安装vue-router插件
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
  // 配置映射关系
  // () => import("../views/home/Home")，这是路由的懒加载
    {
        path: "",
        redirect: "/home",
        component: () => import("../views/home/Home")
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("../views/home/Home")
    },
    {
        path: "/classify",
        name: "Classify",
        component: () => import("../views/classfy/Classify")
    },
    {
        path: "/profile",
        name: "Profile",
        component: () => import("../views/profile/Profile")
    },
    {
        path: "/shopcar",
        name: "ShopCar",
        component: () => import("../views/shopcar/ShopCar")
    },
    {
        path: "/detail/:iid",
        name: "Detail",
        component: () => import("../views/detail/Detail")
    },

]

// 2.创建router
const router = new VueRouter({
    mode: 'history',//对路由使用history模式
    base: process.env.BASE_URL,
    routes
})

export default router
