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
import SelfCascader from '@/components/Form/SelfCascader';
import formCreate, { maker }  from '@form-create/iview';
formCreate.component('self-field', SelfDateTime);
formCreate.component('self-picker', SelfPicker);
formCreate.component('self-checkbox', SelfCheckBox);
formCreate.component('self-switch', SelfSwitch);
formCreate.component('self-area', SelfArea);
formCreate.component('self-cascader', SelfCascader);
import { rule } from './constant';
import areaList from './city-mobile'
export default {
  name: 'DynamicCreate',
  data() {
    return {
      fApi:{},
      options:{
          onSubmit:(formData)=>{
              alert(JSON.stringify(formData));
          }
      },
      rule: [
        {
          type:'self-field',
          field:'self-field',
          name: 'datetime',
          value: '',
          props: {
            'placeholder': '请选择返湖时间',
            'label': '返湖时间',
          },
          emit: ['self-date','input'],
          emitPrefix:'datetime',
        },
        {
          type:'self-picker',
          field:'self-picker',
          name: 'pick',
          value: '',
          props: {
            'placeholder': '请选择区域',
            'label': '区域',
            'options': [
              { name: '吴兴区', value: 1 },
              { name: '安吉县', value: 2 },
            ]
          },
          emit: ['input','self-pick'],
          emitPrefix:'picker',
        },
        {
          type:'self-checkbox',
          field:'self-checkbox',
          name: 'checkbox',
          value: '',
          props: {
            'placeholder': '请选择区域',
            'label': '区域',
            'options': [
              { name: '吴兴区', value: 1 },
              { name: '安吉县', value: 2 },
            ]
          },
          emit: ['input','self-checkbox'],
          emitPrefix:'checkbox',
        },
        {
          type:'self-switch',
          field:'self-switch',
          name: 'switch',
          value: '',
          props: {
            'label': '状态',
          },
          emit: ['input','self-switch'],
          emitPrefix:'switch',
        },
        {
          type:'self-area',
          field:'self-area',
          name: 'area',
          value: '',
          props: {
            'label': '地址',
            'placeholder': '请选择区域',
            'areaList': areaList
          },
          emit: ['input','self-area'],
          emitPrefix:'area',
        },
        {
          type:'self-cascader',
          field:'self-cascader',
          name: 'cascader',
          value: '',
          props: {
            'label': '地址',
            'placeholder': '请选择区域',
            "areaList": [{
                "code": "11",
                "name": "北京市"
              }, {
                "code": "12",
                "name": "天津市"
              }, {
                "code": "13",
                "name": "河北省"
              }, {
                "code": "14",
                "name": "山西省"
              }, {
                "code": "15",
                "name": "内蒙古自治区"
              }, {
                "code": "21",
                "name": "辽宁省"
              }, {
                "code": "22",
                "name": "吉林省"
              }, {
                "code": "23",
                "name": "黑龙江省"
              }, {
                "code": "31",
                "name": "上海市"
              }, {
                "code": "32",
                "name": "江苏省"
              }, {
                "code": "33",
                "name": "浙江省"
              }, {
                "code": "34",
                "name": "安徽省"
              }, {
                "code": "35",
                "name": "福建省"
              }, {
                "code": "36",
                "name": "江西省"
              }, {
                "code": "37",
                "name": "山东省"
              }, {
                "code": "41",
                "name": "河南省"
              }, {
                "code": "42",
                "name": "湖北省"
              }, {
                "code": "43",
                "name": "湖南省"
              }, {
                "code": "44",
                "name": "广东省"
              }, {
                "code": "45",
                "name": "广西壮族自治区"
              }, {
                "code": "46",
                "name": "海南省"
              }, {
                "code": "50",
                "name": "重庆市"
              }, {
                "code": "51",
                "name": "四川省"
              }, {
                "code": "52",
                "name": "贵州省"
              }, {
                "code": "53",
                "name": "云南省"
              }, {
                "code": "54",
                "name": "西藏自治区"
              }, {
                "code": "61",
                "name": "陕西省"
              }, {
                "code": "62",
                "name": "甘肃省"
              }, {
                "code": "63",
                "name": "青海省"
              }, {
                "code": "64",
                "name": "宁夏回族自治区"
              }, {
                "code": "65",
                "name": "新疆维吾尔自治区"
              }],
          },
          emit: ['input','self-cascader','get-cascader-data'],
          emitPrefix:'cascader',
        },
      ]
    }
  },
  created() {
  },
  mounted() {
    this.$nextTick(()=>{
                this.fApi.on('datetime-self-date',this.timeFieldClick);
                this.fApi.on('picker-self-picker',this.timeFieldClick);
                this.fApi.on('checkbox-self-checkbox',this.timeFieldClick);
                this.fApi.on('switch-self-switch',this.timeFieldClick);
                this.fApi.on('area-self-area',this.timeFieldClick);
                this.fApi.on('cascader-self-cascader',this.timeFieldClick);
                this.fApi.on('cascader-get-cascader-data',this.getData);
            })
  },
  methods: {
    timeFieldClick(e) {
      console.log(e,2222222);
    },
    async getData(item) {
      const rule = this.fApi.getRule('self-cascader');
      if(item.type === 1) {
        fetch('../1.json').then((res) => { res.json().then((data) => { rule.props.areaList = data.data }); })
      }
      if(item.type === 2) {
        fetch('../2.json').then((res) => { res.json().then((data) => { rule.props.areaList = data.data }); })
      }
      if(item.type === 3) {
        fetch('../3.json').then((res) => { res.json().then((data) => { rule.props.areaList = data.data }); })
      }
      if(item.type === 4) {
       fetch('../4.json').then((res) => { res.json().then((data) => { rule.props.areaList = data.data }); })
      }
    }
  },
  components: {
    FormCreate: formCreate.$form(),
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
