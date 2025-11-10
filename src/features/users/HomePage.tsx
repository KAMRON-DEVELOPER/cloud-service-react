import { Link } from 'react-router-dom';

import AnimatedContent from '@/components/AnimatedContent';
import { ArrowRight } from 'lucide-react';
import LaserFlow from '@/components/LaserFlow';
import PoddleSvg from '@/assets/icons/PoddleSvg';

const HomePage = () => {
  return (
    <div className='min-h-screen bg-background'>
      {/* Navigation */}
      <nav className='fixed top-2 left-16 right-16 h-14 pl-3 pr-6 rounded-full flex items-center justify-between bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg z-50'>
        {/* Logo */}
        <Link
          to='/'
          className='flex items-center cursor-pointer gap-2'>
          <PoddleSvg className='w-8 h-8 text-primary' />
          <span className='text-xl font-bold text-primary'>Poddle</span>
        </Link>

        {/* Right side */}
        <Link
          className='flex cursor-pointer'
          to='/auth'>
          Get Started
        </Link>
      </nav>

      {/* Hero Section */}
      <section className='absolute top-36 left-0 w-[70vw] z-1'>
        <AnimatedContent
          distance={150}
          direction='horizontal'
          reverse={false}
          duration={1.2}
          ease='bounce.out'
          initialOpacity={0.2}
          animateOpacity
          scale={1.1}
          threshold={0.2}
          delay={0.3}>
          <div className='pl-16'>
            <h1 className='text-3xl md:text-5xl font-bold text-white mb-6 leading-tight'>
              Deploy your apps
              <br />
              <span className=''>without the hassle</span>
            </h1>
            <p className='text-xl text-gray-400 mb-8 max-w-2xl'>
              Poddle is a modern Platform-as-a-Service that makes deploying and scaling your containers effortless. Focus on code, not infrastructure.
            </p>
            <div className='flex items-center justify-start'>
              <Link
                to='/auth'
                className='flex items-center gap-2 text-lg font-medium px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 shadow-lg'>
                Try for free
                <ArrowRight className='w-5 h-5' />
              </Link>
            </div>
          </div>
        </AnimatedContent>
      </section>

      {/* Animation */}
      <div className=''>
        <div
          style={{
            height: '1100px',
            position: 'relative',
            overflow: 'hidden',
          }}>
          <LaserFlow
            horizontalBeamOffset={0.2}
            verticalBeamOffset={0.0}
            color='#99C1F0'
            // className='text-primary'
          />

          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%',
              height: '60%',
              borderRadius: '20px',
              border: '2px solid #99C1F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2rem',
              zIndex: 6,
            }}
            className='relative'>
            <img
              src='src/assets/images/Preview.png'
              alt='Preview.png'
              className='rounded-3xl absolute top-0 right-0 left-0 bottom-0'
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className='py-20 px-6'></section>

      {/* Price calculator */}
      <section className='py-20 px-6'></section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;

const Footer = () => {
  return (
    <footer className='border-t border-gray-800 py-12 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-xl'>P</span>
              </div>
              <span className='text-xl font-bold text-white'>Poddle</span>
            </div>
            <p className='text-gray-400 text-sm'>Deploy and scale your applications with ease.</p>
          </div>
          <div>
            <h4 className='text-white font-semibold mb-4'>Product</h4>
            <ul className='space-y-2 text-gray-400 text-sm'>
              <li>
                <a
                  href='#'
                  className='hover:text-white transition-colors'>
                  Features
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-white transition-colors'>
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-white transition-colors'>
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-white font-semibold mb-4'>Company</h4>
            <ul className='space-y-2 text-gray-400 text-sm'>
              <li>
                <a
                  href='#'
                  className='hover:text-white transition-colors'>
                  About
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-white transition-colors'>
                  Blog
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-white transition-colors'>
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-white font-semibold mb-4'>Legal</h4>
            <ul className='space-y-2 text-gray-400 text-sm'>
              <li>
                <a
                  href='#'
                  className='hover:text-white transition-colors'>
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-white transition-colors'>
                  Terms
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='hover:text-white transition-colors'>
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm'>© 2025 Poddle. All rights reserved.</div>
      </div>
    </footer>
  );
};
