import { App } from 'vue'
import { User, Iphone, Location, Search } from '@element-plus/icons-vue'

const components = [User, Iphone, Location, Search]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
