'use client'

import { motion } from 'framer-motion'

interface AnimatedTitleProps {
  title: string
  description?: string
}

const AnimatedTitle = ({ title, description }: AnimatedTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-2 pt-6 pb-8 md:space-y-5"
    >
      <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
        {title}
      </h1>
      {description && (
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{description}</p>
      )}
    </motion.div>
  )
}

export default AnimatedTitle
