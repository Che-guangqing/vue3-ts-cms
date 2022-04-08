export const contentTableConfig = {
  tableTitle: '用户列表',
  propList: [
    { slotName: 'id', prop: 'id', label: 'ID', minWidth: '100' },
    { slotName: 'name', prop: 'name', label: '职位', minWidth: '100' },
    { slotName: 'intro', prop: 'intro', label: '权限介绍', minWidth: '100' },
    {
      slotName: 'createAt',
      prop: 'createAt',
      label: '创建时间',
      minWidth: '150'
    },
    {
      slotName: 'updateAt',
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '150'
    },
    { slotName: 'handler', label: '操作', minWidth: '120' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
