import AnimatedContent from '@/components/AnimatedContent';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
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
  );
};

export default Hero;
