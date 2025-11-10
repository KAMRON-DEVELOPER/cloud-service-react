import PoddleSvg from '@/assets/icons/PoddleSvg';

const Footer = () => {
  return (
    <footer className='border-t border-gray-800 py-12 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <div className='flex items-center gap-2 mb-4'>
              {/* Use your SVG component */}
              <PoddleSvg className='w-8 h-8 text-blue-600' />
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

export default Footer;
