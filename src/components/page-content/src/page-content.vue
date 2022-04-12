<template>
  <div class="page-content">
    <MyTable
      :listData="listData"
      :listCount="listCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- table列特殊项插槽配置 -->
      <template #enable="scope">
        <el-button plain :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button :icon="Edit" size="small" type="text">编辑</el-button>
          <el-button :icon="Delete" size="small" type="text" class="delete-btn"
            >删除</el-button
          >
        </div>
      </template>

      <!-- header -->
      <template #header></template>
      <template #headerHandler>
        <el-button type="primary">新建{{ titleMap[pageName] }}</el-button>
      </template>

      <!-- footer -->
      <template #footer> </template>
    </MyTable>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import { Edit, Delete } from '@element-plus/icons-vue'

import MyTable from '@/base-ui/table'

const titleMap = {
  user: '用户',
  role: '角色'
}

export default defineComponent({
  components: {
    MyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    // 分页数据
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 发送请求
    const getPageData = (searchInfo: any = {}) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...searchInfo
        }
      })
    }
    getPageData()

    // 从vuex中获取数据
    const listCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )
    const listData = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )

    return {
      titleMap,

      listCount,
      listData,
      pageInfo,

      getPageData,

      Edit,
      Delete
    }
  }
})
</script>

<style lang="less" scoped>
.page-content {
}
</style>
