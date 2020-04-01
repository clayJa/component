<template>
  <span class="title-wrapper">{{title}}</span>
</template>

<script>
export default {
  name: 'BaseTitle',
  props: {
    title: {
      type: String,
      required: false,
    },
  },
  data() {
    return {};
  },
  methods: {},
  components: {},
};
</script>

<style scoped lang="stylus">
  .title-wrapper{
    border-left: 6px solid #2EA9E6;
    padding-left: 10px;
    font-size: 16px;
    line-height: 22px;
  }
</style>
