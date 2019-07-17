/** axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import QS from 'qs';
import Cookies from 'js-cookie';
import { Message } from 'element-ui';
import store from '../../store'//Vuex

export const header = {
  rootPath: '',
  NlpPath: '',
  OAuthManger: '',
  OAuthUser: '',
  OAuthLoginOut: '',
  downLoadUrl: ''
}

// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '';
  header.rootPath = '/lensAiPlat';
  header.NlpPath = '/enlp';
  header.OAuthManger = '/authMgr';
  header.OAuthUser = '/manager';
  header.OAuthLoginOut = '/auth';
  header.downLoadUrl = 'http://192.168.1.116:8080'

} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = window.eNlpConfig.backPath;
  header.rootPath = window.eNlpConfig.rootPath;
  header.NlpPath = window.eNlpConfig.NlpPath;
  header.OAuthManger = window.eNlpConfig.OAuthManger;
  header.OAuthUser = window.eNlpConfig.OAuthUser;
  header.OAuthLoginOut = window.eNlpConfig.OAuthLoginOut;
  header.downLoadUrl = window.eNlpConfig.downLoadUrl
}

// 请求超时时间
axios.defaults.timeout = 30000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截器
axios.interceptors.request.use(
  config => {
    let token = window.localStorage.getItem('token');
    config.headers.Authorization = 'Bearer ' + token;
    config.timeout = 10 * 1000;  // 请求超时时间
    return config;
  },
  error => {
    return Promise.error(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  },
  // 服务器状态码不是200的情况
  error => {
    console.log(error.response)

    if (error && error.response) {
      let res = {}
      res.code = error.response.status;
      if (res.code == 401 || res.code == 403) {
        //本地调试回调地址
        window.location.href = header.OAuthLoginOut + '/logout?redirect_uri=' + window.location.origin + window.location.pathname + '&access_token=' + window.localStorage.getItem('token');
        //回调到线上
        // window.location.href = header.OAuthLoginOut + '/logout?redirect_uri=http://nlp.elensdata.com/elensLangAi' + '&access_token=' + window.localStorage.getItem('token');     
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user_name');
        window.localStorage.removeItem('userId');
      }
      // res.msg = throwErr(error.response.status, error.response) //throwErr 捕捉服务端的http状态码 定义在utils工具类的方法
      // return Promise.reject(res)
    }

    // return Promise.reject(error)
    // if (error.response.status) { }
  }
);
//状态码
const SUCCESS_CODE = 200;

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        if (res.data.code != SUCCESS_CODE) {
          Message({
            showClose: true,
            message: `服务器错误,状态码${res.data.code}`,
            type: 'warning',
            duration: 2000
          });
          store.commit('setLoading', false);
          return
        }
        resolve(res.data);
      })
      .catch(err => {
        Message({
          showClose: true,
          message: `服务器错误,请刷新后重试!`,
          type: 'error',
          duration: 2000
        });
        store.commit('setLoading', false);
        reject(err);
      });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]。
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: {
          'Content-Type': 'application/json',
          // 'Accept': '*/*'
        }
      })
      .then(res => {
        console.log(res.data.code != SUCCESS_CODE);
        if (res.data.code != SUCCESS_CODE) {
          Message.warning({
            showClose: true,
            message: `服务器错误，状态码${res.data.code}`,
            type: 'warning'
          });
          store.commit('setLoading', false);
          return
        }
        resolve(res.data);
      })
      .catch(err => {
        Message.error({
          content: `连接服务器失败,请刷新后重试!`,
          duration: 5
        });
        store.commit('setLoading', false);
        reject(err);
      });
  });
}
export function postToken(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params), {
        headers: {
          Accept: 'application/json'
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function postFormData(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        if (res.data.code != SUCCESS_CODE) {
          Message({
            showClose: true,
            message: `服务器错误,状态码${res.data.code}`,
            type: 'warning',
            duration: 2000
          });
          store.commit('setLoading', false);
          return
        }
        resolve(res.data);
      })
      .catch(err => {
        store.commit('setLoading', false);
        reject(err);
      });
  });
}

export function postValidateFormData(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

//
export function postUserInfo(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params), {
      headers: {
        Accept: 'application/json',
        'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"
      }
    })
      .then(res => {
        if (res.data.code != SUCCESS_CODE) {
          Message.error(`${res.data.message}`, '提示', {
            confirmButtonText: '确定',
          });
        }
        resolve(res.data);
      })
      .catch(err => {
        if (err.code != 401 && err.code != 403) {
          MessageBox.alert(`连接服务器失败,请刷新后重试!`, '报错', {
            confirmButtonText: '确定',
          });
        }
        reject(err);
      });
  });
}

export function postValidate(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: {
          'Content-Type': 'application/json',
          // 'Accept': '*/*'
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        store.commit('setLoading', false);
        reject(err);
      });
  });
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function getMemory(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        Message({
          showClose: true,
          message: `服务器错误,请刷新后重试!`,
          type: 'error',
          duration: 2000
        });
        store.commit('setLoading', false);
        reject(err);
      });
  });
}
