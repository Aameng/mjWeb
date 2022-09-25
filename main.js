import Vue from 'vue'
import App from './App'
import qs from './components/qs/index.vue'
// import uParse from "./components/gaoyia-parse/parse.vue";
// Vue.component("leyu-parse", uParse);
Vue.component('qs', qs)

// 加载动画
import loading from './components/loading/index.vue'
Vue.component("leyu-loading", loading)

Vue.config.productionTip = false

import api from '@/common/js/app.js';
Vue.prototype.$api = api;

//七牛上传
import upload from '@/common/js/upload.js';
Vue.prototype.$upload = upload;

// main.js
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

//防止xss攻击
// import xss from '@/common/js/xss.js';
// Vue.prototype.$xss = xss;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
