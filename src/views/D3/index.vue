<template>
    <div class="wrapper">
      <div class="bar">
        <Bar />
      </div>
      <Scan
      elementId="elementId"
      clientId="2b89893566914c1c84b08bb3562c57eb"
      defaultPage="http://47.96.112.228:8100"
      redirectUri="http://47.96.112.228:8099/"
      appKey="dingoaajigjcqwwegrsxu1"
    />
    </div>
  </template>

<script>

import { Scan } from 'hz-scan';
import Bar from '../../components/D3_Bar.vue';

export default {
  name: 'd3',
  data() {
    return {
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {

  },
  components: {
    Bar,
    Scan,
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
      .bar {
        height: 300px;
        width: 300px;
        background: #181C23;
      }
    }
  </style>
