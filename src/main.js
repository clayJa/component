import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import Antd from 'ant-design-vue';
import Vant from 'vant';
import iView from 'iview';
import Highcharts from 'highcharts';
import router from './router';
import store from './store/index';
import LocaleProvider from './LocaleProvider.vue';
import 'ant-design-vue/dist/antd.css';
import './assets/style/reset-antd.styl';
import './assets/style/reset.styl';
import './assets/style/common.styl';
import './assets/style/font.styl';
import './assets/iconfont/iconfont.css';
import 'vant/lib/index.css';

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(Vant);
Vue.use(iView);

// 参数：其组件目录的相对路径,是否查询其子目录,匹配基础组件文件名的正则表达式
const requireComponent = require.context('./components/', false, /Base[A-Z]\w+\.(vue|js)$/);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1'),
    ),
  );
  // 全局注册组件
  Vue.component(
    componentName,
    componentConfig.default || componentConfig,
  );
});

new Vue({
  router,
  store,
  render: h => h(LocaleProvider),
}).$mount('#app');
