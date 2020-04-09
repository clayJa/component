<template>
  <div class="list">
    <a-table
      :loading="loading"
      :columns="columns"
      @change="handleTableChange"
      :pagination="pagination"
      :dataSource="data.list"
      :rowKey="(record, index) => record.id || index"
      bordered
    >
      <!-- 序号 -->
      <span slot="sn" slot-scope="text, record, index">{{(pagination.current - 1) * pagination.pageSize + index + 1}}</span>
      <!-- 提示 -->
      <template v-for="slot in slotNames" :slot="slot.name" slot-scope="text">
        <a-tooltip :key="slot.name" placement="topLeft">
          <template slot="title">
            <span>{{ slot.type === 'date' ? formatTime(text) : text }}</span>
          </template>
          <span
            :style="slot.type === 'overflow' ? `width: ${slot.width}px;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;` : ''"
            :class="slot.type === 'overflow' ? 'text-overflow' : ''"
          >
            {{ slot.type === 'date' ? formatTime(text) : text }}
          </span>
        </a-tooltip>
      </template>
      <slot></slot>
    </a-table>
  </div>
</template>
<script>
import { formatTime } from '@/utils/commonFunc'
export default {
  name: 'SelfTable',
  props: {
    options: Array,
    data: Object
  },
  data () {
    return {
      formatTime,
      loading: false,
      pagination: {
        showQuickJumper: true,
        total: 50,
        current: 1,
        pageSize: 10,
        showTotal: (total) => `共 ${total} 条`
      }
    }
  },
  mounted () {
  },
  computed: {
    defaultSlotNames () {
      return this.options.filter(item => item.tooltip !== false && item.scopedSlots).map(item => {
        if ((item.tooltip && !item.tooltip.maxLen && !item.tooltip.isDate) || item.scopedSlots) {
          return item.scopedSlots.customRender
        }
      })
    },
    dateSlotNames () {
      return this.options.filter(item => item.tooltip && item.tooltip.isDate && item.scopedSlots).map(item => {
        return item.scopedSlots.customRender
      })
    },
    overflowSlotNames () {
      return this.options.filter(item => item.tooltip && item.tooltip.overflowWidth && item.scopedSlots).map(item => {
        return ({ name: item.scopedSlots.customRender, width: item.tooltip.overflowWidth })
      })
    },
    noTooltipSlot () {
      return this.options.map((item, index) => ({ ...item, index })).filter(item => item.tooltip === false)
    },
    slotNames () {
      const defaultSlotNames = this.defaultSlotNames.map(item => ({ name: item, type: 'default' }))
      const dateSlotNames = this.dateSlotNames.map(item => ({ name: item, type: 'date' }))
      const overflowSlotNames = this.overflowSlotNames.map(item => ({ ...item, type: 'overflow' }))
      return [...defaultSlotNames, ...dateSlotNames, ...overflowSlotNames]
    },
    columns () {
      const scopedSlots = Object.keys(this.$scopedSlots)
      const columns = [...this.options]
      scopedSlots.forEach(slot => {
        const slotColumn = this.noTooltipSlot.find(item => item.scopedSlots.customRender === slot)
        columns.splice(slotColumn.index, 1, { ...slotColumn, customRender: this.$scopedSlots[slot] })
      })
      return columns
    }
  },
  watch: {
    data: {
      handler (val) {
        this.loading = false
        this.pagination = {
          ...this.pagination,
          total: val.total,
          current: val.current,
          pageSize: val.pageSize
        }
      },
      deep: true
    }
  },
  methods: {
    handleTableChange (pagination) {
      this.loading = true
      this.$emit('fetchData', pagination)
    }
  }
}
</script>
<style>
.list {
  .status {
    color: #1274ff;
  }
  .complainantName {
    cursor: pointer;
    color: rgba(18, 116, 255, 1);
    text-decoration: underline;
  }
}
</style>
