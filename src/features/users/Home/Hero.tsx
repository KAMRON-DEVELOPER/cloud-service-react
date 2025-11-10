import AnimatedContent from '@/components/AnimatedContent';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    // Made position, width, and z-index responsive
    <section className='absolute top-24 md:top-36 left-0 w-full md:w-3/auto z-20'>
      <AnimatedContent
        distance={60}
        direction='vertical'
        duration={1.2}
        ease='easeOut'
        initialOpacity={0.3}
        animateOpacity
        scale={1.05}
        delay={0.3}>
        {/* Added responsive padding */}
        <div className='pl-6 pr-6 md:pl-12 lg:pl-16'>
          <h1 className='text-3xl md:text-5xl font-bold text-white mb-6 leading-tight'>
            Deploy your apps
            <br />
            <span className=''>without the hassle</span>
          </h1>
          <p className='text-lg md:text-xl text-gray-400 mb-8 max-w-2xl'>
            Poddle is a modern Platform-as-a-Service that makes deploying and scaling your containers effortless. Focus on code, not infrastructure.
          </p>
          <div className='flex items-center justify-start'>
            <Link
              to='/auth'
              className='flex items-center gap-2 text-lg font-medium px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 shadow-lg transition-all hover:bg-white/20'>
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
