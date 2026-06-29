/** Sayt krem fonu (#f5f0e6) — portal və banner emalı */
export const BG = { r: 245, g: 240, b: 230 }

export function lum(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function chroma(r, g, b) {
  return Math.max(r, g, b) - Math.min(r, g, b)
}

export function isNearBg(r, g, b) {
  return (
    Math.abs(r - BG.r) <= 16 &&
    Math.abs(g - BG.g) <= 16 &&
    Math.abs(b - BG.b) <= 16
  )
}

function isProtectedSubject(r, g, b, a) {
  if (a < 16) return false

  const L = lum(r, g, b)
  const c = chroma(r, g, b)

  if (r > 95 && g > 55 && b > 35 && r >= g - 8 && g >= b - 12 && r - b > 10 && L >= 82 && L <= 245 && c >= 8 && c <= 95) {
    return true
  }
  if (r > 145 && g > 105 && b < 135 && L >= 95 && c >= 18) return true
  if (r > 120 && g > 70 && b > 45 && r >= g - 5 && L >= 70 && c >= 16) return true
  if (L < 78 && c < 55) return true

  return false
}

function isStudioBackground(r, g, b, a) {
  if (a < 16) return true
  if (isProtectedSubject(r, g, b, a)) return false

  const L = lum(r, g, b)
  const c = chroma(r, g, b)

  if (L > 218 && c < 36) return true
  if (L > 198 && c < 26) return true
  if (L > 178 && c < 20) return true
  if (b > r + 10 && b > g + 5 && L >= 65 && L <= 252 && c >= 18) return true
  if (L < 95 && c < 42) return true

  return false
}

function isStrongBackground(r, g, b, a) {
  if (a < 16) return true
  if (isProtectedSubject(r, g, b, a)) return false

  const L = lum(r, g, b)
  const c = chroma(r, g, b)

  return L > 205 && c < 28
}

function buildBackgroundMask(data, width, height) {
  const size = width * height
  const mask = new Uint8Array(size)
  const visited = new Uint8Array(size)
  const queue = []

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const p = y * width + x
    if (visited[p]) return
    visited[p] = 1
    const i = p * 4
    if (isStudioBackground(data[i], data[i + 1], data[i + 2], data[i + 3])) {
      queue.push(p)
    }
  }

  for (let x = 0; x < width; x++) {
    push(x, 0)
    push(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    push(0, y)
    push(width - 1, y)
  }

  while (queue.length > 0) {
    const p = queue.pop()
    if (mask[p]) continue
    mask[p] = 1

    const x = p % width
    const y = (p - x) / width
    push(x - 1, y)
    push(x + 1, y)
    push(x, y - 1)
    push(x, y + 1)
  }

  for (let pass = 0; pass < 4; pass++) {
    let changed = false
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const p = y * width + x
        if (mask[p]) continue

        const i = p * 4
        if (!isStrongBackground(data[i], data[i + 1], data[i + 2], data[i + 3])) continue

        const touchesBg =
          (x > 0 && mask[p - 1]) ||
          (x < width - 1 && mask[p + 1]) ||
          (y > 0 && mask[p - width]) ||
          (y < height - 1 && mask[p + width])

        if (touchesBg) {
          mask[p] = 1
          changed = true
        }
      }
    }
    if (!changed) break
  }

  return mask
}

export function flattenBackground(data, width, height, mask) {
  for (let p = 0; p < width * height; p++) {
    const i = p * 4
    if (mask[p]) {
      data[i] = BG.r
      data[i + 1] = BG.g
      data[i + 2] = BG.b
      data[i + 3] = 255
      continue
    }

    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const minRg = Math.min(r, g)
    if (b > r && b > g && b - minRg > 10 && lum(r, g, b) > 58 && lum(r, g, b) < 248) {
      data[i] = BG.r
      data[i + 1] = BG.g
      data[i + 2] = BG.b
      data[i + 3] = 255
    }
  }
}

export function scrubNearBlack(data, width, height) {
  for (let p = 0; p < width * height; p++) {
    const i = p * 4
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const L = lum(r, g, b)
    const c = chroma(r, g, b)

    if (L < 52 && c < 26) {
      data[i] = BG.r
      data[i + 1] = BG.g
      data[i + 2] = BG.b
      data[i + 3] = 255
    }
  }
}

function isBagHalo(r, g, b, a) {
  if (a < 16) return true
  if (isNearBg(r, g, b)) return true

  const L = lum(r, g, b)
  const c = chroma(r, g, b)

  return L < 72 && c < 28
}

/** Məhsul şəkillərində krem ilə çanta arasındakı qara haloları təmizləyir */
export function scrubEdgeHalos(data, width, height) {
  const size = width * height
  const cream = new Uint8Array(size)

  for (let p = 0; p < size; p++) {
    const i = p * 4
    if (isNearBg(data[i], data[i + 1], data[i + 2])) {
      cream[p] = 1
    }
  }

  for (let pass = 0; pass < 5; pass++) {
    let changed = false
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const p = y * width + x
        if (cream[p]) continue

        const i = p * 4
        if (!isBagHalo(data[i], data[i + 1], data[i + 2], data[i + 3])) continue

        const touchesCream =
          (x > 0 && cream[p - 1]) ||
          (x < width - 1 && cream[p + 1]) ||
          (y > 0 && cream[p - width]) ||
          (y < height - 1 && cream[p + width])

        if (touchesCream) {
          cream[p] = 1
          data[i] = BG.r
          data[i + 1] = BG.g
          data[i + 2] = BG.b
          data[i + 3] = 255
          changed = true
        }
      }
    }
    if (!changed) break
  }
}

export function processProductToCream(data, width, height) {
  processRawToCream(data, width, height, { scrub: true })
  scrubEdgeHalos(data, width, height)
}

function isHeroGold(r, g, b) {
  const L = lum(r, g, b)
  const c = chroma(r, g, b)

  if (
    r > 95 &&
    g > 55 &&
    b > 35 &&
    r >= g - 8 &&
    g >= b - 12 &&
    r - b > 10 &&
    L >= 82 &&
    L <= 245 &&
    c >= 8 &&
    c <= 95
  ) {
    return true
  }
  if (r > 145 && g > 105 && b < 135 && L >= 95 && c >= 18) return true
  if (r > 120 && g > 70 && b > 45 && r >= g - 5 && L >= 70 && c >= 16) return true

  return false
}

function isPureBlack(r, g, b, a) {
  if (a < 16) return true
  return r < 22 && g < 22 && b < 22
}

function isBlackHalo(r, g, b, a) {
  if (a < 16) return true
  if (isHeroGold(r, g, b)) return false

  const L = lum(r, g, b)
  const c = chroma(r, g, b)

  return L < 42 && c < 16
}

function buildBlackBackgroundMask(data, width, height) {
  const size = width * height
  const mask = new Uint8Array(size)
  const visited = new Uint8Array(size)
  const queue = []

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const p = y * width + x
    if (visited[p]) return
    visited[p] = 1
    const i = p * 4
    if (isPureBlack(data[i], data[i + 1], data[i + 2], data[i + 3])) {
      queue.push(p)
    }
  }

  for (let x = 0; x < width; x++) {
    push(x, 0)
    push(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    push(0, y)
    push(width - 1, y)
  }

  const cx = Math.floor(width / 2)
  const cy = Math.floor(height / 2)
  for (let dy = -Math.floor(height * 0.22); dy <= Math.floor(height * 0.22); dy += 12) {
    for (let dx = -Math.floor(width * 0.18); dx <= Math.floor(width * 0.18); dx += 12) {
      push(cx + dx, cy + dy)
    }
  }

  while (queue.length > 0) {
    const p = queue.pop()
    if (mask[p]) continue
    mask[p] = 1

    const x = p % width
    const y = (p - x) / width
    push(x - 1, y)
    push(x + 1, y)
    push(x, y - 1)
    push(x, y + 1)
  }

  for (let pass = 0; pass < 2; pass++) {
    let changed = false
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const p = y * width + x
        if (mask[p]) continue

        const i = p * 4
        if (!isBlackHalo(data[i], data[i + 1], data[i + 2], data[i + 3])) continue

        const touchesBg =
          (x > 0 && mask[p - 1]) ||
          (x < width - 1 && mask[p + 1]) ||
          (y > 0 && mask[p - width]) ||
          (y < height - 1 && mask[p + width])

        if (touchesBg) {
          mask[p] = 1
          changed = true
        }
      }
    }
    if (!changed) break
  }

  return mask
}

function hasColorfulNeighbor(data, width, height, x, y, radius = 4) {
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      if (dx === 0 && dy === 0) continue
      const nx = x + dx
      const ny = y + dy
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue

      const i = (ny * width + nx) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      if (isHeroGold(r, g, b)) return true

      const c = chroma(r, g, b)
      const L = lum(r, g, b)
      if (c >= 24 && L >= 38 && L <= 245) return true
    }
  }

  return false
}

/** Hero banner: qara fonu sayt kremi ilə əvəz edir, qızılı loqo və saatlar saxlanır */
export function replaceSolidBlackBackground(data, width, height) {
  const mask = buildBlackBackgroundMask(data, width, height)

  for (let pass = 0; pass < 2; pass++) {
    let changed = false
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const p = y * width + x
        if (mask[p]) continue

        const i = p * 4
        if (!isBlackHalo(data[i], data[i + 1], data[i + 2], data[i + 3])) continue
        if (hasColorfulNeighbor(data, width, height, x, y)) continue

        const touchesBg =
          (x > 0 && mask[p - 1]) ||
          (x < width - 1 && mask[p + 1]) ||
          (y > 0 && mask[p - width]) ||
          (y < height - 1 && mask[p + width])

        if (touchesBg) {
          mask[p] = 1
          changed = true
        }
      }
    }
    if (!changed) break
  }

  for (let p = 0; p < width * height; p++) {
    const i = p * 4
    if (!mask[p]) continue

    data[i] = BG.r
    data[i + 1] = BG.g
    data[i + 2] = BG.b
    data[i + 3] = 255
  }
}

export function processRawToCream(data, width, height, { scrub = false } = {}) {
  const mask = buildBackgroundMask(data, width, height)
  flattenBackground(data, width, height, mask)
  if (scrub) scrubNearBlack(data, width, height)
}
