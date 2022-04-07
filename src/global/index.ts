import { App } from 'vue'
import registerElement from './registerElement'
import registerProperties from './registerProperties'

// export function globalRegister(app: App): void {
//   registerElement(app)
//   // app.use(registerElement)
//   // app.use(registerProperties)
// }

// 或

export const globalRegister = {
  install: (app: App): void => {
    registerElement(app)
    registerProperties(app)
  }
}
