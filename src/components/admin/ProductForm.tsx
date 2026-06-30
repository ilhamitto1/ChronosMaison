import { useEffect, useRef, useState, type DragEvent, type FormEvent } from 'react'
import { CheckCircle2, ImageUp, Loader2 } from 'lucide-react'
import { brands } from '@/data/brands'
import {
  hasFormErrors,
  validateImageFile,
  validateProductForm,
} from '@/lib/validateProductForm'
import type { ProductCategory } from '@/types/database'
import type { Product, ProductFormErrors, ProductFormValues } from '@/types/product'

const EMPTY_VALUES: ProductFormValues = {
  title: '',
  price: '',
  category: '',
  description: '',
  brand: '',
  brand_id: '',
}

interface ProductFormProps {
  initialValues?: ProductFormValues
  existingImageUrl?: string
  submitLabel: string
  loading: boolean
  onSubmit: (values: ProductFormValues, imageFile: File | null) => Promise<void>
  onCancel: () => void
}

export function ProductForm({
  initialValues,
  existingImageUrl,
  submitLabel,
  loading,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [values, setValues] = useState<ProductFormValues>(initialValues ?? EMPTY_VALUES)
  const [errors, setErrors] = useState<ProductFormErrors>({})
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState(existingImageUrl ?? '')
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    setValues(initialValues ?? EMPTY_VALUES)
    setPreviewUrl(existingImageUrl ?? '')
    setImageFile(null)
    setErrors({})
  }, [initialValues, existingImageUrl])

  useEffect(() => {
    if (!imageFile) return
    const objectUrl = URL.createObjectURL(imageFile)
    setPreviewUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [imageFile])

  function updateField<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined, image: undefined }))
  }

  function handleBrandChange(brandId: string) {
    const brand = brands.find((item) => item.id === brandId)
    setValues((current) => ({
      ...current,
      brand_id: brandId,
      brand: brand?.name ?? '',
    }))
  }

  function handleFileSelect(file: File | null) {
    if (!file) return
    const imageError = validateImageFile(file)
    if (imageError) {
      setErrors((current) => ({ ...current, image: imageError }))
      return
    }
    setImageFile(file)
    setErrors((current) => ({ ...current, image: undefined }))
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setDragActive(false)
    handleFileSelect(event.dataTransfer.files?.[0] ?? null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateProductForm(values, {
      requireImage: !existingImageUrl,
      hasImage: Boolean(imageFile || existingImageUrl),
    })

    const imageError = imageFile ? validateImageFile(imageFile) : null
    if (imageError) nextErrors.image = imageError

    if (hasFormErrors(nextErrors)) {
      setErrors(nextErrors)
      return
    }

    await onSubmit(values, imageFile)
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit} noValidate>
      <div className="admin-form__grid">
        <label className="admin-field">
          <span>Başlıq</span>
          <input
            type="text"
            value={values.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="Məhsul adı"
          />
          {errors.title && <small className="admin-field__error">{errors.title}</small>}
        </label>

        <label className="admin-field">
          <span>Qiymət (₼)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={values.price}
            onChange={(event) => updateField('price', event.target.value)}
            placeholder="25500"
          />
          {errors.price && <small className="admin-field__error">{errors.price}</small>}
        </label>

        <label className="admin-field">
          <span>Kateqoriya</span>
          <select
            value={values.category}
            onChange={(event) => updateField('category', event.target.value as ProductCategory | '')}
          >
            <option value="">Seçin</option>
            <option value="watches">Saatlar</option>
            <option value="bags">Çantalar</option>
            <option value="jewelry">Zinət əşyaları</option>
          </select>
          {errors.category && <small className="admin-field__error">{errors.category}</small>}
        </label>

        <label className="admin-field">
          <span>Brend</span>
          <select value={values.brand_id} onChange={(event) => handleBrandChange(event.target.value)}>
            <option value="">Seçin (opsional)</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </label>

        <label className="admin-field">
          <span>Brand ID</span>
          <input
            type="text"
            value={values.brand_id}
            onChange={(event) => updateField('brand_id', event.target.value)}
            placeholder="rolex"
          />
        </label>

        <label className="admin-field admin-field--full">
          <span>Təsvir</span>
          <textarea
            rows={5}
            value={values.description}
            onChange={(event) => updateField('description', event.target.value)}
            placeholder="Məhsul haqqında ətraflı məlumat"
          />
          {errors.description && <small className="admin-field__error">{errors.description}</small>}
        </label>

        <div className="admin-field admin-field--full">
          <span>Şəkil</span>
          <div className="admin-upload">
            {previewUrl ? (
              <div className="admin-upload__preview">
                <img src={previewUrl} alt="Məhsul önizləməsi" />
                <div className="admin-upload__preview-overlay">
                  {imageFile && (
                    <span className="admin-upload__ready">
                      <CheckCircle2 />
                      Şəkil hazırdır
                    </span>
                  )}
                  <button
                    type="button"
                    className="admin-btn admin-btn--ghost admin-btn--sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Dəyişdir
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="admin-upload__hidden-input"
                  onChange={(event) => handleFileSelect(event.target.files?.[0] ?? null)}
                />
              </div>
            ) : (
              <div
                className={`admin-upload__zone${dragActive ? ' admin-upload__zone--active' : ''}`}
                onDragEnter={(event) => {
                  event.preventDefault()
                  setDragActive(true)
                }}
                onDragOver={(event) => event.preventDefault()}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    fileInputRef.current?.click()
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <ImageUp aria-hidden="true" />
                <p>
                  <strong>Şəkil seçin</strong> və ya bura sürükləyin
                </p>
                <p className="admin-upload__hint">JPEG, PNG, WebP — maks. 5 MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={(event) => handleFileSelect(event.target.files?.[0] ?? null)}
                  tabIndex={-1}
                />
              </div>
            )}
            {errors.image && <small className="admin-field__error">{errors.image}</small>}
          </div>
        </div>
      </div>

      <div className="admin-form__actions">
        <button type="button" className="admin-btn admin-btn--ghost" onClick={onCancel} disabled={loading}>
          Ləğv et
        </button>
        <button type="submit" className="admin-btn admin-btn--primary" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="admin-spin" />
              Yadda saxlanılır...
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  )
}

export function productToFormValues(product: Product): ProductFormValues {
  return {
    title: product.name,
    price: String(product.price),
    category: product.category,
    description: product.description,
    brand: product.brand,
    brand_id: product.brandId,
  }
}
