import * as Dialog from '@radix-ui/react-dialog'
import { Loader2, Trash2, X } from 'lucide-react'

interface DeleteConfirmDialogProps {
  open: boolean
  productName: string
  productImage?: string
  deleting?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmDialog({
  open,
  productName,
  productImage,
  deleting = false,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && !deleting && onCancel()}>
      <Dialog.Portal>
        <Dialog.Overlay className="admin-dialog-overlay" />
        <Dialog.Content className="admin-dialog-content admin-dialog-content--sm">
          <div className="admin-dialog-header">
            <div>
              <Dialog.Title className="admin-dialog-title">Məhsulu sil</Dialog.Title>
              <Dialog.Description className="admin-dialog-description">
                Bu əməliyyat geri qaytarıla bilməz.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button type="button" className="admin-dialog-close" aria-label="Bağla" disabled={deleting}>
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          <div className="admin-delete-preview">
            {productImage && (
              <img src={productImage} alt="" className="admin-delete-preview__image" />
            )}
            <div className="admin-delete-preview__info">
              <strong>{productName}</strong>
              <span>saytdan tamamilə silinəcək</span>
            </div>
          </div>

          <div className="admin-dialog-actions">
            <button type="button" className="admin-btn admin-btn--ghost" onClick={onCancel} disabled={deleting}>
              Ləğv et
            </button>
            <button type="button" className="admin-btn admin-btn--danger" onClick={onConfirm} disabled={deleting}>
              {deleting ? (
                <>
                  <Loader2 className="admin-spin" />
                  Silinir...
                </>
              ) : (
                <>
                  <Trash2 />
                  Bəli, sil
                </>
              )}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
