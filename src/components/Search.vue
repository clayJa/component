<template>
  <div class="search-wrapper">
      <div  v-for="item in search" :key="item.value" class="search-item">
        <!-- 普通 input 模糊查询 -->
        <a-input v-if="item.type === 'input'"
          :placeholder="item.placeholder ? item.placeholder : '' "
          v-model="searchValue[item.value]"
          :style="item.style ? item.style : 'width:60%'">
        </a-input>
        <!-- 下拉选择查询 -->
        <a-select v-if="item.type === 'select'"
          :placeholder="item.placeholder ? item.placeholder : '全部' "
          v-model="searchValue[item.value]"
          :getPopupContainer="triggerNode => triggerNode.parentNode"
          :style="item.style ? item.style : 'width: 150px'"
          @change="handleSelect(item)"
          :options="item.selectOptions">
        </a-select>
        <!-- 下拉选择查询 -->
        <a-tree-select v-if="item.type === 'treeSelect'"
          :placeholder="item.placeholder ? item.placeholder : '全部' "
          :treeDefaultExpandAll="true"
          v-model="searchValue[item.value]"
          :style="item.style ? item.style : 'width: 150px'"
          :treeCheckable="true"
          :filterTreeNode="filterTreeNode"
          :searchValue="treeSearchValue"
          @search="handleTreeSearch"
          :dropdownStyle="{ maxHeight: '250px', overflow: 'auto' }"
          @change="handleSelect(item)"
          :treeData="item.selectOptions">
        </a-tree-select>
        <!-- date 时间查询 -->
        <a-range-picker v-if="item.type === 'date'"
          v-model="searchValue[item.value]"
          :style="item.style ? item.style : ''"
          :showTime="{hideDisabledOptions: true,defaultValues: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}"
        />
      </div>
      <div class="search-button">
        <a-button type="primary" @click="searchData">查询</a-button>
        <a-button @click="resetData">重置</a-button>
      </div>
      <!-- <div class="advanced">
        高级搜索
        <a-icon type="caret-down" />
      </div> -->
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Search',
  props: {
    search: {
      type: Array,
      required: true,
      default: () => []
    },
    value: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data () {
    return {
      searchValue: {
      },
      treeSearchValue: ''
    }
  },
  mounted () {
    this.searchValue = Object.assign({}, this.value)
  },
  methods: {
    moment,
    filterTreeNode (value, node) {
      return node.data.props.title.indexOf(value) !== -1
    },
    handleTreeSearch (value) {
      this.treeSearchValue = value
    },
    searchData () {
      this.$emit('searchData', this.searchValue)
    },
    resetData () {
      this.treeSearchValue = ''
      this.searchValue = Object.assign({})
      this.$emit('resetData', this.searchValue)
    },
    handleSelect (item) {
      // console.log(this.searchValue);
      if (item.changeAction) {
        this.$emit('searchData', this.searchValue)
      }
    }
  },
  components: {}
}
</script>

<style scoped lang="stylus">
  .search-wrapper{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 24px;
    .search-item {
      display: flex;
      align-items: center;
      margin-right: 20px;
      span {
        display: inline-block;
      }
      >>> .ant-select-selection--multiple .ant-select-selection__rendered {
        display: flex;
        overflow-x: scroll;
        /*定义滚动条高宽及背景高宽分别对应横竖滚动条的尺寸*/
        &::-webkit-scrollbar{
          width: 2px;
          height: 2px;
          background-color: #F5F5F5;
        }
        /*定义滚动条轨道内阴影+圆角*/
        &::-webkit-scrollbar-track{
          box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
          border-radius:10px;
          background-color:#F5F5F5;
        }
        /*定义滑块内阴影+圆角*/
        &::-webkit-scrollbar-thumb{
          border-radius:10px;
          box-shadow:inset 0 0 6px rgba(0,0,0,.3);
          background-color:#555;
        }
      }
      >>> .ant-select-selection--multiple .ant-select-selection__choice {
        flex-shrink: 0;
      }
      >>>.ant-select.ant-select-open .ant-select-selection__choice {
        /* display: none; */
      }
    }
    .search-button {
      button {
        height: 32px;
        padding: 0 26px;
      }
      .ant-btn-primary {
        color: #fff;
        background-color: #1274FF;
        border: none;
      }
      button:not(:last-child) {
        margin-right: 10px;
      }
    }
    .advanced {
      color: #999999;
      margin-left: 20px;
    }
  }
</style>
