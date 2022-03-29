import { RouteRecordRaw } from "vue-router";
import {shallowRef} from 'vue'
import Layout from "@/components/Layout/Index.vue";
export const asyncRouters: Array<RouteRecordRaw> = [
    {
        path: '/list',
        component: shallowRef(Layout),
        name: 'accountManage',
        redirect: '/list/a',
        meta: {
            title: '帐号管理',
            icon: 'home'
        },
        children: [
            {
                path: 'a',
                component: () => import( /* webpackChunkName: "list" */ "@/views/list/list.vue"),
                name: 'a',
                meta: {
                    title: '基本资料1',
                    auth: 'list',
                }
            },
            {
                path: 'b',
                component: () => import( /* webpackChunkName: "list1" */ "@/views/list/list1.vue"),
                name: 'b',
                meta: {
                    title: '基本资料2',
                    auth: 'list',
                }
            }
        ]
    },
    {
        path: '/user',
        component: shallowRef(Layout),
        name: 'userManage',
        redirect: '/user/c',
        meta: {
            title: '用户管理',
            icon: 'home'
        },
        children: [
            {
                path: 'c',
                component: () => import( /* webpackChunkName: "list" */ "@/views/user/list.vue"),
                name: 'c',
                meta: {
                    title: '用户',
                    auth: 'list',
                }
            },
        ]
    },
    { path: '/:w+', redirect: '/404', meta: { hidden: true, white: true } }
]