import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
import { IDashboardState } from './main/analysis/types'

export interface IRootState {
  // name: string
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

// IRootWithModule是根store中各个模块的类型接口
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

// 交叉类型
export type IStoreType = IRootState & IRootWithModule
