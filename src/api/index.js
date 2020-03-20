import axios from 'axios'
import qs from 'qs'
// import {Message} from 'element-ui';
import router from '@/router'  //引入router

const instance = axios.create({
    baseURL: 'http://127.0.0.1',
    timeout: 5000
});
instance.interceptors.request.use(
    config => {
        let token = window.sessionStorage.getItem('token');
        if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = token  //请求头加上token
        }
        return config
    },
    err => {
        return Promise.reject(err)
    });
instance.interceptors.response.use(
    response => {
        //拦截响应，做统一处理
        console.log(response.data.code)
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
        return instance.get('/admin/v1/role/list?page=' + page)
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
        return instance.post('/admin/v1/role/add', qs.stringify(data))
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
    }

};
export default api
