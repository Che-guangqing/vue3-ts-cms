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
      @createBtnClick="handleCreateData"
      @editBtnClick="handleEditData"
    />
    <PageModal
      ref="pageModalRef"
      :otherInfo="otherInfo"
      :modalConfig="modalConfig"
      pageName="role"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        ></el-tree>
      </div>
    </PageModal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { menuMapLeafKeys } from '@/utils/mapMenus'
import { ElTree } from 'element-plus'

export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const { pageContentRef, handleSearchClick, handleResetClick } =
      usePageSearch()

    // 处理pageModal的hook <编辑回显权限树>
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    // 调用 hook获取公共变量和函数
    const { pageModalRef, handleCreateData, handleEditData } = usePageModal(
      undefined,
      editCallback
    )

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref({})
    const handleCheckChange = (data: any, checkedInfo: any) => {
      const checkedKeys = checkedInfo.checkedKeys
      const halfCheckedKeys = checkedInfo.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,

      pageContentRef,
      handleSearchClick,
      handleResetClick,

      pageModalRef,
      handleCreateData,
      handleEditData,
      handleCheckChange,

      menus,
      otherInfo,
      elTreeRef,

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
.menu-tree {
  margin-left: 25px;
}
</style>
