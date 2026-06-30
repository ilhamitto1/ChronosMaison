import { useCallback, useEffect, useMemo, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Download, Plus, Search, X } from 'lucide-react'
import { AdminStats } from '@/components/admin/AdminStats'
import { AdminToast, createToast, type ToastMessage } from '@/components/admin/AdminToast'
import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog'
import { ProductForm, productToFormValues } from '@/components/admin/ProductForm'
import { ProductTable } from '@/components/admin/ProductTable'
import {
  createProduct,
  deleteProduct,
  listAdminProducts,
  seedCatalogProducts,
  updateProduct,
  uploadProductImage,
} from '@/services/productService'
import type { ProductCategory } from '@/types/database'
import type { Product, ProductFormValues } from '@/types/product'

type FormMode = 'create' | 'edit' | null
type CategoryFilter = 'all' | ProductCategory

const FILTER_TABS: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'Hamısı' },
  { value: 'watches', label: 'Saatlar' },
  { value: 'bags', label: 'Çantalar' },
  { value: 'jewelry', label: 'Zinət' },
]

export function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formMode, setFormMode] = useState<FormMode>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [seeding, setSeeding] = useState(false)

  const pushToast = useCallback((toast: ToastMessage) => {
    setToasts((current) => [...current, toast])
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const loadProducts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await listAdminProducts()
      setProducts(data)
    } catch (error) {
      pushToast(
        createToast(
          'error',
          error instanceof Error ? error.message : 'Məhsullar yüklənərkən xəta baş verdi.',
        ),
      )
    } finally {
      setLoading(false)
    }
  }, [pushToast])

  useEffect(() => {
    void loadProducts()
  }, [loadProducts])

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
      if (!matchesCategory) return false
      if (!query) return true
      return (
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      )
    })
  }, [products, search, categoryFilter])

  function openCreateForm() {
    setEditingProduct(null)
    setFormMode('create')
  }

  function openEditForm(product: Product) {
    setEditingProduct(product)
    setFormMode('edit')
  }

  function closeForm() {
    if (saving) return
    setFormMode(null)
    setEditingProduct(null)
  }

  async function handleCreate(values: ProductFormValues, imageFile: File | null) {
    if (!imageFile) return

    setSaving(true)
    try {
      const imageUrl = await uploadProductImage(imageFile)
      await createProduct({
        title: values.title.trim(),
        category: values.category as ProductCategory,
        price: Number(values.price),
        description: values.description.trim(),
        image_url: imageUrl,
        brand: values.brand.trim() || null,
        brand_id: values.brand_id.trim() || null,
      })
      pushToast(createToast('success', 'Məhsul uğurla əlavə olundu.'))
      closeForm()
      await loadProducts()
    } catch (error) {
      pushToast(
        createToast(
          'error',
          error instanceof Error ? error.message : 'Məhsul əlavə edilərkən xəta baş verdi.',
        ),
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleUpdate(values: ProductFormValues, imageFile: File | null) {
    if (!editingProduct) return

    setSaving(true)
    try {
      let imageUrl = editingProduct.image
      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile, editingProduct.id)
      }

      await updateProduct(editingProduct.id, {
        title: values.title.trim(),
        category: values.category as ProductCategory,
        price: Number(values.price),
        description: values.description.trim(),
        image_url: imageUrl,
        brand: values.brand.trim() || null,
        brand_id: values.brand_id.trim() || null,
      })

      pushToast(createToast('success', 'Məhsul uğurla yeniləndi.'))
      closeForm()
      await loadProducts()
    } catch (error) {
      pushToast(
        createToast(
          'error',
          error instanceof Error ? error.message : 'Məhsul yenilənərkən xəta baş verdi.',
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
      await deleteProduct(deleteTarget.id)
      pushToast(createToast('success', 'Məhsul silindi.'))
      setDeleteTarget(null)
      await loadProducts()
    } catch (error) {
      pushToast(
        createToast(
          'error',
          error instanceof Error ? error.message : 'Məhsul silinərkən xəta baş verdi.',
        ),
      )
    } finally {
      setDeleting(false)
    }
  }

  async function handleSeedCatalog() {
    const confirmed = window.confirm(
      'Saytdakı bütün kataloq məhsulları (saatlar, çantalar, zinət) Supabase-ə əlavə olunsun? Artıq olanlar təkrarlanmayacaq.',
    )
    if (!confirmed) return

    setSeeding(true)
    try {
      const result = await seedCatalogProducts()
      pushToast(
        createToast(
          'success',
          `${result.inserted} məhsul əlavə olundu, ${result.skipped} artıq var idi${result.failed ? `, ${result.failed} xəta` : ''}.`,
        ),
      )
      await loadProducts()
    } catch (error) {
      pushToast(
        createToast(
          'error',
          error instanceof Error ? error.message : 'Kataloq idxal edilərkən xəta baş verdi.',
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
          <h1>Məhsul İdarəetməsi</h1>
          <p>Supabase-də saxlanılan məhsulları əlavə edin, redaktə edin və ya silin.</p>
        </div>
        <div className="admin-dashboard__actions">
          {!loading && products.length === 0 && (
            <button
              type="button"
              className="admin-btn admin-btn--primary admin-dashboard__import"
              onClick={() => void handleSeedCatalog()}
              disabled={seeding}
            >
              <Download size={18} />
              {seeding ? 'Idxal...' : 'Kataloqu idxal et'}
            </button>
          )}
          <button type="button" className="admin-btn admin-btn--primary admin-dashboard__cta" onClick={openCreateForm}>
            <Plus size={18} />
            Yeni məhsul
          </button>
        </div>
      </div>

      <AdminStats products={products} />

      <div className="admin-import-banner">
        <div>
          <strong>Sayt kataloqu</strong>
          <p>Bütün saat, çanta və zinət məhsullarını bir dəfəyə panelə əlavə edin. Sonra istədiyinizi silin və ya redaktə edin.</p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn--ghost"
          onClick={() => void handleSeedCatalog()}
          disabled={seeding || loading}
        >
          <Download />
          {seeding ? 'Əlavə olunur...' : 'Kataloqu idxal et'}
        </button>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search className="admin-search__icon" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Məhsul, brend və ya təsvir axtar..."
            aria-label="Məhsul axtar"
          />
        </div>
        <div className="admin-filter-tabs" role="tablist" aria-label="Kateqoriya filtri">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={categoryFilter === tab.value}
              className={`admin-filter-tab${categoryFilter === tab.value ? ' is-active' : ''}`}
              onClick={() => setCategoryFilter(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <ProductTable
        products={filteredProducts}
        loading={loading}
        catalogEmpty={!loading && products.length === 0}
        importing={seeding}
        onEdit={openEditForm}
        onDelete={setDeleteTarget}
        onCreate={openCreateForm}
        onImportCatalog={() => void handleSeedCatalog()}
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
                  {formMode === 'edit' ? 'Məhsulu redaktə et' : 'Yeni məhsul əlavə et'}
                </Dialog.Title>
                <Dialog.Description className="admin-dialog-description">
                  Məlumatları doldurun və şəkli yükləyin. Dəyişikliklər saytda avtomatik görünəcək.
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button type="button" className="admin-dialog-close" aria-label="Bağla">
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>

            <ProductForm
              key={editingProduct?.id ?? 'create'}
              initialValues={editingProduct ? productToFormValues(editingProduct) : undefined}
              existingImageUrl={editingProduct?.image}
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
        productImage={deleteTarget?.image}
        deleting={deleting}
        onConfirm={() => void confirmDelete()}
        onCancel={() => !deleting && setDeleteTarget(null)}
      />

      <button
        type="button"
        className="admin-fab"
        onClick={openCreateForm}
        aria-label="Yeni məhsul əlavə et"
      >
        <Plus />
      </button>

      <AdminToast toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
