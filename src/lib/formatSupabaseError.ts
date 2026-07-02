export function isSchemaColumnError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const record = error as { code?: string; message?: string }
  const message = (record.message ?? '').toLowerCase()
  return (
    record.code === 'PGRST204' ||
    message.includes('column') ||
    message.includes('schema cache') ||
    message.includes('could not find')
  )
}

export function formatSupabaseError(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return 'Naməlum xəta baş verdi. Yenidən cəhd edin.'
  }

  const record = error as { message?: string; details?: string; hint?: string; code?: string }
  const message = record.message ?? ''
  const combined = [message, record.details, record.hint].filter(Boolean).join(' ').toLowerCase()

  if (isSchemaColumnError(error)) {
    return 'Saat xüsusiyyəti sütunları Supabase-də yoxdur. SQL Editor-də supabase/migrate-watch-fields.sql faylını işə salın.'
  }

  if (combined.includes('row-level security') || combined.includes('policy')) {
    return 'İcazə xətası: chronosmaison776@gmail.com ilə admin panelə daxil olduğunuzdan əmin olun.'
  }

  if (combined.includes('bucket') || combined.includes('storage')) {
    return 'Şəkil yüklənmədi. Supabase Storage-da product-images bucket-inin olduğunu yoxlayın.'
  }

  if (combined.includes('payload too large') || combined.includes('file size')) {
    return 'Şəkil çox böyükdür. 5 MB-dan kiçik şəkil seçin.'
  }

  if (message) return message
  return 'Əməliyyat uğursuz oldu. İnternet və Supabase bağlantısını yoxlayın.'
}
