<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig" />
    <pageContent
      :contentTableConfig="contentTableConfig"
      :listData="userList"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { Edit, Delete } from '@element-plus/icons-vue'

import PageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  components: {
    PageSearch,
    pageContent
  },
  setup() {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 50
      }
    })

    const userCount = computed(() => store.state.system.userCount)
    const userList = computed(() => store.state.system.userList)

    return {
      searchFormConfig,
      contentTableConfig,

      userCount,
      userList,

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
