<template>
  <van-field 
    name="field" 
    v-bind="$props" 
    @blur="handleBlur" 
    @input="onDataChange" 
    v-model="localVal"
    :error="errorStatus"
    :error-message="errormessage"
    >
  </van-field>
</template>
<script>
import { Field } from 'vant';
export default {
  props: {
    ...Field.props,
    value: String | Number,
  },
  name: 'SelfField',
  model:{
    prop: 'value',
    event: 'input'  // 自定义方法，用来更新 model
  },
  data() {
    return {
      localVal: this.value,
      errormessage: '',
      errorStatus: false,
    };
  },
  watch: {
    value(val){
      this.localVal = val; 
    }
  },
  methods:{
    onDataChange(value) {
      this.errormessage = '';
      this.errorStatus = false;
      this.localVal = value;
      this.$emit('input',value); // 更新 model
      this.$emit('self-field',value);
    },
    handleBlur(e) {
      const val = e.target.value
      this.$emit('self-blur',val);
      const blurRules = this.rules.filter(item => item.trigger === 'onBlur');
      const requiredRules = this.rules.filter(item => item.required === true );
      const patternRules = this.rules.filter(item => item.pattern);
      const validatorRules = this.rules.filter(item => item.validator);
      // 必填校验
      for(let i = 0; i < requiredRules.length; i++ ) {
        console.log(!val,'jjjjjjjj');
        if(!val) {
          this.errorStatus = true;
          this.errormessage = requiredRules[i].message;
          return;
        }
      }
      // 正则表达式验证
      for(let i = 0; i < patternRules.length; i++ ) {
        const reg = new RegExp(patternRules[i].pattern);
        if(!reg.test(val)) {
          this.errorStatus = true;
          this.errormessage = patternRules[i].message;
          return;
        }
      }
      if(this.errorStatus) {
        return;
      }
      // 函数验证(支持promise)
      const validators = validatorRules.map(item => item.validator(val));
      Promise.all(validators).then(res => {
        const errorIndex = res.findIndex(item => !item);
        if(errorIndex !== -1) {
          this.errorStatus = true;
          this.errormessage = validatorRules[errorIndex].message;
        }
      }) 
    }
  },
};
</script>