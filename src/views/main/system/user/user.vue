<template>
  <div class="user">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @searchBtnClick="handleSearchClick"
      @resetBtnClick="handleResetClick"
    />
    <PageContent
      ref="pageContentRef"
      pageName="user"
      :contentTableConfig="contentTableConfig"
    >
      <template #enable="scope">
        <el-button plain :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/usePageSearch'

export default defineComponent({
  components: {
    PageSearch,
    PageContent
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
      handleResetClick
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
