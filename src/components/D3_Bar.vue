<template>
  <div class="d3-bar-wrapper"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'Bar',
  props: {
    dataX: {
      type: Array,
      required: false,
      default() {
        return ['掌上通APP', '云资源管理系统', '项目管理系统', '智慧城管'];
      },
    },
    dataY: {
      type: Array,
      required: false,
      default() {
        return [1000, 1500, 2500, 1800];
      },
    },
    options: {
      type: Object,
      required: false,
      default() {
        return {
          xAxis: {
            position: 100,
            fontSize: 16,
            lineWidth: 1,
            lineColor: '#74767C',
            itemStyle: ['#73D0DC', '#5BBB8D', '#3E6EBD', '#619B36'],
          },
          barWidth: 20,
          borderRadius: 10,
          itemStyle: [],
          barLinearGradients: [
            { x1: 1, x2: 0, y1: 0, y2: 0, stops: [{ offset: 0, color: 'rgba(60, 192, 208, 1)' }, { offset: 1, color: 'rgba(60, 192, 208, .3)' }] },
            { x1: 1, x2: 0, y1: 0, y2: 0, stops: [{ offset: 0, color: 'rgba(36, 179, 117, 1)' }, { offset: 1, color: 'rgba(36, 179, 117, .3)' }] },
            { x1: 1, x2: 0, y1: 0, y2: 0, stops: [{ offset: 0, color: 'rgba(36, 104, 213, 1)' }, { offset: 1, color: 'rgba(36, 104, 213, .3)' }] },
            { x1: 1, x2: 0, y1: 0, y2: 0, stops: [{ offset: 0, color: 'rgba(66, 151, 23, 1)' }, { offset: 1, color: 'rgba(66, 151, 23, .3)' }] },
          ],
        };
      },
    },
  },
  data() {
    return {
      svg: null,
    };
  },
  mounted() {
    this.initBar();
  },
  methods: {
    initBar() {
      this.svg = d3.select('.d3-bar-wrapper')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%');
      // .range([100, 400]);
      const { width, height } = this.svg.node().getBoundingClientRect();
      const fontSize = (this.options && this.options.xAxis && this.options.xAxis.fontSize) || 16;
      const barWidth = (this.options && this.options.barWidth) || 20;
      const borderRadius = (this.options && this.options.borderRadius) || 20;
      const barLinearGradients = (this.options && this.options.barLinearGradients) || [];
      const position = (this.options && this.options.xAxis.position && this.options.xAxis.position) || 100;
      const lineWidth = (this.options && this.options.xAxis.lineWidth && this.options.xAxis.lineWidth) || 100;
      const lineColor = (this.options && this.options.xAxis.lineColor && this.options.xAxis.lineColor) || '#74767C';
      const xAxisLabelStyle = (this.options && this.options.xAxis && this.options.xAxis.itemStyle);
      const max = Math.max(fontSize, barWidth);
      const scale = d3.scaleLinear().domain([0, d3.max(this.dataY)]).range([0, width - position - 50]);
      console.log(width - position);
      const { length } = this.dataX;
      const between = (height - length * max) / (length - 1);
      // x轴标签
      this.svg.selectAll('text')
        .data(this.dataX)
        .enter()
        .append('text')
        .text(d => this.wrap(d))
        .attr('style', (d, i) => `fill: ${Array.isArray(xAxisLabelStyle) && xAxisLabelStyle.length > 0 ? xAxisLabelStyle[i] : '#74767C'};font-weight: 600;font-style: italic;`)
        .attr('x', 10)
        .attr('y', (d, i) => between * i + (height - between * (length - 1)) / 2 - max / 2 + fontSize - (max - fontSize) / 2)
        // 增加 title
        .attr('class', 'text')
        .append('title')
        .data(this.dataX)
        .text(d => d);
      // x轴线
      this.svg.append('line')
        .attr('x1', position)
        .attr('y1', 0)
        .attr('x2', position)
        .attr('y2', height)
        .attr('style', `stroke-width:${lineWidth};stroke:${lineColor}`);
      const groupBackground = this.svg.append('g')
        .attr('x1', position)
        .attr('y1', 0)
        .attr('x2', position)
        .attr('y2', height);
      const group = this.svg.append('g')
        .attr('x1', position)
        .attr('y1', 0)
        .attr('x2', position)
        .attr('y2', height);
        // 插入渐变色
      const linearGradients = barLinearGradients.map(item => this.linearGradient(item.x1, item.x2, item.y1, item.y2, item.stops));
      // y轴
      groupBackground.selectAll('rect')
        .data(this.dataY)
        .enter()
        .append('rect')
        .attr('x', position)
        .attr('y', (d, i) => between * i + (height - between * (length - 1)) / 2 - max / 2 - 4)
        .attr('height', barWidth + 8)
        .attr('width', 0)// this is the initial value
        .transition()
        .duration(1000)// time in ms
        .attr('width', scale(d3.max(this.dataY)) + 6)
        .attr('ry', borderRadius + 8)
        // .attr('style', (d, i) => `fill: ${Array.isArray(xAxisLabelStyle) && xAxisLabelStyle.length > 0 ? xAxisLabelStyle[i] : '#74767C'}`);
        .attr('style', (d, i) => 'fill: #1F2933');
      // y轴
      group.selectAll('rect')
        .data(this.dataY)
        .enter()
        .append('rect')
        .attr('x', position)
        .attr('y', (d, i) => between * i + (height - between * (length - 1)) / 2 - max / 2)
        .attr('height', barWidth)
        .attr('width', 0)// this is the initial value
        .transition()
        .duration(1000)// time in ms
        .attr('width', d => scale(d))
        .attr('ry', borderRadius)
        // .attr('style', (d, i) => `fill: ${Array.isArray(xAxisLabelStyle) && xAxisLabelStyle.length > 0 ? xAxisLabelStyle[i] : '#74767C'}`);
        .attr('style', (d, i) => `fill: ${Array.isArray(linearGradients) && linearGradients.length > 0 ? `url(#${linearGradients[i]})` : '#74767C'}`);
      // y轴标签
      group.selectAll('text')
        .data(this.dataY)
        .enter()
        .append('text')
        .text(d => d)
        .attr('style', 'font-weight: 600;font-style: italic;fill:#fff')
        .attr('x', d => position + scale(d3.max(this.dataY)) + 6)
        .attr('y', (d, i) => between * i + (height - between * (length - 1)) / 2 - max / 2 + fontSize - (max - fontSize) / 2);
    },
    wrap(str) {
      if (str.length > 6) {
        return `${str.slice(0, 5)}...`;
      }
      return str;
    },
    linearGradient(x1, x2, y1, y2, stops) {
      const id = Math.floor(Math.random() * 100);
      this.svg.append('defs')
        .append('linearGradient')
        .attr('id', id)
        .attr('x1', x1)
        .attr('x2', x2)
        .attr('y1', y1)
        .attr('y2', y2)
        .selectAll('stop')
        .data(stops)
        .enter()
        .append('stop')
        .attr('offset', d => d.offset)
        .attr('stop-color', d => d.color);
      return id;
    },
  },
  components: {},
};
</script>

<style scoped lang="stylus">
  .d3-bar-wrapper {
    border: 1px solid red;
    height: 100%;
    width: 100%;
  }
</style>
