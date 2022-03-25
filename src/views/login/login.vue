<template>
  <div>
    Login
    <el-button type="primary">Primary</el-button>
    <el-input placeholder="111"></el-input>
    <h3>{{ $store.state.name }}</h3>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Login',
  components: {},
  setup() {
    return {}
  }
})
</script>
<style lang="less"></style>
