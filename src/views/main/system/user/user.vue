<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig" />
    <PageContent pageName="user" :contentTableConfig="contentTableConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  components: {
    PageSearch,
    PageContent
  },
  setup() {
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

      // userCount,
      // userList,

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
