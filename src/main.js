// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*eslint-disable*/
import 'babel-polyfill';
import Es6Promise from 'es6-promise'
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import FastClick from 'fastclick'
import '../static/js/flexible.js'
import 'vant/lib/index.css';
// import VConsole from 'vconsole';
// new VConsole();

if (process.env.MOCK) {    // 判断是否为mock模式
  require('./mock/index.js')
}
import { Notify } from 'vant';
Vue.use(Notify);
import ElementUI from 'element-ui';
Vue.use(ElementUI)
import { Dialog } from 'vant';
Vue.use(Dialog);
Es6Promise.polyfill()
/**
*监听浏览器点击返回前进操作动画
*浏览器端使用需要注意路由path的创建，二级应该在一级的基础上添加
*如一级/Home，则二级为/Home/Detail，依次往后加，如果是app的话可忽略以下代码
*/
FastClick.prototype.focus = function (targetElement) {
  let length;
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length;
    targetElement.focus();
    targetElement.setSelectionRange(length, length);
  } else {
    targetElement.focus();
  }
};
let init = 0
window.addEventListener('popstate', function(e) {
  init++
  if (init < 2) {
    router.beforeEach((to, from, next) => {
      let arr1 = to.path.split('/')
      let arr2 = from.path.split('/')
      if (arr1.length === 2) {
        if (arr1[1].length === 0) {
          arr1.splice(1, 1)
        }
      }
      if (arr2.length === 2) {
        if (arr2[1].length === 0) {
          arr2.splice(1, 1)
        }
      }
      if (arr1.length < arr2.length) {
        router.togoback()
      } else {
        router.togoin()
      }
      next()
    })
  }
}, false)

// app 修改状态栏颜色
// document.addEventListener('plusready', function () {
//   let System = window.plus.os.name
//   if (System === 'iOS') {
//     window.plus.navigator.setStatusBarBackground('#d81e06')
//   }
// })

Vue.use(Mint)
Vue.use(Vuex)
Vue.config.productionTip = false
FastClick.attach(document.body)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
