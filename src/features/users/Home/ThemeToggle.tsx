'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className='relative flex items-center justify-center p-2 rounded-full border border-border/30 bg-card/30 hover:bg-card/60 transition-all duration-200'
      aria-label='Toggle theme'>
      <AnimatePresence
        mode='wait'
        initial={false}>
        {isDark ? (
          <motion.span
            key='sun'
            initial={{ opacity: 0, rotate: -25, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 25, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className='absolute'>
            <Sun className='w-5 h-5 text-primary' />
          </motion.span>
        ) : (
          <motion.span
            key='moon'
            initial={{ opacity: 0, rotate: 25, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -25, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className='absolute'>
            <Moon className='w-5 h-5 text-primary' />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
