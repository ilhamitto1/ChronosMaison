import { useEffect } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

export type ToastType = 'success' | 'error'

export interface ToastMessage {
  id: string
  type: ToastType
  text: string
}

interface AdminToastProps {
  toasts: ToastMessage[]
  onDismiss: (id: string) => void
}

export function AdminToast({ toasts, onDismiss }: AdminToastProps) {
  useEffect(() => {
    if (toasts.length === 0) return

    const timers = toasts.map((toast) =>
      window.setTimeout(() => onDismiss(toast.id), 4500),
    )

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [toasts, onDismiss])

  if (toasts.length === 0) return null

  return (
    <div className="admin-toast-stack" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`admin-toast admin-toast--${toast.type}`} role="status">
          <span className="admin-toast__icon" aria-hidden="true">
            {toast.type === 'success' ? <CheckCircle2 /> : <AlertCircle />}
          </span>
          <span className="admin-toast__text">{toast.text}</span>
          <button
            type="button"
            className="admin-toast__close"
            onClick={() => onDismiss(toast.id)}
            aria-label="Bağla"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export function createToast(type: ToastType, text: string): ToastMessage {
  return {
    id: crypto.randomUUID(),
    type,
    text,
  }
}
