<template>
  <div class="dynamic-create">
    <FormCreate :rule="rule" v-model="fApi" :option="options"/>
  </div>
</template>
<script>
import SelfDateTime from '@/components/Form/SelfDateTime'
import SelfPicker from '@/components/Form/SelfPicker'
import SelfCheckBox from '@/components/Form/SelfCheckBox'
import SelfSwitch from '@/components/Form/SelfSwitch'
import SelfArea from '@/components/Form/SelfArea'
import SelfCascader from '@/components/Form/SelfCascader'
import SelfTextArea from '@/components/Form/SelfTextArea'
import SelfField from '@/components/Form/SelfField'
import formCreate, { maker } from '@form-create/iview'
import areaList from './city-mobile'
formCreate.component('self-datetime', SelfDateTime)
formCreate.component('self-picker', SelfPicker)
formCreate.component('self-checkbox', SelfCheckBox)
formCreate.component('self-switch', SelfSwitch)
formCreate.component('self-area', SelfArea)
formCreate.component('self-cascader', SelfCascader)
formCreate.component('self-textarea', SelfTextArea)
formCreate.component('self-field', SelfField)
export default {
  name: 'DynamicCreate',
  data () {
    return {
      fApi: {},
      options: {
        onSubmit: (formData) => {
          alert(JSON.stringify(formData))
        }
      },
      rule: [
        {
          type: 'self-datetime',
          field: 'self-datetime',
          name: 'datetime',
          value: '',
          props: {
            placeholder: '请选择返湖时间',
            label: '返湖时间'
          },
          emit: ['self-date', 'input'],
          emitPrefix: 'datetime'
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
              { name: '安吉县', value: 2 }
            ]
          },
          emit: ['input', 'self-pick'],
          emitPrefix: 'picker'
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
              { name: '安吉县', value: 2 }
            ]
          },
          emit: ['input', 'self-checkbox'],
          emitPrefix: 'checkbox'
        },
        {
          type: 'self-switch',
          field: 'self-switch',
          name: 'switch',
          value: '',
          props: {
            label: '状态'
          },
          emit: ['input', 'self-switch'],
          emitPrefix: 'switch'
        },
        {
          type: 'self-area',
          field: 'self-area',
          name: 'area',
          value: '',
          props: {
            label: '地址',
            placeholder: '请选择区域',
            areaList: areaList
          },
          emit: ['input', 'self-area'],
          emitPrefix: 'area'
        },
        {
          type: 'self-cascader',
          field: 'self-cascader',
          name: 'cascader',
          value: '',
          props: {
            label: '地址',
            placeholder: '请选择区域',
            areaList: [{
              code: '12',
              name: '天津市'
            }]
          },
          emit: ['input', 'self-cascader', 'get-cascader-data'],
          emitPrefix: 'cascader'
        },
        {
          type: 'self-textarea',
          field: 'self-textarea',
          name: 'textarea',
          value: '',
          props: {
            label: '备注',
            placeholder: '请输入备注'
          },
          emit: ['input', 'self-textarea'],
          emitPrefix: 'textarea'
        },
        {
          type: 'self-field',
          field: 'self-field',
          name: 'textarea',
          value: '',
          props: {
            label: '手机号',
            placeholder: '请输入手机号',
            rules: [
              { pattern: /(\+\d+)?1[3456789]\d{9}$/, trigger: 'onBlur', message: '手机号格式不正确！' },
              { validator: this.asyncValidator, message: '请输入正确内容1' },
              { validator: this.validator, message: '请输入正确内容2' },
              { required: true, message: '请填写用户名' }
            ]
          },
          emit: ['input', 'self-blur', 'self-field'],
          emitPrefix: 'phone'
        }
      ]
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      const eventMap = {
        'datetime-self-date': 'timeFieldClick',
        'picker-self-picker': 'timeFieldClick',
        'checkbox-self-checkbox': 'timeFieldClick',
        'switch-self-switch': 'timeFieldClick',
        'textarea-self-textarea': 'timeFieldClick',
        'area-self-area': 'timeFieldClick',
        'cascader-self-cascader': 'timeFieldClick',
        'cascader-get-cascader-data': 'getData'
      }
      Object.keys(eventMap).forEach(key => {
        this.fApi.on(key, this[eventMap[key]])
      })
      // /(\+\d+)?1[3456789]\d{9}$/
      // this.fApi.on('datetime-self-date',this.timeFieldClick);
      // this.fApi.on('picker-self-picker',this.timeFieldClick);
      // this.fApi.on('checkbox-self-checkbox',this.timeFieldClick);
      // this.fApi.on('switch-self-switch',this.timeFieldClick);
      // this.fApi.on('textarea-self-textarea',this.timeFieldClick);
      // this.fApi.on('area-self-area',this.timeFieldClick);
      // this.fApi.on('cascader-self-cascader',this.timeFieldClick);
      // this.fApi.on('cascader-get-cascader-data',this.getData);
    })
  },
  methods: {
    timeFieldClick (e) {
      console.log(e, 2222222)
    },
    validator (val) {
      return /1\d{10}/.test(val)
    },
    asyncValidator (val) {
      return new Promise(resolve => {
        this.$toast.loading('验证中...')

        setTimeout(() => {
          this.$toast.clear()
          resolve(/\d{6}/.test(val))
        }, 1000)
      })
    },
    async getData (item) {
      const rule = this.fApi.getRule('self-cascader')
      if (item.type === 1) {
        fetch('../1.json').then((res) => { res.json().then((data) => { rule.props.areaList = data.data }) })
      }
      if (item.type === 2) {
        fetch('../2.json').then((res) => { res.json().then((data) => { rule.props.areaList = data.data }) })
      }
      if (item.type === 3) {
        fetch('../3.json').then((res) => { res.json().then((data) => { rule.props.areaList = data.data }) })
      }
      if (item.type === 4) {
        fetch('../4.json').then((res) => { res.json().then((data) => { rule.props.areaList = data.data }) })
      }
    }
  },
  components: {
    FormCreate: formCreate.$form()
  }
}
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
