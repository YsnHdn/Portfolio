'use client'

import Link from '@/components/Link'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { motion } from 'framer-motion'
import AnimatedLatestPost from '@/components/AnimatedLatestPost'

const MAX_DISPLAY = 5

interface MainProps {
  posts: {
    slug: string
    title: string
    date: string
    summary: string
    tags?: string[]
  }[]
}

export default function Main({ posts }: MainProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start justify-between gap-8 space-y-2 pt-6 pb-8 md:flex-row md:space-y-5"
      >
        <div className="flex-1">
          {/* Avatar + Title Section */}
          <div className="mb-6 flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <Image
                src="/static/images/avatar.png"
                alt="Yassine Handane"
                width={80}
                height={80}
                className="mr-3 h-20 w-20 rounded-full object-cover shadow-lg ring-2 ring-primary-500/20"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100"
            >
              Hi, I'm <span className="text-primary-500 dark:text-primary-400">Yassine</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-3xl text-lg text-gray-500 dark:text-gray-400"
          >
            Welcome to my personal blog where I share my{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">thoughts</span> and{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">experiences</span>. I'm a
            passionate{' '}
            <span className="text-primary-500 dark:text-primary-400 font-medium">
              data science & machine learning engineer
            </span>{' '}
            sharing insights about{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">AI</span>,{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">machine learning</span>,
            and{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              innovative research
            </span>
            .
          </motion.p>

          <div className="mb-8"></div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-3xl text-lg text-gray-500 dark:text-gray-400"
          >
            This is my place for{' '}
            <motion.span
              initial={{ backgroundSize: '0% 100%' }}
              animate={{ backgroundSize: '100% 100%' }}
              transition={{ duration: 0.8, delay: 1, ease: [0.4, 0, 0.2, 1] }}
              className="bg-gradient-highlight dark:bg-gradient-highlight-dark relative text-gray-700 dark:text-gray-200"
              style={{
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '0 100%',
                borderRadius: '0.5rem',
                padding: '0 0.2em',
                display: 'inline',
              }}
            >
              research insights, technical discoveries & AI innovations
            </motion.span>
            . Join me on this journey of continuous learning and exploration in the world of data
            science.{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">Have a great read!</span>
          </motion.p>

          <div className="mb-8"></div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-3xl text-lg text-gray-500 dark:text-gray-400"
          >
            <span className="inline-flex flex-wrap items-center gap-1">
              Press{' '}
              <kbd className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-sm font-semibold text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100">
                Ctrl
              </kbd>
              <span className="text-gray-500 dark:text-gray-400">+</span>
              <kbd className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-sm font-semibold text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100">
                K
              </kbd>{' '}
              <span className="hidden sm:inline">or</span>{' '}
              <span className="inline sm:hidden">
                /<br />
              </span>
              <kbd className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-sm font-semibold text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100">
                ⌘
              </kbd>
              <span className="text-gray-500 dark:text-gray-400">+</span>
              <kbd className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-sm font-semibold text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100">
                K
              </kbd>{' '}
              to search for anything.
            </span>
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex w-full flex-col gap-3 md:mt-[88px] md:w-auto md:min-w-[200px]"
        >
          <Link
            href="/blog"
            className="hover:bg-primary-500 dark:hover:bg-primary-500 rounded-lg bg-gray-100 px-6 py-2.5 text-center font-medium text-gray-900 transition-all duration-200 hover:text-white dark:bg-gray-800 dark:text-gray-100"
          >
            Read My Blog
          </Link>
          <Link
            href="/tags"
            className="hover:bg-primary-500 dark:hover:bg-primary-500 rounded-lg bg-gray-100 px-6 py-2.5 text-center font-medium text-gray-900 transition-all duration-200 hover:text-white dark:bg-gray-800 dark:text-gray-100"
          >
            Explore Topics
          </Link>
          <Link
            href="/experiences"
            className="hover:bg-primary-500 dark:hover:bg-primary-500 rounded-lg bg-gray-100 px-6 py-2.5 text-center font-medium text-gray-900 transition-all duration-200 hover:text-white dark:bg-gray-800 dark:text-gray-100"
          >
            My Journey
          </Link>
          <Link
            href="/about"
            className="hover:bg-primary-500 dark:hover:bg-primary-500 rounded-lg bg-gray-100 px-6 py-2.5 text-center font-medium text-gray-900 transition-all duration-200 hover:text-white dark:bg-gray-800 dark:text-gray-100"
          >
            Learn About Me
          </Link>
        </motion.div>
      </motion.div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100"
          >
            Latest
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg leading-7 text-gray-500 dark:text-gray-400"
          >
            {siteMetadata.description}
          </motion.p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post, index) => (
            <AnimatedLatestPost key={post.slug} post={post} index={index} />
          ))}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-end text-base leading-6 font-medium"
        >
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </motion.div>
      )}
      {siteMetadata.newsletter?.provider && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center pt-4"
        >
          <div data-newsletter-form>
            <NewsletterForm title="Subscribe to the newsletter" />
          </div>
        </motion.div>
      )}
    </>
  )
}