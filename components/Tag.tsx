'use client'

import Link from 'next/link'
import { slug } from 'github-slugger'
import { track } from '../lib/analytics'

interface Props {
  text: string
  onClick?: () => void
}

const Tag = ({ text, onClick }: Props) => {
  const handleClick = () => {
    // Track personnalisé si fourni
    if (onClick) {
      onClick()
    } else {
      // Track par défaut
      track('tag_click', {
        tag_name: text,
        tag_slug: slug(text),
        source: 'generic'
      })
    }
  }

  return (
    <Link
      href={`/tags/${slug(text)}`}
      onClick={handleClick}
      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag