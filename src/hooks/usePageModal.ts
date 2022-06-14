import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()

  const handleCreateData = () => {
    if (pageModalRef.value) {
      pageModalRef.value.showModal({})
    }
    newCb && newCb()
  }

  const handleEditData = (item: any) => {
    if (pageModalRef.value) {
      pageModalRef.value.showModal(item)
    }
    editCb && editCb(item)
  }

  return { pageModalRef, handleCreateData, handleEditData }
}
