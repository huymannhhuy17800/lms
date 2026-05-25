'use client' // client component

import React, { useState } from 'react'
import Header from './components/skeleton/Header';
import { Lenis } from 'lenis/react';
import HeroSlider from './components/HeroSlider';
import { slides } from './constants/utils';
import Footer from './components/skeleton/Footer';
import CourseItem from './components/course/CourseItem';

const Page = () => {
  return (
    <Lenis root>
      <HeroSlider slides={slides} />
      <CourseItem />
      <div className='h-96'></div>
    </Lenis>
  );
}

export default Page