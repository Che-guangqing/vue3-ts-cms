<template>
  <div class="user">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @searchBtnClick="handleSearchClick"
      @resetBtnClick="handleResetClick"
    />
    <PageContent
      ref="pageContentRef"
      pageName="users"
      :contentTableConfig="contentTableConfig"
      @createBtnClick="handleCreateData"
      @editBtnClick="handleEditData"
    >
      <template #enable="scope">
        <el-button plain :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
    </PageContent>
    <PageModal
      ref="pageModalRef"
      :modalConfig="modalConfigComp"
      pageName="users"
    ></PageModal>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

import { useStore } from '@/store'

export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const { pageContentRef, handleSearchClick, handleResetClick } =
      usePageSearch()

    // pageModal相关hook

    // user页面独有的逻辑 (新建隐藏密码、 编辑显示密码)
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    // 动态获取部门和角色 option数据
    const store = useStore()
    const modalConfigComp = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { label: item.name, value: item.id }
      })

      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { label: item.name, value: item.id }
      })

      return modalConfig
    })

    // 调用 hook获取公共变量和函数
    const { pageModalRef, handleCreateData, handleEditData } = usePageModal(
      newCallback,
      editCallback
    )

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      modalConfigComp,

      pageContentRef,
      pageModalRef,

      handleSearchClick,
      handleResetClick,
      handleCreateData,
      handleEditData,

      Edit,
      Delete
    }
  }
})
</script>

<style scoped lang="less">
.handle-btns {
  .delete-btn {
    color: red;
    margin-left: 20px;
  }
}
</style>
