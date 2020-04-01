<template>
  <a-locale-provider :locale="locale">
    <App/>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import App from './App.vue';

export default {
  data() {
    return {
      locale: zhCN,
    };
  },
  components: {
    App,
  },
};
</script>
