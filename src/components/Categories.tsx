import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const MotionLink = motion.create(Link)

const VAULT_ASSETS = {
  newArrivals: '/assets/banners/new-products.jpg',
} as const

const PORTALS = [
  {
    to: '/jewelry',
    label: 'Zinət əşyaları',
    image: '/assets/banners/jewelry-portal-hero.avif',
    position: '58% 46%',
    hero: true,
    fit: 'cover' as const,
  },
  {
    to: '/watches',
    label: 'Saatlar',
    image: '/assets/banners/watches-portal.jpg',
    position: '50% 50%',
    hero: false,
    fit: 'cover' as const,
    accent: 'watches' as const,
  },
  {
    to: '/bags',
    label: 'Çantalar',
    image: '/assets/banners/bags-portal.jpg',
    position: '50% 50%',
    hero: false,
    fit: 'cover' as const,
  },
] as const

const EASE_LUX = [0.16, 1, 0.3, 1] as const
const EASE_FLOW = [0.22, 1, 0.36, 1] as const

const spotlightReveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_FLOW },
  },
}

function cellEntrance(reduced: boolean, index: number, hero: boolean) {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.35, delay: index * 0.06 } },
    }
  }

  if (hero) {
    return {
      hidden: { opacity: 0, y: 32, scale: 1.02 },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1, ease: EASE_LUX },
      },
    }
  }

  const fromX = index === 1 ? -28 : 28

  return {
    hidden: { opacity: 0, x: fromX, scale: 0.97 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        delay: 0.14 + (index - 1) * 0.1,
        ease: EASE_LUX,
      },
    },
  }
}

const labelEntrance = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.18, ease: EASE_LUX },
  },
  rest: {},
  hover: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
}

const tileHover = {
  rest: {},
  hover: {
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
}

const imgHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.06,
    transition: { duration: 1.1, ease: EASE_FLOW },
  },
}

const imgHoverWatches = {
  rest: { scale: 1.14 },
  hover: {
    scale: 1.18,
    transition: { duration: 1.1, ease: EASE_FLOW },
  },
}

const overlayHover = {
  rest: { opacity: 1 },
  hover: {
    opacity: 0.78,
    transition: { duration: 0.65, ease: EASE_FLOW },
  },
}

const titleHover = {
  rest: { y: 0, letterSpacing: '0.04em' },
  hover: {
    y: -4,
    letterSpacing: '0.07em',
    transition: { duration: 0.65, ease: EASE_FLOW },
  },
}

const ornamentHover = {
  rest: {},
  hover: {
    transition: { staggerChildren: 0.04, delayChildren: 0.06 },
  },
}

const lineHover = {
  rest: { scaleX: 0.92, opacity: 0.92 },
  hover: {
    scaleX: 1.08,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_FLOW },
  },
}

const starHover = {
  rest: { rotate: 0, scale: 1 },
  hover: {
    rotate: 180,
    scale: 1.1,
    transition: { duration: 1.1, ease: EASE_FLOW },
  },
}

type Portal = (typeof PORTALS)[number]

function PortalOrnament({ reduced }: { reduced: boolean }) {
  if (reduced) {
    return (
      <span className="category-portals__ornament" aria-hidden="true">
        <span className="category-portals__ornament-line category-portals__ornament-line--left" />
        <svg
          className="category-portals__ornament-star"
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
          <path
            d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.5 5.5l1.55 1.55M17 17l1.55 1.55M5.5 18.5l1.55-1.55M17 7l1.55-1.55"
            stroke="currentColor"
            strokeWidth="0.85"
            strokeLinecap="round"
          />
        </svg>
        <span className="category-portals__ornament-line category-portals__ornament-line--right" />
      </span>
    )
  }

  return (
    <motion.span className="category-portals__ornament" aria-hidden="true" variants={ornamentHover}>
      <motion.span
        className="category-portals__ornament-line category-portals__ornament-line--left"
        variants={lineHover}
        style={{ transformOrigin: 'right center' }}
      />
      <motion.svg
        className="category-portals__ornament-star"
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        variants={starHover}
      >
        <circle cx="12" cy="12" r="1.8" fill="currentColor" />
        <path
          d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.5 5.5l1.55 1.55M17 17l1.55 1.55M5.5 18.5l1.55-1.55M17 7l1.55-1.55"
          stroke="currentColor"
          strokeWidth="0.85"
          strokeLinecap="round"
        />
      </motion.svg>
      <motion.span
        className="category-portals__ornament-line category-portals__ornament-line--right"
        variants={lineHover}
        style={{ transformOrigin: 'left center' }}
      />
    </motion.span>
  )
}

function PortalTile({
  portal,
  index,
  reduced,
}: {
  portal: Portal
  index: number
  reduced: boolean
}) {
  return (
    <motion.div
      className={
        portal.hero
          ? 'category-portals__cell category-portals__cell--hero'
          : 'accent' in portal && portal.accent === 'watches'
            ? 'category-portals__cell category-portals__cell--watches'
            : 'category-portals__cell'
      }
      variants={cellEntrance(reduced, index, portal.hero)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-30px', amount: 0.2 }}
    >
      <MotionLink
        to={portal.to}
        className={`category-portals__tile category-portals__tile--${portal.fit}`}
        style={{ '--tile-position': portal.position } as CSSProperties}
        initial="rest"
        whileHover={reduced ? undefined : 'hover'}
        whileTap={reduced ? undefined : { scale: 0.992 }}
        variants={tileHover}
      >
        <motion.img
          className="category-portals__img"
          src={portal.image}
          alt=""
          loading="lazy"
          variants={
            reduced
              ? undefined
              : 'accent' in portal && portal.accent === 'watches'
                ? imgHoverWatches
                : imgHover
          }
        />
        <motion.span
          className="category-portals__overlay"
          aria-hidden="true"
          variants={reduced ? undefined : overlayHover}
        />
        <motion.span
          className="category-portals__label"
          variants={reduced ? undefined : labelEntrance}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'show'}
          viewport={{ once: true, amount: 0.45 }}
        >
          <motion.h2
            className="category-portals__title"
            variants={reduced ? undefined : titleHover}
          >
            {portal.label}
          </motion.h2>
          <PortalOrnament reduced={reduced} />
        </motion.span>
      </MotionLink>
    </motion.div>
  )
}

export function Categories() {
  const reduced = useReducedMotion()

  return (
    <section className="vault" aria-label="Kolleksiyalar">
      <div className="container">
        <div className="vault__shell">
          <motion.div
            variants={spotlightReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
          >
            <Link to="/products" className="vault-spotlight">
              <div className="vault-spotlight__visual">
                <img
                  className="vault-spotlight__img"
                  src={VAULT_ASSETS.newArrivals}
                  alt=""
                  loading="eager"
                />
                <div className="vault-spotlight__shade" aria-hidden="true" />
                <div className="vault-spotlight__caption">
                  <h2 className="vault-spotlight__title">Yeni daxil olmuş məhsullar</h2>
                  <PortalOrnament reduced={!!reduced} />
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="category-portals" aria-label="Kateqoriyalar">
            {PORTALS.map((portal, index) => (
              <PortalTile
                key={portal.to}
                portal={portal}
                index={index}
                reduced={!!reduced}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
