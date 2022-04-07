import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
export interface IRootState {
  name: string
}

// IRootWithModule是根store中各个模块的类型接口
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

// 交叉类型
export type IStoreType = IRootState & IRootWithModule
