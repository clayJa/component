<template>
  <div class="dynamic-create">
    <FormCreate :rule="rule" v-model="fApi" :option="options"/>
  </div>
</template>
<script>
import { DatetimePicker, Picker, Radio, RadioGroup, Popup } from 'vant';
import SelfDateTime from '@/components/Form/SelfDateTime';
import formCreate, { maker } from '@form-create/iview';

formCreate.component('van-datetime-picker', DatetimePicker);
formCreate.component('van-popup', Popup);
formCreate.component('self-field', SelfDateTime);
formCreate.component('van-picker', Picker);
formCreate.component('van-radio', Radio);
formCreate.component('van-radio-group', RadioGroup);

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
          name: 'datetime',
          props: {
            placeholder: '请选择返湖时间',
            label: '返湖时间',
          },
          emit: ['self-date', 'self-input'],
          emitPrefix: 'datetime',
        },
        {
          type: 'van-field',
          name: 'input',
        },
        {
          type: 'van-picker',
          name: 'picker',
        },
        {
          type: 'van-radio-group',
          name: 'radioGroup',
          children: [
            {
              type: 'van-radio',
              name: 'radio',
            },
          ],
        },
      ],
    };
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      // this.fApi.on('prefix1-selfInput',this.timeFieldClick);
      // this.fApi.on('prefix1-selfClick',this.timeFieldClick);
      // this.fApi.on('self-field-selfClick',this.timeFieldClick);
      this.fApi.on('datetime-self-date', this.timeFieldClick);
      this.fApi.on('datetime-self-input', this.timeFieldClick);
      // this.fApi.on('dateTimeField-selfClick',this.timeFieldClick);
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
