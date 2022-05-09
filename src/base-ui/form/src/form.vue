<template>
  <div class="my-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="hadnleValueChange($event, item.field)"
                ></el-input>
                <!-- v-model="formData[`${item.field}`]" -->
              </template>

              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="hadnleValueChange($event, item.field)"
                >
                  <!-- v-model="formData[`${item.field}`]" -->
                  <el-option
                    v-for="option in item.options"
                    :value="option.value"
                    :key="option.value"
                    >{{ option.label }}</el-option
                  >
                </el-select>
              </template>

              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="hadnleValueChange($event, item.field)"
                ></el-date-picker>
                <!-- v-model="formData[`${item.field}`]" -->
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType, watch } from 'vue'
import { IFormItem } from '../types/index'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '5px 30px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // > 1920  4
        lg: 8, // > 1200  3
        md: 12, // > 992  2
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 最终优化
    const hadnleValueChange = (value: any, field: string) => {
      console.log({ ...props.modelValue, [field]: value })

      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    // // 2、使用双向绑定
    // // 属性改变触发事件
    // const formData = ref({ ...props.modelValue })

    // watch(formData, (newValue) => emit('update:modelValue', newValue), {
    //   deep: true
    // })

    // // 1、X
    // const formData = computed({
    //   get: () => props.modelValue,
    //   set: (newValue) => {
    //     // 其实属性变化， 这里根本就没调用
    //     console.log('----')
    //     emit('update: modelValue', newValue)
    //   }
    // })

    return {
      hadnleValueChange
      // formData
    }
  }
})
</script>

<style scoped lang="less">
.my-form {
  padding-top: 22px;
  .el-form-item {
    padding: 5px 30px;
  }
}
</style>
