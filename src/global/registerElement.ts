import { App } from 'vue'

import 'element-plus/dist/index.css'
import {
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElRadio
} from 'element-plus'
const components = [
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElRadio
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
