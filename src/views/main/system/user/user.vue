<template>
  <div class="user">
    <div class="search">
      <myForm :formItems="formItems" :labelWidth="labelWidth" />
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import myForm, { IFormItem } from '@/base-ui/form'

export default defineComponent({
  components: {
    myForm
  },
  setup() {
    const formItems: IFormItem[] = [
      {
        type: 'input',
        label: '用户名',
        placeholder: '请输入用户名',
        rules: [{}]
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

    const labelWidth = '120px'

    return {
      formItems,
      labelWidth
    }
  }
})
</script>

<style scoped lang="less"></style>
