import { readFileSync, existsSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

function loadEnv() {
  if (!existsSync('.env')) {
    console.error('NO .env FILE')
    process.exit(1)
  }
  return Object.fromEntries(
    readFileSync('.env', 'utf8')
      .split(/\r?\n/)
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => {
        const index = line.indexOf('=')
        return [line.slice(0, index), line.slice(index + 1)]
      }),
  )
}

const email = process.env.AUTH_TEST_EMAIL?.trim()
const password = process.env.AUTH_TEST_PASSWORD

if (!email || !password) {
  console.error('Usage: AUTH_TEST_EMAIL=you@mail.com AUTH_TEST_PASSWORD=secret node scripts/diagnose-auth.mjs')
  process.exit(1)
}

const env = loadEnv()
const url = env.VITE_SUPABASE_URL?.trim()
const key = env.VITE_SUPABASE_ANON_KEY?.trim()

console.log('=== ENV ===')
console.log({ url, keyType: key?.startsWith('eyJ') ? 'jwt' : key?.startsWith('sb_publishable_') ? 'publishable' : 'other' })

const supabase = createClient(url, key)

console.log('\n=== signInWithPassword (full response) ===')
const { data, error } = await supabase.auth.signInWithPassword({ email, password })

if (error) {
  console.log('ERROR:', {
    message: error.message,
    status: error.status,
    code: error.code,
    name: error.name,
  })
  console.log('RAW ERROR:', error)
  process.exit(1)
}

console.log('SUCCESS')
console.log({
  userId: data.user?.id,
  email: data.user?.email,
  emailConfirmedAt: data.user?.email_confirmed_at,
  hasSession: Boolean(data.session),
  accessTokenPrefix: data.session?.access_token?.slice(0, 16),
})

const { data: sessionCheck } = await supabase.auth.getSession()
console.log('\n=== getSession after login ===')
console.log({ hasSession: Boolean(sessionCheck.session), userId: sessionCheck.session?.user?.id })
