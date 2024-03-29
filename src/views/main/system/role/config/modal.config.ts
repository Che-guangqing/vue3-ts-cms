import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  labelWidth: '100px',
  colLayout: {
    span: 24
  },
  itemStyle: {
    // padding: '10px 30px'
    padding: '5px 0'
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名 ',
      placeholder: '请输入角色名 '
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ]
}
