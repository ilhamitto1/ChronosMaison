import { useCallback, useEffect, useMemo, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Download, Plus, Search, X } from 'lucide-react'
import { AdminToast, createToast, type ToastMessage } from '@/components/admin/AdminToast'
import { BrandForm, brandToFormValues } from '@/components/admin/BrandForm'
import { BrandTable } from '@/components/admin/BrandTable'
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog'
import {
  createBrand,
  deleteBrand,
  listAdminBrandsWithIds,
  seedBrandsCatalog,
  updateBrand,
  uploadBrandLogo,
  type AdminBrand,
} from '@/services/brandService'
import type { BrandCategory, BrandFormValues } from '@/types/brand'

type FormMode = 'create' | 'edit' | null

export function AdminBrandsPage() {
  const [brands, setBrands] = useState<AdminBrand[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const [formMode, setFormMode] = useState<FormMode>(null)
  const [editingBrand, setEditingBrand] = useState<AdminBrand | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<AdminBrand | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [search, setSearch] = useState('')
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const pushToast = useCallback((toast: ToastMessage) => {
    setToasts((current) => [...current, toast])
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const loadBrands = useCallback(async () => {
    setLoading(true)
    try {
      const data = await listAdminBrandsWithIds()
      setBrands(data)
    } catch (error) {
      pushToast(
        createToast(
          'error',
          error instanceof Error ? error.message : 'Brendlər yüklənərkən xəta baş verdi.',
        ),
      )
    } finally {
      setLoading(false)
    }
  }, [pushToast])

  useEffect(() => {
    void loadBrands()
  }, [loadBrands])

  const filteredBrands = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return brands
    return brands.filter(
      (brand) =>
        brand.name.toLowerCase().includes(query) || brand.id.toLowerCase().includes(query),
    )
  }, [brands, search])

  function openCreateForm() {
    setEditingBrand(null)
    setFormMode('create')
  }

  function openEditForm(brand: AdminBrand) {
    setEditingBrand(brand)
    setFormMode('edit')
  }

  function closeForm() {
    if (saving) return
    setFormMode(null)
    setEditingBrand(null)
  }

  async function handleCreate(values: BrandFormValues, logoFile: File | null) {
    if (!logoFile) return

    setSaving(true)
    try {
      const logoUrl = await uploadBrandLogo(logoFile, values.slug.trim())
      await createBrand({
        slug: values.slug.trim(),
        name: values.name.trim(),
        logo_url: logoUrl,
        category: values.category as BrandCategory,
        show_on_homepage: values.showOnHomepage,
        sort_order: Number(values.sortOrder) || 0,
      })
      pushToast(createToast('success', 'Brend uğurla əlavə olundu.'))
      closeForm()
      await loadBrands()
    } catch (error) {
      pushToast(
        createToast(
          'error',
          error instanceof Error ? error.message : 'Brend əlavə edilərkən xəta baş verdi.',
        ),
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleUpdate(values: BrandFormValues, logoFile: File | null) {
    if (!editingBrand) return

    setSaving(true)
    try {
      let logoUrl = editingBrand.logo
      if (logoFile) {
        logoUrl = await uploadBrandLogo(logoFile, values.slug.trim())
      }

      await updateBrand(editingBrand.recordId, {
        slug: values.slug.trim(),
        name: values.name.trim(),
        logo_url: logoUrl,
        category: values.category as BrandCategory,
        show_on_homepage: values.showOnHomepage,
        sort_order: Number(values.sortOrder) || 0,
      })

      pushToast(createToast('success', 'Brend uğurla yeniləndi.'))
      closeForm()
      await loadBrands()
    } catch (error) {
      pushToast(
        createToast(
          'error',
          error instanceof Error ? error.message : 'Brend yenilənərkən xəta baş verdi.',
        ),
      )
    } finally {
      setSaving(false)
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return

    setDeleting(true)
    try {
      await deleteBrand(deleteTarget.recordId)
      pushToast(createToast('success', 'Brend silindi.'))
      setDeleteTarget(null)
      await loadBrands()
    } catch (error) {
      pushToast(
        createToast(
          'error',
          error instanceof Error ? error.message : 'Brend silinərkən xəta baş verdi.',
        ),
      )
    } finally {
      setDeleting(false)
    }
  }

  async function handleSeedBrands() {
    const confirmed = window.confirm(
      'Saytdakı bütün brendlər (45 ədəd) Supabase-ə əlavə olunsun? Artıq olanlar təkrarlanmayacaq.',
    )
    if (!confirmed) return

    setSeeding(true)
    try {
      const result = await seedBrandsCatalog()
      pushToast(
        createToast(
          'success',
          `${result.inserted} brend əlavə olundu, ${result.skipped} artıq var idi${result.failed ? `, ${result.failed} xəta` : ''}.`,
        ),
      )
      await loadBrands()
    } catch (error) {
      pushToast(
        createToast(
          'error',
          error instanceof Error ? error.message : 'Brend kataloqu idxal edilərkən xəta baş verdi.',
        ),
      )
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__head">
        <div>
          <h1>Brend İdarəetməsi</h1>
          <p>Ana səhifə karuseli və brend səhifələri buradan idarə olunur.</p>
        </div>
        <div className="admin-dashboard__actions">
          {!loading && brands.length === 0 && (
            <button
              type="button"
              className="admin-btn admin-btn--primary admin-dashboard__import"
              onClick={() => void handleSeedBrands()}
              disabled={seeding}
            >
              <Download size={18} />
              {seeding ? 'Idxal...' : 'Kataloqu idxal et'}
            </button>
          )}
          <button type="button" className="admin-btn admin-btn--primary admin-dashboard__cta" onClick={openCreateForm}>
            <Plus size={18} />
            Yeni brend
          </button>
        </div>
      </div>

      {brands.length === 0 && !loading && (
        <div className="admin-import-banner">
          <div>
            <strong>Sayt brend kataloqu</strong>
            <p>45 brendi bir dəfəyə əlavə edin. Sonra ana səhifədə göstəriləcəkləri seçin və ya silin.</p>
          </div>
          <button
            type="button"
            className="admin-btn admin-btn--ghost"
            onClick={() => void handleSeedBrands()}
            disabled={seeding}
          >
            <Download />
            {seeding ? 'Əlavə olunur...' : 'Kataloqu idxal et (45)'}
          </button>
        </div>
      )}

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search className="admin-search__icon" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Brend adı və ya slug axtar..."
            aria-label="Brend axtar"
          />
        </div>
      </div>

      <BrandTable
        brands={filteredBrands}
        loading={loading}
        onEdit={openEditForm}
        onDelete={setDeleteTarget}
        onCreate={openCreateForm}
      />

      <Dialog.Root open={formMode !== null} onOpenChange={(open) => !open && closeForm()}>
        <Dialog.Portal>
          <Dialog.Overlay className="admin-dialog-overlay" />
          <Dialog.Content
            className="admin-dialog-content"
            onOpenAutoFocus={(event) => event.preventDefault()}
          >
            <div className="admin-dialog-header">
              <div>
                <Dialog.Title className="admin-dialog-title">
                  {formMode === 'edit' ? 'Brendi redaktə et' : 'Yeni brend əlavə et'}
                </Dialog.Title>
                <Dialog.Description className="admin-dialog-description">
                  Ana səhifə karuselində göstərmək üçün &quot;Ana səhifədə göstər&quot; seçimini aktiv edin.
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button type="button" className="admin-dialog-close" aria-label="Bağla">
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>

            <BrandForm
              key={editingBrand?.recordId ?? 'create'}
              initialValues={editingBrand ? brandToFormValues(editingBrand) : undefined}
              existingLogoUrl={editingBrand?.logo}
              submitLabel={formMode === 'edit' ? 'Yenilə' : 'Əlavə et'}
              loading={saving}
              onCancel={closeForm}
              onSubmit={formMode === 'edit' ? handleUpdate : handleCreate}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <DeleteConfirmDialog
        open={deleteTarget !== null}
        productName={deleteTarget?.name ?? ''}
        productImage={deleteTarget?.logo}
        deleting={deleting}
        onConfirm={() => void confirmDelete()}
        onCancel={() => !deleting && setDeleteTarget(null)}
      />

      <AdminToast toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
