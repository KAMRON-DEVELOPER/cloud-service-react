import LaserFlow from '@/components/LaserFlow';
import previewImage from '@/assets/images/Preview.png';

const LaserAnimation = () => {
  return (
    <div className='relative h-[90vh] md:h-[165vh] overflow-hidden'>
      {/* The laser animation component */}
      <LaserFlow
        horizontalBeamOffset={0.2}
        verticalBeamOffset={0.0}
        color='#99C1F0'
      />

      {/* Wrapper for the preview image to apply the fade-out mask */}
      <div
        className='absolute top-210 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[60%] z-10'
        style={{
          // This creates the fade-out effect at the bottom
          maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
        }}>
        <div className='relative w-full h-full flex items-center justify-center rounded-2xl border-2 border-[#99C1F0] bg-background'>
          <img
            src={previewImage}
            alt='Poddle Dashboard Preview'
            className='w-full h-full object-cover rounded-2xl'
          />
        </div>
      </div>
    </div>
  );
};

export default LaserAnimation;
