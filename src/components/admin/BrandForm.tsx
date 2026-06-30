import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { ImageUp, Loader2 } from 'lucide-react'
import {
  hasBrandFormErrors,
  slugifyBrandName,
  validateBrandForm,
  validateBrandLogoFile,
} from '@/lib/validateBrandForm'
import type { AdminBrand } from '@/services/brandService'
import type { BrandCategory, BrandFormErrors, BrandFormValues } from '@/types/brand'

const EMPTY_VALUES: BrandFormValues = {
  name: '',
  slug: '',
  category: '',
  showOnHomepage: true,
  sortOrder: '0',
}

interface BrandFormProps {
  initialValues?: BrandFormValues
  existingLogoUrl?: string
  submitLabel: string
  loading: boolean
  onSubmit: (values: BrandFormValues, logoFile: File | null) => Promise<void>
  onCancel: () => void
}

export function BrandForm({
  initialValues,
  existingLogoUrl,
  submitLabel,
  loading,
  onSubmit,
  onCancel,
}: BrandFormProps) {
  const fileInputId = useId()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [values, setValues] = useState<BrandFormValues>(initialValues ?? EMPTY_VALUES)
  const [errors, setErrors] = useState<BrandFormErrors>({})
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState(existingLogoUrl ?? '')
  const [slugTouched, setSlugTouched] = useState(Boolean(initialValues?.slug))

  useEffect(() => {
    setValues(initialValues ?? EMPTY_VALUES)
    setPreviewUrl(existingLogoUrl ?? '')
    setLogoFile(null)
    setErrors({})
    setSlugTouched(Boolean(initialValues?.slug))
  }, [initialValues, existingLogoUrl])

  useEffect(() => {
    if (!logoFile) return
    const objectUrl = URL.createObjectURL(logoFile)
    setPreviewUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [logoFile])

  function updateField<K extends keyof BrandFormValues>(key: K, value: BrandFormValues[K]) {
    setValues((current) => {
      const next = { ...current, [key]: value }
      if (key === 'name' && !slugTouched) {
        next.slug = slugifyBrandName(String(value))
      }
      return next
    })
    setErrors((current) => ({ ...current, [key]: undefined, image: undefined }))
  }

  function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null
    event.target.value = ''
    if (!file) return
    const imageError = validateBrandLogoFile(file)
    if (imageError) {
      setErrors((current) => ({ ...current, image: imageError }))
      return
    }
    setLogoFile(file)
    setErrors((current) => ({ ...current, image: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateBrandForm(values, {
      requireImage: !existingLogoUrl,
      hasImage: Boolean(logoFile || existingLogoUrl),
    })

    const imageError = logoFile ? validateBrandLogoFile(logoFile) : null
    if (imageError) nextErrors.image = imageError

    if (hasBrandFormErrors(nextErrors)) {
      setErrors(nextErrors)
      return
    }

    await onSubmit(values, logoFile)
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit} noValidate>
      <div className="admin-form__grid">
        <label className="admin-field">
          <span>Brend adı</span>
          <input
            type="text"
            value={values.name}
            onChange={(event) => updateField('name', event.target.value)}
            placeholder="Richard Mille"
          />
          {errors.name && <small className="admin-field__error">{errors.name}</small>}
        </label>

        <label className="admin-field">
          <span>Slug (URL)</span>
          <input
            type="text"
            value={values.slug}
            onChange={(event) => {
              setSlugTouched(true)
              updateField('slug', event.target.value)
            }}
            placeholder="richard-mille"
          />
          {errors.slug && <small className="admin-field__error">{errors.slug}</small>}
        </label>

        <label className="admin-field">
          <span>Kateqoriya</span>
          <select
            value={values.category}
            onChange={(event) => updateField('category', event.target.value as BrandCategory | '')}
          >
            <option value="">Seçin</option>
            <option value="watches">Saatlar</option>
            <option value="bags">Çantalar</option>
            <option value="jewelry">Zinət əşyaları</option>
            <option value="both">Hamısı</option>
          </select>
          {errors.category && <small className="admin-field__error">{errors.category}</small>}
        </label>

        <label className="admin-field">
          <span>Sıra nömrəsi</span>
          <input
            type="number"
            min="0"
            step="1"
            value={values.sortOrder}
            onChange={(event) => updateField('sortOrder', event.target.value)}
          />
        </label>

        <label className="admin-field admin-field--full admin-field--checkbox">
          <input
            type="checkbox"
            checked={values.showOnHomepage}
            onChange={(event) => updateField('showOnHomepage', event.target.checked)}
          />
          <span>Ana səhifədə brendlər karuselində göstər</span>
        </label>

        <div className="admin-field admin-field--full">
          <span>Loqo</span>
          <div className="admin-upload">
            <input
              id={fileInputId}
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml,.svg"
              className="admin-upload__file-input"
              onChange={handleFileInputChange}
            />
            {previewUrl ? (
              <>
                <div className="admin-upload__preview admin-upload__preview--logo">
                  <img src={previewUrl} alt="Loqo önizləməsi" />
                </div>
                <label htmlFor={fileInputId} className="admin-btn admin-btn--ghost admin-btn--full">
                  Başqa loqo seç
                </label>
              </>
            ) : (
              <label htmlFor={fileInputId} className="admin-upload__zone">
                <ImageUp aria-hidden="true" />
                <p>
                  <strong>Loqo seçin</strong>
                </p>
                <p className="admin-upload__hint">PNG, JPG, WEBP və ya SVG</p>
              </label>
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

export function brandToFormValues(brand: AdminBrand): BrandFormValues {
  return {
    name: brand.name,
    slug: brand.id,
    category: brand.category,
    showOnHomepage: brand.showOnHomepage,
    sortOrder: String(brand.sortOrder),
  }
}
