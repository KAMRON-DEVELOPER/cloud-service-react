import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';

const DashboardPage = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verified = searchParams.get('verified');
    if (verified === 'true') {
      toast.success('Email verified successfully!');
    }
  }, []);

  return <div className='space-y-6'></div>;
};

export default DashboardPage;
