import { useStore } from '@/store'

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`
  // console.log(verifyPermission)

  return !!permissions.find((item) => item === verifyPermission)
}
