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

  return <>{children}</>;
};

export default AuthGuard;
