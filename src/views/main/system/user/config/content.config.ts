export const contentTableConfig = {
  tableTitle: '用户列表',
  propList: [
    { slotName: 'id', prop: 'id', label: 'ID', minWidth: '100' },
    { slotName: 'name', prop: 'name', label: '用户名', minWidth: '100' },
    {
      slotName: 'realname',
      prop: 'realname',
      label: '真实姓名',
      minWidth: '100'
    },
    {
      slotName: 'cellphone',
      prop: 'cellphone',
      label: '手机号码',
      minWidth: '100'
    },
    { slotName: 'enable', prop: 'enable', label: '状态', minWidth: '100' },
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
