import { useEffect, useId, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react'
import { AlertCircle, Camera, CheckCircle2, ImageUp, Loader2 } from 'lucide-react'
import { useBrands } from '@/hooks/useBrands'
import {
  getErrorSummary,
  getFirstErrorField,
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
  case_size_mm: '',
  watch_reference: '',
  watch_collection: '',
  watch_case_material: '',
  watch_strap_material: '',
  watch_dial_color: '',
  watch_movement_type: '',
  watch_set: '',
  watch_condition: '',
  has_certificate: '',
  watch_year: '',
}

interface ProductFormProps {
  initialValues?: ProductFormValues
  existingImageUrl?: string
  submitLabel: string
  loading: boolean
  onSubmit: (values: ProductFormValues, imageFile: File | null) => Promise<string | null>
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
  const { brands } = useBrands()
  const fileInputId = useId()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState<ProductFormValues>(initialValues ?? EMPTY_VALUES)
  const [errors, setErrors] = useState<ProductFormErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState(existingImageUrl ?? '')
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    setValues(initialValues ?? EMPTY_VALUES)
    setPreviewUrl(existingImageUrl ?? '')
    setImageFile(null)
    setErrors({})
    setSubmitError(null)
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
    setSubmitError(null)
  }

  function handleBrandChange(brandId: string) {
    const brand = brands.find((item) => item.id === brandId)
    setValues((current) => ({
      ...current,
      brand_id: brandId,
      brand: brand?.name ?? '',
    }))
  }

  function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleFileSelect(event.target.files?.[0] ?? null)
    event.target.value = ''
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
    setSubmitError(null)
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    setDragActive(false)
    handleFileSelect(event.dataTransfer.files?.[0] ?? null)
  }

  function scrollToField(field: keyof ProductFormErrors) {
    const root = formRef.current
    if (!root) return
    const target = root.querySelector<HTMLElement>(`[data-field="${field}"]`)
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError(null)

    const nextErrors = validateProductForm(values, {
      requireImage: !existingImageUrl,
      hasImage: Boolean(imageFile || existingImageUrl),
    })

    const imageError = imageFile ? validateImageFile(imageFile) : null
    if (imageError) nextErrors.image = imageError

    if (hasFormErrors(nextErrors)) {
      setErrors(nextErrors)
      const firstField = getFirstErrorField(nextErrors)
      if (firstField) scrollToField(firstField)
      return
    }

    const errorMessage = await onSubmit(values, imageFile)
    if (errorMessage) {
      setSubmitError(errorMessage)
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const errorSummary = getErrorSummary(errors)

  return (
    <form ref={formRef} className="admin-form" onSubmit={handleSubmit} noValidate>
      {(submitError || errorSummary.length > 0) && (
        <div className="admin-form__alert" role="alert">
          <AlertCircle aria-hidden="true" />
          <div>
            {submitError && <p>{submitError}</p>}
            {errorSummary.length > 0 && (
              <ul>
                {errorSummary.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="admin-form__grid">
        <label className="admin-field" data-field="title">
          <span>Başlıq</span>
          <input
            type="text"
            value={values.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="Məhsul adı"
          />
          {errors.title && <small className="admin-field__error">{errors.title}</small>}
        </label>

        <label className="admin-field" data-field="price">
          <span>Qiymət (USD)</span>
          <input
            type="number"
            min="0"
            step="1"
            value={values.price}
            onChange={(event) => updateField('price', event.target.value)}
            placeholder="15000"
          />
          {errors.price && <small className="admin-field__error">{errors.price}</small>}
        </label>

        <label className="admin-field" data-field="category">
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

        <div className="admin-field admin-field--full" data-field="image">
          <span>Şəkil {existingImageUrl ? '' : '(mütləq)'}</span>
          <div className="admin-upload">
            <input
              id={fileInputId}
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="admin-upload__file-input"
              onChange={handleFileInputChange}
            />

            {previewUrl ? (
              <>
                <div className="admin-upload__preview">
                  <img src={previewUrl} alt="Məhsul önizləməsi" />
                  <div className="admin-upload__preview-overlay">
                    {imageFile && (
                      <span className="admin-upload__ready">
                        <CheckCircle2 />
                        Şəkil hazırdır
                      </span>
                    )}
                  </div>
                </div>
                <label htmlFor={fileInputId} className="admin-btn admin-btn--ghost admin-btn--full">
                  <Camera />
                  Başqa şəkil seç
                </label>
              </>
            ) : (
              <label
                htmlFor={fileInputId}
                className={`admin-upload__zone${dragActive ? ' admin-upload__zone--active' : ''}`}
                onDragEnter={(event) => {
                  event.preventDefault()
                  setDragActive(true)
                }}
                onDragOver={(event) => event.preventDefault()}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
              >
                <ImageUp aria-hidden="true" />
                <p>
                  <strong>Şəkil seçin</strong>
                </p>
                <p className="admin-upload__hint">Qalereya və ya kamera — JPG, PNG, HEIC</p>
              </label>
            )}

            {errors.image && <small className="admin-field__error">{errors.image}</small>}
          </div>
        </div>

        <label className="admin-field admin-field--full" data-field="description">
          <span>{values.category === 'watches' ? 'Qısa qeyd (opsional)' : 'Təsvir'}</span>
          <textarea
            rows={values.category === 'watches' ? 3 : 5}
            value={values.description}
            onChange={(event) => updateField('description', event.target.value)}
            placeholder={
              values.category === 'watches'
                ? 'Əlavə qeyd (əsas məlumatlar aşağıdakı cədvəldədir)'
                : 'Məhsul haqqında ətraflı məlumat'
            }
          />
          {errors.description && <small className="admin-field__error">{errors.description}</small>}
        </label>

        {values.category === 'watches' && (
          <div className="admin-form__watch-fields admin-field--full">
            <p className="admin-form__section-label">Saat xüsusiyyətləri</p>
            <p className="admin-form__section-hint">
              Saytda Avazli tipli cədvəl kimi görünəcək. Doldurduğunuz hər sətir məhsul səhifəsində göstərilir.
            </p>
            <div className="admin-form__grid admin-form__grid--watch">
              <label className="admin-field" data-field="case_size_mm">
                <span>Məhsulun diametri (mm)</span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={values.case_size_mm}
                  onChange={(event) => updateField('case_size_mm', event.target.value)}
                  placeholder="33"
                />
                {errors.case_size_mm && (
                  <small className="admin-field__error">{errors.case_size_mm}</small>
                )}
              </label>

              <label className="admin-field">
                <span>Referans</span>
                <input
                  type="text"
                  value={values.watch_reference}
                  onChange={(event) => updateField('watch_reference', event.target.value)}
                  placeholder="67651SR.ZZ.1261SR.01"
                />
              </label>

              <label className="admin-field">
                <span>Kolleksiya</span>
                <input
                  type="text"
                  value={values.watch_collection}
                  onChange={(event) => updateField('watch_collection', event.target.value)}
                  placeholder="Royal Oak"
                />
              </label>

              <label className="admin-field admin-field--full">
                <span>Korpusun materialı</span>
                <input
                  type="text"
                  value={values.watch_case_material}
                  onChange={(event) => updateField('watch_case_material', event.target.value)}
                  placeholder="18K Çəhrayı Qızıl + Paslanmaz Polad + Brilliant"
                />
              </label>

              <label className="admin-field admin-field--full">
                <span>Qayışın materialı</span>
                <input
                  type="text"
                  value={values.watch_strap_material}
                  onChange={(event) => updateField('watch_strap_material', event.target.value)}
                  placeholder="18K Çəhrayı Qızıl + Paslanmaz Polad"
                />
              </label>

              <label className="admin-field">
                <span>Siferblatın rəngi</span>
                <input
                  type="text"
                  value={values.watch_dial_color}
                  onChange={(event) => updateField('watch_dial_color', event.target.value)}
                  placeholder="Ağ"
                />
              </label>

              <label className="admin-field">
                <span>Mexanizm növü</span>
                <input
                  type="text"
                  value={values.watch_movement_type}
                  onChange={(event) => updateField('watch_movement_type', event.target.value)}
                  placeholder="Mexaniki"
                  list="watch-movement-options"
                />
                <datalist id="watch-movement-options">
                  <option value="Mexaniki" />
                  <option value="Avtomatik" />
                  <option value="Kvars" />
                </datalist>
              </label>

              <label className="admin-field">
                <span>Dəst</span>
                <input
                  type="text"
                  value={values.watch_set}
                  onChange={(event) => updateField('watch_set', event.target.value)}
                  placeholder="Full Set"
                />
              </label>

              <label className="admin-field">
                <span>Vəziyyəti</span>
                <select
                  value={values.watch_condition}
                  onChange={(event) =>
                    updateField('watch_condition', event.target.value as ProductFormValues['watch_condition'])
                  }
                >
                  <option value="">Seçin</option>
                  <option value="new">Yeni</option>
                  <option value="pre-owned">Köhnə</option>
                </select>
              </label>

              <label className="admin-field" data-field="watch_year">
                <span>İl</span>
                <input
                  type="number"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  step="1"
                  value={values.watch_year}
                  onChange={(event) => updateField('watch_year', event.target.value)}
                  placeholder="2022"
                />
                {errors.watch_year && (
                  <small className="admin-field__error">{errors.watch_year}</small>
                )}
              </label>

              <label className="admin-field">
                <span>Sertifikat</span>
                <select
                  value={values.has_certificate}
                  onChange={(event) =>
                    updateField('has_certificate', event.target.value as ProductFormValues['has_certificate'])
                  }
                >
                  <option value="">Seçin</option>
                  <option value="yes">Var</option>
                  <option value="no">Yoxdur</option>
                </select>
              </label>
            </div>
          </div>
        )}

      </div>

      <div className="admin-form__actions admin-form__actions--sticky">
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
    case_size_mm: product.caseSizeMm != null ? String(product.caseSizeMm) : '',
    watch_reference: product.watchReference ?? '',
    watch_collection: product.watchCollection ?? '',
    watch_case_material: product.watchCaseMaterial ?? '',
    watch_strap_material: product.watchStrapMaterial ?? '',
    watch_dial_color: product.watchDialColor ?? '',
    watch_movement_type: product.watchMovementType ?? '',
    watch_set: product.watchSet ?? '',
    watch_condition: product.watchCondition ?? '',
    has_certificate:
      product.hasCertificate === true ? 'yes' : product.hasCertificate === false ? 'no' : '',
    watch_year: product.watchYear != null ? String(product.watchYear) : '',
  }
}
