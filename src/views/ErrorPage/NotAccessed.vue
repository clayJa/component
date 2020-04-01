<!--401页面-->
<template>
    <div class="wrapper">
      <img src="../../assets/img/401.png"/>
      <div style="margin: 20px 0;">未经授权，拒绝访问，请重新登录</div>
      <a-button type="primary" @click="toLogin">重新登录</a-button>
    </div>
  </template>

<script>
import { toLogin } from '../../utils/commonFunc';
import { loginOut } from '../../api/api';

export default {
  name: 'NotAccessed',
  data() {
    return {};
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    toLogin() {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        loginOut(localStorage.getItem('access_token')).then((json) => {
          if (json.success) {
            toLogin();
          } else {
            this.$message.error('退出登录失败');
          }
        });
      }
    },
  },
};
</script>

  <style scoped lang="stylus">
    .wrapper{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  </style>
