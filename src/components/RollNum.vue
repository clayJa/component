<template>
  <span class="roll-num">
    <span class="num-1">{{placeholder}}</span>
    <span class="num-2" ref="roll_num"></span>
  </span>
</template>
<script>
import * as d3 from 'd3';

export default {
  props: {
    number: {
      type: Number,
      default: 0,
    },
    fixed: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    // 防抖动
    placeholder() {
      if (!this.number && this.number !== 0) return '';
      let numStr;
      if (this.fixed === 0) {
        numStr = this.number.toString();
      } else {
        numStr = this.number.toFixed(2);
      }
      const hasBit = numStr.includes('.');
      numStr = numStr.replace('.', '');
      const numLe = numStr.length;
      let p = '';
      for (let i = 0; i < numLe; i++) {
        p += '9';
      }
      if (hasBit) {
        p += '.';
      }
      return p;
    },
  },
  mounted() {
    this.initRollNum();
    this.update(this.number);
  },
  methods: {
    initRollNum() {
      this.container = d3.select(this.$refs.roll_num);
    },
    update(newValue, oldVal) {
      let fixedBit;
      if (this.fixed === 0) {
        fixedBit = newValue === Math.floor(newValue) ? 0 : newValue.toString().split('.')[1].length;
      } else {
        fixedBit = this.fixed;
      }
      this.container
        .datum({ value: oldVal || 0 })
        .transition()
        .duration(2000)
        .tween('d', (d) => {
          let i = d3.interpolate(d.value, newValue); // 取插值
          return (t) => {
            this.container.text(i(t).toFixed(fixedBit));
          };
        });
    },
  },
  watch: {
    number(val, oldVal) {
      if (typeof val === 'number') {
        this.update(val, oldVal);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.roll-num {
  position: relative;
  display: inline-flex;
  align-items: center;
  .num-1 {
    visibility: hidden;
  }
  .num-2 {
    position: absolute;
    left: 0;
  }
}
</style>
