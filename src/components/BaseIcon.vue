<template>
  <i class="iconfont" :class="'icon-'+type"></i>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    type: {
      type: String,
      required: true,
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
</style>
