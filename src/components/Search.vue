<template>
  <div class="search-wrapper">
      <div  v-for="item in search" :key="item.value" class="search-item">
        <span :style="{width:`${item.name.length + 2}em`,fontSize: '16px'}">{{`${item.name}：`}}</span>
        <!-- 普通 input 模糊查询 -->
        <a-input v-if="item.type === 'input'"
          :placeholder="item.placeholder ? item.placeholder : '' "
          v-model="searchValue[item.value]"
          :style="item.style ? item.style : 'width:60%'">
        </a-input>
        <!-- 下拉选择查询 -->
        <a-select v-if="item.type === 'select'"
          :placeholder="item.placeholder ? item.placeholder : '' "
          v-model="searchValue[item.value]"
          :style="item.style ? item.style : 'width: 150px'"
          @change="handleSelect(item)"
          :options="item.selectOptions">
        </a-select>
        <!-- date 时间查询 -->
        <a-range-picker v-if="item.type === 'date'"
          v-model="searchValue[item.value]"
          :style="item.style ? item.style : ''"
          showTime
          format="YYYY-MM-DD"
        />
      </div>
      <div class="search-button">
        <a-button type="primary" @click="searchData">查询</a-button>
        <a-button @click="resetData">清空</a-button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    search: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      searchValue: {
      },
    };
  },
  methods: {
    searchData() {
      this.$emit('searchData', this.searchValue);
    },
    resetData() {
      this.searchValue = Object.assign({});
      this.$emit('resetData', this.searchValue);
    },
    handleSelect(item) {
      if (item.changeAction) {
        this.$emit('searchData', this.searchValue);
      }
    },
  },
  components: {},
};
</script>

<style scoped lang="stylus">
  .search-wrapper{
    display: flex;
    flex-wrap: wrap;
    .search-item {
      display: flex;
      align-items: center;
      margin-right: 20px;
      margin-bottom: 20px;
      span {
        display: inline-block;
      }
    }
    .search-button {
      .ant-btn-primary {
        color: #fff;
        background-color: #2ea9e6;
        border: none;
      }
      button:not(:last-child) {
        margin-right: 20px;
      }
    }
  }
</style>
