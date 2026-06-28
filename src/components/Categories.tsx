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
    image: '/assets/banners/watches.png',
    position: '50% 44%',
    hero: false,
    fit: 'cover' as const,
  },
  {
    to: '/bags',
    label: 'Çantalar',
    image: '/assets/banners/bags-portal.jpg',
    position: '50% 50%',
    hero: false,
    fit: 'contain' as const,
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
      hidden: {
        opacity: 0,
        y: 48,
        scale: 1.04,
        filter: 'blur(8px)',
      },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: { duration: 1.15, ease: EASE_LUX },
      },
    }
  }

  const fromX = index === 1 ? -40 : 40

  return {
    hidden: {
      opacity: 0,
      x: fromX,
      scale: 0.93,
      filter: 'blur(6px)',
    },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        delay: 0.2 + (index - 1) * 0.15,
        ease: EASE_LUX,
      },
    },
  }
}

const labelEntrance = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: 0.25, ease: EASE_LUX },
  },
  rest: {},
  hover: {
    transition: { staggerChildren: 0.05, delayChildren: 0.06 },
  },
}

const tileHover = {
  rest: {},
  hover: {
    transition: { staggerChildren: 0.06, delayChildren: 0.03 },
  },
}

const imgHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.08,
    transition: { duration: 1.15, ease: EASE_FLOW },
  },
}

const imgHoverContain = {
  rest: { scale: 1 },
  hover: {
    scale: 1.04,
    transition: { duration: 1.15, ease: EASE_FLOW },
  },
}

const overlayHover = {
  rest: { opacity: 1 },
  hover: {
    opacity: 0.82,
    transition: { duration: 0.75, ease: EASE_FLOW },
  },
}

const sheenHover = {
  rest: { x: '-140%', opacity: 0 },
  hover: {
    x: '140%',
    opacity: [0, 0.85, 0.85, 0],
    transition: { duration: 1.55, ease: EASE_FLOW },
  },
}

const titleHover = {
  rest: { y: 0, letterSpacing: '0.04em', scale: 1 },
  hover: {
    y: -6,
    letterSpacing: '0.08em',
    scale: 1.02,
    transition: { duration: 0.75, ease: EASE_FLOW },
  },
}

const ornamentHover = {
  rest: {},
  hover: {
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
}

const lineLeftHover = {
  rest: { scaleX: 0.9, opacity: 1 },
  hover: {
    scaleX: 1.12,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_FLOW },
  },
}

const lineRightHover = {
  rest: { scaleX: 0.9, opacity: 1 },
  hover: {
    scaleX: 1.12,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_FLOW },
  },
}

const starHover = {
  rest: { rotate: 0, scale: 1 },
  hover: {
    rotate: 180,
    scale: 1.15,
    transition: { duration: 1.25, ease: EASE_FLOW },
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
          width="13"
          height="13"
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
    <motion.span
      className="category-portals__ornament"
      aria-hidden="true"
      variants={ornamentHover}
    >
      <motion.span
        className="category-portals__ornament-line category-portals__ornament-line--left"
        variants={lineLeftHover}
        style={{ transformOrigin: 'right center' }}
      />
      <motion.svg
        className="category-portals__ornament-star"
        viewBox="0 0 24 24"
        width="13"
        height="13"
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
        variants={lineRightHover}
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
  const imgVariants = portal.fit === 'contain' ? imgHoverContain : imgHover

  return (
    <motion.div
      className={
        portal.hero
          ? 'category-portals__cell category-portals__cell--hero'
          : 'category-portals__cell'
      }
      variants={cellEntrance(reduced, index, portal.hero)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-30px', amount: 0.22 }}
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
          variants={reduced ? undefined : imgVariants}
        />
        <motion.span
          className="category-portals__overlay"
          aria-hidden="true"
          variants={reduced ? undefined : overlayHover}
        />
        {!reduced && (
          <motion.span
            className="category-portals__sheen"
            aria-hidden="true"
            variants={sheenHover}
          />
        )}
        <motion.span
          className="category-portals__label"
          variants={reduced ? undefined : labelEntrance}
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'show'}
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.span
            className="category-portals__title"
            variants={reduced ? undefined : titleHover}
          >
            {portal.label}
          </motion.span>
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
                  loading="lazy"
                />
                <div className="vault-spotlight__shade" aria-hidden="true" />
              </div>
              <div className="vault-spotlight__caption">
                <span className="vault-spotlight__num">01</span>
                <h2 className="vault-spotlight__title">Yeni daxil olmuş məhsullar</h2>
                <span className="vault-spotlight__rule" aria-hidden="true" />
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
