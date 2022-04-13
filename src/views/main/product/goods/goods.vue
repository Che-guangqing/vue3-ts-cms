<template>
  <div class="goods">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @searchBtnClick="handleSearchClick"
      @resetBtnClick="handleResetClick"
    />
    <PageContent
      ref="pageContentRef"
      pageName="goods"
      :contentTableConfig="contentTableConfig"
    >
      <template #imgUrl="scope">
        <el-image
          :preview-teleported="true"
          style="width: 40px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        ></el-image>
      </template>
      <template #status="scope">
        <el-button plain :type="scope.row.status ? 'success' : 'danger'">
          {{ scope.row.status ? '上架' : '下架' }}
        </el-button>
      </template>
      <template #oldPrice="scope"> ¥{{ scope.row.oldPrice }} </template>
      <template #newPrice="scope"> ¥{{ scope.row.newPrice }} </template>
      <template #inventoryCount="scope">
        <strong>{{ scope.row.inventoryCount }}</strong> 件
      </template>
      <template #saleCount="scope">
        <strong>{{ scope.row.saleCount }}</strong> 件
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
      handleResetClick
    }
  }
})
</script>

<style scoped lang="less"></style>
