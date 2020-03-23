import VueRouter from 'vue-router'
import vue from 'vue'
import Login from '../pages/login/Index'
import Home from '../pages/home/Index'
import Dashboard from '../pages/dashboard/Index'
import Role from '../pages/role/Index'
import User from '../pages/user/Index'
import Admin from '../pages/admin/Index'
import Banner from '../pages/setting/Banner'
import News from '../pages/setting/News'

vue.use(VueRouter);
const routes = [
    {
        path: '/',
        component: Home,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                meta:{title:'仪表盘-首页'},
                component: Dashboard
            },
        ]
    },
    {
        path: '/',
        component: Home,
        children: [
            {
                meta:{title:'权限管理-角色列表'},
                path: '/role/list',
                component: Role
            },
            {
                meta:{title:'权限管理-管理员列表'},
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
                meta:{title:'用户管理-用户列表'},
                path: 'list',
                component: User,
            },
        ]
    },
    {
        path: '/setting',
        component: Home,
        redirect: '/setting/banner',
        children: [
            {
                meta:{title:'网站管理-Banner列表'},
                path: '/setting/banner',
                component: Banner,
            },
            {
                meta:{title:'网站管理-新闻公告列表'},
                path: '/setting/news',
                component: News,
            },
        ]
    },
    {
        meta:{title:'后台管理-登录'},
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
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next();
});
export default router

