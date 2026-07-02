import type { ProductFormErrors, ProductFormValues } from '@/types/product'

const ACCEPTED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/heic',
  'image/heif',
  'image/pjpeg',
])

const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.heic', '.heif']

const MAX_IMAGE_SIZE = 5 * 1024 * 1024

function hasAcceptedImageType(file: File): boolean {
  if (file.type && ACCEPTED_IMAGE_TYPES.has(file.type)) return true
  const name = file.name.toLowerCase()
  return ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext))
}

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

  if (values.category !== 'watches' && !values.description.trim()) {
    errors.description = 'Təsvir mütləqdir.'
  }

  if (options.requireImage && !options.hasImage) {
    errors.image = 'Məhsul şəkli yükləyin.'
  }

  if (values.category === 'watches') {
    const caseSize = values.case_size_mm.trim()
    if (caseSize) {
      const mm = Number(caseSize)
      if (Number.isNaN(mm) || mm <= 0 || !Number.isInteger(mm)) {
        errors.case_size_mm = 'Düzgün mm ölçüsü daxil edin (tam ədəd).'
      }
    }

    const year = values.watch_year.trim()
    if (year) {
      const y = Number(year)
      const maxYear = new Date().getFullYear() + 1
      if (Number.isNaN(y) || y < 1900 || y > maxYear || !Number.isInteger(y)) {
        errors.watch_year = `İl 1900–${maxYear} aralığında olmalıdır.`
      }
    }
  }

  return errors
}

export function validateImageFile(file: File | null): string | null {
  if (!file) return 'Məhsul şəkli yükləyin.'
  if (!hasAcceptedImageType(file)) {
    return 'Yalnız şəkil formatı qəbul edilir (JPG, PNG, WEBP, HEIC).'
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return 'Şəkil 5 MB-dan böyük ola bilməz.'
  }
  return null
}

export function hasFormErrors(errors: ProductFormErrors) {
  return Object.keys(errors).length > 0
}

const ERROR_FIELD_ORDER: (keyof ProductFormErrors)[] = [
  'title',
  'price',
  'category',
  'image',
  'description',
  'case_size_mm',
  'watch_year',
]

export function getErrorSummary(errors: ProductFormErrors): string[] {
  return ERROR_FIELD_ORDER.map((key) => errors[key]).filter((message): message is string =>
    Boolean(message),
  )
}

export function getFirstErrorField(errors: ProductFormErrors): keyof ProductFormErrors | null {
  return ERROR_FIELD_ORDER.find((key) => Boolean(errors[key])) ?? null
}

export function resolveImageContentType(file: File): string {
  if (file.type) return file.type

  const ext = file.name.split('.').pop()?.toLowerCase()
  const map: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    avif: 'image/avif',
    heic: 'image/heic',
    heif: 'image/heif',
  }

  return map[ext ?? ''] ?? 'image/jpeg'
}
