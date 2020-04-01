// 开发环境
const devConfig = {
  env: 'dev',
  authHost: 'http://47.96.112.228:8080/',
  redirectHost: 'http://localhost:8008/',
  // frontApi: 'http://47.96.112.228:8080/#/',
  frontApi: 'http://localhost:8080/entry',
  clientId: '2b89893566914c1c84b08bb3562c57eb',
  userApi: 'http://47.96.112.228:8081', // 用户认证的接口(后端)
  roleApi: 'http://47.96.112.228:8086', // 获取权限的接口(后端)
};

// 专网正式环境
const prodConfig = {
  env: 'prod',
  authHost: 'http://172.21.246.161:8089/',
  redirectHost: 'http://172.21.246.157:8082/',
  frontApi: 'http://172.21.246.161:8089/entry',
  clientId: '2b89893566914c1c84b08bb3562c57eb',
  userApi: 'http://172.21.246.209:8081', // 用户认证的接口(后端)
  roleApi: 'http://172.21.247.94:10001', // 获取权限的接口(后端)
};

// 公网测试环境
const testConfig = {
  env: 'test',
  authHost: 'http://47.96.112.228:8080/',
  redirectHost: 'http://47.96.112.228:8099/',
  frontApi: 'http://47.96.112.228:8100/entry',
  clientId: '2b89893566914c1c84b08bb3562c57eb',
  userApi: 'http://47.96.112.228:8081', // 用户认证的接口(后端)
  roleApi: 'http://47.96.112.228:8086', // 获取权限的接口(后端)
};

const config = process.env.NODE_ENV === 'development' ? devConfig : process.env.VUE_APP_TITLE === 'test' ? testConfig : prodConfig;

export default config;
