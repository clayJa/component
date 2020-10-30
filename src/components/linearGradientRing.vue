<template>
  <div class="d3-ring-wrapper"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'linearGradientRing',
  props: {
    color: {
      type: Array,
      default() {
        // return ['#375F80', 'rgb(119, 246, 249)'];
        return ['rgb(119, 246, 249)', '#375F80'];
      }
    }
  },
  data() {
    return {
      svg: null,
      circle1: null,
      circle2: null,
      circleBg: null
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.svg = d3.select('.d3-ring-wrapper')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 440 440')
        ;
        const g = this.svg.append('g')
          .attr('transform', 'matrix(0,-1,1,0,0,440)');
        // 背景圆
        g.append('circle')
          .attr('cx', '220')
          .attr('cy', '220')
          .attr('r', '170')
          .attr('stroke-width', '80')
          .attr('stroke', 'rgb(38, 57, 85)')
          .attr('fill', 'none')
          .attr('style', 'transition: stroke-dasharray .8s')
          .attr('stroke-linecap', 'round')
          .attr('stroke-dasharray', '1069 1069');
          this.circle1 = g.append('circle')
          .attr('cx', '220')
          .attr('cy', '220')
          .attr('r', '170')
          .attr('stroke-width', '80')
          .attr('stroke', 'url(#1)')
          .attr('fill', 'none')
          .attr('style', 'transition: stroke-dasharray .8s')
          .attr('stroke-linecap', 'round')
          .attr('stroke-dasharray', '1069 1069')
          .attr('stroke-dasharray', '0 1069');
          this.circle2 = g.append('circle')
          .attr('cx', '220')
          .attr('cy', '220')
          .attr('r', '170')
          .attr('stroke-width', '80')
          .attr('stroke', 'url(#2)')
          .attr('fill', 'none')
          .attr('style', 'transition: stroke-dasharray .8s')
          .attr('stroke-linecap', 'round')
          .attr('stroke-dasharray', '534.5 1069')
          .attr('stroke-dasharray', '0 1069');

        // 插入渐变色
        this.linearGradient();
        setTimeout(() => this.ringeValue(70), 1000);
    },
    ringeValue(val) {
      const perimeter = Math.PI * 2 * 170;
      if (val > 50) {
        this.circle2
        .attr('stroke-dasharray', `534.5 1069`);
        this.circle1
        .attr('stroke-dasharray', `${perimeter * (val) / 100} 1069`);
      } else if (val <= 50) {
        this.circle2.attr('stroke-dasharray', `${perimeter * (val) / 100} 1069`);
      }
    },
    linearGradient() {
      const middleColor = d3.interpolate(d3.color(this.color[0]), d3.color(this.color[1]))(0.5);
      const stops1 = [
        { offset: 0, color: this.color[0] },
        { offset: 1, color: middleColor }
      ];
      const stops2 = [
        { offset: 0, color: this.color[1] },
        { offset: 1, color: middleColor }
      ];
      this.svg.append('defs')
        .append('linearGradient')
        .attr('id', '1')
        .attr('x1', 1)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', 0)
        .selectAll('stop')
        .data(stops1)
        .enter()
        .append('stop')
        .attr('offset', (d) => d.offset)
        .attr('stop-color', (d) => d.color);
      this.svg.append('defs')
        .append('linearGradient')
        .attr('id', '2')
        .attr('x1', 1)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', 0)
        .selectAll('stop')
        .data(stops2)
        .enter()
        .append('stop')
        .attr('offset', (d) => d.offset)
        .attr('stop-color', (d) => d.color);
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
  .d3-ring-wrapper {
    position: absolute;
    left: 970px;
    top: 180px;
    border: 1px solid red;
    height: 80px;
    width: 80px;
    /* transform:  matrix(-1,0,0,1,0,0); */
  }
</style>
