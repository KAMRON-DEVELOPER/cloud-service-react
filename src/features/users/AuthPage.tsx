import { useState, type FormEvent } from 'react';
import { useContinueWithEmailMutation } from '../../services/auth';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { SiGithub, SiGoogle } from '@icons-pack/react-simple-icons';
import { Eye, EyeOff, Zap, Shield, Rocket, Users } from 'lucide-react';

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
      if (showUsernameField && username) {
        payload.username = username;
      }

      const result = await continueWithEmail(payload).unwrap();

      if ('user' in result && 'tokens' in result) {
        navigate('/');
      } else if ('message' in result && result.message === 'new_user') {
        setShowUsernameField(true);
      } else if ('redirectTo' in result) {
        navigate('/' + result.redirectTo);
      }
    } catch (err) {
      console.log('err while continueWithEmail: ', err);

      const error = err as FetchBaseQueryError;

      if (error.status === 500 && error.data && typeof error.data === 'object' && 'error' in error.data) {
        setErrorMessage((error.data as { error: string }).error);
      } else if (error.status === 'FETCH_ERROR') {
        setErrorMessage('Network error. Please check your connection.');
      } else {
        setErrorMessage('Authentication failed. Please try again.');
      }

      console.error('Auth failed:', err);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex'>
      {/* Left Side - Auth Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-8'>
        <div className='w-full max-w-md'>
          <div className='mb-8'>
            <h1 className='text-4xl font-bold text-white mb-2'>Welcome to Poddle</h1>
            <p className='text-slate-300'>{showUsernameField ? 'Complete your profile to get started' : 'Sign in or create your account'}</p>
          </div>

          <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20'>
            <form
              onSubmit={handleSubmit}
              className='space-y-4'>
              {/* Email Field */}
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-white mb-2'>
                  Email Address
                </label>
                <Input
                  id='email'
                  type='email'
                  placeholder='you@company.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400'
                />
              </div>

              {/* Username Field - Animated */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showUsernameField ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium text-white mb-2'>
                  Username
                </label>
                <Input
                  id='username'
                  type='text'
                  placeholder='johndoe'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={showUsernameField}
                  className='bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400'
                />
              </div>

              {/* Password Field with Toggle */}
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-white mb-2'>
                  Password
                </label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400 pr-10'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors'>
                    {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                  </button>
                </div>
              </div>

              <Button
                type='submit'
                disabled={isLoading}
                className='w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]'>
                {isLoading ? (
                  <span className='flex items-center justify-center'>
                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2' />
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
              <div className='mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300'>
                <p className='text-red-200 text-sm'>{errorMessage}</p>
              </div>
            )}

            <div className='flex items-center my-6'>
              <div className='flex-grow h-px bg-white/20' />
              <span className='mx-3 text-slate-300 text-sm whitespace-nowrap'>or continue with</span>
              <div className='flex-grow h-px bg-white/20' />
            </div>

            <div className='flex flex-col space-y-3'>
              <Button
                onClick={() => {
                  window.location.href = 'http://localhost:8001/api/v1/auth/google';
                }}
                variant='outline'
                className='w-full flex items-center justify-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-200'>
                <SiGoogle className='w-5 h-5' />
                Continue with Google
              </Button>
              <Button
                onClick={() => {
                  window.location.href = 'http://localhost:8001/api/v1/auth/github';
                }}
                variant='outline'
                className='w-full flex items-center justify-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-200'>
                <SiGithub className='w-5 h-5' />
                Continue with GitHub
              </Button>
            </div>

            <p className='text-xs text-slate-400 text-center mt-6'>By continuing, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>

      {/* Right Side - Marketing Content */}
      <div className='hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden'>
        {/* Animated Background Elements */}
        <div className='absolute inset-0'>
          <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse' />
          <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000' />
        </div>

        <div className='relative z-10 max-w-lg'>
          <h2 className='text-5xl font-bold text-white mb-6 leading-tight'>
            Build, Deploy, Scale
            <span className='block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'>in Minutes</span>
          </h2>

          <p className='text-xl text-slate-300 mb-12'>The modern platform for developers who want to ship faster without the infrastructure headache.</p>

          <div className='space-y-6'>
            <div className='flex items-start gap-4 group'>
              <div className='p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors'>
                <Zap className='w-6 h-6 text-purple-400' />
              </div>
              <div>
                <h3 className='text-white font-semibold mb-1'>Lightning Fast Deployments</h3>
                <p className='text-slate-400 text-sm'>Deploy your apps in seconds with our optimized infrastructure</p>
              </div>
            </div>

            <div className='flex items-start gap-4 group'>
              <div className='p-3 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/30 transition-colors'>
                <Shield className='w-6 h-6 text-pink-400' />
              </div>
              <div>
                <h3 className='text-white font-semibold mb-1'>Enterprise Security</h3>
                <p className='text-slate-400 text-sm'>Bank-level encryption and compliance out of the box</p>
              </div>
            </div>

            <div className='flex items-start gap-4 group'>
              <div className='p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors'>
                <Rocket className='w-6 h-6 text-purple-400' />
              </div>
              <div>
                <h3 className='text-white font-semibold mb-1'>Auto-Scaling</h3>
                <p className='text-slate-400 text-sm'>Handle traffic spikes effortlessly with intelligent scaling</p>
              </div>
            </div>

            <div className='flex items-start gap-4 group'>
              <div className='p-3 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/30 transition-colors'>
                <Users className='w-6 h-6 text-pink-400' />
              </div>
              <div>
                <h3 className='text-white font-semibold mb-1'>Team Collaboration</h3>
                <p className='text-slate-400 text-sm'>Built-in tools for seamless team workflows</p>
              </div>
            </div>
          </div>

          <div className='mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10'>
            <p className='text-slate-300 italic'>"Poddle helped us reduce deployment time from hours to minutes. Game changer for our team!"</p>
            <p className='text-slate-400 text-sm mt-2'>— Sarah Chen, CTO at TechStart</p>
          </div>
        </div>
      </div>
    </div>
  );
};
