<template>
  <div class="page-search">
    <MyForm v-bind="searchFormConfig" v-model="formData">
      <template #header> <h3>高级检索</h3> </template>
      <template #footer>
        <div class="handle-btns">
          <el-button type="primary" :icon="Search" @click="handleSearchClick"
            >搜索</el-button
          >
          <el-button :icon="Refresh" @click="handleResetClick">重置</el-button>
        </div>
      </template>
    </MyForm>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MyForm from '@/base-ui/form'

import { Search, Refresh } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    MyForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['searchBtnClick', 'resetBtnClick'],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItems ?? []

    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }

    const formData = ref(formOriginData)

    const handleSearchClick = () => {
      emit('searchBtnClick', formData.value)
    }

    const handleResetClick = () => {
      // 1. X 使用双向绑定 使用时防止子组件直接修改父组件的值所以子组件所用的值是此值的拷贝，但是由于是拷贝，数据改变后当前数据会变，上一个拷贝引用并不会变
      // formData.value = formOriginData

      // 2. 使用双向绑定 解决上述问题1 难理解
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }

      // 最终优化
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    return {
      formData,
      Search,
      Refresh,

      handleSearchClick,
      handleResetClick
    }
  }
})
</script>

<style scoped lang="less">
.handle-btns {
  text-align: right;
  padding: 0px 20px 20px 0px;
}
</style>
