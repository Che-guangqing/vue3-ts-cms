<template>
  <div class="nav-header">
    <div class="fold-menu" @click="handleFoldClick">
      <img v-if="!isFold" src="@/assets/img/fold-left.png" />
      <img v-else src="@/assets/img/fold-right.png" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
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
  .fold-menu {
    cursor: pointer;
    img {
      width: 25px;
      height: 25px;
    }
  }
}
</style>
