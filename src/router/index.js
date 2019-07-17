import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import(/* webpackChunkName: "Login" */ '@/views/login/Login');
const Packages1 = () => import(/* webpackChunkName: "Packages1" */ '@/views/page/Page1');
const Packages2 = () => import(/* webpackChunkName: "Packages2" */ '@/views/page/Page2');
const Packages3 = () => import(/* webpackChunkName: "Packages3" */ '@/views/page/Page3');

const router = new Router({
  routes: [
    // 根目录
    {
      path: '',
      redirect: { path: '/Login' }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        OAuthPass: true
      }
    },
    {
      path: '/Packages1',
      name: 'Packages1',
      component: Packages1
    },
    {
      path: '/Packages2',
      name: 'Packages2',
      component: Packages2
    },
    {
      path: '/Packages3',
      name: 'Packages3',
      component: Packages3
    }
  ]
})

router.beforeEach((to, form, next) => {
  if (!to.meta.OAuthPass) {
    let token = window.localStorage.getItem('token') || '';
    // 也可以通过vuex state获取当前的token是否存在
    if (token) {
      next();
    }
    else {
      alert('token 无效!请登陆...');
      console.log('token 无效!');
      next({
        path: '/Login',
        // 将要跳转路由的path作为参数，传递到登录页面
        //query: {}
      })
    }
  }
  else
    next();
})



export default router;
