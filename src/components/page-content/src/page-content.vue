<template>
  <div class="page-content">
    <MyTable
      :listData="listData"
      :listCount="listCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- header -->
      <template #header></template>
      <template #headerHandler>
        <el-button type="primary" v-if="isCreate" @click="handleCreateClick"
          >新建{{ titleMap[pageName] }}</el-button
        >
      </template>

      <!-- footer -->
      <template #footer> </template>

      <!-- table列特殊项 公共 插槽配置 -->
      <!-- 时间 -->
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>

      <!-- 操作 -->
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            :icon="Edit"
            size="small"
            type="text"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            :icon="Delete"
            size="small"
            type="text"
            class="delete-btn"
            @click="handleDeleteClick(scope.row.id)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 对于每个页面独有的插槽需要动态插入 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </MyTable>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import { Edit, Delete } from '@element-plus/icons-vue'

import MyTable from '@/base-ui/table'
import { usePermission } from '@/hooks/usePermission'

import { ElMessage, ElMessageBox } from 'element-plus'

// 公共插槽名称
const COMMON_SOLT_NAME = ['createAt', 'updateAt', 'handler']

const titleMap = {
  users: '用户',
  role: '角色',
  goods: '商品',
  menu: '菜单',
  department: '部门',
  category: '分类'
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
  emits: ['createBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 按钮操作权限数据
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')
    console.log(isCreate, 'isCreate')

    // 分页数据
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 发送请求
    const getPageData = (searchInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
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

    // 获取非公共的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => item.slotName && !COMMON_SOLT_NAME.includes(item.slotName)
    )

    // 删除/编辑/新建操作
    const handleDeleteClick = (id: number) => {
      ElMessageBox.confirm('确定删除此数据?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          store
            .dispatch('system/deletePageDataAction', {
              pageName: props.pageName,
              id
            })
            .then((res) => {
              if (res.code === 0) {
                getPageData()
                ElMessage({ type: 'success', message: '删除成功' })
              }
            })
        })
        .catch(() => {
          ElMessage({ type: 'info', message: '取消删除' })
        })
    }

    const handleCreateClick = () => {
      emit('createBtnClick')
    }

    const handleEditClick = (row: any) => {
      emit('editBtnClick', row)
    }

    return {
      titleMap,

      listCount,
      listData,
      pageInfo,

      getPageData,
      otherPropSlots,

      isCreate,
      isUpdate,
      isDelete,

      handleDeleteClick,
      handleCreateClick,
      handleEditClick,

      Edit,
      Delete
    }
  }
})
</script>

<style lang="less" scoped>
.page-content {
  img {
    width: 40px;
  }
}
</style>
