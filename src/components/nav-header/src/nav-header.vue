<template>
  <div class="nav-header">
    <div class="fold-menu" @click="handleFoldClick">
      <img v-if="!isFold" src="@/assets/img/fold-left.png" />
      <img v-else src="@/assets/img/fold-right.png" />
    </div>
    <div class="content">
      <div>面包屑</div>
      <div>
        <userInfo />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import userInfo from './user-info.vue'

export default defineComponent({
  components: {
    userInfo
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return {
      isFold,
      handleFoldClick
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
