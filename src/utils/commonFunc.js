import moment from 'moment';
import config from './config';

/* eslint-disable no-bitwise */
export const generateUUID = () => {
  let d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now();
  }
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    // eslint-disable-next-line no-mixed-operators
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};

/**
 * 获取url上的参数 by lxy
 * @param variable key
 * @returns {*} value
 */
export const getQuery = (variable) => {
  const hrefMatch = window.location.href.match(/(\S+\?)(\S+)/);
  const query = hrefMatch && hrefMatch[2];
  if (!hrefMatch) {
    return false;
  }
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i += 1) {
    const pair = vars[i].split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return (false);
};

// 跳到登录页
export const toLogin = () => {
  const { authHost, clientId, redirectHost } = config;
  localStorage.clear();
  window.location.href = `${authHost}/login?clientId=${clientId}&redirect_uri=${redirectHost}`;
};

// 跳到500页
export const toInternetError = () => {
  const { env, redirectHost } = config;
  if (env !== 'dev') {
    window.location.href = `${redirectHost}500`;
  }
};

// 创建a标签实现下载
export const downloadExcel = (blobData, fileName) => {
  const blob = new Blob([blobData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
  const downloadElement = document.createElement('a');
  const href = window.URL.createObjectURL(blob);
  downloadElement.href = href;
  downloadElement.download = fileName; // 下载文件名称
  document.body.appendChild(downloadElement);
  downloadElement.click();
  document.body.removeChild(downloadElement); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
};
// 格式化时间
export const timeFormat = time => time && moment(time).format('YYYY-MM-DD HH:mm:ss');

// 格式化合并表格数据
export const translateList = (list, mergeKey) => {
  // 计算需合并的键值的个数
  const obj = {};
  list.forEach((item) => {
    const hasInclude = Object.keys(obj).includes(item[mergeKey]);
    obj[item[mergeKey]] = {
      num: hasInclude ? obj[item[mergeKey]].num + 1 : 1,
    };
  });
  // 重新组装排列
  const tempArr = Object.keys(obj).map(tempKey => list
    .filter(item1 => item1[mergeKey] === tempKey)
    .map((item2, index) => ({ ...item2, rowSpan: obj[tempKey].num, isMerge: index === 0 })));
  return tempArr.reduce((pre, cur) => pre.concat(cur), []);
};
