import { Link } from 'react-router-dom';

import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import LightRays from '@/components/LightRays';
import { FlickeringGrid } from '@/components/ui/shadcn-io/flickering-grid';
import AnimatedContent from '@/components/AnimatedContent';
import { ArrowRight } from 'lucide-react';
import BoxesSvg from '@/assets/icons/Boxes';
const orbitIcons = {
  inner: ['PostgresSQL', 'Redis', 'RabbitMQ', 'Apache Kafka'],
  middle: ['Rust', 'Go', 'Python', 'Node.js', 'Java', 'TypeScript', 'PHP', 'Elixir', 'Zig'],
  outer: ['FastAPI', 'Django', 'Express', 'Nest.js', 'Spring', 'Laravel', 'Ruby on Rails', 'Next.js', 'React', 'Vue.js', 'Svelte', 'Solid.js', 'Angular'],
};

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      {/* Navigation */}
      <nav className='fixed top-2 left-16 right-16 h-14 px-6 rounded-full flex items-center justify-between bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg z-50'>
        {/* Logo */}
        <Link
          to='/'
          className='flex cursor-pointer'>
          <span className='text-xl font-bold text-white'>Poddle</span>
        </Link>

        {/* Right side */}
        <Link
          className='flex cursor-pointer'
          to='/auth'>
          Get Started
        </Link>
      </nav>

      {/* Hero Section */}
      <div className='h-screen w-screen relative'>
        {/* Light Rays */}
        <LightRays
          raysOrigin='top-center'
          raysColor='#ffffff'
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className='absolute'
        />

        {/* Orbit */}
        <div className='absolute right-18 top-36 flex h-[30vw] w-[30vw] flex-col items-center justify-center'>
          <OrbitingCircles
            iconSize={24}
            radius={48}
            speed={4}>
            {orbitIcons.inner.map((name) => (
              <img
                key={name}
                src={`/src/assets/svgs/${name}.svg`}
                alt={name}
              />
            ))}
          </OrbitingCircles>
          <OrbitingCircles
            iconSize={30}
            radius={96}
            speed={2}
            reverse>
            {orbitIcons.middle.map((name) => (
              <img
                key={name}
                src={`/src/assets/svgs/${name}.svg`}
                alt={name}
              />
            ))}
          </OrbitingCircles>
          <OrbitingCircles
            iconSize={36}
            radius={160}
            speed={1}>
            {orbitIcons.outer.map((name) => (
              <img
                key={name}
                src={`/src/assets/svgs/${name}.svg`}
                alt={name}
              />
            ))}
          </OrbitingCircles>
        </div>

        <section className='absolute top-36 left-0 w-[70vw]'>
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
            <div className='pl-8'>
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
      </div>

      {/* Pricing Section */}
      <section className='py-20 px-6'></section>

      {/* CTA Section */}
      <section className='py-20 px-6 relative'>
        <FlickeringGrid
          className='absolute inset-0'
          squareSize={4}
          gridGap={6}
          flickerChance={0.3}
          color='rgb(52, 177, 235)'
          maxOpacity={0.2}
        />
        <div className='max-w-4xl mx-auto text-center rounded-2xl p-12'>
          <h2 className='text-4xl font-bold text-white mb-4'>Ready to deploy your first app?</h2>
          <p className='text-xl text-blue-100 mb-8'>Join thousands of developers shipping faster with Poddle</p>
          <Link
            to='/auth'
            className='inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium'>
            Start Free Trial
            <ArrowRight className='w-5 h-5' />
          </Link>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default HomePage;
