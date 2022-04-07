<template>
  <div class="page-search">
    <myForm v-bind="searchFormConfig" v-model="formData">
      <template #header> <h3>高级检索</h3> </template>
      <template #footer>
        <div class="handle-btns">
          <el-button type="primary" :icon="Search" @click="search"
            >搜索</el-button
          >
          <el-button :icon="Refresh">重置</el-button>
        </div>
      </template>
    </myForm>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import myForm from '@/base-ui/form'

import { Search, Refresh } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    myForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return {
      formData,
      Search,
      Refresh
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
