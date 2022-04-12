import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  // search 发送事件到此处 再调用content上的发送请求的方法
  const handleSearchClick = (searchInfo: any) => {
    pageContentRef.value?.getPageData(searchInfo)
  }

  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }
  return { pageContentRef, handleSearchClick, handleResetClick }
}
