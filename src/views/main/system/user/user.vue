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
    >
      <template #enable="scope">
        <el-button plain :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
    </PageContent>
    <PageModal :modalConfig="modalConfig"></PageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'

export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const { pageContentRef, handleSearchClick, handleResetClick } =
      usePageSearch()

    // const store = useStore()
    // store.dispatch('system/getPageListAction', {
    //   pageName: '/user',
    //   queryInfo: {
    //     offset: 0,
    //     size: 50
    //   }
    // })

    // const userCount = computed(() => store.state.system.userCount)
    // const userList = computed(() => store.state.system.userList)

    return {
      searchFormConfig,
      contentTableConfig,

      Edit,
      Delete,

      pageContentRef,
      handleSearchClick,
      handleResetClick,

      modalConfig
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
