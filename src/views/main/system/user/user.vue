<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig" />
    <div class="content">
      {{ $store.state.system.userList }}
      {{ $store.state.system.userCount }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  components: {
    PageSearch
  },
  setup() {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped lang="less">
.handle-btns {
  text-align: right;
}
</style>
