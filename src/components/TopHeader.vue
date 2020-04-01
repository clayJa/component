<template>
  <div class="top-header-wrapper">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(item,index) in myBread" :key="item.path">
        <router-link :to="{path: item.path}" v-if="index!==myBread.length-1">
          {{item.name}}
        </router-link>
        <span v-else>{{item.name}}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <div class="top-header-content">
      <div class="return" v-if="this.$slots.return">
        <slot name="return"></slot>
      </div>
      <div class="content-info">
        <div class="top-header-top">
          <div class="top-header-title">{{title}}</div>
          <div class="top-header-action" v-if="slotPosition === 'title'">
            <slot></slot>
          </div>
        </div>
        <div class="top-header-bottom">
          <div class="top-header-des">{{des}}</div>
          <div class="top-header-action" v-if="slotPosition === 'des'">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="extra-slot" v-if="this.$slots.extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      required: false,
    },
    slotPosition: {
      type: String,
      required: false,
      default: 'des',
    },
  },
  data() {
    return {};
  },
  computed: {
    myBread() {
      return this.$route.matched;
    },
  },
  methods: {
  },
  components: {},
};
</script>

<style scoped lang="stylus">
  .top-header-wrapper {
    background: #fff;
    min-height: 120px;
    border: 1px solid rgba(232,232,232,1);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px 32px;
    .extra-slot {
      margin-bottom: -11px;
    }
    >>> .ant-tabs-bar {
      position: relative;
      margin-bottom: 0;
    }
    >>> .ant-tabs .ant-tabs-content{
      position: absolute;
      top: 68px;
    }
    >>> .ant-tabs {
      overflow: unset;
    }
    .top-header-content {
      display: flex;
      flex-grow: 1;
      padding-top: 10px;
      .return {
        padding: 0 10px;
        margin-right: 10px;
        position: relative;
        &::before {
          content: '';
          display: block;
          position: absolute;
          top: 0.2em;
          right: 0;
          background: #D8D8D8;
          width: 1px;
          height: 1em;
        }
      }
      .content-info {
        flex-grow: 1;display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 10px;
      }
    }
    .top-header-top {
      display: flex;
      .top-header-title {
        flex-grow: 1;
        font-size:18px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,0.85);
        line-height:28px;
      }
    }
    .top-header-bottom {
      display: flex;
      padding-top: 10px;
      .top-header-des {
        flex-grow: 1;
        max-width: 50%;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,0.65);
        line-height:22px;
      }
      .top-header-action {
        flex-grow: 1;
        height: 22px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
