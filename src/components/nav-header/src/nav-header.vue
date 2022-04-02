<template>
  <div class="nav-header">
    <div class="fold-menu" @click="handleFoldClick">
      <img v-if="!isFold" src="@/assets/img/fold-left.png" />
      <img v-else src="@/assets/img/fold-right.png" />
    </div>
    <div class="content">
      <MyBreadcrumb :breadcrumbs="breadcrumbs" />
      <UserInfo />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import MyBreadcrumb from '@/base-ui/breadcrumb/index'

import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/mapMenus'

export default defineComponent({
  components: {
    UserInfo,
    MyBreadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    const breadcrumbs = computed(() => {
      const userMenus = useStore().state.login.userMenus
      const currentPath = useRoute().path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  width: 100%;
  .fold-menu {
    cursor: pointer;
    img {
      width: 25px;
      height: 25px;
    }
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
