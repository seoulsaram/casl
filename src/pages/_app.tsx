import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { defaultACLObj } from './configs/acl';
import { NextPage } from 'next';
import AclGuard from './auth/AclGuard';
import GuestGuard from './auth/GuestGuard';
import { ReactNode } from 'react';
import AuthGuard from './auth/AuthGuard';
import UserLayout from './layouts/UserLayout';
import { AuthProvider } from './context/AuthContext';

type ExtendedAppProps = AppProps & {
  Component: NextPage;
};

type GuardProps = {
  authGuard: boolean;
  guestGuard: boolean;
  children: ReactNode;
};

export default function App(props: ExtendedAppProps) {
  const { Component, pageProps } = props;

  const authGuard = Component.authGuard ?? true;

  const guestGuard = Component.guestGuard ?? false;

  const aclAbilities = Component.acl ?? defaultACLObj;

  const getLayout = Component.getLayout ?? ((page) => <UserLayout>{page}</UserLayout>);

  const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
    if (guestGuard) {
      return <GuestGuard>{children}</GuestGuard>;
    } else if (!guestGuard && !authGuard) {
      return <>{children}</>;
    } else {
      return <AuthGuard>{children}</AuthGuard>;
    }
  };

  return (
    <AuthProvider>
      <Guard authGuard={authGuard} guestGuard={guestGuard}>
        <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard}>
          {getLayout(<Component {...pageProps} />)}
        </AclGuard>
      </Guard>
    </AuthProvider>
  );
}
