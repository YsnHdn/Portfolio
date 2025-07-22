'use client'

import { motion } from 'framer-motion'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

interface AnimatedBlogPostProps {
  post: CoreContent<Blog>
  index: number
}

const AnimatedBlogPost = ({ post, index }: AnimatedBlogPostProps) => {
  const { path, date, title, summary, tags } = post

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="py-5"
    >
      <article className="flex flex-col space-y-2 xl:space-y-0">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
            <time dateTime={date} suppressHydrationWarning>
              {formatDate(date, siteMetadata.locale)}
            </time>
          </dd>
        </dl>
        <div className="space-y-3">
          <div>
            <h2 className="text-2xl leading-8 font-bold tracking-tight">
              <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                {title}
              </Link>
            </h2>
            <div className="flex flex-wrap">{tags?.map((tag) => <Tag key={tag} text={tag} />)}</div>
          </div>
          <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
        </div>
      </article>
    </motion.li>
  )
}

export default AnimatedBlogPost
