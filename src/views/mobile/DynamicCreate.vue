<template>
  <div class="dynamic-create">
    <FormCreate :rule="rule" v-model="fApi" :option="options"/>
  </div>
</template>
<script>
import { DatetimePicker, Field, Picker, Radio, RadioGroup, Popup } from 'vant';
import SelfDateTime from '@/components/Form/SelfDateTime';
import SelfPicker from '@/components/Form/SelfPicker';
import SelfCheckBox from '@/components/Form/SelfCheckBox';
import SelfSwitch from '@/components/Form/SelfSwitch';
import SelfArea from '@/components/Form/SelfArea';
import formCreate, { maker } from '@form-create/iview';
import { rule } from './constant';
import areaList from './city-mobile';

formCreate.component('self-field', SelfDateTime);
formCreate.component('self-picker', SelfPicker);
formCreate.component('self-checkbox', SelfCheckBox);
formCreate.component('self-switch', SelfSwitch);
formCreate.component('self-area', SelfArea);

export default {
  name: 'DynamicCreate',
  data() {
    return {
      fApi: {},
      options: {
        onSubmit: (formData) => {
          alert(JSON.stringify(formData));
        },
      },
      rule: [
        {
          type: 'self-field',
          field: 'self-field',
          name: 'datetime',
          value: '',
          props: {
            placeholder: '请选择返湖时间',
            label: '返湖时间',
          },
          emit: ['self-date', 'input'],
          emitPrefix: 'datetime',
        },
        {
          type: 'self-picker',
          field: 'self-picker',
          name: 'pick',
          value: '',
          props: {
            placeholder: '请选择区域',
            label: '区域',
            options: [
              { name: '吴兴区', value: 1 },
              { name: '安吉县', value: 2 },
            ],
          },
          emit: ['input', 'self-pick'],
          emitPrefix: 'picker',
        },
        {
          type: 'self-checkbox',
          field: 'self-checkbox',
          name: 'checkbox',
          value: '',
          props: {
            placeholder: '请选择区域',
            label: '区域',
            options: [
              { name: '吴兴区', value: 1 },
              { name: '安吉县', value: 2 },
            ],
          },
          emit: ['input', 'self-checkbox'],
          emitPrefix: 'checkbox',
        },
        {
          type: 'self-switch',
          field: 'self-switch',
          name: 'checkbox',
          value: '',
          props: {
            label: '状态',
          },
          emit: ['input', 'self-switch'],
          emitPrefix: 'switch',
        },
        {
          type: 'self-area',
          field: 'self-area',
          name: 'checkbox',
          value: '',
          props: {
            label: '地址',
            areaList,
          },
          emit: ['input', 'self-area'],
          emitPrefix: 'area',
        },
      ],
    };
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.fApi.on('datetime-self-date', this.timeFieldClick);
      this.fApi.on('picker-self-picker', this.timeFieldClick);
      this.fApi.on('checkbox-self-checkbox', this.timeFieldClick);
      this.fApi.on('switch-self-switch', this.timeFieldClick);
      this.fApi.on('area-self-area', this.timeFieldClick);
    });
  },
  methods: {
    timeFieldClick(e) {
      console.log(e, 2222222);
    },
  },
  components: {
    FormCreate: formCreate.$form(),
  },
};
</script>
<style lang="stylus" scoped>
.dynamic-create {
  font-size: .14rem;
  width: 100%;
  min-height: 100%;
  position: relative;
  background-color: #E8EFF1;
}
</style>
