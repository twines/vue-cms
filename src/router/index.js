import VueRouter from 'vue-router'
import vue from 'vue'
import Login from '../pages/login/Index'
import Home from '../pages/home/Index'
import Dashboard from '../pages/dashboard/Index'
import Role from '../pages/role/Index'
import User from '../pages/user/Index'
import Admin from '../pages/admin/Index'

vue.use(VueRouter);
const routes = [
    {
        path: '/',
        component: Home,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: Dashboard
            },
        ]
    },
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '/role/list',
                component: Role
            },
            {
                path: '/admin/list',
                component: Admin
            },
        ]
    },
    {
        path: '/user',
        component: Home,
        redirect: '/user/list',
        children: [
            {
                path: 'list',
                component: User,
            },
        ]
    },
    {
        path: '/login',
        component: Login
    }
];
const router = new VueRouter({routes});

router.beforeEach((to, from, next) => {
    let token = window.sessionStorage.getItem('token');
    if (from.path === '/login') {
        if (!token) {
            return router.push('/')
        }
    }
    if (to.path === '/') {
        if (!token) {
            return router.push('/login')
        }
    }
    next();
});
export default router

