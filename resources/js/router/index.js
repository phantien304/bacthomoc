import Vue from 'vue';
import VueRouter from 'vue-router';
const _import = require('./_import_sync');
Vue.use(VueRouter);

const _routers = [
    {
        path: '/post',
        name: 'post',
        component: _import('post/list'),
        meta: { requiresAuth: false }
    },
    {
        path: '/post/create',
        name: 'postCreate',
        component: _import('post/edit'),
        meta: { requiresAuth: false }
    }
];
const router = new VueRouter({
    // mode: 'history',
    errorHandler(to, from, next, error) {
        console.log(error);
    },
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: _routers
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        try {
            if (!process.env.VUE_ENV) {
                if (localStorage.getItem(CONSTANTS.AUTH_TOKEN))
                    return next();
                router.push({ path: '/login', query: { returnUrl: to.fullPath } });
            } else {
                next();
            }
        } catch (e) {
            console.log(e);
            next();
        }
    } else {
        next();
    }
});
export default router;
