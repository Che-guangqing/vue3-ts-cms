import { ref } from 'vue'
import PageModal from '@/components/page-modal'

export function usePageModal() {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()

  const handleCreateData = () => {
    if (pageModalRef.value) {
      pageModalRef.value.showModal({})
    }
  }

  const handleEditData = (item: any) => {
    if (pageModalRef.value) {
      pageModalRef.value.showModal(item)
    }
  }

  return { pageModalRef, handleCreateData, handleEditData }
}
