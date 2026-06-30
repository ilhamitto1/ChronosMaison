export function translateAuthError(message: string) {
  const normalized = message.toLowerCase()

  if (normalized.includes('invalid login credentials')) {
    return 'Email və ya şifrə yanlışdır. Supabase-də admin istifadəçisinin email və şifrəsini yoxlayın.'
  }

  if (normalized.includes('email not confirmed')) {
    return 'Email təsdiqlənməyib. Supabase Dashboard → Authentication → Users bölməsində istifadəçini təsdiqləyin.'
  }

  if (normalized.includes('user not found')) {
    return 'Bu email ilə istifadəçi tapılmadı. Supabase-də admin user yaradın.'
  }

  return message
}
