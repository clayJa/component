<!--404页面-->
<template>
    <div class="wrapper">
      <img src="../../assets/img/404.png"/>
      <div style="margin: 20px 0;">找不到页面，请返回首页</div>
      <a-button type="primary" @click="toHome">返回首页</a-button>
    </div>
  </template>

<script>

export default {
  name: 'NotFound',
  data() {
    return {};
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    toHome() {
      this.$router.push({ path: '/' });
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
