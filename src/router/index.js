import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/Home";
import Login from "../components/auth/Login";
import ProductManage from "../components/products/ProductManage";
import ProductsList from "../components/products/List";
import ProductCreate from "../components/products/Create";
import ProductEdit from "../components/products/Edit";
import Details from "../components/products/Details";
import Register from "../components/auth/Register";


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/products',
      component: ProductManage,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/',
          component: ProductsList
        },
        {
          path: 'create',
          component: ProductCreate
        },
        {
          path: ':id',
          component: ProductEdit
        },
        {
          path: 'details/:id',
          component: Details
        }
      ]
    }
  ]
})
