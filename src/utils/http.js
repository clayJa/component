import axios from 'axios';
import { toLogin, toInternetError } from './commonFunc';

const instance = axios.create({});
// http request 拦截器
instance.interceptors.request.use(
  (config) => {
    if (localStorage.access_token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${localStorage.access_token}`;
      // config.url = config.url.indexOf('?') < 0 ? `${config.url}?access_token=${localStorage.access_token}` : `${config.url}&access_token=${localStorage.access_token}`;
    }
    if (localStorage.user) {
      // eslint-disable-next-line no-param-reassign
      config.headers.user = encodeURI(localStorage.user);
    }
    if (localStorage.roleId) {
      // eslint-disable-next-line no-param-reassign
      config.headers.roleId = localStorage.roleId;
      // if (localStorage.user) {
      //   const user = JSON.stringify(Object.assign({}, JSON.parse(localStorage.user), { roleId: localStorage.roleId }));
      //   // eslint-disable-next-line no-param-reassign
      //   config.headers.user = encodeURI(user);
      // }
    }
    return config;
  },
  err => Promise.reject(err),
);

// http response 拦截器
instance.interceptors.response.use(
  (response) => {
    if (response.data) {
      if (response.data.error === '401') {
        toLogin();
      }
    }
    return response;
  },
  (error) => {
    if (error.response) {
      console.log(error.response);
      if (error.response.data.error.code === 'UNLOGIN_ERROR') {
        toLogin();
      } else {
        toInternetError();
      }
    }
    // 返回接口返回的错误信息
    return Promise.reject(error);
  },
);

export default instance;
