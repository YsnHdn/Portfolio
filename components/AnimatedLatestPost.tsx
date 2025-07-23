'use client'

import { motion } from 'framer-motion'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

interface AnimatedLatestPostProps {
  post: {
    slug: string
    date: string
    title: string
    summary: string
    tags: string[]
  }
  index: number
}

const AnimatedLatestPost = ({ post, index }: AnimatedLatestPostProps) => {
  const { slug, date, title, summary, tags } = post

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="py-12"
    >
      <article>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            </dd>
          </dl>
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl leading-8 font-bold tracking-tight">
                  <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                    {title}
                  </Link>
                </h2>
                <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
              <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
            </div>
            <div className="text-base leading-6 font-medium">
              <Link
                href={`/blog/${slug}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read more: "${title}"`}
              >
                Read more &rarr;
              </Link>
            </div>
          </div>
        </div>
      </article>
    </motion.li>
  )
}

export default AnimatedLatestPost
