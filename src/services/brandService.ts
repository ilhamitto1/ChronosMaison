import { fallbackBrands } from '@/data/fallbackBrands'
import { isSupabaseConfigured, getSupabase } from '@/lib/supabase'
import { resolveImageContentType } from '@/lib/validateProductForm'
import type { DbBrand, DbBrandInsert, DbBrandUpdate } from '@/types/database'
import type { Brand } from '@/types/brand'

const BRAND_BUCKET = 'brand-logos'

function mapDbBrand(row: DbBrand): Brand {
  return {
    id: row.slug,
    name: row.name,
    logo: row.logo_url,
    category: row.category,
    showOnHomepage: row.show_on_homepage,
    sortOrder: row.sort_order,
  }
}

async function fetchRemoteBrands(): Promise<Brand[]> {
  if (!isSupabaseConfigured) return []

  const { data, error } = await getSupabase()
    .from('brands')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })

  if (error) throw error
  return (data ?? []).map((row) => mapDbBrand(row as DbBrand))
}

function withFallback(remote: Brand[]): Brand[] {
  return remote.length > 0 ? remote : fallbackBrands
}

export async function getAllBrands(): Promise<Brand[]> {
  try {
    return withFallback(await fetchRemoteBrands())
  } catch (error) {
    console.warn('[brands] getAllBrands failed, using fallback.', error)
    return fallbackBrands
  }
}

export async function getHomepageBrands(): Promise<Brand[]> {
  const brands = await getAllBrands()
  return brands.filter((b) => b.showOnHomepage).sort((a, b) => a.sortOrder - b.sortOrder)
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const brands = await getAllBrands()
  return brands.find((b) => b.id === slug) ?? null
}

export async function listAdminBrands(): Promise<Brand[]> {
  const { data, error } = await getSupabase()
    .from('brands')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })

  if (error) throw error
  return (data ?? []).map((row) => mapDbBrand(row as DbBrand))
}

export async function createBrand(input: DbBrandInsert): Promise<Brand> {
  const { data, error } = await getSupabase().from('brands').insert(input).select('*').single()
  if (error) throw error
  return mapDbBrand(data as DbBrand)
}

export async function updateBrand(id: string, input: DbBrandUpdate): Promise<Brand> {
  const { data, error } = await getSupabase()
    .from('brands')
    .update(input)
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return mapDbBrand(data as DbBrand)
}

export async function deleteBrand(id: string): Promise<void> {
  const { error } = await getSupabase().from('brands').delete().eq('id', id)
  if (error) throw error
}

export async function uploadBrandLogo(file: File, brandId?: string): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase() || 'png'
  const folder = brandId ?? 'drafts'
  const filePath = `brands/${folder}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${extension}`

  const contentType =
    file.type ||
    (extension === 'svg' ? 'image/svg+xml' : resolveImageContentType(file))

  const { error: uploadError } = await getSupabase().storage
    .from(BRAND_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType,
    })

  if (uploadError) throw uploadError

  const { data } = getSupabase().storage.from(BRAND_BUCKET).getPublicUrl(filePath)
  return data.publicUrl
}

export interface SeedBrandsResult {
  total: number
  inserted: number
  skipped: number
  failed: number
}

export async function seedBrandsCatalog(): Promise<SeedBrandsResult> {
  const { data: existing, error: listError } = await getSupabase().from('brands').select('slug')
  if (listError) throw listError

  const existingSlugs = new Set((existing ?? []).map((row) => row.slug))
  let inserted = 0
  let skipped = 0
  let failed = 0

  for (const brand of fallbackBrands) {
    if (existingSlugs.has(brand.id)) {
      skipped += 1
      continue
    }

    const { error } = await getSupabase().from('brands').insert({
      slug: brand.id,
      name: brand.name,
      logo_url: brand.logo,
      category: brand.category,
      show_on_homepage: brand.showOnHomepage,
      sort_order: brand.sortOrder,
    })

    if (error) {
      failed += 1
      continue
    }

    inserted += 1
    existingSlugs.add(brand.id)
  }

  return { total: fallbackBrands.length, inserted, skipped, failed }
}

/** Internal UUID lookup for updates/deletes */
export async function getBrandRecordId(slug: string): Promise<string | null> {
  const { data, error } = await getSupabase()
    .from('brands')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw error
  return data?.id ?? null
}

export interface AdminBrand extends Brand {
  recordId: string
}

export async function listAdminBrandsWithIds(): Promise<AdminBrand[]> {
  const { data, error } = await getSupabase()
    .from('brands')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })

  if (error) throw error

  return (data ?? []).map((row) => {
    const brand = mapDbBrand(row as DbBrand)
    return { ...brand, recordId: (row as DbBrand).id }
  })
}
