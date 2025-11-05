import { useState, type FormEvent } from 'react';
import { useContinueWithEmailMutation } from '../../services/auth';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { SiGithub, SiGoogle } from '@icons-pack/react-simple-icons';
import { Eye, EyeOff } from 'lucide-react';

export const AuthPage = () => {
  const navigate = useNavigate();
  const [continueWithEmail, { isLoading }] = useContinueWithEmailMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showUsernameField, setShowUsernameField] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const payload: any = { email, password };
      if (showUsernameField && username) payload.username = username;
      const result = await continueWithEmail(payload).unwrap();

      if ('user' in result && 'tokens' in result) navigate('/dashboard');
      else if ('message' in result && result.message === 'new_user') setShowUsernameField(true);
      else if ('redirectTo' in result) navigate('/' + result.redirectTo);
    } catch (err) {
      const error = err as FetchBaseQueryError;
      if (error.status === 500 && error.data && typeof error.data === 'object' && 'error' in error.data)
        setErrorMessage((error.data as { error: string }).error);
      else if (error.status === 'FETCH_ERROR') setErrorMessage('Network error. Please check your connection.');
      else setErrorMessage('Authentication failed. Please try again.');
    }
  };

  return (
    <div className='h-screen bg-background flex'>
      {/* Left side */}
      <div className='w-full lg:w-3/7 flex items-center justify-center px-24'>
        <div className='w-full max-w-md'>
          <div className='mb-6'>
            <h1 className='text-2xl font-bold text-foreground mb-1'>Welcome to Poddle</h1>
            <p className='text-sm text-muted-foreground'>{showUsernameField ? 'Complete your profile' : 'Sign in or create account'}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className='space-y-3.5'>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='Email'
              // value={email}
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete='email'
              className='h-10 bg-transparent border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary'
            />

            {showUsernameField && (
              <Input
                id='username'
                name='username'
                type='text'
                placeholder='Username'
                // value={username}
                defaultValue={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete='username'
                className='h-10 bg-transparent border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary'
              />
            )}

            <div className='relative'>
              <Input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                // value={password}
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete={showUsernameField ? 'new-password' : 'current-password'}
                className='h-10 bg-transparent border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary pr-10'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'>
                {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
              </button>
            </div>

            <Button
              type='submit'
              disabled={isLoading}
              className='w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-200'>
              {isLoading ? (
                <span className='flex items-center justify-center'>
                  <div className='w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2' />
                  Processing...
                </span>
              ) : showUsernameField ? (
                'Create Account'
              ) : (
                'Continue'
              )}
            </Button>
          </form>

          {errorMessage && (
            <div className='mt-3 p-2.5 bg-destructive/10 border border-destructive/30 rounded-md'>
              <p className='text-destructive text-xs'>{errorMessage}</p>
            </div>
          )}

          <div className='flex items-center my-5'>
            <div className='flex-grow h-px bg-border' />
            <span className='mx-3 text-muted-foreground text-xs whitespace-nowrap'>or continue with</span>
            <div className='flex-grow h-px bg-border' />
          </div>

          <div className='flex flex-col space-y-2.5'>
            <Button
              onClick={() => (window.location.href = 'http://localhost:8001/api/v1/auth/google')}
              variant='outline'
              className='w-full h-10 flex items-center justify-center gap-2 text-sm'>
              <SiGoogle className='w-4 h-4' />
              Continue with Google
            </Button>
            <Button
              onClick={() => (window.location.href = 'http://localhost:8001/api/v1/auth/github')}
              variant='outline'
              className='w-full h-10 flex items-center justify-center gap-2 text-sm'>
              <SiGithub className='w-4 h-4' />
              Continue with GitHub
            </Button>
          </div>

          <p className='text-[10px] text-muted-foreground text-center mt-4'>
            By continuing, you agree to our{' '}
            <a
              href='/terms'
              className='underline hover:text-foreground transition-colors'>
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href='/privacy'
              className='underline hover:text-foreground transition-colors'>
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className='hidden lg:flex lg:w-4/7 items-center justify-center p-4'>
        <div className='w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 rounded-xl shadow-xl' />
      </div>
    </div>
  );
};
