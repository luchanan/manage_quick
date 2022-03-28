import { RouteRecordRaw } from "vue-router";
import Layout from "@/components/Layout/Index.vue";
// meta: {
//     title: '找不到页面',
//     hidden: true, // 不在菜单显示
//     white: true, // 白名单不鉴权
//     noExpand: true // 菜单是否可以展开
// },
export const syncRouters: Array<RouteRecordRaw> = [
    {
        path: "/login",
        name: "login",
        meta: {
            title: '登录',
            hidden: true,
            white: true
        },
        component: () => import( /* webpackChunkName: "login" */ "@/views/Login.vue")
    }, {
        path: '/404',
        name: '404',
        meta: {
            title: '找不到页面',
            hidden: true,
            white: true
        },
        component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue')
    }, {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限',
            hidden: true,
            white: true
        },
        component: () => import(/* webpackChunkName: "403" */ '@/views/403.vue')
    },
    {
        path: "/",
        name: "Home",
        component: Layout,
        meta: {
            title: '首页',
            icon: 'home',
            noExpand: true // 左边菜单是否展开
        },
        redirect: { name: 'dashboard' },
        children: [
            {
                path: "",
                name: "dashboard",
                meta: {
                    title: '首页'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "@/views/Index.vue")
            },
        ]
    }
]
