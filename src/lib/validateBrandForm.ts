import type { BrandFormErrors, BrandFormValues } from '@/types/brand'

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function slugifyBrandName(name: string) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function validateBrandForm(
  values: BrandFormValues,
  options: { requireImage: boolean; hasImage: boolean },
): BrandFormErrors {
  const errors: BrandFormErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Brend adı mütləqdir.'
  }

  if (!values.slug.trim() || !SLUG_PATTERN.test(values.slug.trim())) {
    errors.slug = 'Slug yalnız kiçik hərf, rəqəm və tire ola bilər.'
  }

  if (!values.category) {
    errors.category = 'Kateqoriya seçin.'
  }

  if (options.requireImage && !options.hasImage) {
    errors.image = 'Brend loqosu yükləyin.'
  }

  return errors
}

export function hasBrandFormErrors(errors: BrandFormErrors) {
  return Object.keys(errors).length > 0
}

export function validateBrandLogoFile(file: File | null): string | null {
  if (!file) return 'Brend loqosu yükləyin.'

  const allowed = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/svg+xml',
  ])
  const name = file.name.toLowerCase()

  if (file.type && allowed.has(file.type)) return null
  if (name.endsWith('.svg') || name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.webp')) {
    return null
  }

  return 'Yalnız PNG, JPG, WEBP və ya SVG formatı qəbul edilir.'
}
