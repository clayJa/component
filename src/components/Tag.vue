<template>
    <div :class="['tag-list',{ block: blockStyle }]">
      <transition-group name="list" >
        <span v-for="tag in data" :key="tag.key" class="tag-item">
          <span class="tag">{{tag.value}}</span>
          <span v-if="canBeClosed" @click="close(arguments,tag)" class="close">x</span>
        </span>
      </transition-group>
    </div>
  </template>

<script>
export default {
  name: 'Tag',
  props: {
    tags: {
      type: Array,
      required: true,
      default: () => [],
    },
    canBeClosed: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    blockStyle: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  data() {
    return {
      data: [],
    };
  },
  watch: {
    tags: {
      handler(newData) {
          this.data = [...newData]
        },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    close(argument, removeTag) {
      this.data = this.data.filter(tag => tag.key !== removeTag.key);
      this.$emit('close', removeTag);
    },
  },
  components: {},
};
</script>

  <style scoped lang="stylus">
    .tag-item {
      display: inline-flex;
      align-self: center;
      background: #d5eff9;
      border: 1px solid #5cc1e9;
      padding: 4px 12px;
      margin: 5px 10px 5px 0;
      border-radius: 2px;
      color: #5cc1e9;
      font-weight: 600;
      font-size: 14px;
      .close {
        font-size: 12px;
        margin-left: 10px;
        cursor: pointer;
        line-height: 1.7;
      }
    }
    .tag-list.block {
      width: 100%;
      .tag-item {
        display: flex;
        justify-content: space-between;
        padding: 2px 4px;
        margin-left: 10px;
      }
    }
    .list-enter-active, .list-leave-active {
      transition: all 0.3s ease-out;
    }
    .list-enter, .list-leave-to {
      opacity: 0;
    }
  </style>
