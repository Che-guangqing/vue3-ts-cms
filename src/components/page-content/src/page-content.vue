<template>
  <div class="page-content">
    <MyTable :listData="listData" v-bind="contentTableConfig">
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
        <el-button type="primary">新建用户</el-button>
      </template>

      <!-- footer -->
      <template #footer>
        <div>
          <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :small="small"
            :disabled="disabled"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </template>
    </MyTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MyTable from '@/base-ui/table'

export default defineComponent({
  components: {
    MyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    listData: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.page-content {
}
</style>
