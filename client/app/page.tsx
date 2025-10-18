'use client' // client component

import React, { useState } from 'react'
import Header from './components/Header';
import { Lenis } from 'lenis/react';
import HeroSlider from './components/HeroSlider';
import { slides } from './constants/slides';

const Page = () => {

    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);

  return (
    <Lenis root>
    <Header open={open} activeItem={activeItem} setOpen={setOpen} />
    <HeroSlider slides={slides}/>
    <div className="h-[2000px] bg-gray-100">
      {/* Additional content to enable scrolling */}
    </div>
    </Lenis>
  )
}

export default Page