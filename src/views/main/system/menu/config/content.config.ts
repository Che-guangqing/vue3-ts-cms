export const contentTableConfig = {
  tableTitle: '菜单列表',
  propList: [
    { slotName: 'name', prop: 'name', label: '菜单名称' },
    { slotName: 'type', prop: 'type', label: '类型' },
    { slotName: 'url', prop: 'url', label: '菜单url', minWidth: '160' },
    { slotName: 'icon', prop: 'icon', label: '菜单icon' },
    { slotName: 'icon', prop: 'icon', label: '菜单icon' },
    {
      slotName: 'permission',
      prop: 'permission',
      label: '按钮权限',
      minWidth: '130'
    },
    {
      slotName: 'createAt',
      prop: 'createAt',
      label: '创建时间',
      minWidth: '120'
    },
    {
      slotName: 'updateAt',
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '120'
    },
    { slotName: 'handler', label: '操作', minWidth: '100' }
  ],
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  showFooter: false
}
