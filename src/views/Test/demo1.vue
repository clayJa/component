<template>
  <div class="wrapper">
  <p>hello</p>
  <div :id="id" ref="chart"></div>
  </div>
</template>

<script>
const Highcharts = require('highcharts/highcharts');

window.Highcharts = Highcharts;
require('highcharts/modules/venn')(Highcharts);
require('highcharts/modules/oldie')(Highcharts);

export default {
  name: 'demo1',
  data() {
    return {
      id: 'chartContainer',
      chartOptions: {
        series: [
          {
            data: [1, 2, 0],
          },
        ],
      },
      option: {
        tooltip: {
          // formatter() {
          //   console.log(this);
          //   return this.key;
          // },
        },
        series: [{
          type: 'venn',
          name: 'The Unattainable Triangle',
          data: [{
            sets: ['缴纳社保人员'],
            value: 10,
          }, {
            sets: ['常住人口'],
            value: 10,
          }, {
            sets: ['流动人口'],
            value: 10,
          },
          {
            sets: ['暂住人口'],
            value: 10,
          },
          {
            sets: ['公安户籍人口'],
            value: 50,
          },
          {
            sets: ['缴纳社保人员', '常住人口'],
            value: 1,
            name: ' ',
          },
          {
            sets: ['公安户籍人口', '缴纳社保人员'],
            value: 1,
            name: ' ',
          },
          {
            sets: ['流动人口', '常住人口'],
            value: 1,
            name: ' ',
          },
          {
            sets: ['暂住人口', '常住人口'],
            value: 1,
            name: ' ',
          },
          {
            sets: ['公安户籍人口', '常住人口'],
            value: 1,
            name: ' ',
          },
          {
            sets: ['暂住人口', '流动人口'],
            value: 1,
            name: ' ',
          },
          {
            sets: ['暂住人口', '流动人口'],
            value: 1,
            name: ' ',
          },
          {
            sets: ['暂住人口', '公安户籍人口'],
            value: 1,
            name: ' ',
          },
          ],
        }],
        title: {
          text: 'The Unattainable Triangle',
        },
      },
    };
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => this.initChart());
  },
  methods: {
    initChart() {
      // console.log(Highcharts);
      Highcharts.chart(this.id, this.option);
    },
  },
  components: {
  },
};
</script>

<style lang="stylus">
  .wrapper{
    position: relative;
    width: 100%;
    min-height: 100%;
    background: #fff;
    box-shadow: 0 4px 10px 0 rgba(36, 47, 68, 0.20);
    border-radius: 2px;
    padding: 0;
  }
</style>
