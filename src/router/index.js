import { createRouter, createWebHashHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    // name: 'home',
    // component: HomeView
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/HomePagedashboard',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dashboardHomePageView.vue'),
    children: [
      {
        path: '/productDashboard',
        component: () => import(/* webpackChunkName: "about" */ '../views/productDashboardView.vue')
      },
      {
        path: '/orderDashboard',
        component: () => import(/* webpackChunkName: "about" */ '../views/orderDashboardView.vue')
      },
      {
        path: '/couponDashboard',
        component: () => import(/* webpackChunkName: "about" */ '../views/couponDashboardView.vue')
      }
    ]
  },
  {
    path: '/logout',
    component: () => import(/* webpackChunkName: "about" */ '../views/logoutView.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
