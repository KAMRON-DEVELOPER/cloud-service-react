import { Link } from 'react-router-dom';
import { Rocket, ArrowRight, Check } from 'lucide-react';
import { Box, Text } from '@chakra-ui/react';

import { AuroraBackground } from '@/components/ui/shadcn-io/aurora-background';
import { File, Search, Settings } from 'lucide-react';
import { TbMenu } from 'react-icons/tb';

import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import LightRays from '@/components/LightRays';
import GlassSurface from '@/components/GlassSurface';
import { FlickeringGrid } from '@/components/ui/shadcn-io/flickering-grid';

const HomePage = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      description: 'Perfect for side projects and testing',
      features: ['Free $10 credit', '1 project', '2 GB RAM', '1 vCPU', 'Community support'],
    },
    {
      name: 'Pro',
      price: '$29',
      description: 'For growing applications',
      features: ['Unlimited projects', '8 GB RAM', '4 vCPU', 'Auto-scaling', 'Priority support', 'Custom domains'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large-scale deployments',
      features: ['Unlimited everything', 'Dedicated resources', 'SLA guarantee', '24/7 phone support', 'Custom integrations', 'Compliance certifications'],
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950'>
      {/* Navigation */}
      <nav className='absolute top-8 left-8 bg-amber-700 h-16 w-16'>
        <Box
          position='absolute'
          top='2em'
          left={0}
          width='100%'
          height='60px'
          zIndex={0}
          pointerEvents='none'>
          <Box
            margin='0 auto'
            width={{ base: '90%', md: '60%' }}
            height='100%'
            borderRadius='50px'
            py={4}
            px={6}
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            bg='rgba(255, 255, 255, 0.05)'
            backdropFilter='blur(10px)'
            border='1px solid rgba(255, 255, 255, 0.1)'>
            <Box
              display={{ base: 'flex', md: 'none' }}
              alignItems='center'
              color='white'>
              <TbMenu size={20} />
              <Link
                to='/'
                className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
                  <span className='text-white font-bold text-xl'>P</span>
                </div>
                <span className='text-xl font-bold text-white'>Poddle</span>
              </Link>
            </Box>

            <Box
              display={{ base: 'none', md: 'flex' }}
              alignItems='center'
              gap={6}
              fontWeight={600}>
              <Text
                color='white'
                fontSize='14px'
                display='flex'
                alignItems='center'>
                <div className='flex items-center gap-4'>
                  <Link
                    to='/auth'
                    className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                    Get Started
                  </Link>
                </div>
              </Text>
            </Box>
          </Box>
        </Box>
      </nav>

      <div className='absolute top-8 left-8'>
        <GlassSurface
          width={300}
          height={200}
          borderRadius={24}
          displace={15}
          distortionScale={-150}
          redOffset={5}
          greenOffset={15}
          blueOffset={25}
          brightness={60}
          opacity={0.8}
          mixBlendMode='screen'>
          <span>Advanced Glass Distortion</span>
        </GlassSurface>
      </div>

      {/* Hero Section */}
      <div className='border-4 rounded-xs border-indigo-500 border-solid h-screen w-screen'>
        <AuroraBackground>
          <section className='pt-32 pb-20 px-6'>
            <div className='max-w-7xl mx-auto text-center'>
              <div className='inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-400 text-sm mb-6'>
                <Rocket className='w-4 h-4' />
                <span>Deploy in seconds, scale in minutes</span>
              </div>
              <h1 className='text-5xl md:text-7xl font-bold text-white mb-6 leading-tight'>
                Deploy your apps
                <br />
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600'>without the hassle</span>
              </h1>
              <p className='text-xl text-gray-400 mb-8 max-w-2xl mx-auto'>
                Poddle is a modern Platform-as-a-Service that makes deploying and scaling your containers effortless. Focus on code, not infrastructure.
              </p>
              <div className='flex items-center justify-center gap-4'>
                <Link
                  to='/auth'
                  className='px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-lg font-medium'>
                  Start Free Trial
                  <ArrowRight className='w-5 h-5' />
                </Link>
                <button className='px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-lg font-medium'>View Demo</button>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto'>
                <div>
                  <div className='text-4xl font-bold text-white mb-2'>99.99%</div>
                  <div className='text-gray-400'>Uptime SLA</div>
                </div>
                <div>
                  <div className='text-4xl font-bold text-white mb-2'>&lt;30s</div>
                  <div className='text-gray-400'>Deploy Time</div>
                </div>
                <div>
                  <div className='text-4xl font-bold text-white mb-2'>10k+</div>
                  <div className='text-gray-400'>Deployments</div>
                </div>
              </div>

              <div className='relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden'>
                <OrbitingCircles iconSize={40}>
                  <Search />
                  <File />
                  <Settings />
                </OrbitingCircles>
                <OrbitingCircles
                  iconSize={30}
                  radius={100}
                  reverse
                  speed={2}>
                  <Search />
                  <File />
                  <Settings />
                </OrbitingCircles>
              </div>
            </div>
          </section>
        </AuroraBackground>
      </div>

      <div className='border-4 rounded-xs border-indigo-500 border-solid h-screen w-screen relative'>
        <LightRays
          raysOrigin='top-center'
          raysColor='#00ffff'
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className='custom-rays'
        />
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
