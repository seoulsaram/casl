// ** React Imports
import { ReactNode, ReactElement, useEffect, useContext } from 'react';

// ** Next Import
import { useRouter } from 'next/router';

// ** Hooks
import { AuthContext } from '../context/AuthContext';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children } = props;
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(
    () => {
      if (user !== 'admin') {
        if (router.asPath !== '/') {
          router.push('/');
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  );

  return <>{children}</>;
};

export default AuthGuard;
