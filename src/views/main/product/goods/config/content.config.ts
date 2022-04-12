export const contentTableConfig = {
  tableTitle: '商品列表',
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '200' },
    { slotName: 'oldPrice', prop: 'oldPrice', label: '原价格', minWidth: '' },
    { slotName: 'newPrice', prop: 'newPrice', label: '现价格', minWidth: '' },
    { slotName: 'status', prop: 'status', label: '是否上架', minWidth: '' },
    {
      slotName: 'imgUrl',
      prop: 'imgUrl',
      label: '商品图片',
      minWidth: '100'
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
  ]
}
