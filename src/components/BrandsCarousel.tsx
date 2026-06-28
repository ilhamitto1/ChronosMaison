import { useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { brands, type Brand } from '@/data/brands'
import { BrandLogo } from '@/components/BrandLogo'

const IDLE_MS = 2500
const PX_PER_SEC = 42

function brandCtaLabel(category: Brand['category']) {
  switch (category) {
    case 'bags':
      return 'Çantalara bax'
    case 'jewelry':
      return 'Zinətə bax'
    case 'both':
      return 'Kolleksiyaya bax'
    default:
      return 'Saatlara bax'
  }
}

function ChevronIcon({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg
      className="brands-nav-icon"
      viewBox="0 0 24 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={direction === 'prev' ? 'M20 4L6 20L20 36' : 'M4 4L18 20L4 36'}
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div className="item">
      <Link className="category" to={`/markalar/${brand.id}`}>
        <div className="brand-logo-wrap">
          <BrandLogo brand={brand} />
        </div>
        <span className="brand-cta">{brandCtaLabel(brand.category)}</span>
      </Link>
    </div>
  )
}

export function BrandsCarousel() {
  const reduced = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const setWidthRef = useRef(0)
  const pausedRef = useRef(true)
  const inViewRef = useRef(false)
  const resumeTimerRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastFrameRef = useRef(0)
  const loopBrands = [...brands, ...brands]

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current)
      resumeTimerRef.current = null
    }
  }, [])

  const measureSetWidth = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setWidthRef.current = el.scrollWidth / 2
  }, [])

  const normalizeScroll = useCallback(() => {
    const el = trackRef.current
    const setWidth = setWidthRef.current
    if (!el || setWidth <= 0) return
    if (el.scrollLeft >= setWidth) {
      el.scrollLeft -= setWidth
    } else if (el.scrollLeft < 0) {
      el.scrollLeft += setWidth
    }
  }, [])

  const scheduleResume = useCallback(() => {
    clearResumeTimer()
    if (reduced) return
    resumeTimerRef.current = window.setTimeout(() => {
      if (inViewRef.current) {
        pausedRef.current = false
      }
    }, IDLE_MS)
  }, [clearResumeTimer, reduced])

  const pauseAuto = useCallback(() => {
    pausedRef.current = true
    clearResumeTimer()
  }, [clearResumeTimer])

  const getScrollStep = useCallback(() => {
    const el = trackRef.current
    if (!el) return 0
    const card = el.querySelector<HTMLElement>('.brend')
    if (!card) return el.clientWidth
    const gap = parseFloat(getComputedStyle(el).gap) || 12
    return card.offsetWidth + gap
  }, [])

  const scroll = useCallback(
    (dir: 'prev' | 'next') => {
      const el = trackRef.current
      if (!el) return
      pauseAuto()
      const step = getScrollStep()
      el.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' })
      window.setTimeout(() => {
        normalizeScroll()
        scheduleResume()
      }, 420)
    },
    [getScrollStep, normalizeScroll, pauseAuto, scheduleResume],
  )

  useEffect(() => {
    measureSetWidth()
    const el = trackRef.current
    if (!el) return

    const ro = new ResizeObserver(() => measureSetWidth())
    ro.observe(el)

    return () => ro.disconnect()
  }, [measureSetWidth])

  useEffect(() => {
    if (reduced) return

    const viewport = viewportRef.current
    if (!viewport) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          scheduleResume()
        } else {
          pauseAuto()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(viewport)
    return () => observer.disconnect()
  }, [pauseAuto, reduced, scheduleResume])

  useEffect(() => {
    if (reduced) return

    const tick = (time: number) => {
      if (!lastFrameRef.current) lastFrameRef.current = time
      const dt = Math.min(time - lastFrameRef.current, 48)
      lastFrameRef.current = time

      const el = trackRef.current
      if (el && !pausedRef.current && inViewRef.current) {
        el.scrollLeft += PX_PER_SEC * (dt / 1000)
        const setWidth = setWidthRef.current
        if (setWidth > 0 && el.scrollLeft >= setWidth) {
          el.scrollLeft -= setWidth
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [reduced])

  useEffect(() => () => clearResumeTimer(), [clearResumeTimer])

  const onUserInteract = useCallback(() => {
    pauseAuto()
  }, [pauseAuto])

  const onUserInteractEnd = useCallback(() => {
    scheduleResume()
  }, [scheduleResume])

  return (
    <section className="subCategory" aria-labelledby="brands-heading">
      <div className="container">
        <header className="brands-section-head">
          <h2 className="brendTitle" id="brands-heading">
            Brendlər
          </h2>
        </header>
        <div className="brands-carousel-wrap">
          <button
            type="button"
            className="carousel-nav-btn prev"
            aria-label="Əvvəlki brend"
            onClick={() => scroll('prev')}
          >
            <ChevronIcon direction="prev" />
          </button>
          <div className="brands-carousel-viewport" ref={viewportRef}>
            <div
              className="brands-carousel"
              ref={trackRef}
              onPointerDown={onUserInteract}
              onPointerUp={onUserInteractEnd}
              onPointerCancel={onUserInteractEnd}
              onTouchStart={onUserInteract}
              onTouchEnd={onUserInteractEnd}
              onWheel={() => {
                pauseAuto()
                scheduleResume()
              }}
              onScroll={normalizeScroll}
            >
              {loopBrands.map((brand, i) => (
                <motion.div key={`${brand.id}-${i}`} className="brend" initial={false}>
                  <BrandCard brand={brand} />
                </motion.div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="carousel-nav-btn next"
            aria-label="Növbəti brend"
            onClick={() => scroll('next')}
          >
            <ChevronIcon direction="next" />
          </button>
        </div>
      </div>
    </section>
  )
}
