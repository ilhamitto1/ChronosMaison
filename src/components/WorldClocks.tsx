import { motion } from 'framer-motion'

export function WorldClocks() {
  const cities = [
    { city: 'Bakı', timezone: 'Asia/Baku' },
    { city: 'Dubay', timezone: 'Asia/Dubai' },
    { city: 'Moskva', timezone: 'Europe/Moscow' },
  ]

  const now = new Date()

  return (
    <div className="flex flex-wrap gap-6 sm:gap-10">
      {cities.map((c, i) => {
        const time = new Intl.DateTimeFormat('az-AZ', {
          timeZone: c.timezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(now)

        return (
          <motion.div
            key={c.city}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="flex items-baseline gap-3"
          >
            <span className="font-display text-3xl tabular-nums text-brown sm:text-4xl">{time}</span>
            <span className="text-[10px] font-medium tracking-[0.35em] text-brown-light uppercase">
              {c.city}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}
