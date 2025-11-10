import LaserFlow from '@/components/LaserFlow';

const LaserAnimation = () => {
  return (
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
  );
};

export default LaserAnimation;
