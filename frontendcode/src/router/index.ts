import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import("@/views/home/home.vue")
    },
    {
        path: '/goods',
        name: 'abogoodsut',
        component: () => import('@/views/goods/index.vue')
    },
    {
        path: '/complaint',
        name: 'complaint',
        component: () => import('@/views/complaint/index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router