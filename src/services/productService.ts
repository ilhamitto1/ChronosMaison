import { fallbackProducts } from '@/data/fallbackProducts'
import { isSchemaColumnError } from '@/lib/formatSupabaseError'
import {
  invalidateProductCache,
  setCachedAllProducts,
  setCachedProduct,
  setCachedProductsByCategory,
} from '@/lib/productCache'
import { isSupabaseConfigured, getSupabase } from '@/lib/supabase'
import { resolveImageContentType } from '@/lib/validateProductForm'
import type {
  DbProduct,
  DbProductInsert,
  DbProductUpdate,
  ProductCategory,
} from '@/types/database'
import type { Product, ProductFormValues, WatchCondition } from '@/types/product'

const PRODUCT_BUCKET = 'product-images'

const WATCH_FIELD_KEYS = [
  'case_size_mm',
  'watch_reference',
  'watch_collection',
  'watch_case_material',
  'watch_strap_material',
  'watch_dial_color',
  'watch_movement_type',
  'watch_set',
  'watch_condition',
  'has_certificate',
  'watch_year',
] as const

const STATUS_FIELD_KEYS = ['is_sold', 'price_on_request', 'original_price'] as const

const OPTIONAL_SCHEMA_KEYS = [...WATCH_FIELD_KEYS, ...STATUS_FIELD_KEYS] as const

export interface SaveProductResult {
  product: Product
  watchFieldsSkipped?: boolean
}

function normalizeWatchCondition(value: string | null): WatchCondition | null {
  if (!value) return null
  if (value === 'pre-owned') return 'lightly-used'
  if (value === 'new' || value === 'like-new' || value === 'lightly-used') return value
  return null
}

function mapDbProduct(row: DbProduct): Product {
  return {
    id: row.id,
    name: row.title,
    brand: row.brand ?? '',
    brandId: row.brand_id ?? '',
    price: Number(row.price),
    image: row.image_url,
    category: row.category,
    description: row.description,
    caseSizeMm: row.case_size_mm,
    watchReference: row.watch_reference,
    watchCollection: row.watch_collection,
    watchCaseMaterial: row.watch_case_material,
    watchStrapMaterial: row.watch_strap_material,
    watchDialColor: row.watch_dial_color,
    watchMovementType: row.watch_movement_type,
    watchSet: row.watch_set,
    watchCondition: normalizeWatchCondition(row.watch_condition),
    hasCertificate: row.has_certificate,
    watchYear: row.watch_year,
    isSold: Boolean(row.is_sold),
    priceOnRequest: Boolean(row.price_on_request),
    originalPrice: row.original_price != null ? Number(row.original_price) : null,
  }
}

function emptyWatchFields(): Pick<
  DbProductInsert,
  | 'case_size_mm'
  | 'watch_reference'
  | 'watch_collection'
  | 'watch_case_material'
  | 'watch_strap_material'
  | 'watch_dial_color'
  | 'watch_movement_type'
  | 'watch_set'
  | 'watch_condition'
  | 'has_certificate'
  | 'watch_year'
> {
  return {
    case_size_mm: null,
    watch_reference: null,
    watch_collection: null,
    watch_case_material: null,
    watch_strap_material: null,
    watch_dial_color: null,
    watch_movement_type: null,
    watch_set: null,
    watch_condition: null,
    has_certificate: null,
    watch_year: null,
  }
}

function trimOrNull(value: string) {
  const trimmed = value.trim()
  return trimmed || null
}

function hasOptionalSchemaValues(input: DbProductInsert | DbProductUpdate) {
  return OPTIONAL_SCHEMA_KEYS.some((key) => {
    const value = input[key]
    return value != null && value !== ''
  })
}

function stripOptionalSchemaFields<T extends DbProductInsert | DbProductUpdate>(input: T): T {
  const copy = { ...input }
  for (const key of OPTIONAL_SCHEMA_KEYS) {
    delete copy[key]
  }
  return copy
}

function statusFieldsFromForm(values: ProductFormValues): Pick<
  DbProductInsert,
  'is_sold' | 'price_on_request' | 'original_price'
> {
  const priceOnRequest = values.price_on_request
  const originalRaw = values.original_price.trim()
  const originalPrice = originalRaw ? Number(originalRaw) : null

  return {
    is_sold: values.is_sold,
    price_on_request: priceOnRequest,
    original_price:
      priceOnRequest || originalPrice == null || Number.isNaN(originalPrice)
        ? null
        : originalPrice,
  }
}

export function buildProductPayload(
  values: ProductFormValues,
  imageUrl: string,
): DbProductInsert {
  const priceOnRequest = values.price_on_request
  const price = priceOnRequest
    ? values.price.trim()
      ? Number(values.price)
      : 0
    : Number(values.price)

  return {
    title: values.title.trim(),
    category: values.category as ProductCategory,
    price: Number.isNaN(price) ? 0 : price,
    description: values.description.trim(),
    image_url: imageUrl,
    brand: values.brand.trim() || null,
    brand_id: values.brand_id.trim() || null,
    ...watchFieldsFromForm(values),
    ...statusFieldsFromForm(values),
  }
}

function fallbackByCategory(category: ProductCategory) {
  return fallbackProducts.filter((p) => p.category === category)
}

function fallbackByBrand(brandId: string) {
  return fallbackProducts.filter((p) => p.brandId === brandId)
}

async function fetchRemoteProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) return []

  const { data, error } = await getSupabase()
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map((row) => mapDbProduct(row as DbProduct))
}

export function watchFieldsFromForm(values: ProductFormValues): Pick<
  DbProductInsert,
  | 'case_size_mm'
  | 'watch_reference'
  | 'watch_collection'
  | 'watch_case_material'
  | 'watch_strap_material'
  | 'watch_dial_color'
  | 'watch_movement_type'
  | 'watch_set'
  | 'watch_condition'
  | 'has_certificate'
  | 'watch_year'
> {
  if (values.category !== 'watches') {
    return emptyWatchFields()
  }

  const caseSize = values.case_size_mm.trim()
  const year = values.watch_year.trim()

  return {
    case_size_mm: caseSize ? Number(caseSize) : null,
    watch_reference: trimOrNull(values.watch_reference),
    watch_collection: trimOrNull(values.watch_collection),
    watch_case_material: trimOrNull(values.watch_case_material),
    watch_strap_material: trimOrNull(values.watch_strap_material),
    watch_dial_color: trimOrNull(values.watch_dial_color),
    watch_movement_type: trimOrNull(values.watch_movement_type),
    watch_set: trimOrNull(values.watch_set),
    watch_condition: values.watch_condition || null,
    has_certificate:
      values.has_certificate === 'yes'
        ? true
        : values.has_certificate === 'no'
          ? false
          : null,
    watch_year: year ? Number(year) : null,
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    if (!isSupabaseConfigured) return fallbackProducts
    const remote = await fetchRemoteProducts()
    setCachedAllProducts(remote)
    return remote
  } catch (error) {
    console.warn('[products] getAllProducts failed.', error)
    return isSupabaseConfigured ? [] : fallbackProducts
  }
}

export async function getProductsByCategory(
  category: ProductCategory,
): Promise<Product[]> {
  try {
    if (!isSupabaseConfigured) {
      return fallbackByCategory(category)
    }

    const { data, error } = await getSupabase()
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })

    if (error) throw error
    const products = (data ?? []).map((row) => mapDbProduct(row as DbProduct))
    setCachedProductsByCategory(category, products)
    return products
  } catch (error) {
    console.warn('[products] getProductsByCategory failed.', error)
    return isSupabaseConfigured ? [] : fallbackByCategory(category)
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    if (!isSupabaseConfigured) {
      return fallbackProducts.find((p) => p.id === id) ?? null
    }

    const { data, error } = await getSupabase()
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error) throw error
    if (data) {
      const product = mapDbProduct(data as DbProduct)
      setCachedProduct(product)
      return product
    }
    return null
  } catch (error) {
    console.warn('[products] getProductById failed.', error)
    return isSupabaseConfigured ? null : (fallbackProducts.find((p) => p.id === id) ?? null)
  }
}

export async function getProductsByBrand(brandId: string): Promise<Product[]> {
  try {
    if (!isSupabaseConfigured) {
      return fallbackByBrand(brandId)
    }

    const { data, error } = await getSupabase()
      .from('products')
      .select('*')
      .eq('brand_id', brandId)
      .order('created_at', { ascending: false })

    if (error) throw error
    const products = (data ?? []).map((row) => mapDbProduct(row as DbProduct))
    for (const product of products) {
      setCachedProduct(product)
    }
    return products
  } catch (error) {
    console.warn('[products] getProductsByBrand failed.', error)
    return isSupabaseConfigured ? [] : fallbackByBrand(brandId)
  }
}

export async function createProduct(input: DbProductInsert): Promise<SaveProductResult> {
  const { data, error } = await getSupabase()
    .from('products')
    .insert(input)
    .select('*')
    .single()

  if (!error) {
    invalidateProductCache()
    return { product: mapDbProduct(data as DbProduct) }
  }

  if (isSchemaColumnError(error) && hasOptionalSchemaValues(input)) {
    const { data: fallbackData, error: fallbackError } = await getSupabase()
      .from('products')
      .insert(stripOptionalSchemaFields(input))
      .select('*')
      .single()

    if (!fallbackError) {
      invalidateProductCache()
      return {
        product: mapDbProduct(fallbackData as DbProduct),
        watchFieldsSkipped: true,
      }
    }
  }

  throw error
}

export async function updateProduct(
  id: string,
  input: DbProductUpdate,
): Promise<SaveProductResult> {
  const { data, error } = await getSupabase()
    .from('products')
    .update(input)
    .eq('id', id)
    .select('*')
    .single()

  if (!error) {
    invalidateProductCache()
    return { product: mapDbProduct(data as DbProduct) }
  }

  if (isSchemaColumnError(error) && hasOptionalSchemaValues(input)) {
    const { data: fallbackData, error: fallbackError } = await getSupabase()
      .from('products')
      .update(stripOptionalSchemaFields(input))
      .eq('id', id)
      .select('*')
      .single()

    if (!fallbackError) {
      invalidateProductCache()
      return {
        product: mapDbProduct(fallbackData as DbProduct),
        watchFieldsSkipped: true,
      }
    }
  }

  throw error
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await getSupabase().from('products').delete().eq('id', id)
  if (error) throw error
  invalidateProductCache()
}

export async function uploadProductImage(
  file: File,
  productId?: string,
): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const folder = productId ?? 'drafts'
  const filePath = `products/${folder}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${extension}`

  const { error: uploadError } = await getSupabase().storage
    .from(PRODUCT_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: resolveImageContentType(file),
    })

  if (uploadError) throw uploadError

  const { data } = getSupabase().storage.from(PRODUCT_BUCKET).getPublicUrl(filePath)
  return data.publicUrl
}

export async function listAdminProducts(): Promise<Product[]> {
  const { data, error } = await getSupabase()
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map((row) => mapDbProduct(row as DbProduct))
}

export interface SeedCatalogResult {
  total: number
  inserted: number
  skipped: number
  failed: number
}

export async function seedCatalogProducts(): Promise<SeedCatalogResult> {
  const { catalogSeed } = await import('@/data/catalogSeed')

  const { data: existing, error: listError } = await getSupabase()
    .from('products')
    .select('title')

  if (listError) throw listError

  const existingTitles = new Set(
    (existing ?? []).map((row) => row.title.trim().toLowerCase()),
  )

  let inserted = 0
  let skipped = 0
  let failed = 0

  for (const item of catalogSeed) {
    if (existingTitles.has(item.title.trim().toLowerCase())) {
      skipped += 1
      continue
    }

    const { error } = await getSupabase().from('products').insert({
      title: item.title,
      category: item.category,
      price: item.price,
      description: item.description,
      image_url: item.image_url,
      brand: item.brand,
      brand_id: item.brand_id,
    })

    if (error) {
      failed += 1
      continue
    }

    inserted += 1
    existingTitles.add(item.title.trim().toLowerCase())
  }

  return { total: catalogSeed.length, inserted, skipped, failed }
}
