<template>
    <div class="wrapper">
      <div class="bar">
        <Bar />
      </div>
    </div>
  </template>

<script>


export default {
  name: 'SvgDemo',
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
