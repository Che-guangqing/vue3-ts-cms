<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="6" v-for="(item, index) in goodsNumber" :key="index">
        <hy-card>
          <div class="goods-item row1">
            <div>{{ item.name }}</div>
            <div></div>
          </div>
          <div class="goods-item row2">
            <div :ref="setCountupRef">{{ item.num }}</div>
          </div>
          <div class="goods-item row3">
            <div>{{ item.name }}</div>
            <div>{{ item.num }}</div>
          </div>
        </hy-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="7">
        <hy-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </hy-card>
      </el-col>
      <el-col :span="10">
        <hy-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </hy-card>
      </el-col>
      <el-col :span="7">
        <hy-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </hy-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <hy-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </hy-card>
      </el-col>
      <el-col :span="12">
        <hy-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick, onMounted } from 'vue'
import { useStore } from '@/store'
import CountUp from 'countup'

import HyCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    HyCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    // 请求数据
    store.dispatch('dashboard/getDashboardDataAction')

    // 获取数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    const goodsNumber = [
      { name: '商品总销量', num: 510173 },
      { name: '商品总收藏', num: 87606 },
      { name: '商品总库存', num: 867271 },
      { name: '商品总销售额', num: 43130820 }
    ]

    const countupRef = ref([])
    const setCountupRef = (el) => {
      if (el) {
        countupRef.value.push(el)
      }
    }
    const initCountUp = (elArr) => {
      nextTick(() => {
        let countUp = null
        for (let i = 0; i < elArr.length; i++) {
          countUp = new CountUp(elArr[i], 0, elArr[i].innerText, 0, 2.5, {
            useEasing: true,
            useGrouping: true,
            separator: ',',
            decimal: '.'
          })
          countUp.start()
        }
      })
    }

    onMounted(() => {
      initCountUp(countupRef.value)
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale,
      goodsNumber,

      countupRef,
      setCountupRef
    }
  }
})
</script>

<style scoped lang="less">
.goods-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.row1 {
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    color: #d2d2d2;
  }
  &.row2 {
    font-size: 30px;
    font-weight: 600;
    width: 100%;
    height: 45px;
    line-height: 45px;
    color: #000000;
    border-bottom: 1px solid #d2d2d2;
  }
  &.row3 {
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    color: #737373;
    margin-top: 10px;
  }
}
.content-row {
  margin-top: 20px;
}
</style>
