<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="28%"
      destroy-on-close
    >
      <MyFrom v-bind="modalConfig" v-model="formData"> </MyFrom>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import MyFrom from '@/base-ui/form'

import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    MyFrom
  },
  props: {
    modalConfig: {
      type: Object,
      require: true
    }
  },
  setup() {
    const dialogVisible = ref(true)
    const formData = ref({})

    return {
      dialogVisible,
      formData
    }
  }
})
</script>
<style scoped lang="less">
.page-modal {
}
</style>
