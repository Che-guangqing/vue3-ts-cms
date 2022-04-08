import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  itemStyle: {
    padding: '10px 30px'
  },
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: 'ID',
      placeholder: '请输入ID'
    },
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'createTime',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '请选择开始时间',
        endPlaceholder: '请选择结束时间',
        type: 'daterange'
      }
    }
  ]
}
