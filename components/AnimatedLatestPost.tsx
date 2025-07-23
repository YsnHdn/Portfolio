'use client'

import { motion } from 'framer-motion'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { track } from 'pliny/analytics'

interface AnimatedLatestPostProps {
  post: CoreContent<Blog>
  index: number
}

export default function AnimatedLatestPost({ post, index }: AnimatedLatestPostProps) {
  const { slug, date, title, summary, tags } = post

  const handlePostClick = () => {
    track('content_engagement', {
      content_type: 'blog_post',
      content_title: title,
      content_slug: slug,
      source: 'homepage',
      position: index + 1
    })
  }

  const handleTagClick = (tag: string) => {
    track('tag_click', {
      tag_name: tag,
      source: 'homepage',
      content_type: 'blog_post',
      content_title: title
    })
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="py-12"
    >
      <article>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          <motion.dl
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          >
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            </dd>
          </motion.dl>
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="text-2xl font-bold leading-8 tracking-tight"
                >
                  <Link
                    href={`/blog/${slug}`}
                    onClick={handlePostClick}
                    className="text-gray-900 dark:text-gray-100"
                  >
                    {title}
                  </Link>
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  className="flex flex-wrap"
                >
                  {tags?.map((tag) => (
                    <Tag 
                      key={tag} 
                      text={tag} 
                      onClick={() => handleTagClick(tag)}
                    />
                  ))}
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                className="prose max-w-none text-gray-500 dark:text-gray-400"
              >
                {summary}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
              className="text-base font-medium leading-6"
            >
              <Link
                href={`/blog/${slug}`}
                onClick={handlePostClick}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read more: "${title}"`}
              >
                Read more &rarr;
              </Link>
            </motion.div>
          </div>
        </div>
      </article>
    </motion.li>
  )
}