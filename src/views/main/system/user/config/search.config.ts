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
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      type: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      type: 'select',
      label: '运动',
      placeholder: '请选择运动',
      options: [
        { label: '篮球', value: '篮球' },
        { label: '足球', value: '足球' },
        { label: '羽毛球', value: '羽毛球' }
      ]
    },
    {
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
