<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch class="demo-tabs">
      <el-tab-pane>
        <template #label>
          <!-- <el-icon :size="size"><user /></el-icon> -->
          <span>账号登录</span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <!-- <el-icon :size="12"><iphone /></el-icon> -->
          <span>手机登录</span>
        </template>
        <LoginPhone />
      </el-tab-pane>

      <div class="account-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link>忘记密码</el-link>
      </div>
      <el-button type="primary" class="login-button" @click="handleLoginClick">
        立即登录
      </el-button>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(false)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()

    const handleLoginClick = () => {
      accountRef.value?.loginAction()
    }

    return {
      isKeepPassword,
      handleLoginClick,
      accountRef
    }
  }
})
</script>
<style lang="less" scoped>
.login-panel {
  width: 350px;
  .title {
    color: #eee;
    text-align: center;
  }
  .account-control {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .login-button {
    width: 100%;
    margin-top: 15px;
  }
}
</style>
