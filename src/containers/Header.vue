<template>
  <div class="header-wrapper">
    <div class="header-left">
      <BaseIcon :type="iconType" class="icon"></BaseIcon>
      <span class="tips">{{currentMenu}}</span>
    </div>
    <div class="user-info">
      <span class="user-name" >你好,</span>

      <a-dropdown :trigger="['click']">
        <div class="user-info">
          <div class="user-avatar">
            <div class="img"/>
          </div>
          <span style="margin-left: 10px;" class="user-name">{{userInfo.userName}}</span>
          <a-icon type="down" style="margin-left: 10px;color: #000"/>
        </div>
        <a-menu slot="overlay">
          <a-menu-item>
            <div href="javascript:;" @click="toFront">返回数字大脑主页</div>
          </a-menu-item>
          <a-menu-item>
            <div href="javascript:;" @click="handleLogout">退出登录</div>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { toLogin } from '../utils/commonFunc';
import config from '../utils/config';
import { loginOut } from '../api/api';

export default {
  name: 'Header',
  data() {
    return {
      tenants: [],
    };
  },
  inject: ['reload'],
  computed: {
    ...mapGetters(['userInfo']),
    iconType() {
      const path = this.$route.fullPath.split('/');
      return path[0] !== '' ? path[0] : path[1];
    },
    currentMenu() {
      return this.$route.name;
    },
  },
  watch: {
  },
  mounted() {
    // this.getTenants();
  },
  methods: {
    ...mapMutations(['SET_USER_INFO']),
    toFront() {
      const that = this;
      that.$confirm({
        title: '确定要返回数字大脑登录系统吗?',
        onOk() {
          window.location.href = `${config.frontApi}?access_token=${localStorage.access_token}`;
        },
        onCancel() {},
      });
    },
    handleLogout() {
      const that = this;
      that.$confirm({
        title: '确定要退出登录吗?',
        onOk() {
          loginOut(localStorage.getItem('access_token')).then((json) => {
            if (json.success) {
              toLogin();
            } else {
              that.$message.error('退出登录失败');
            }
          });
        },
        onCancel() {},
      });
    },
  },
  components: {
  },
};
</script>

<style scoped lang="stylus">
  .header-wrapper {
    width: 100%;
    height: 70px;
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(0, 31, 42, 0.2);

    .header-left {
      position: relative;
      display: flex;
      padding: 0 20px;
      float: left;
      height: 100%;
      font-size: 20px;
      font-weight: bold;
      line-height: 70px;

      .icon {
        font-size: 28px;
        background: linear-gradient(to right, #47dfea, #31a3ef);
        -webkit-background-clip: text;
        color: transparent;
        cursor: pointer;
      }

      .tips {
        margin-left: 5px;
      }
    }
    .user-info {
      float: right;
      margin-right: 15px;
      z-index: 999;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      .user-name {
        font-size: 16px;
      }

      .user-avatar {
        display: flex;
        width: 49px;
        height: 48px;
        background: url('../assets/img/circle.png');
        margin-left: 20px;
        justify-content: center;
        align-items: center;

        .img {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: url('../assets/img/head-logo.png');
          background-size: cover;
        }
      }
    }
  }

  .department-select {
    width: 200px;
    color: #fff;
    >>> .ant-select-selection--single {
      color: #fff;
      background: none;
      border: none;
      .ant-select-arrow {
        color: #fff;
      }
    }
  }

</style>
