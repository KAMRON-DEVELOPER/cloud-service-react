import PoddleSvg from '@/assets/icons/PoddleSvg';
import NavbarThemeSwitcher from '@/features/users/Home/NavbarThemeSwitcher';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='fixed top-2 left-16 right-16 h-14 pl-3 pr-6 rounded-full flex items-center justify-between bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg z-50'>
      {/* Logo */}
      <Link
        to='/'
        className='flex items-center cursor-pointer gap-2'>
        <PoddleSvg className='w-8 h-8 text-primary' />
        <span className='text-xl font-bold text-primary'>Poddle</span>
      </Link>

      {/* Right side */}
      <div className='flex gap-4 items-center'>
        <NavbarThemeSwitcher />
        <Link
          className='flex cursor-pointer text-primary font-medium text-lg'
          to='/auth'>
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
