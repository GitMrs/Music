import 'babel-polyfill'
import Vue from 'vue'
import router from './router'; 
import VueAwesomeSwiper from 'vue-awesome-swiper'
import App from './App.vue'
import 'swiper/dist/css/swiper.css'
import lazyload from 'vue-lazyload';
import fastclick from 'fastclick';
Vue.use(VueAwesomeSwiper)
fastclick.attach(document.body)
Vue.use(lazyload,{
  loading:require('./common/image/default.png')
})
import './common/stylus/index.styl'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
