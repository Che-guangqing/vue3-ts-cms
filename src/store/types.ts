import { ILoginState } from './login/types'
export interface IRootState {
  name: string
}

// IRootWithModule是根store中各个模块的类型接口
export interface IRootWithModule {
  login: ILoginState
}

// 交叉类型
export type IStoreType = IRootState & IRootWithModule
