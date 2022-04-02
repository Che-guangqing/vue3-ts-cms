<template>
  <div class="user">
    <myForm v-bind="searchFormConfig" />
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import myForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  components: {
    myForm
  },
  setup() {
    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
