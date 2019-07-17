#### 网站中很常见的一个需求是登录验证，即未登录时跳转至登录页。在vue项目中，使用vue-route 提供的 beforeRouteUpdate函数可以实现路由判断。



##### 1.首先在配置的路由中加入  OAuthPass: true，代表进入该路由需要验证

```js
 {
    path:'/XXXXX',
    name:'xxxx',
    meta: {
           // 添加该字段，表示进入这个路由是需要登录的
           OAuthPass: true 
          },
    // 按需引入使用的组件
    component: resolve => require(['..xxxxx.vue'], resolve) 
 }
```
##### 2.然后使用 router.beforeEach 在 main.js 中注册一个全局的函数。（或者在 router 文件夹下 index.js 写入）

```hash
这里使用localStorage作为判断，localStorage的生命周期是永久的，真实项目中不建议使用。可以使用Vuex作为数据存储。
```
```js
router.beforeEach((to, from, next) => {

  // 判断该路由是否需要登录权限
  if (!to.meta.OAuthPass){ 
    let token = window.localStorage.getItem('token') || '';
    console.log("TCL: token", token)
    // 通过vuex state获取当前的token是否存在
    if (token) { 
      next();
    }
    else {
      next({
        // token != true 则返回登陆页面
        path: '/login',
        // 将要跳转路由的path作为参数，传递到登录页面
        //query: {} 
      })
    }
  }
  else {
    next();
  }

//在 router 文件夹下 index.js 写入上面代码需导出, main.js 文件写入则不用
export default router;
```
```hash
注意：router.beforeEach方法要创建在new Vue之前。

    router.beforeEach 的三个参数
        to：Route:即将要进入的路由
        from：Route:当前正要离开的路由
        next：function(){} 
        
    next的用法
        next() ：进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
        next(false) ：中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
        next( { path:'/login' } ): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。

确保要调用 next 方法，否则钩子就不会被 resolved。

```
##### 3.使用 axios 发送请求，获取 token ，并处理相关业务逻辑 
```hash
    // Axios 官网：  https://www.npmjs.com/package/axios
    // url 是必需的 , params 参数配置
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL: 'https://some-domain.com/api/',

    axios.get(url,params) 
    axios.post(url,params) 
```
```js
    /** axios封装
    * 请求拦截、相应拦截、错误统一处理
    */
    import axios from 'axios';
    // qs 类似于JSON.stringify转换格式的一种方法
    import QS from 'qs';
    import Cookies from 'js-cookie';
    // 使用 element-ui 弹窗
    import { Message } from 'element-ui'; 
    //Vuex
    import store from '../../store'
```

