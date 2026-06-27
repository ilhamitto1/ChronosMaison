import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'mb-14 sm:mb-16',
        align === 'center' && 'text-center',
        className,
      )}
    >
      <div
        className={cn(
          'mb-5 flex items-center gap-4',
          align === 'center' && 'justify-center',
        )}
      >
        <span className="h-px w-10 bg-gold" />
        <span className="text-[10px] font-medium tracking-[0.45em] text-gold uppercase">
          {label}
        </span>
        {align === 'center' && <span className="h-px w-10 bg-gold" />}
      </div>
      <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] font-medium tracking-tight text-brown">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 max-w-xl text-base leading-relaxed text-brown-light',
            align === 'center' && 'mx-auto',
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
