export interface IAccount {
  name: string
  password: string
}

// request 返回值res的类型
export interface IDataType<T = any> {
  code: number
  data: T
}

// 登录接口 res中data的类型
export interface ILoginResult {
  token: string
  name: string
  id: number
}

// 用户信息 res中data的类型
export interface IUserInfo {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt: Date
  updateAt: Date
  role: Role
  department: Department
}

interface Role {
  id: number
  name: string
  intro: string
  createAt: Date
  updateAt: Date
}

interface Department {
  id: number
  name: string
  parentId?: any
  createAt: Date
  updateAt: Date
  leader: string
}
