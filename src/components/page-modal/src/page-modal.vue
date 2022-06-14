<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="titleMap[pageName]"
      width="28%"
      destroy-on-close
    >
      <MyFrom v-bind="modalConfig" v-model="formData"> </MyFrom>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import MyFrom from '@/base-ui/form'
import { useStore } from 'vuex'

import { defineComponent, ref } from 'vue'

const titleMap = {
  users: '用户',
  role: '角色',
  goods: '商品',
  menu: '菜单',
  department: '部门',
  category: '分类'
}
export default defineComponent({
  components: {
    MyFrom
  },
  props: {
    modalConfig: {
      type: Object,
      require: true
    },
    // 除了公共的配置字段 特定页面有特定的字段
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})

    let rowData = ref()

    const showModal = (row) => {
      // row 就是传过来的编辑的数据信息
      dialogVisible.value = true
      rowData.value = row

      for (const item of props.modalConfig.formItems) {
        // 新建和编辑 数据回填
        formData.value[item.field] = row.id ? row[item.field] : ''
      }
    }

    // 点击确定按钮 <新建/编辑>
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false

      if (rowData.value.id) {
        // 编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: rowData.value.id
        })
      } else {
        // 新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return {
      dialogVisible,
      formData,
      showModal,
      handleConfirmClick,

      titleMap
    }
  }
})
</script>
<style scoped lang="less">
.page-modal {
}
</style>
