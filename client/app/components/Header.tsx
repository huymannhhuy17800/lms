'use client'

import React, { FC } from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

interface HeaderProps {
  open: boolean
  setOpen: (open: boolean) => void
  activeItem?: number
}

const Header: FC<HeaderProps> = ({ open, setOpen }) => {
  const linkStyle = 'hover:rounded-[5px] p-4 hover:bg-gray-200'

  return (
    <header className="w-full h-20 flex items-center justify-between px-6 md:px-16 bg-white dark:bg-gray-800 shadow-md">
      {/* Logo + Search + Mobile Toggle */}
      <div className="flex items-center gap-4">
        <Link href='/'>
          <img
          src="/next.svg"
          alt="logo"
          className="w-24 h-8 cursor-pointer"
          />
        </Link>
        

        <input
          type="text"
          placeholder="Search for anything"
          className="hidden md:block border-2 border-gray-300 rounded-full px-4 py-2 w-64 focus:outline-none focus:border-black"
        />

        <button
          className="fixed right-6 md:hidden p-2 cursor-pointer"  
          onClick={() => setOpen(!open)}
        >
          <img src="/menu.svg" alt="menu" className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/" className={linkStyle}>
          Teach On LMS
        </Link>
        <Link href="/" className={linkStyle}>
          My Learning
        </Link>
        <Link href="/" className={linkStyle}>
          <img src="/heart.svg" alt="wishlist" className="w-5 h-5" />
        </Link>
        <ThemeToggle />
        <Link href="/">
          <img
            src="/avatar.jpg"
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`
          transform fixed top-0 right-0 h-screen w-4/5 bg-gray-100 z-50
          ${open ? 'translate-x-0' : 'translate-x-full'}
          transition-transform duration-300 ease-in-out
          md:hidden
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-300">
          <div className="flex items-center gap-4">
            <img
              src="/avatar.jpg"
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <p>Hello, World</p>
          </div>
          <button onClick={() => setOpen(false)} className="p-2">
            <img src="/light.svg" alt="close" className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col gap-4 py-8">
          <Link href="/" className={`${linkStyle}`}>
            Teach On LMS
          </Link>
          <Link href="/" className={linkStyle}>
            My Learning
          </Link>
          <Link href="/" className={linkStyle}>
            Wish List
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
