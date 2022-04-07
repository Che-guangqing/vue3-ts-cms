import myRequest from '@/service'
import { IDataType } from '@/service/types'

export function getPageListData(url, queryInfo: any) {
  return myRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}
