'use client'

import React, { FC, useEffect } from 'react'
import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'

interface HeaderProps {
  open: boolean
  setOpen: (open: boolean) => void
  activeItem?: number
}

const Header: FC<HeaderProps> = ({ open, setOpen }) => {
  const linkStyle = 'hover:rounded-[5px] p-4 hover:bg-[#eaf9e0] transition-all duration-200'

  const [isLogin, setIsLogin] = React.useState(false);

  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    }

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="w-full h-20 flex items-center justify-between px-6 md:px-16 bg-white dark:bg-gray-800 shadow-md text-[15px]">
      {/* LEFT: Logo */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <Link href='/'>
          <img
            src="/next.svg"
            alt="logo"
            className="w-24 h-8 cursor-pointer"
          />
        </Link>
      </div>

      {/* CENTER: Search bar (desktop only) */}
      {!isMobile && (
        <div className="flex-grow max-w-xl px-4">
          <input
            type="text"
            placeholder="🔍 Search for anything"
            className="w-full border-2 border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-[#5cd799]"
          />
        </div>
      )}

      {/* RIGHT: Menu or Hamburger */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {/* Desktop menu */}
        {!isMobile && (
          <nav className="flex items-center gap-6">
            <Link href="/" className={linkStyle}>Teach On LMS</Link>
            <Link href="/" className={linkStyle}>My Learning</Link>
            <Link href="/" className={linkStyle}>
              <img src="/heart.svg" alt="wishlist" className="w-5 h-5" />
            </Link>
            <ThemeToggle />
            {!isLogin ? (
              <>
                <div className="border-1 py-2 px-3 rounded-[5px] cursor-pointer border-[#5cd799] hover:bg-[#eaf9e0]">
                  <Link href="/register" className="text-[14px] font-semibold text-[#5cd799]">Sign up</Link>
                </div>
                <div className="border-1 border-[#5cd799] py-2 px-3 rounded-[5px] cursor-pointer bg-[#5cd799] hover:bg-[#4eb984]">
                  <Link href='/login' className="text-[14px] font-semibold text-white">Log in</Link>
                </div>
              </>
            ) : (
              <Link href="/">
                <img src="/guest.png" alt="avatar" className="w-10 h-10 rounded-full object-cover" />
              </Link>
            )}
          </nav>
        )}

        {/* Mobile toggle */}
        {isMobile && (
          <button
            className="p-2 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <img src="/menu.svg" alt="menu" className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`
          transform fixed top-0 right-0 h-screen w-full bg-gray-100 z-50
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
            <img src="/close.svg" alt="close" className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col gap-4 py-4 items-center">
          <Link href="/" className={linkStyle}>
            Teach On LMS
          </Link>
          <Link href="/" className={linkStyle}>
            My Learning
          </Link>
          <Link href="/" className={linkStyle}>
            Wish List
          </Link>
          <Link href="/login" className='p-4'>Login</Link>
          <Link href="/register" className='p-4'>Sign up</Link>
        </nav>
      </div>
    </header>

  )
}

export default Header
