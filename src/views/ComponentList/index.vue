<template>
  <div class="wrapper">
    <TopHeader title="头部标题组件" des="接受属性title、des,action使用默认slot与des内容齐平,可使用slotPosition指定,返回使用具名slot(title)">
      <a-button style="margin-right: 10px;color: #2EA9E6;" @click="showConfirm">组织信息管理</a-button>
      <a-button style="color: #2EA9E6;" @click="showConfirm">组织申请审批管理</a-button>
    </TopHeader>
    <TopHeader title="头部标题组件" des="接受属性title、des,action使用默认slot与des内容齐平,可使用slotPosition指定,返回使用具名slot(title)接受属性title、des,action使用默认slot与des内容齐平,可使用slotPosition指定,返回使用具名slot(title)" slotPosition="title">
      <div style="color: #F58B22;display:flex;font-weight: 500"><span>收藏</span></div>
      <template slot="return">
        <a-icon type="arrow-left" style="cursor: pointer"/>
      </template>
    </TopHeader>
    <TopHeader title="头部标题组件" des="接受属性title、des,action使用默认slot与des内容齐平,可使用slotPosition指定,返回使用具名slot(title)">
      <div style="color: #F58B22;display:flex;font-weight: 500"><span>收藏</span></div>
      <template slot="extra">
          <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="Tab 1" key="1">Content of Tab Pane 1</a-tab-pane>
            <a-tab-pane tab="Tab 2" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane tab="Tab 3" key="3">Content of Tab Pane 3</a-tab-pane>
          </a-tabs>
      </template>
    </TopHeader>
  </div>
</template>

<script>
import TopHeader from '../../components/TopHeader.vue';

export default {
  name: 'AppManage',
  data() {
    return {
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    showConfirm() {
      this.$confirm({
        title: '确定?',
        content: '',
        centered: true,
        onOk() {
        },
      });
    },
  },
  components: {
    TopHeader,
  },
};
</script>

<style lang="stylus">
  .wrapper{
    position: relative;
    width: 100%;
    min-height: 100%;
    background: #fff;
    box-shadow: 0 4px 10px 0 rgba(36, 47, 68, 0.20);
    border-radius: 2px;
    padding: 0;
  }
</style>
