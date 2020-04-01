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

/**
 * 数组中的对象根据某字段去重
 * @param arr 原始数组
 * @param field 根据该字段去重
 * @returns {*} 去重后的数组
 */
export const uniqueArr = (arr, field) => {
  const res = new Map();
  return arr.filter(a => !res.has(a[field]) && res.set(a[field], 1));
};
/**
 * 保存而禁止内容到指定文件
 * @param data data
 * @param fileName fileName
 */
export const saveResponseAsBlobFile = function (res) {
  // console.log(res);
  let fileName = null;
  if (res && res.headers) {
    fileName = res.headers['content-disposition'];
  }
  // console.log(fileName);
  if (fileName) {
    const temp = fileName.split('filename=');
    if (temp && temp.length > 0) {
      try {
        fileName = decodeURIComponent(temp[1]);
      } catch (e) {
        console.error(e);
        fileName = temp[1];
      }
    } else {
      fileName = null;
    }
  }
  // console.log(fileName);
  if (!fileName) {
    fileName = 'unknown';
  }
  saveBlobFile(res.data, fileName);
};
/**
 * 保存而禁止内容到指定文件
 * @param data data
 * @param fileName fileName
 */
export const saveBlobFile = function (data, fileName) {
  const blob = new Blob([data]);
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const elink = document.createElement('a');
    elink.download = fileName;
    elink.style.display = 'none';
    elink.href = window.URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, fileName);
  }
};

const fileTypeObj = {
  zip: 'application/zip',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
  xls: 'application/vnd.ms-excel',
  doc: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8',
  txt: 'application/txt',
  pdf: 'application/pdf',
};

export const downloadFile = (blobData, fileName, fileType) => {
  // const blob = new Blob([blobData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
  const blob = new Blob([blobData], { type: fileTypeObj[fileType] });
  const downloadElement = document.createElement('a');
  const href = window.URL.createObjectURL(blob);
  downloadElement.href = href;
  downloadElement.download = fileName; // 下载文件名称
  document.body.appendChild(downloadElement);
  downloadElement.click();
  document.body.removeChild(downloadElement); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
};

export const downloadFileByLink = (fileUrl, fileName) => {
  fetch(`${fileUrl}`).then(res => res.blob().then((blob) => {
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    const filename = fileName;
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }));
};

export const computeHtmlText = (html) => {
  const divElem = document.createElement('div');
  divElem.innerHTML = html;
  return divElem.innerText.length;
};

// 下划线转换驼峰
export const toHump = name => name.replace(/\_(\w)/g, (all, letter) => letter.toUpperCase());
// 驼峰转换下划线
export const toLine = name => name.replace(/([A-Z])/g, '_$1').toLowerCase();
export const isApp = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  const isWeiXin = ua.match(/MicroMessenger/i) == 'micromessenger';
  const isDingTalk = ua.match(/DingTalk/i) == 'dingtalk';
  return isWeiXin || isDingTalk;
};

export const isDingTalk = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.match(/DingTalk/i) == 'dingtalk';
};

export const isTimeBefore = time => moment().isBefore(moment(time));

export const formatTime = (time, format) => time && moment(time).format(format);
