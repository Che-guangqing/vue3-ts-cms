<template>
  <div class="role">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @searchBtnClick="handleSearchClick"
      @resetBtnClick="handleResetClick"
    />
    <PageContent
      ref="pageContentRef"
      pageName="role"
      :contentTableConfig="contentTableConfig"
    />
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
    return {
      searchFormConfig,
      contentTableConfig,

      pageContentRef,
      handleSearchClick,
      handleResetClick,

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
