<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cpns/login-panel.vue'

export default defineComponent({
  name: 'Login',
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>
<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url('../../assets/img/login-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
