<template>
  <div id="app" v-if="showFlag && !showError">
      <Menu />
      <div class="right-wrap">
        <Header />
        <Content />
      </div>
    </div>
    <router-view v-else-if="showError"></router-view>
</template>
<script>
import { mapMutations } from 'vuex';
import Menu from './containers/Menu.vue';
import Header from './containers/Header.vue';
import Content from './containers/Content.vue';
import { loginUserInfo, roleList } from './api/api';
import { toLogin } from './utils/commonFunc';
import config from './utils/config';

export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      showFlag: true,
    };
  },
  watch: {
    $route() {},
  },
  computed: {
    showError() {
      const route = this.$route.name;
      return route === 'NotAccessed' || route === 'InternetServerError' || route === 'NotFound';
    },
  },
  // created() {
  //   const token = localStorage.getItem('access_token');
  //   localStorage.removeItem('user');
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (this.$route.name === 'InternetServerError' || this.$route.name === 'NotFound' || this.$route.name === 'NotAccessed') {
  //     this.showFlag = true;
  //   } else if (!token) {
  //     toLogin();
  //   } else if (token && !user) {
  //     this.getUserInfo(token);
  //   } else {
  //     this.fetchRoles(user.userId);
  //   }
  // },
  methods: {
    ...mapMutations(['SET_USER_INFO']),
    getUserInfo(token) {
      loginUserInfo(token).then((data) => {
        if (data && data.userId) {
          this.SET_USER_INFO(data);
          localStorage.setItem('user', JSON.stringify(data));
          this.fetchRoles(data.userId);
        }
      });
    },
    fetchRoles(userId) {
      // 获取账号、角色信息
      roleList(userId).then((json) => {
        if (json && json.result) {
          this.showFlag = true;
          if (json.result.length === 0) {
            const ROOT_URL = config.redirectHost.replace('#/', '');
            window.location.href = `${ROOT_URL}401`;
          }
          const roleId = localStorage.getItem('roleId');
          if (!roleId) {
            const { roles } = json.result[0];
            if (roles && roles.length > 0) {
              const index = roles.findIndex(item => item.code === 0);
              if (index !== -1) {
                localStorage.setItem('roleId', '0');
              }
            } else {
              const ROOT_URL = config.redirectHost.replace('#/', '');
              window.location.href = `${ROOT_URL}401`;
            }
          }
        } else if (json && json.code === 10006) {
          const ROOT_URL = config.redirectHost.replace('#/', '');
          window.location.href = `${ROOT_URL}401`;
        } else if (json.code === 40011) {
          const ROOT_URL = config.redirectHost.replace('#/', '');
          window.location.href = `${ROOT_URL}401`;
        } else if (json) {
          this.$message.error(json.message);
        }
        return null;
      });
    },
    reload() {
      this.showFlag = false;
      const vm = this;
      this.$nextTick(() => { vm.showFlag = true; });
    },
  },
  components: {
    Menu,
    Header,
    Content,
  },
};
</script>
<style lang="stylus">
* {
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  height: 100%;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
}

img {
  vertical-align: top;
  border: none;
}

.clearf:after, .clearf:before {
  content: '';
  display: block;
  clear: both;
}

#app {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  .right-wrap {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>
