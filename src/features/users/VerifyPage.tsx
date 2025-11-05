import { USERS_SERVICE_URL } from '@/consts';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const VerifyPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      fetch(`${USERS_SERVICE_URL}/auth/verify?token=${token}`, { credentials: 'include' }).then((res) =>
        res.ok ? navigate('/dashboard?verified=true') : navigate('/error')
      );
    }
  }, [token]);

  return <></>;
};

export default VerifyPage;
