// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Home from './components/Home'
import Show from './components/Show'
import './assets/scss/style.scss'

Vue.use(VueRouter)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    location: {}
  },
  mutations: {
    increment (state, location) {
      state.location = location
    }
  }
})

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home },
  { path: '/cinemas', component: Show }
]

const router = new VueRouter({
  routes
})
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App, Home, Show },
  template: '<App/>'
})
