<template>
  <div class="login-phone">
    <el-form label-width="70px" ref="formRef" :model="phone" :rules="rules">
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phone.number"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code"></el-input>
          <el-button class="get-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'

import { rules } from '../config/phone-config'

export default defineComponent({
  setup() {
    const store = useStore()
    const phone = reactive({
      number: '',
      code: ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          store.dispatch('login/phoneLoginAction', { ...phone })
        } else {
          console.log('验证未通过')
        }
      })
    }
    return {
      phone,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>
<style lang="less" scoped>
.login-phone {
  margin-top: 10px;
  .get-code {
    display: flex;
    .get-btn {
      margin-left: 8px;
    }
  }
}
</style>
