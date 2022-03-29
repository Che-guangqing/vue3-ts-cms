<template>
  <div>Main</div>
  <h1>{{ count }}</h1>
  <button @click="add">add</button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import myRequest from '@/service'

export default defineComponent({
  name: 'Main',
  setup() {
    // let origin = 0
    let origin = { val: 0 }
    let count = ref(origin)

    function add() {
      // origin++
      origin.val++

      // count.value++
      // count.value.val++

      // console.log(count.value)

      console.log(count.value.val)
    }

    return {
      count,
      add
    }
  }
})
</script>
<style lang="less"></style>
