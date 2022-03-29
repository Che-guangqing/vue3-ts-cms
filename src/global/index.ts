import { App } from 'vue'
import registerElement from './registerElement'
import registerElIcon from './registerElIcon'

// export function globalRegister(app: App): void {
//   registerElement(app)
//   // app.use(registerElement)
// }

// 或

export const globalRegister = {
  install: (app: App): void => {
    registerElement(app)
    registerElIcon(app)
  }
}
