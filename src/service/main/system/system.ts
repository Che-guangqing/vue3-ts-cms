import myRequest from '@/service'
import { IDataType } from '@/service/types'

export function getPageListData(url, queryInfo: any) {
  return myRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

// users/id
export function deletePageDataById(url: string) {
  return myRequest.delete<IDataType>({
    url
  })
}

export function createPageData(url: string, newData: any) {
  return myRequest.post<IDataType>({
    url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return myRequest.patch<IDataType>({
    url,
    data: editData
  })
}
