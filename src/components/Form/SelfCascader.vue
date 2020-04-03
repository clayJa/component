<template>
  <div>
    <van-field
      v-bind="$props"
      input-align="right"
      readonly
      clickable
      v-model="localVal"
      @click="areaSelect(0)"
    />
    <van-popup v-model="showPicker" position="bottom" :lazy-render="true" :style="{height:'60%'}">
      <div class="area-picker">
        <div class="tabs van-hairline--bottom">
            <span class="tab" :class="{ active: active === 0 }" @click="clickTab(0)">{{v[0] | title}}</span>
            <span class="tab" :class="{ active: active === 1 }" @click="clickTab(1)" v-show="v[1] || active === 1">{{v[1] | title}}</span>
            <span class="tab" :class="{ active: active === 2 }" @click="clickTab(2)" v-show="v[2] || active === 2">{{v[2] | title}}</span>
            <span class="tab" :class="{ active: active === 3 }" @click="clickTab(3)" v-show="v[3] || active === 3">{{v[3] | title}}</span>
        </div>
        <div class="container">
          <van-cell clickable v-for="item in areas" :key="item.code" :title="item.name" @click="onClickCell(item)" />
        </div>
        <div class="loading" v-show="loading">
            <van-loading color="#1989fa"/>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Field } from 'vant';
export default {
  props: {
    ...Field.props,
    value: Number | String,
    areaList: Array,
  },
  name: 'SelfCascader',
  model: {
    prop: 'value',
    event: 'input', // 自定义方法，用来更新 model
  },
  data() {
    return {
      localVal: this.value,
      showPicker: false,
      /********************************/
      active: 0,
      loading: false,
      areas: this.areaList,
      v: [null, null, null, null], // 省 市 县 街道
    };
  },
  filters: {
    title(val) {
      if (val) {
        return val.name;
      } else {
        return '请选择';
      }
    },
  },
  watch: {
    value(val) {
      this.localVal = val;
    },
    areaList(val) {
      this.loading = false;
      this.areas = val;
    },
  },
  methods: {
    areaSelect(val) {
      this.areaSelectVal = val;
      this.showPicker = true;
    },
    async clickTab(index) {
      if (!this.v[index]) {
        return;
      }
      this.active = index;
      this.areas = [];
      if(index === 0) {
        this.loading = true;
        this.areas = this.$emit('get-cascader-data',{ name: '', code: '', type: 1 })
      } else {
        this.areas = this.v[index - 1].children
      }
    },
    onClickCell(item) {
      if (this.active < 3) this.areas = [];
      this.v.splice(this.active, 1, item);
      for (let t = this.active + 1; t <= 3; t++) {
        this.v[t] = null;
      }

      if (!this.v[3]) {
        const type = this.getNodeType(item.code);
        this.loading = true;
        this.$emit('get-cascader-data',{ ...item, type });
      } else {
        this.$emit('input', this.v.map((item) => item.name).join('/'));
        this.$emit('self-cascader', this.v);
      }
      if (this.active < 3) this.active = this.active + 1;
    },
    getNodeType(code) {
      const length = code.length || 0;
      const lengthMap = {
        0: 1,
        2: 2,
        4: 3,
      }
      return lengthMap[length] ? lengthMap[length] : 4
    },
  },
};
</script>
<style lang="stylus" scoped>
.area-picker{
  position: relative;
  .loading{
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background:rgba(0,0,0,.1);
    display:flex;
    justify-content:center;
    align-items: center;
  }
  .tabs{
    height: 45px;
    .tab{
      text-align:center;
      box-sizing: border-box;
      display:inline-block;
      height:45px;
      line-height: 45px;
      padding:0 8px;
      font-size:14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 25%;
      &.active{
        border-bottom: 1px solid #1989fa;
      }
    }
  }
  .container{
    height: calc(60vh - 45px);
    overflow-y:auto;
  }
}
</style>
