import { VITE_API_URL } from '@/consts';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

const VerifyPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      fetch(`${VITE_API_URL}/users/auth/verify?token=${token}`, {
        credentials: 'include',
      })
        .then(async (res) => {
          if (res.ok) {
            toast.success('Email verified successfully!');
            navigate('/dashboard?verified=true');
          } else {
            const error = await res.json();
            toast.error(error.message || 'Verification failed');
            navigate('/auth');
          }
        })
        .catch(() => {
          toast.error('Something went wrong');
          navigate('/auth');
        });
    }
  }, [token, navigate]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-950'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
        <p className='text-gray-400'>Verifying your email...</p>
      </div>
    </div>
  );
};

export default VerifyPage;
