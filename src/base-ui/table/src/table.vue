<template>
  <div class="table">
    <div class="content">
      <!-- header -->
      <div class="header">
        <slot name="header">
          <div class="header-wrap">
            <h3 class="table-title">{{ tableTitle }}</h3>
            <div class="handler">
              <slot name="headerHandler"></slot>
            </div>
          </div>
        </slot>
      </div>

      <el-table
        :data="listData"
        border
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-bind="childrenProps"
      >
        <!-- row-key="id" :tree-props="{ children: 'children' }" -->
        <el-table-column
          v-if="showSelectColumn"
          type="selection"
          align="center"
          width="60"
        ></el-table-column>
        <el-table-column
          v-if="showIndexColumn"
          type="index"
          label="序号"
          align="center"
          width="80"
        ></el-table-column>
        <template v-for="propItem in propList" :key="propItem.id">
          <el-table-column
            v-bind="propItem"
            align="center"
            show-overflow-tooltip
          >
            <template #default="scope">
              <slot :name="propItem.slotName" :row="scope.row">
                {{ scope.row[propItem.prop] }}
              </slot>
            </template>
          </el-table-column>
        </template>
      </el-table>

      <!-- footer -->
      <div class="footer" v-if="showFooter">
        <slot name="footer">
          <el-pagination
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :page-sizes="[10, 20, 30, 40]"
            small="small"
            :disabled="false"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="listCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    tableTitle: {
      type: String,
      default: ''
    },
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    // table tree
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['handleSelectionChange', 'update:page'],
  setup(props, { emit }) {
    // 选中数据触发事件
    const handleSelectionChange = (value: any) => {
      emit('handleSelectionChange', value)
    }

    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }

    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
<style lang="less" scoped>
.table {
  .header {
    .header-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .table-title {
        text-align: left;
      }
    }
  }
  .content {
    padding: 0 20px 20px 20px;
    border-top: 20px solid #f5f5f5;
  }
  .footer {
    height: 80px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
