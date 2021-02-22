import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "productDetails" */ '../pages/Home.vue'),
    meta: {
      breadcrumb: 'HomePage',
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "productDetails" */ '../pages/userProfile/Profile.vue'),
    meta: {
      breadcrumb: 'profilePage',
    },
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../pages/Order.vue'),
    meta: {
      breadcrumb: 'orderPage',
    },
  },
  {
    path: '/basket',
    name: 'basket',
    component: () => import('../pages/Basket.vue'),
    meta: {
      breadcrumb: 'basket',
    },
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: () => import('../pages/PageNotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
