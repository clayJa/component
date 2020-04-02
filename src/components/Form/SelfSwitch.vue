<template>
  <van-field name="switch" v-bind="$props" input-align="right">
    <template #input>
      <van-switch 
        v-model="localVal" 
        size="20" 
        @change="onDataChange" 
        :active-value="1" 
        :inactive-value="0" 
        active-color="#07c160" 
        inactive-color="#ee0a24" 
      />
    </template>
  </van-field>
</template>
<script>
import { Field } from 'vant';
export default {
  props: {
    ...Field.props,
    value: String | Number,
    options: Array,
  },
  name: 'SelfSwitch',
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
      this.$emit('self-switch',value);
    },
  },
};
</script>