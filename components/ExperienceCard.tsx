'use client'

import Image from './Image'
import Link from './Link'
import Tag from './Tag'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface ExperienceCardProps {
  company: string
  position: string
  duration: string
  location: string
  description: string
  achievements: string[]
  technologies: string[]
  logo?: string
  website?: string
}

const ExperienceCard = ({
  company,
  position,
  duration,
  location,
  description,
  achievements,
  technologies,
  logo,
  website,
}: ExperienceCardProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="overflow-hidden rounded-lg border-2 border-gray-200/60 bg-white dark:border-gray-700/60 dark:bg-gray-800"
      >
        <div className="p-6">
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="flex items-center text-2xl font-bold tracking-tight">
                {logo && (
                  <Image
                    alt={company}
                    src={logo}
                    className="h-12 w-12 mr-3 rounded-full"
                    width={32}
                    height={32}
                  />
                )}
                {website ? (
                  <Link href={website} aria-label={`Link to ${company}`}>
                    {company}
                  </Link>
                ) : (
                  company
                )}
              </h2>
              <h3 className="text-xl text-gray-600 dark:text-gray-300">{position}</h3>
            </div>
            <div className="mt-2 text-gray-500 md:mt-0 dark:text-gray-400">
              <p>{duration}</p>
              <p>{location}</p>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-4 max-w-full text-gray-500 dark:text-gray-400"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-4"
          >
            <h4 className="text-primary-500 dark:text-primary-400 mb-2 text-lg font-semibold">
              Key Achievements:
            </h4>
            <ul className="list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400">
              {achievements.map((achievement, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                >
                  {achievement}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap gap-2"
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              >
                <Tag text={tech} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ExperienceCard
