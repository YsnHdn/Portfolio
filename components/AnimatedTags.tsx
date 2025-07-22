'use client'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import { motion } from 'framer-motion'

interface AnimatedTagsProps {
  tags: Record<string, number>
}

const AnimatedTags = ({ tags }: AnimatedTagsProps) => {
  const tagKeys = Object.keys(tags)
  const sortedTags = tagKeys.sort((a, b) => tags[b] - tags[a])

  return (
    <div className="flex flex-col items-start justify-start divide-y divide-gray-200 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0 dark:divide-gray-700">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-x-2 pt-6 pb-8 md:space-y-5"
      >
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14 dark:text-gray-100">
          Tags
        </h1>
      </motion.div>
      <div className="flex max-w-lg flex-wrap">
        {tagKeys.length === 0 && 'No tags found.'}
        {sortedTags.map((t, index) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="mt-2 mr-5 mb-2"
          >
            <Tag text={t} />
            <Link
              href={`/tags/${slug(t)}`}
              className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
              aria-label={`View posts tagged ${t}`}
            >
              {` (${tags[t]})`}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default AnimatedTags
