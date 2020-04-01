import { message } from 'ant-design-vue';
import axios from '../utils/http';
import { toLogin, toInternetError } from '../utils/commonFunc';

const httpHelp = (res) => {
  if (res && res.data) {
    if (res.data.code === '2001' || res.data.code === '2003') {
      toLogin();
    } else if (res.status >= 200 && res.status < 500) {
      return res.data;
    } else {
      message.error('获取数据失败！');
      console.log('res:', res);
      return null;
    }
  }
  return null;
};

const loginHelp = (res) => {
  if (res && res.data) {
    if (res.data.code === '2001') {
      toLogin();
    } else if (res.status >= 200 && res.status < 500) {
      const localToken = localStorage.getItem('token');
      if (res.headers.token !== localToken) {
        localStorage.setItem('token', res.headers.token);
      }
      return res.data;
    } else {
      message.error('获取数据失败！');
      console.log('res:', res);
      return null;
    }
  }
  return null;
};

const axiosLoginGet = url => axios.get(url).then(res => loginHelp(res)).catch((error) => {
  console.log('error:', error.message);
  toInternetError();
});

const axiosGet = (url, ...params) => axios.get(url, ...params).then(res => httpHelp(res)).catch((error) => {
  console.log('error:', error.message);
  toInternetError();
});

const axiosPost = (url, ...params) => axios.post(url, ...params).then(res => httpHelp(res)).catch((error) => {
  console.log('error:', error.message);
  toInternetError();
});

const axiosPut = (url, ...params) => axios.put(url, ...params).then(res => httpHelp(res)).catch((error) => {
  console.log('error:', error.message);
  toInternetError();
});

const axiosDelete = (url, ...params) => axios.delete(url, ...params).then(res => httpHelp(res)).catch((error) => {
  console.log('error:', error.message);
  toInternetError();
});

export {
  axiosGet,
  axiosLoginGet,
  axiosPost,
  axiosPut,
  axiosDelete,
  httpHelp,
};
