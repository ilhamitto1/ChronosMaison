import { fallbackProducts } from '@/data/fallbackProducts'
import { isSupabaseConfigured, getSupabase } from '@/lib/supabase'
import type {
  DbProduct,
  DbProductInsert,
  DbProductUpdate,
  ProductCategory,
} from '@/types/database'
import type { Product } from '@/types/product'

const PRODUCT_BUCKET = 'product-images'

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
  }
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

function withFallback(remote: Product[]): Product[] {
  return remote.length > 0 ? remote : fallbackProducts
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const remote = await fetchRemoteProducts()
    return withFallback(remote)
  } catch (error) {
    console.warn('[products] getAllProducts failed, using fallback.', error)
    return fallbackProducts
  }
}

export async function getProductsByCategory(
  category: ProductCategory,
): Promise<Product[]> {
  try {
    if (!isSupabaseConfigured) {
      return fallbackProducts.filter((p) => p.category === category)
    }

    const { data, error } = await getSupabase()
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })

    if (error) throw error

    const remote = (data ?? []).map((row) => mapDbProduct(row as DbProduct))
    if (remote.length > 0) return remote

    return fallbackProducts.filter((p) => p.category === category)
  } catch (error) {
    console.warn('[products] getProductsByCategory failed, using fallback.', error)
    return fallbackProducts.filter((p) => p.category === category)
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
    if (data) return mapDbProduct(data as DbProduct)

    return fallbackProducts.find((p) => p.id === id) ?? null
  } catch (error) {
    console.warn('[products] getProductById failed, using fallback.', error)
    return fallbackProducts.find((p) => p.id === id) ?? null
  }
}

export async function getProductsByBrand(brandId: string): Promise<Product[]> {
  try {
    if (!isSupabaseConfigured) {
      return fallbackProducts.filter((p) => p.brandId === brandId)
    }

    const { data, error } = await getSupabase()
      .from('products')
      .select('*')
      .eq('brand_id', brandId)
      .order('created_at', { ascending: false })

    if (error) throw error

    const remote = (data ?? []).map((row) => mapDbProduct(row as DbProduct))
    if (remote.length > 0) return remote

    return fallbackProducts.filter((p) => p.brandId === brandId)
  } catch (error) {
    console.warn('[products] getProductsByBrand failed, using fallback.', error)
    return fallbackProducts.filter((p) => p.brandId === brandId)
  }
}

export async function createProduct(input: DbProductInsert): Promise<Product> {
  const { data, error } = await getSupabase()
    .from('products')
    .insert(input)
    .select('*')
    .single()

  if (error) throw error
  return mapDbProduct(data as DbProduct)
}

export async function updateProduct(
  id: string,
  input: DbProductUpdate,
): Promise<Product> {
  const { data, error } = await getSupabase()
    .from('products')
    .update(input)
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return mapDbProduct(data as DbProduct)
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await getSupabase().from('products').delete().eq('id', id)
  if (error) throw error
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
      contentType: file.type,
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
