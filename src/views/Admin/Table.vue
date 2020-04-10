<template>
  <div class="wrapper">
    <SelfTable
      :options="options"
      :data="tableData"
      @tableChange="fetchData"
      :expandRowByClick="true"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onSelect: onSelectChange,onSelectAll: onSelectAllChange}"
    >
      <template slot="action" slot-scope="text,record">
        <a
          type="primary"
          @click="handleClick(record)"
        >编辑</a>
      </template>
      <template slot="tableAction">
        <div>
          <a-button type="primary">导出</a-button>
        </div>
      </template>
    </SelfTable>
  </div>
</template>

<script>

import SelfTable from '@/components/BusinessComponent/SelfTable'
import { columns } from './constant'
export default {
  name: 'd3',
  data () {
    return {
      options: columns,
      selectedRowKeys: [],
      tableData: {
        list: [
          { complainantName: 1, respondentName: '234321421452353535315', createTime: 'createTime', assignRegionName: '23412342352135321523152315231521355325', visitStatus: 1 },
          { complainantName: 2, respondentName: '423423423432413424', createTime: 'createTime', assignRegionName: '4234234321421434', visitStatus: 0 }
        ],
        total: 50,
        pageSize: 50,
        current: 50
      }
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    handleClick (record) {
      console.log(record)
    },
    onSelectChange (record, selected, selectedRows) {
      console.log(record, selected, selectedRows)
    },
    onSelectAllChange (selected, selectedRows, changeRows) {
      console.log(selected, selectedRows, changeRows)
    },
    fetchData (pagination, filters, sorter, currentDataSource) {
      setTimeout(() => {
        this.tableData.list = [
          { complainantName: 1, respondentName: '234321421452353535315', createTime: 'createTime', assignRegionName: '23412342352135321523152315231521355325', visitStatus: 1 },
          { complainantName: 2, respondentName: '423423423432413424', createTime: 'createTime', assignRegionName: '4234234321421434', visitStatus: 0 },
          { complainantName: 3, respondentName: '234321421452353535315', createTime: 'createTime', assignRegionName: '23412342352135321523152315231521355325', visitStatus: 1 },
          { complainantName: 4, respondentName: '423423423432413424', createTime: 'createTime', assignRegionName: '4234234321421434', visitStatus: 0 }
        ]
      }, 5000)
      console.log(pagination, 'fetchData')
    }
  },
  components: {
    SelfTable
  }
}
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
