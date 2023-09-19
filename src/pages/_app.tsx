import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { defaultACLObj } from '../configs/acl';
import { NextPage } from 'next';
import AclGuard from '../auth/AclGuard';
import GuestGuard from '../auth/GuestGuard';
import { ReactNode, useEffect, useState } from 'react';
import AuthGuard from '../auth/AuthGuard';
import UserLayout from '../layouts/UserLayout';
import { AuthProvider } from '../context/AuthContext';

type ExtendedAppProps = AppProps & {
  Component: NextPage;
};

type GuardProps = {
  guestGuard: boolean;
  children: ReactNode;
};

export default function App(props: ExtendedAppProps) {
  const { Component, pageProps } = props;

  const guestGuard = Component.guestGuard ?? false;

  const aclAbilities = Component.acl ?? defaultACLObj;

  const getLayout = Component.getLayout ?? ((page) => <UserLayout>{page}</UserLayout>);

  const Guard = ({ children, guestGuard }: GuardProps) => {
    if (guestGuard) {
      return <GuestGuard>{children}</GuestGuard>;
    } else {
      return <AuthGuard>{children}</AuthGuard>;
    }
  };

  return (
    <AuthProvider>
      <Guard guestGuard={guestGuard}>
        <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard}>
          {getLayout(<Component {...pageProps} />)}
        </AclGuard>
      </Guard>
    </AuthProvider>
  );
}
