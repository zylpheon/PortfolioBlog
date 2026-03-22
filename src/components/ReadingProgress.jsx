import { motion, useSpring } from 'framer-motion'
import { useReadingProgress } from '../hooks/useReadingProgress.js'

export default function ReadingProgress() {
  const progress = useReadingProgress()
  const scaleX = useSpring(progress / 100, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-ink z-[9999]
                 shadow-[0_0_6px_rgba(17,17,17,0.3)]"
    />
  )
}
