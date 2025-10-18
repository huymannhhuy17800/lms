'use client';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button className="flex items-center justify-center w-10 h-10 cursor-pointer" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        <img src={`${theme === 'dark' ? 'dark.svg' : 'light.svg'}`} alt="" className='w-5 h-5'/>
    </button>
  );
}
