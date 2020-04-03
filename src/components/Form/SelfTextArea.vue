<template>
  <van-field
    :rows="rows || 4"
    v-bind="$props"
    v-model="localVal"
    autosize
    type="textarea"
    @input="onDataChange"
  />
</template>
<script>
import { Field } from 'vant';
export default {
  props: {
    ...Field.props,
    value: String | Number,
    rows: String | Number,
  },
  name: 'SelfTextArea',
  model:{
    prop: 'value',
    event: 'input'  // 自定义方法，用来更新 model
  },
  data() {
    return {
      localVal: this.value,
    };
  },
  watch: {
    value(val){
      this.localVal = val;
    }
  },
  methods:{
    onDataChange(value) {
      this.localVal = value;
      this.$emit('input',value); // 更新 model
      this.$emit('self-textarea',value);
    },
  },
};
</script>
<style lang="stylus" scoped>
>>> textarea.van-field__control {
  border-radius:.04rem;
  border: .01rem solid rgb(238,238,238);
}
</style>
