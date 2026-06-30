import type { ProductFormErrors, ProductFormValues } from '@/types/product'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const MAX_IMAGE_SIZE = 5 * 1024 * 1024

export function validateProductForm(
  values: ProductFormValues,
  options: { requireImage: boolean; hasImage: boolean },
): ProductFormErrors {
  const errors: ProductFormErrors = {}

  if (!values.title.trim()) {
    errors.title = 'Məhsul adı mütləqdir.'
  }

  const price = Number(values.price)
  if (!values.price.trim() || Number.isNaN(price) || price <= 0) {
    errors.price = 'Düzgün qiymət daxil edin.'
  }

  if (!values.category) {
    errors.category = 'Kateqoriya seçin.'
  }

  if (!values.description.trim()) {
    errors.description = 'Təsvir mütləqdir.'
  }

  if (options.requireImage && !options.hasImage) {
    errors.image = 'Məhsul şəkli yükləyin.'
  }

  return errors
}

export function validateImageFile(file: File | null): string | null {
  if (!file) return 'Məhsul şəkli yükləyin.'
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return 'Yalnız JPG, PNG, WEBP və ya AVIF formatı qəbul edilir.'
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return 'Şəkil 5 MB-dan böyük ola bilməz.'
  }
  return null
}

export function hasFormErrors(errors: ProductFormErrors) {
  return Object.keys(errors).length > 0
}
