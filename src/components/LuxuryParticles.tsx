import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LuxuryParticlesProps {
  className?: string
  count?: number
}

export function LuxuryParticles({ className, count = 18 }: LuxuryParticlesProps) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 12,
    delay: Math.random() * 5,
  }))

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-champagne/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
