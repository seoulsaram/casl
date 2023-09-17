import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

interface GuestGuardProps {
  children: ReactNode;
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children } = props;
  const router = useRouter();
  console.log('guest guard');
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
  }, [router.route]);

  return <>{children}</>;
};

export default GuestGuard;
