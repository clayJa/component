<template>
  <div class="radio-list">
      <a-radio-group :defaultValue="value" size="large" @change="changeRadio">
        <a-radio :value="radio.value" v-for="(radio,index) in radios" :key="`${radio.value}${index}`" :ref="`${radio.value}${index}`" >{{radio.name}}</a-radio>
      </a-radio-group>
  </div>
</template>

<script>
export default {
  name: 'Radios',
  props: {
    radios: {
      type: Array,
      required: true,
      default: () => [],
    },
    value: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.radios.forEach((item, index) => {
      this.insertCheckedHtml(this.$refs[`${item.value}${index}`][0].$el);
    });
  },
  methods: {
    changeRadio(e) {
      this.$emit('input', e.target.value);
      this.$emit('change', e);
    },
    insertCheckedHtml(node) {
      if (node.querySelector('.customer-insert-checked') !== null) {
        return;
      }
      const i = document.createElement('i');
      i.className = 'customer-insert-checked icon-success iconfont';
      node.appendChild(i);
    },
  },
  components: {},
};
</script>

  <style scoped lang="stylus">
    .radio-list {
      >>> .ant-radio {
        display: none
      }
      >>> .ant-radio-wrapper {
        border: 1px solid #A8A9AA;
        color: #A8A9AA;
        font-size: 16px;
        padding: 5px 30px;
        margin-bottom: 15px;
        margin-right: 15px;
        .customer-insert-checked {
          display: none;
        }
        &.ant-radio-wrapper-checked {
          border: 1px solid #509DDF;
          color: #509DDF;
          position: relative;
          .customer-insert-checked {
            display: inline-block;
            position: absolute;
            right: -10px;
            bottom: -15px;
            font-size: 20px;
            background: white;
            border-radius: 50%;
          }
        }
      }
    }
  </style>
