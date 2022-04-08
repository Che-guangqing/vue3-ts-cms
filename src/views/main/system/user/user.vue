<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig" />
    <div class="content">
      <MyTable
        :listData="userList"
        :propList="propList"
        :showIndexColumn="true"
        :showSelectColumn="true"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #enable="scope">
          <el-button plain :type="[scope.row.enable ? 'success' : 'danger']">
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
            <el-button :icon="Edit" size="mini" type="text">编辑</el-button>
            <el-button :icon="Delete" size="mini" type="text" class="delete-btn"
              >删除</el-button
            >
          </div>
        </template>
      </MyTable>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'

import { Edit, Delete } from '@element-plus/icons-vue'

import MyTable from '@/base-ui/table'

export default defineComponent({
  components: {
    PageSearch,
    MyTable
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

    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)

    const propList = [
      { slotName: 'id', prop: 'id', label: 'ID', minWidth: '100' },
      { slotName: 'name', prop: 'name', label: '用户名', minWidth: '100' },
      {
        slotName: 'realname',
        prop: 'realname',
        label: '真实姓名',
        minWidth: '100'
      },
      {
        slotName: 'cellphone',
        prop: 'cellphone',
        label: '手机号码',
        minWidth: '100'
      },
      { slotName: 'enable', prop: 'enable', label: '状态', minWidth: '100' },
      {
        slotName: 'createAt',
        prop: 'createAt',
        label: '创建时间',
        minWidth: '150'
      },
      {
        slotName: 'updateAt',
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '150'
      },
      { slotName: 'handler', label: '操作', minWidth: '120' }
    ]

    const handleSelectionChange = (value: any) => {
      console.log(value, '选中的数据')
    }

    return {
      searchFormConfig,
      userCount,

      userList,
      propList,
      handleSelectionChange,

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
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
