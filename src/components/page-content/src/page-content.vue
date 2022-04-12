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
        <el-button type="primary">新建{{ titleMap[pageName] }}</el-button>
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
      <template #handler>
        <div class="handle-btns">
          <el-button :icon="Edit" size="small" type="text">编辑</el-button>
          <el-button :icon="Delete" size="small" type="text" class="delete-btn"
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

      <!-- <template #enable="scope">
        <el-button plain :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #imgUrl="scope">
        <el-image
          :preview-teleported="true"
          style="width: 40px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        ></el-image>
      </template> -->
    </MyTable>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import { Edit, Delete } from '@element-plus/icons-vue'

import MyTable from '@/base-ui/table'

// 公共插槽名称
const COMMON_SOLT_NAME = ['createAt', 'updateAt', 'handler']

const titleMap = {
  user: '用户',
  role: '角色',
  good: '商品',
  menu: '菜单'
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

    // 获取非公共的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => item.slotName && !COMMON_SOLT_NAME.includes(item.slotName)
    )

    return {
      titleMap,

      listCount,
      listData,
      pageInfo,

      getPageData,
      otherPropSlots,

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
