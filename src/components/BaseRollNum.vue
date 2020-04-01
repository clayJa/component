<template>
  <span ref="roll_num"></span>
</template>
<script>
  import * as d3 from 'd3';

  export default {
    props: {
      number: {
        type: Number,
        default: 0,
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
        const fixedBit = newValue === Math.floor(newValue) ? 0 : newValue.toString().split('.')[1].length;
        this.container.datum({ value: oldVal || 0 })
          .transition()
          .duration(2000)
          .tween('d', (d) => {
            let i = d3.interpolate(d.value, newValue); // 取插值
            return (t) => {
              this.container.text((i(t)).toFixed(fixedBit));
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
