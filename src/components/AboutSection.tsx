import { motion } from 'framer-motion'
import { ABOUT_TEXT } from '@/lib/constants'

export function AboutSection() {
  return (
    <section className="about">
      <div className="container">
        <motion.div
          className="about-inner"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="about-heading">Haqqımızda</h2>
          <p className="about-desc">{ABOUT_TEXT}</p>
        </motion.div>
      </div>
    </section>
  )
}
