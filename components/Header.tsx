'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { track } from '../lib/analytics'

const Header = () => {
  const pathname = usePathname()
  const currentPath = pathname === '/' ? '~' : `~${pathname}`
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  const handleLogoClick = () => {
    track('navigation_click', {
      destination: '/',
      source: 'header',
      element: 'logo'
    })
  }

  const handleNavClick = (href: string, title: string) => {
    track('navigation_click', {
      destination: href,
      source: 'header',
      element: 'nav_link',
      link_text: title
    })
  }

  const handleSearchClick = () => {
    track('search_interaction', {
      action: 'search_button_click',
      source: 'header'
    })
  }

  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle} onClick={handleLogoClick}>
        <div className="flex items-center">
          <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
            <span>{currentPath}</span>
            <span
              className={`ml-0.5 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-150`}
            >
              |
            </span>
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-96 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-[32rem] lg:max-w-[40rem]">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              onClick={() => handleNavClick(link.href, link.title)}
              className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div onClick={handleSearchClick}>
          <SearchButton />
        </div>
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header