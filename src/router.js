/* eslint-disable no-unused-expressions */
import Vue from 'vue';
import Router from 'vue-router';

import ComponentList from './views/ComponentList/index.vue';
import demo1 from './views/Three/demo1.vue';
import test from './views/Test/demo1.vue';
import d3 from './views/D3/index.vue';
import SvgDemo from './views/SvgDemo/index.vue';

import NotFound from './views/ErrorPage/NotFound.vue';
import InternetServerError from './views/ErrorPage/InternetServerError.vue';
import NotAccessed from './views/ErrorPage/NotAccessed.vue';

import { getQuery } from './utils/commonFunc';
import config from './utils/config';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/ComponentList',
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '/401',
      name: 'NotAccessed',
      component: NotAccessed,
    },
    {
      path: '/500',
      name: 'InternetServerError',
      component: InternetServerError,
    },
    {
      path: '/ComponentList',
      name: 'TopHeader',
      component: ComponentList,
    },
    {
      path: '/demo1',
      name: 'demo1',
      component: demo1,
    },
    {
      path: '/test',
      name: 'test',
      component: test,
    },
    {
      path: '/d3',
      name: 'd3',
      component: d3,
    },
    {
      path: '/SvgDemo',
      name: 'SvgDemo',
      component: SvgDemo,
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const accessToken = getQuery('access_token');
//   const localToken = localStorage.getItem('access_token');
//   const { redirectHost, authHost, clientId } = config;
//   if (to.matched.length === 0) {
//     from.name ? next({
//       name: from.name,
//     }) : next('/404');
//   } if (accessToken && from.path === '/') {
//     localStorage.setItem('access_token', accessToken.split('#')[0]);
//     window.location.href = `${redirectHost}`;
//   } else if (!localToken) {
//     localStorage.clear();
//     window.location.href = `${authHost}/login?clientId=${clientId}&redirect_uri=${redirectHost}`;
//   } else {
//     next();
//   }
// });

export default router;
