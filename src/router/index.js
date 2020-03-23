import VueRouter from 'vue-router'
import vue from 'vue'
import Login from '../pages/login/Index'
import Home from '../pages/home/Index'
import Dashboard from '../pages/dashboard/Index'
import Role from '../pages/role/Index'
import UserList from '../pages/user/List'
import UserGroup from '../pages/user/Group'
import Admin from '../pages/admin/Index'
import Banner from '../pages/setting/Banner'
import News from '../pages/setting/News'

vue.use(VueRouter);
const routes = [
    {
        path: '/',
        component: Home,
        redirect: '/dashboard',
        meta: {title: '仪表盘', breadcrumb: false},
        children: [
            {
                path: '/dashboard',
                meta: {title: '首页'},
                component: Dashboard
            },
        ]
    },
    {
        path: '/',
        component: Home,
        redirect: 'noRedirect',
        meta: {title: '权限管理'},
        children: [
            {
                meta: {title: '角色列表'},
                path: '/role/list',
                component: Role
            },
            {
                meta: {title: '管理员列表'},
                path: '/admin/list',
                component: Admin
            },
        ]
    },
    {
        path: '/user',
        component: Home,
        redirect: 'noRedirect',
        meta: {title: '用户管理'},
        children: [
            {
                meta: {title: '用户列表'},
                path: '/user/list',
                component: UserList,
            },
            {
                meta: {title: '用户组'},
                path: '/user/group',
                component: UserGroup,
            },
        ]
    },
    {
        path: '/setting',
        component: Home,
        redirect: 'noRedirect',
        meta: {title: '网站管理'},
        children: [
            {
                meta: {title: 'Banner列表'},
                path: '/setting/banner',
                component: Banner,
            },
            {
                meta: {title: '新闻公告列表'},
                path: '/setting/news',
                component: News,
            },
        ]
    },
    {
        meta: {title: '后台管理-登录'},
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

