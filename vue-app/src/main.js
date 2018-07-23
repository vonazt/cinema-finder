// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import './assets/scss/style.scss'

import Home from './components/Home'
import Show from './components/Show'
Vue.use(VueRouter)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    message: 'Hey',
    location: {}
  },
  mutations: {
    set (state, location) {
      state.location = location
    }
  }
})

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home },
  { path: '/cinemas', component: Show }
]

/* eslint-disable no-new */
const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App, Home },
  template: '<App/>'
})
