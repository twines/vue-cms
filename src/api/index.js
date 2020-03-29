import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import {Message} from "element-ui";

const instance = axios.create({
    baseURL: ' http://127.0.0.1:9999',
    timeout: 5000
});
instance.interceptors.request.use(
    config => {
        let token = window.sessionStorage.getItem('token');
        if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = 'bearer ' + token  //请求头加上token
        }
        return config
    },
    err => {
        return Promise.reject(err)
    });
instance.interceptors.response.use(
    response => {
        //拦截响应，做统一处理
        if (response.data.code) {
            switch (response.data.code) {
                case 4001:
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;
                default:
            }
        }
        return response
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        return Promise.reject(error.response.status) // 返回接口返回的错误信息
    });

function post(path, data) {
    let formData = null;
    if (data) {
        formData = qs.stringify(data)
    }
    return instance.post(path, formData)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            errorAction(error, path);
        })
        .finally(function () {
            // always executed
        });
}

function put(path, data) {
    let formData = null;
    if (data) {
        formData = qs.stringify(data)
    }
    return instance.put(path, formData)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            errorAction(error, path);
        })
        .finally(function () {
            // always executed
        });
}

function del(path, data) {
    let formData = null;
    if (data) {
        formData = qs.stringify(data)
    }
    return instance.delete(path, formData)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            errorAction(error, path);
        })
        .finally(function () {
            // always executed
        });
}

function errorAction(error, path) {
    switch (error) {
        case 401:
            Message.error(`接口地址${path}不可用,错误代码${error}`);
            router.push('/login');
            break;
        case 403:
            Message.error(`接口地址${path}不可用,错误代码${error}`);
            router.push('/login');
            break;
        case 404:
            Message.error(`接口地址${path}不可用,错误代码${error}`);
            break;
        case 500:
            Message.error(`接口地址${path}不可用,错误代码${error}`);
            break;
        default:
    }
}

function get(path) {
    return instance.get(path)
        .then(function (response) {
            // console.log(response);
            return response.data
        })
        .catch(function (error) {
            errorAction(error, path);
        })
        .finally(function () {
            // always executed
        });
}

const api = {
    login: function (data) {
        return instance.post('/admin/v1/login', qs.stringify(data))
            .then(function (response) {
                // console.log(response);
                return response.data
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    },
    getRoleList: function (page) {
        return get('/admin/v1/role/list?page=' + page)
    },
    getDashboardData: function () {
        return get('/admin/v1/dashboard')
    },
    deleteRole: function (roleId) {
        return instance.delete('/admin/v1/role/delete/' + roleId)
            .then(function (response) {
                // console.log(response);
                return response.data
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    },
    addRole: function (data) {
        return post('/admin/v1/role/add', data)
    },
    getRolePermission: function (roleId) {
        return get('/admin/v1/role/permission/' + roleId)
    },
    changePermission: function (roleId, permissionList) {
        return post('/admin/v1/role/permission/' + roleId, {'permissionList': permissionList})
    },
    getAdminList: function (page) {
        return get('/admin/v1/admin/list?page=' + page)
    },
    addAdmin: function (data) {
        return post('/admin/v1/admin/add', data)
    },
    addUser: function (data) {
        return post('/admin/v1/user/add', data)
    },
    deleteUser: function (userId) {
        return del('/admin/v1/user/' + userId)
    },
    updateUserInfo: function (userId, data) {
        return put('/admin/v1/user/' + userId, data);
    },
    getUserById: function (userId) {
        return get('/admin/v1/user/' + userId)
    },
    getUserList(page, keyword, status) {
        return get('/admin/v1/user/list?page=' + page + '&keyword=' + keyword + '&status=' + status)
    },
    getNewsById: function (newsId) {
        return get('/admin/v1/news/detail/' + newsId)
    },
    getNewsList: function (page) {
        return get('/admin/v1/news/list?page=' + page)
    },
    addNews: function (data) {
        return post('/admin/v1/news/add', data)
    },
    deleteNews: function (newsId) {
        return del('/admin/v1/news/delete/' + newsId)
    },
    updateNews: function (newsId, data) {
        return post('/admin/v1/news/update/' + newsId, data)
    },
    siteConfig: function (data) {
        return post('/admin/v1/site/config', data)
    },
    getSiteDetail: function () {
        return get('/admin/v1/site/detail')
    },
    getOrderDetail: function (orderId) {
        return get('/admin/v1/order/detail/' + orderId)
    }
};
export default api
