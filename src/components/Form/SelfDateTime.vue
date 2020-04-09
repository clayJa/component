<template>
  <div>
    <van-field
      v-bind="$props"
      clickable
      readonly
      v-model="localVal"
      input-align="right"
      @click="showDate = true"
    />
    <van-popup v-model="showDate" position="bottom">
      <van-datetime-picker
        :formatter="formatter"
        @confirm="onDataConfirm"
        v-model="localDate"
        @cancel="showDate = false"
        type="datetime"
      />
    </van-popup>
  </div>
</template>
<script>
import { Field } from 'vant'
import { formatTime } from '@/utils/commonFunc'

const { formatter, ...restProps } = Field.props
export default {
  props: {
    ...restProps,
    value: Number | String
  },
  name: 'SelfDateTime',
  model: {
    prop: 'value',
    event: 'input' // 自定义方法，用来更新 model
  },
  data () {
    return {
      localVal: this.value,
      showDate: false,
      localDate: new Date()
    }
  },
  watch: {
    value (val) {
      console.log(val)
      this.localVal = val
    }
  },
  methods: {
    formatter (type, val) {
      const map = {
        year: '年',
        month: '月',
        day: '日',
        hour: '时',
        minute: '分'
      }
      return `${val}${map[type]}`
    },
    onDataConfirm (value) {
      const returnValue = formatTime(value, 'YYYY-MM-DD HH:mm')
      this.showDate = false
      this.localVal = `${returnValue}`
      this.$emit('input', `${returnValue}:00`) // 更新 model
      this.$emit('self-date', value)
    }
  }
}
</script>
