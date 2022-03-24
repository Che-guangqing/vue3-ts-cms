<template>
  <div>
    Login
    <h3>{{ $store.state.name }}</h3>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Login',
  setup() {
    return {}
  }
})
</script>
<style lang="less"></style>
