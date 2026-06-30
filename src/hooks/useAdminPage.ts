import { useEffect } from 'react'

/** Removes public-site body offset and applies admin theme while mounted. */
export function useAdminPage() {
  useEffect(() => {
    document.body.classList.add('admin-page')
    return () => document.body.classList.remove('admin-page')
  }, [])
}
