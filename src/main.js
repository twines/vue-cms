import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VideoPlayer from 'vue-video-player';
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import api from './api'

Vue.use(VideoPlayer);
Vue.use(ElementUI);
Vue.prototype.$api = api;

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
