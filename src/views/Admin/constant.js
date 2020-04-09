export const columns = [
  {
    title: '序号',
    dataIndex: 'sn',
    key: 'sn',
    align: 'center',
    scopedSlots: { customRender: 'sn' },
    width: '80px',
    tooltip: false
  },
  {
    title: '投诉人',
    dataIndex: 'complainantName',
    align: 'center',
    width: '200px',
    scopedSlots: { customRender: 'complainantName' }
  },
  {
    title: '被投诉人',
    dataIndex: 'respondentName',
    align: 'center',
    width: '180px',
    scopedSlots: { customRender: 'respondentName' },
    tooltip: {
      overflowWidth: 120
    }
  },
  {
    title: '投诉日期',
    dataIndex: 'createTime',
    align: 'center',
    width: '180px',
    scopedSlots: { customRender: 'createTime' },
    tooltip: {
      isDate: true
    }
  },
  {
    title: '归属区域',
    dataIndex: 'assignRegionName',
    align: 'center',
    width: '10px',
    scopedSlots: { customRender: 'assignRegionName' },
    tooltip: {
      overflowWidth: 120
    }
  },
  {
    title: '信访工单状态',
    dataIndex: 'visitStatus',
    align: 'center',
    width: '100px',
    scopedSlots: { customRender: 'visitStatus' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: '100px',
    scopedSlots: { customRender: 'action' },
    tooltip: false
  }
]
