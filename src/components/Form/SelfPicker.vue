<template>
  <div>
    <van-field
      v-bind="$props"
      clickable
      readonly
      v-model="localVal"
      input-align="right"
      @click="showPicker = true"
    />
    <van-popup :value="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :value-key="typeof options[0] === 'object' ? 'name' : null"
        :columns="options"
        @confirm="onDataConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>
<script>
import { Field } from 'vant';

export default {
  props: {
    ...Field.props,
    value: Number | String,
    options: Array,
  },
  name: 'SelfPicker',
  model: {
    prop: 'value',
    event: 'input', // 自定义方法，用来更新 model
  },
  data() {
    return {
      localVal: this.value,
      showPicker: false,
    };
  },
  watch: {
    value(val) {
      console.log(val);
      this.localVal = val;
    },
  },
  methods: {
    onDataConfirm(value) {
      const val = typeof value === 'object' ? value.name : value;
      this.localVal = val;
      this.$emit('input', val); // 更新 model
      this.$emit('self-pick', value);
      this.showPicker = false;
    },
  },
};
</script>
