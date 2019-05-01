
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import Vue from 'vue';
import App from './views/App';
import debugMixin from './core/mixins/debug';
import appSettings from './core/mixins/appSettings';
import alert from './core/plugins/alert';
import http from './core/plugins/http';
import Loading from 'vue-loading-overlay';
import Modal from './components/_common/modal';
import Page from './components/_common/pager';
import router from './router';
import store from './vuex/index';

require('./bootstrap');

Vue.use(Loading);
Vue.component('modal', Modal);
Vue.component('page', Page);

// window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router: router,
    store: store,
    ...App
});

if (!process.env.VUE_ENV)
    window.app = app;
export { app, router, store };
