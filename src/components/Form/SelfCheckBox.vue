<template>
  <van-field name="checkboxGroup" v-bind="$props" input-align="right">
    <template #input>
      <van-checkbox-group v-model="localVal" direction="horizontal" @change="onDataChange">
        <van-checkbox :name="item.value" shape="square" v-for="(item,index) in options" :key="`${item.value}-${index}`">{{ item.name }}</van-checkbox>
      </van-checkbox-group>
    </template>
  </van-field>
</template>
<script>
import { Field } from 'vant';

export default {
  props: {
    ...Field.props,
    value: String,
    options: Array,
  },
  name: 'SelfCheckBox',
  model: {
    prop: 'value',
    event: 'input', // 自定义方法，用来更新 model
  },
  data() {
    return {
      localVal: this.value.split(',').filter(Boolean).map(Number),
    };
  },
  watch: {
    value(val) {
      this.localVal = val.split(',').filter(Boolean).map(Number);
    },
  },
  methods: {
    onDataChange(value) {
      this.localVal = value;
      this.$emit('input', value.join(',')); // 更新 model
      this.$emit('self-checkbox', value);
    },
  },
};
</script>
<style lang="stylus" scoped>
  >>> .van-checkbox {
    /* align-items: flex-start; */
  }
  >>> .van-checkbox__icon--checked .van-icon {
    color: rgb(79,152,255);
    border-color: rgb(79,152,255);
    background-color: #fff;
    box-shadow:0px 7px 24px 0px rgba(0,0,0,0.07);
    border-radius: 4px;
  }
  >>> .van-checkbox__icon .van-icon{
    box-shadow:0px 7px 24px 0px rgba(0,0,0,0.07);
    border-radius: 4px;
  }
</style>
