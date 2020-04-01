<template>
  <div class="multi-select-wrapper">
    <div
      :class="['box-item',{selected: value.includes(item.value)}]"
      v-for="item in options"
      :key="item.value"
      @click.stop="changeValue(item)"
    >
      <div class="select-box">
        <van-icon 
          class-prefix="icon"
          name="check"
        />
      </div>
      <span>{{item.name}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseMultiSelect',
  model: {
    prop: 'value',
    event: 'boxClick',
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    options: {
      type: Array,
      default() {
        return [
          { name: '否', value: 1 },
          { name: '湖北', value: 2 },
          { name: '广东', value: 3 },
          { name: '温州', value: 4 },
          { name: '台州', value: 5 },
          { name: '杭州', value: 6 },
          { name: '其他', value: 7 },
        ];
      },
    }
  },
  data() {
    return {
    };
  },
  computed: {
  },
  mounted() {
  },
  watch: {
  },
  methods: {
    changeValue(item) {
      if (this.value.includes(item.value)) {

        const index = this.value.findIndex((it) => item.value === it);
        this.value.splice(index, 1);

        this.$emit('boxClick', this.value);
      } else {
        if (item.value == 0) {

          this.$emit('boxClick', [item.value]);

        } else {

          console.log(this.value)
          const index0 = this.value.indexOf(0);
          if (index0 !== -1) {
            this.value.splice(index0, 1);          }

          this.$emit('boxClick', this.value.concat(item.value));
        }

      }
    },
  },
  components: {
  },
  beforeDestroy() {
  },
};
</script>

<style lang="scss" scoped>
.multi-select-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 4px;
  .box-item {
    position: relative;
    font-size: 14px;
    width: 88px;
    height: 32px;
    background: rgba(51, 51, 51, 0.05);
    border-radius: 8px;
    color: #242629;
    display: flex;
    margin-right: 12px;
    justify-content: center;
    align-items: center;
    margin-bottom: 14px;
    &.selected {
      color: rgba(0, 128, 255, 1);
      background-color: rgba(42, 139, 236, 0.2);
      .select-box {
        display: block;
      }
    }
    .select-box {
      display: none;
      position: absolute;
      bottom: 0;
      right: 0;
      height: 20px;
      width: 20px;
      border-top: 10px solid transparent;
      border-left: 10px solid transparent;
      border-right: 10px solid #4F98FF;
      border-bottom: 10px solid #4F98FF;
      border-bottom-right-radius: 4px;
      .icon {
        position: absolute;
        top: -4px;
        right: -14px;
        color: #fff;
      }
    }
  }
}
@media (min-width: 330px) and (max-width: 374px){ 
  .multi-select-wrapper .box-item {
    width: 80px;
    &:nth-child(3n) {
      margin-right: 0px;
    }
  }
 }
@media (min-width: 320px) and (max-width: 330px){ 
  .multi-select-wrapper .box-item {
    width: 76px;
    margin-right: 10px;
    &:nth-child(3n) {
      margin-right: 0px;
    }
  }
 }
 @media (min-width: 450px){ 
  .multi-select-wrapper .box-item {
    width: 82px;
  }
 }
</style>
